import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquareHeart, Star } from "lucide-react";
import { useState } from "react";

interface FeedbackEntry {
  date: string;
  rating: number;
  mostHelpful: string;
  improvements: string;
  referral: string;
}

interface CommunityTip {
  id: string;
  condition: string;
  tip: string;
  date: string;
  approved: boolean;
}

const CONDITIONS_LIST = [
  "Depression",
  "Anxiety",
  "PTSD",
  "Schizophrenia",
  "Bipolar Disorder",
  "OCD",
  "Personality Disorders",
  "Autism (ASD)",
  "ADHD",
  "Dyspraxia",
  "Fibromyalgia",
  "ME/CFS",
  "Chronic Pain",
  "Chronic Fatigue Syndrome",
  "MS (Multiple Sclerosis)",
  "Epilepsy",
  "Cerebral Palsy",
  "Parkinson's Disease",
  "Stroke Effects",
  "Dementia / Memory Conditions",
  "Rheumatoid Arthritis",
  "Osteoarthritis",
  "Back Conditions",
  "Joint Hypermobility (EDS/HSD)",
  "Crohn's Disease",
  "IBD / IBS",
  "Diabetes Complications",
  "Visual Impairment",
  "Hearing Impairment",
  "Deafblindness",
  "COPD",
  "Asthma",
  "Heart Conditions",
  "Cancer",
  "Kidney Disease",
  "Mobility / Wheelchair Users",
  "Lupus (SLE)",
  "Learning Disabilities",
];

const REFERRAL_OPTIONS = [
  { value: "google", label: "Google" },
  { value: "social", label: "Social media" },
  { value: "friend", label: "Friend or family" },
  { value: "citizens-advice", label: "Citizens Advice" },
  { value: "other", label: "Other" },
];

function loadFeedback(): FeedbackEntry[] {
  try {
    return JSON.parse(
      localStorage.getItem("pip-feedback") ?? "[]",
    ) as FeedbackEntry[];
  } catch {
    return [];
  }
}

function saveFeedback(entries: FeedbackEntry[]) {
  localStorage.setItem("pip-feedback", JSON.stringify(entries));
}

function savePendingTip(tip: CommunityTip) {
  const existing: CommunityTip[] = JSON.parse(
    localStorage.getItem("pip-community-tips-pending") ?? "[]",
  );
  localStorage.setItem(
    "pip-community-tips-pending",
    JSON.stringify([...existing, tip]),
  );
}

