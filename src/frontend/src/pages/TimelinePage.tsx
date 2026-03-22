import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CheckCircle, Clock, MapPin, Printer } from "lucide-react";

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  timescale: string;
  tips: string[];
  phase: "initial" | "form" | "assessment" | "decision" | "appeal";
}

const steps: TimelineStep[] = [
  {
    id: 1,
    title: "Make Your Initial Call to DWP",
    description:
      "Call the DWP PIP claim line to start your claim. They will take some basic details and arrange to send you the PIP2 form. You have 1 month to return it.",
    timescale: "Day 1",
    tips: [
      "Call 0800 917 2222 (free from mobiles and landlines), Monday–Friday 8am–6pm.",
      "Have your National Insurance number, bank details, and details of your condition ready.",
      "Ask for the form in large print or other format if needed.",
      "Note the date you called and the reference number they give you.",
    ],
    phase: "initial",
  },
  {
    id: 2,
    title: "Receive and Complete Your PIP2 Form",
    description:
      "The 'How your disability affects you' (PIP2) form arrives by post. This is the most important document in your claim — describe how your condition affects you on your worst days.",
    timescale: "Within 2–4 weeks of calling",
    tips: [
      "Use this tool's Form Preparation section to draft your answers before writing on the form.",
      "Describe your worst days, not your average or best days.",
      "Explain how long activities take, not just whether you can do them.",
      "Mention if you need aids, adaptations, or help from another person.",
      "Keep a copy of everything you write before sending.",
    ],
    phase: "form",
  },
  {
    id: 3,
    title: "Gather Supporting Evidence",
    description:
      "Collect letters, reports, and documents from healthcare professionals that support your claim. Send copies with your form — never send originals.",
    timescale: "While completing the form",
    tips: [
      "Contact your GP, consultant, or other healthcare providers for supporting letters.",
      "Use the Evidence by Condition page to see what evidence suits your conditions.",
      "Ask your care coordinator, CPN, or occupational therapist for letters.",
      "Prescription lists and hospital letters are useful supporting evidence.",
    ],
    phase: "form",
  },
  {
    id: 4,
    title: "Send Your Form and Evidence to DWP",
    description:
      "Return your completed PIP2 form with all supporting evidence by the deadline. Use tracked post and keep proof of postage.",
    timescale: "Within 1 month of receiving the form",
    tips: [
      "Send by Royal Mail Signed For or Special Delivery — keep your receipt.",
      "Keep photocopies of the completed form and all evidence you send.",
      "Ask the DWP to extend your deadline if you need more time — call before the deadline expires.",
      "Make a note of the date you sent it.",
    ],
    phase: "form",
  },
  {
    id: 5,
    title: "DWP Review Your Form",
    description:
      "DWP and the assessment provider (usually Capita or Independent Assessment Services) review your PIP2 form and evidence. They may request additional information.",
    timescale: "Varies — can take 4–12 weeks",
    tips: [
      "You may receive a letter asking for more evidence — respond promptly.",
      "In some cases, a decision is made based on your form alone (paper-based decision).",
      "If you are invited for an assessment, it usually means a decision was not made from the form.",
      "Keep your phone accessible — they may try to call you.",
    ],
    phase: "assessment",
  },
  {
    id: 6,
    title: "Assessment (If Required)",
    description:
      "A healthcare professional assesses how your condition affects your daily living and mobility. This may be face-to-face, by phone, or by video call.",
    timescale: "Usually within 3–6 months of claim start",
    tips: [
      "Bring a friend, family member, or carer for support.",
      "Take copies of your PIP2 form and all evidence submitted.",
      "Describe your worst days throughout — not your best.",
      "You have the right to record the assessment with prior notice to the assessor.",
      "Read the Assessment Day Card page for a full checklist of dos and don'ts.",
    ],
    phase: "assessment",
  },
  {
    id: 7,
    title: "DWP Decision Letter Arrives",
    description:
      "DWP send a decision letter explaining whether your claim has been awarded, and at what rate for daily living and mobility components.",
    timescale: "Usually 4–8 weeks after assessment",
    tips: [
      "Read the letter carefully — it explains how the points were awarded.",
      "If you disagree with the decision, you have 30 days from the date of the letter to request a Mandatory Reconsideration.",
      "Keep the letter — you will need it for any reconsideration or appeal.",
      "Contact Citizens Advice if you need help understanding the decision.",
    ],
    phase: "decision",
  },
  {
    id: 8,
    title: "First Payment (If Successful)",
    description:
      "If your claim is successful, your first payment is made directly to your bank account. The award is backdated to when you first called the DWP.",
    timescale: "Usually 3–5 weeks after decision letter",
    tips: [
      "Your payments are backdated to the date you originally called the DWP — not the date of the decision.",
      "You will be awarded for either standard or enhanced rate for daily living and/or mobility.",
      "Make a note of your award review date — usually 3–10 years — to prepare in advance.",
      "Keep copies of all your documents for your next review.",
    ],
    phase: "decision",
  },
  {
    id: 9,
    title: "Mandatory Reconsideration (If Unsuccessful)",
    description:
      "If you are unhappy with the decision, you can request a Mandatory Reconsideration (MR). A different DWP decision maker reviews your case.",
    timescale: "Within 30 days of the decision letter",
    tips: [
      "You must request MR before you can appeal to a tribunal.",
      "Write clearly why you disagree and provide any new or additional evidence.",
      "Ask Citizens Advice or a welfare rights adviser to help you write your MR letter.",
      "Most MR decisions take 2–12 weeks. If the outcome is still unfavourable, you can appeal.",
    ],
    phase: "appeal",
  },
  {
    id: 10,
    title: "Tribunal Appeal (If Still Unsuccessful)",
    description:
      "If your MR is unsuccessful, you can appeal to an independent Social Security and Child Support (SSCS) tribunal. Around 65–70% of appeals are decided in the claimant's favour.",
    timescale: "Within 30 days of MR decision; tribunal may take 6–18 months",
    tips: [
      "Get independent advice before appealing — Citizens Advice, Shelter, or a welfare rights service can help.",
      "You can represent yourself, bring someone to support you, or have a representative speak for you.",
      "New evidence can be submitted at the tribunal stage.",
      "The hearing is informal — the panel want to understand your conditions and their impact.",
    ],
    phase: "appeal",
  },
];

