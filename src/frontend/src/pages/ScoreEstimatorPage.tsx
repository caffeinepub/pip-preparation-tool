import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pipActivities } from "@/data/pipActivities";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AlertTriangle, Calculator, RotateCcw } from "lucide-react";

const DESCRIPTOR_OPTIONS = [
  { value: "0", label: "Can do this safely and reliably (0 pts)" },
  { value: "2", label: "Needs prompting or reminding (2 pts)" },
  {
    value: "4",
    label:
      "Needs a communication aid, supervision, or assistance from an aid (4 pts)",
  },
  { value: "6", label: "Needs assistance from another person (6 pts)" },
  { value: "8", label: "Cannot do this activity at all (8 pts)" },
];

const DAILY_LIVING_IDS = [
  "preparing-food",
  "eating-drinking",
  "managing-therapy",
  "washing-bathing",
  "managing-toilet",
  "dressing-undressing",
  "communicating-verbally",
  "reading-understanding",
  "engaging-people",
  "budgeting-decisions",
];

const MOBILITY_IDS = ["planning-journeys", "moving-around"];

function getAwardLevel(score: number): {
  label: string;
  color: string;
  weekly: string;
} {
  if (score >= 12)
    return {
      label: "Enhanced Rate",
      color: "text-success",
      weekly: "£71.00/week",
    };
  if (score >= 8)
    return {
      label: "Standard Rate",
      color: "text-warning",
      weekly: "£26.90/week",
    };
  return { label: "No Award", color: "text-muted-foreground", weekly: "£0" };
}

export function ScoreEstimatorPage() {
  const [scores, setScores] = useLocalStorage<Record<string, string>>(
    "pip-score-estimate",
    {},
  );

  const updateScore = (id: string, value: string) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  };

  const dailyLivingActivities = pipActivities.filter((a) =>
    DAILY_LIVING_IDS.includes(a.id),
  );
  const mobilityActivities = pipActivities.filter((a) =>
    MOBILITY_IDS.includes(a.id),
  );

  const dailyScore = dailyLivingActivities.reduce(
    (acc, a) => acc + Number.parseInt(scores[a.id] ?? "0", 10),
    0,
  );
  const mobilityScore = mobilityActivities.reduce(
    (acc, a) => acc + Number.parseInt(scores[a.id] ?? "0", 10),
    0,
  );

  const dlAward = getAwardLevel(dailyScore);
  const mobAward = getAwardLevel(mobilityScore);

  const reset = () => setScores({});

  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">
          <Calculator className="w-3 h-3 mr-1.5" aria-hidden="true" />
          Estimation Only
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
          PIP Score Estimator
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Indicate how each activity affects you to get a rough idea of the
          award level you might qualify for. This is for guidance only — PIP
          assessment is more complex.
        </p>
      </div>

      {/* PROMINENT disclaimer */}
      <Alert className="mb-8 border-destructive/40 bg-destructive/5">
        <AlertTriangle
          className="h-4 w-4 text-destructive"
          aria-hidden="true"
        />
        <AlertDescription className="text-sm leading-relaxed">
          <strong>Important disclaimer:</strong> This is a rough estimate only.
          Real PIP scoring uses detailed descriptors assessed in person by a
          healthcare professional. This tool does not predict or guarantee any
          award. Always seek advice from{" "}
          <a
            href="https://www.citizensadvice.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Citizens Advice
          </a>{" "}
          or a welfare rights adviser before making decisions based on this
          estimate.
        </AlertDescription>
      </Alert>

      {/* Results summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card data-ocid="score.panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Daily Living
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground tabular-nums">
              {dailyScore} pts
            </p>
            <p className={`text-sm font-semibold mt-1 ${dlAward.color}`}>
              {dlAward.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {dlAward.weekly}/week (estimate)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Mobility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground tabular-nums">
              {mobilityScore} pts
            </p>
            <p className={`text-sm font-semibold mt-1 ${mobAward.color}`}>
              {mobAward.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {mobAward.weekly}/week (estimate)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Living Activities */}
      <section aria-labelledby="dl-heading" className="mb-8">
        <h2
          id="dl-heading"
          className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2"
        >
          Daily Living Activities
          <Badge variant="outline" className="text-xs font-normal">
            {dailyScore} / 80 points
          </Badge>
        </h2>
        <div className="space-y-3">
          {dailyLivingActivities.map((activity) => (
            <div key={activity.id} className="section-card">
              <Label
                htmlFor={`score-${activity.id}`}
                className="font-semibold text-foreground block mb-2"
              >
                {activity.title}
              </Label>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {activity.question}
              </p>
              <Select
                value={scores[activity.id] ?? "0"}
                onValueChange={(v) => updateScore(activity.id, v)}
              >
                <SelectTrigger
                  id={`score-${activity.id}`}
                  data-ocid="score.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DESCRIPTOR_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </section>

      {/* Mobility Activities */}
      <section aria-labelledby="mob-heading" className="mb-8">
        <h2
          id="mob-heading"
          className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2"
        >
          Mobility Activities
          <Badge variant="outline" className="text-xs font-normal">
            {mobilityScore} / 16 points
          </Badge>
        </h2>
        <div className="space-y-3">
          {mobilityActivities.map((activity) => (
            <div key={activity.id} className="section-card">
              <Label
                htmlFor={`score-${activity.id}`}
                className="font-semibold text-foreground block mb-2"
              >
                {activity.title}
              </Label>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {activity.question}
              </p>
              <Select
                value={scores[activity.id] ?? "0"}
                onValueChange={(v) => updateScore(activity.id, v)}
              >
                <SelectTrigger
                  id={`score-mob-${activity.id}`}
                  data-ocid="score.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DESCRIPTOR_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </section>

      {/* Scoring guide */}
      <div className="section-card bg-muted/40 mb-6">
        <h3 className="font-semibold text-foreground text-sm mb-3">
          Award thresholds (estimate)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {[
            {
              range: "0–7 points",
              label: "No Award",
              desc: "Does not qualify for that component",
            },
            {
              range: "8–11 points",
              label: "Standard Rate",
              desc: "~£26.90/week per component",
            },
            {
              range: "12+ points",
              label: "Enhanced Rate",
              desc: "~£71.00/week per component",
            },
          ].map((tier) => (
            <div key={tier.range} className="bg-background rounded-lg p-3">
              <p className="font-bold text-foreground">{tier.range}</p>
              <p className="text-xs font-semibold text-primary">{tier.label}</p>
              <p className="text-xs text-muted-foreground">{tier.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          ⚠️ These thresholds are simplified. Actual PIP rates and award criteria
          are more complex — always seek professional advice.
        </p>
      </div>

      <Button
        variant="outline"
        onClick={reset}
        className="flex items-center gap-2"
        data-ocid="score.delete_button"
      >
        <RotateCcw className="w-4 h-4" aria-hidden="true" />
        Reset All Scores
      </Button>
    </main>
  );
}