export function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [mostHelpful, setMostHelpful] = useState("");
  const [improvements, setImprovements] = useState("");
  const [referral, setReferral] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Community tip state
  const [tipCondition, setTipCondition] = useState("");
  const [tipText, setTipText] = useState("");
  const [tipSubmitted, setTipSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: FeedbackEntry = {
      date: new Date().toISOString(),
      rating,
      mostHelpful,
      improvements,
      referral,
    };
    const existing = loadFeedback();
    saveFeedback([...existing, entry]);
    setSubmitted(true);
  };

  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipText.trim()) return;
    const tip: CommunityTip = {
      id: `tip-${Date.now()}`,
      condition: tipCondition,
      tip: tipText.trim(),
      date: new Date().toISOString(),
      approved: false,
    };
    savePendingTip(tip);
    setTipSubmitted(true);
    setTipText("");
    setTipCondition("");
  };

  return (
    <main
      id="main-content"
      className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquareHeart
            className="w-5 h-5 text-primary"
            aria-hidden="true"
          />
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Share Your Feedback
          </h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Your feedback helps improve this tool for everyone preparing a PIP
          claim. It is completely anonymous and stored only on your device.
        </p>
      </div>

      {submitted ? (
        <output
          className="section-card text-center py-10 block"
          aria-live="polite"
          data-ocid="feedback.success_state"
        >
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-8 h-8 ${
                  s <= rating ? "fill-warning text-warning" : "text-muted"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-2">
            Thank you for your feedback!
          </h2>
          <p className="text-muted-foreground">
            Your response has been saved. We appreciate you taking the time to
            help improve this tool.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setRating(0);
              setMostHelpful("");
              setImprovements("");
              setReferral("");
              setSubmitted(false);
            }}
          >
            Submit another response
          </Button>
        </output>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          data-ocid="feedback.panel"
        >
          {/* Star rating */}
          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-3">
              Overall rating{" "}
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            </legend>
            <div className="flex items-center gap-1" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`${star} star${star !== 1 ? "s" : ""}`}
                  aria-pressed={rating === star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded p-0.5 transition-transform hover:scale-110"
                  data-ocid="feedback.toggle"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hovered || rating)
                        ? "fill-warning text-warning"
                        : "text-muted-foreground"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {["Poor", "Fair", "Good", "Very good", "Excellent"][rating - 1]}
              </p>
            )}
          </fieldset>

          {/* Most helpful */}
          <div>
            <Label htmlFor="most-helpful" className="font-semibold">
              What has been most helpful?
            </Label>
            <Textarea
              id="most-helpful"
              value={mostHelpful}
              onChange={(e) => setMostHelpful(e.target.value)}
              placeholder="e.g. The condition tips were really useful for knowing what to write on the form."
              rows={4}
              className="mt-2"
              data-ocid="feedback.textarea"
            />
          </div>

          {/* Improvements */}
          <div>
            <Label htmlFor="improvements" className="font-semibold">
              What is missing or could be improved?
            </Label>
            <Textarea
              id="improvements"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              placeholder="e.g. It would be helpful to have more information about the tribunal process."
              rows={4}
              className="mt-2"
            />
          </div>

          {/* Referral */}
          <div>
            <Label htmlFor="referral" className="font-semibold">
              How did you find us?{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Select value={referral} onValueChange={setReferral}>
              <SelectTrigger
                id="referral"
                className="mt-2"
                data-ocid="feedback.select"
              >
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {REFERRAL_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={rating === 0}
            className="w-full sm:w-auto"
            data-ocid="feedback.submit_button"
          >
            Submit Feedback
          </Button>
          {rating === 0 && (
            <p className="text-xs text-muted-foreground" aria-live="polite">
              Please select a star rating to submit.
            </p>
          )}
        </form>
      )}

      {/* Community tip section */}
      <div className="mt-10 pt-8 border-t border-border">
        <h2 className="font-heading text-lg font-bold text-foreground mb-2">
          Share a Tip (Optional)
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Have a tip that helped you with your PIP claim? Share it anonymously
          and it may be published on the Condition Tips page after review.
        </p>

        {tipSubmitted ? (
          <output
            className="p-4 bg-success/10 border border-success/30 rounded-lg text-sm text-success font-medium block"
            aria-live="polite"
            data-ocid="feedback.success_state"
          >
            ✓ Thank you! Your tip has been submitted for review.
          </output>
        ) : (
          <form
            onSubmit={handleTipSubmit}
            className="space-y-4"
            data-ocid="feedback.panel"
          >
            <div>
              <Label htmlFor="tip-condition" className="font-semibold text-sm">
                Related condition{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Select value={tipCondition} onValueChange={setTipCondition}>
                <SelectTrigger
                  id="tip-condition"
                  className="mt-2"
                  data-ocid="feedback.select"
                >
                  <SelectValue placeholder="Select a condition (optional)..." />
                </SelectTrigger>
                <SelectContent>
                  {CONDITIONS_LIST.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tip-text" className="font-semibold text-sm">
                Your tip{" "}
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              </Label>
              <Textarea
                id="tip-text"
                value={tipText}
                onChange={(e) => setTipText(e.target.value.slice(0, 300))}
                placeholder="e.g. Keep a daily diary of how your condition affects you — even a few notes each day makes a huge difference when filling in the form."
                rows={4}
                maxLength={300}
                className="mt-2"
                data-ocid="feedback.textarea"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {tipText.length}/300 characters
              </p>
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={!tipText.trim()}
              size="sm"
              data-ocid="feedback.submit_button"
            >
              Submit Tip for Review
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