const phaseColors: Record<string, string> = {
  initial: "bg-blue-100 text-blue-800 border-blue-200",
  form: "bg-indigo-100 text-indigo-800 border-indigo-200",
  assessment: "bg-purple-100 text-purple-800 border-purple-200",
  decision: "bg-green-100 text-green-800 border-green-200",
  appeal: "bg-orange-100 text-orange-800 border-orange-200",
};

const phaseLabels: Record<string, string> = {
  initial: "Getting Started",
  form: "Form Stage",
  assessment: "Assessment Stage",
  decision: "Decision",
  appeal: "Challenge Stage",
};

export function TimelinePage() {
  const [currentStage, setCurrentStage] = useLocalStorage<number | null>(
    "pip-timeline-stage",
    null,
  );

  const handleStageClick = (id: number) => {
    setCurrentStage(id === currentStage ? null : id);
  };

  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Badge variant="secondary" className="mb-3">
              10 Steps
            </Badge>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Your PIP Journey: What to Expect
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              A step-by-step guide to the full PIP claim process — from your
              first call to DWP through to payment or appeal. Click any step to
              mark it as your current stage.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="flex items-center gap-2 print:hidden flex-shrink-0"
            data-ocid="timeline.primary_button"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            Print Timeline
          </Button>
        </div>

        {currentStage && (
          <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg text-sm text-primary font-medium">
            <MapPin className="w-4 h-4 inline mr-1.5" aria-hidden="true" />
            You are currently on Step {currentStage}:{" "}
            {steps.find((s) => s.id === currentStage)?.title}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-6 top-6 bottom-6 w-0.5 bg-border print:hidden"
          aria-hidden="true"
        />

        <ul className="space-y-4" aria-label="PIP journey steps">
          {steps.map((step) => {
            const isCurrentStage = step.id === currentStage;
            const isPastStage = currentStage !== null && step.id < currentStage;

            return (
              <li
                key={step.id}
                className="relative pl-16 print:pl-0"
                data-ocid={`timeline.item.${step.id}`}
              >
                {/* Step number circle */}
                <button
                  type="button"
                  onClick={() => handleStageClick(step.id)}
                  className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring print:hidden ${
                    isCurrentStage
                      ? "bg-primary border-primary text-primary-foreground shadow-md scale-110"
                      : isPastStage
                        ? "bg-success/20 border-success text-success"
                        : "bg-card border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                  aria-pressed={isCurrentStage}
                  aria-label={`Step ${step.id}: ${step.title}${
                    isCurrentStage ? " — your current stage" : ""
                  }`}
                  data-ocid={`timeline.toggle.${step.id}`}
                >
                  {isPastStage && !isCurrentStage ? (
                    <CheckCircle className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    step.id
                  )}
                </button>

                {/* Step content */}
                <div
                  className={`section-card transition-all ${
                    isCurrentStage
                      ? "border-primary shadow-md bg-primary/5"
                      : isPastStage
                        ? "opacity-70"
                        : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start gap-2 mb-2">
                    <span
                      className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium ${
                        phaseColors[step.phase]
                      }`}
                    >
                      {phaseLabels[step.phase]}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {step.timescale}
                    </span>
                    {isCurrentStage && (
                      <Badge className="text-xs">Your current stage</Badge>
                    )}
                  </div>

                  <h2 className="font-heading font-bold text-foreground text-base mb-2">
                    Step {step.id}: {step.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-1.5">
                    {step.tips.map((tip) => (
                      <div
                        key={tip.substring(0, 30)}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
