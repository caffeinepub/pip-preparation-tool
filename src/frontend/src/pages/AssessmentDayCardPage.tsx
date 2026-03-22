import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Info,
  Mic,
  Package,
  Printer,
  XCircle,
} from "lucide-react";

const dos = [
  "Bring a friend, family member, or carer for support — you are entitled to have someone with you.",
  "Take copies of your PIP2 form and any evidence you submitted.",
  "Describe your worst days throughout, not your best or average days.",
  "Take your time — you can ask for questions to be repeated or rephrased.",
  "Mention all your conditions, not just the most obvious one.",
  "Describe how long activities take you, not just whether you can do them.",
  "Mention if you need aids, adaptations, or help from someone else.",
  "Tell them about pain levels, fatigue, and mental health impact.",
  "Explain if your ability varies from day to day.",
  "Mention medication side effects that affect your functioning.",
];

const donts = [
  'Don\'t say "I manage fine" or downplay your symptoms — explain the full impact.',
  "Don't assume the assessor already knows about your condition — explain everything.",
  "Don't rush — take your time to give complete, accurate answers.",
  "Don't worry if you become emotional — that is completely understandable.",
  "Don't forget to mention medication side effects (sedation, dizziness, nausea, etc.).",
  "Don't travel to the assessment in a way that contradicts your mobility claim.",
  "Don't attend alone if you can avoid it — having support makes a real difference.",
  "Don't leave the assessment without asking what happens next.",
];

const whatToBring = [
  "Photo ID (passport, driving licence, or national ID card)",
  "Copy of your completed PIP2 form",
  "Copies of all evidence you sent to DWP",
  "A list of all current medications and dosages",
  "Any walking aids, wheelchair, or equipment you normally use",
  "A trusted person for support (friend, family member, or carer)",
  "Water and any medication you may need during the appointment",
];

export function AssessmentDayCardPage() {
  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Badge variant="secondary" className="mb-3">
              Assessment Preparation
            </Badge>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Assessment Day Card
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              A practical guide for the day of your PIP assessment. Print this
              page and keep it with you.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="flex items-center gap-2 print:hidden flex-shrink-0"
            data-ocid="assessment-card.primary_button"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            Print This Card
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* DOs */}
        <section
          className="section-card"
          aria-labelledby="dos-heading"
          data-ocid="assessment-card.section"
        >
          <h2
            id="dos-heading"
            className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-2"
          >
            <CheckCircle2
              className="w-5 h-5 text-success flex-shrink-0"
              aria-hidden="true"
            />
            DO These Things
          </h2>
          <ul className="space-y-3">
            {dos.map((item, idx) => (
              <li
                key={item.substring(0, 30)}
                className="flex items-start gap-3 text-sm"
                data-ocid={`assessment-card.item.${idx + 1}`}
              >
                <CheckCircle2
                  className="w-4 h-4 text-success mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* DON'Ts */}
        <section className="section-card" aria-labelledby="donts-heading">
          <h2
            id="donts-heading"
            className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-2"
          >
            <XCircle
              className="w-5 h-5 text-destructive flex-shrink-0"
              aria-hidden="true"
            />
            Avoid These Things
          </h2>
          <ul className="space-y-3">
            {donts.map((item) => (
              <li
                key={item.substring(0, 30)}
                className="flex items-start gap-3 text-sm"
              >
                <XCircle
                  className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What to Bring */}
        <section className="section-card" aria-labelledby="bring-heading">
          <h2
            id="bring-heading"
            className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-2"
          >
            <Package
              className="w-5 h-5 text-primary flex-shrink-0"
              aria-hidden="true"
            />
            What to Bring
          </h2>
          <ul className="space-y-2">
            {whatToBring.map((item) => (
              <li
                key={item.substring(0, 30)}
                className="flex items-start gap-3 text-sm"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What Happens */}
        <section
          className="section-card"
          aria-labelledby="what-happens-heading"
        >
          <h2
            id="what-happens-heading"
            className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-2"
          >
            <Info
              className="w-5 h-5 text-primary flex-shrink-0"
              aria-hidden="true"
            />
            What Happens at the Assessment
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The assessment is carried out by a healthcare professional (a
              nurse, physiotherapist, occupational therapist, paramedic, or
              doctor) who works for the assessment provider, not the DWP. The
              session usually lasts 45–60 minutes.
            </p>
            <p>
              You will be asked questions about your conditions and how they
              affect your daily life and mobility. The assessor may also observe
              how you move or communicate. They will then write a report for
              DWP, who make the final decision.
            </p>
            <p>
              The assessor is not there to catch you out — answer honestly and
              describe the full impact on your worst days. Do not feel you have
              to prove you are ill.
            </p>
          </div>
        </section>

        {/* Recording rights */}
        <section className="section-card" aria-labelledby="recording-heading">
          <h2
            id="recording-heading"
            className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-2"
          >
            <Mic
              className="w-5 h-5 text-primary flex-shrink-0"
              aria-hidden="true"
            />
            Your Right to Record the Assessment
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              You have the right to request that your assessment is recorded.
              You must give advance notice to the assessment provider — usually
              at least 2 working days before. You will need to bring your own
              recording device.
            </p>
            <p>
              If you wish to record your assessment, contact the assessment
              provider (Capita or Independent Assessment Services) in advance
              and confirm the request in writing.
            </p>
          </div>
        </section>

        {/* Adjustments */}
        <section className="section-card" aria-labelledby="adjustments-heading">
          <h2
            id="adjustments-heading"
            className="font-heading font-bold text-foreground text-lg mb-4"
          >
            Requesting Adjustments
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              You can request reasonable adjustments for your assessment,
              including:
            </p>
            <ul className="space-y-1.5 mt-2">
              {[
                "A home visit if you are unable to travel due to your condition",
                "A telephone or video assessment instead of face-to-face",
                "A ground floor or accessible venue",
                "Extra time to answer questions",
                "A sign language interpreter or other communication support",
                "A specific gender assessor (for religious or medical reasons)",
              ].map((adj) => (
                <li
                  key={adj.substring(0, 30)}
                  className="flex items-start gap-2"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {adj}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Contact the assessment provider as early as possible to request
              any adjustments.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
