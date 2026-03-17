import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  HelpCircle,
  Info,
  MessageSquare,
  Mic,
  Shield,
  Users,
} from "lucide-react";

const commonQuestions = [
  {
    question: "Can you describe a typical day for you?",
    guidance:
      "Walk through your day from waking up to going to bed. Focus on what you struggle with and what help you need.",
  },
  {
    question: "How does your condition affect your ability to prepare food?",
    guidance:
      "Describe any pain, fatigue, or safety concerns when cooking. Mention if you rely on ready meals or help from others.",
  },
  {
    question: "Can you walk to the end of your road?",
    guidance:
      "Be honest about distance and pain. Describe your worst days, not your best. Mention any aids you use.",
  },
  {
    question: "Do you need help with washing and dressing?",
    guidance:
      "Describe any difficulties with getting in/out of the bath, managing buttons or zips, or needing someone to help.",
  },
  {
    question:
      "How does your condition affect your mental health and ability to engage with others?",
    guidance:
      "Describe anxiety, depression, or social difficulties. Explain how these affect your daily life and interactions.",
  },
  {
    question: "Can you manage your medication independently?",
    guidance:
      "Mention if you need reminders, help with packaging, or supervision when taking medication.",
  },
  {
    question: "Do you use any aids or adaptations at home?",
    guidance:
      "List any equipment such as grab rails, shower seats, walking aids, or adapted utensils.",
  },
  {
    question: "Can you travel independently on public transport?",
    guidance:
      "Describe any anxiety, physical difficulties, or cognitive challenges that affect your ability to travel alone.",
  },
];

const keyTips = [
  {
    icon: AlertTriangle,
    title: "Describe Your Worst Days",
    description:
      "The assessment should reflect how your condition affects you on your worst days, not your best. Be honest about the full range of your difficulties.",
    color: "text-warning-foreground",
    bg: "bg-warning/10 border-warning/30",
  },
  {
    icon: CheckCircle,
    title: "Be Honest and Consistent",
    description:
      "Your answers should be consistent with what you wrote on your PIP2 form. The assessor may compare your responses. Do not downplay your difficulties.",
    color: "text-success",
    bg: "bg-success/10 border-success/30",
  },
  {
    icon: Users,
    title: "Take Someone with You",
    description:
      "You can bring a friend, family member, or support worker to your assessment. They can provide moral support and help you remember things you want to say.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: Mic,
    title: "You Can Ask for a Recording",
    description:
      "You have the right to request that your assessment is recorded. You must request this in advance. A recording can be useful if you need to challenge the decision.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: Clock,
    title: "Take Your Time",
    description:
      "Do not rush your answers. It is fine to pause and think. If you do not understand a question, ask the assessor to repeat or rephrase it.",
    color: "text-muted-foreground",
    bg: "bg-muted border-border",
  },
  {
    icon: Shield,
    title: "You Can Challenge the Decision",
    description:
      "If you disagree with the outcome, you can request a Mandatory Reconsideration within one month of the decision. Citizens Advice can help you with this.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
];

export function AssessmentGuidePage() {
  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Assessment Preparation Guide
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Understanding what to expect at your PIP assessment can help reduce
          anxiety and ensure you present your case as clearly as possible.
        </p>
      </div>

      {/* What is the Assessment */}
      <section aria-labelledby="what-is-assessment" className="mb-8">
        <h2
          id="what-is-assessment"
          className="font-heading text-xl font-bold text-foreground mb-4"
        >
          What is the PIP Assessment?
        </h2>
        <div className="section-card space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            After you return your PIP2 form, the DWP will usually ask you to
            attend an assessment with a healthcare professional (HCP). This is
            not a medical examination — it is a functional assessment to
            understand how your condition affects your daily life.
          </p>
          <p>
            The assessment can take place{" "}
            <strong className="text-foreground">face-to-face</strong> at an
            assessment centre,{" "}
            <strong className="text-foreground">by telephone</strong>, or{" "}
            <strong className="text-foreground">by video call</strong>. You can
            request a home visit if you are unable to travel.
          </p>
          <p>
            The assessor will ask you questions about the same activity areas
            covered in the PIP2 form. They will write a report which the DWP
            uses to make their decision. The assessor does not make the final
            decision — the DWP does.
          </p>
          <Alert className="border-primary/30 bg-primary/5 mt-4">
            <Info className="h-4 w-4 text-primary" aria-hidden="true" />
            <AlertDescription className="text-foreground/80 text-sm">
              <strong>Important:</strong> The assessment typically lasts 45–90
              minutes. You do not need to bring your PIP2 form, but it can be
              helpful to review your answers beforehand.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Key Tips */}
      <section aria-labelledby="key-tips" className="mb-8">
        <h2
          id="key-tips"
          className="font-heading text-xl font-bold text-foreground mb-4"
        >
          Key Tips for Your Assessment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {keyTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.title}
                className={`flex items-start gap-3 p-4 rounded-lg border ${tip.bg}`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tip.color}`}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">
                    {tip.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Common Questions */}
      <section aria-labelledby="common-questions">
        <h2
          id="common-questions"
          className="font-heading text-xl font-bold text-foreground mb-2"
        >
          Common Assessment Questions
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          These are typical questions asked during a PIP assessment. Preparing
          your answers in advance can help you feel more confident.
        </p>
        <div className="space-y-3">
          {commonQuestions.map((item) => (
            <Card key={item.question} className="border-border">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-foreground flex items-start gap-2">
                  <MessageSquare
                    className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                  <strong className="text-foreground/70">Guidance: </strong>
                  {item.guidance}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* After the Assessment */}
      <section aria-labelledby="after-assessment" className="mt-8">
        <h2
          id="after-assessment"
          className="font-heading text-xl font-bold text-foreground mb-4"
        >
          After the Assessment
        </h2>
        <div className="section-card text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>
            After your assessment, the healthcare professional will write a
            report and send it to the DWP. The DWP will then make a decision
            about your PIP award. You should receive a decision letter within a
            few weeks.
          </p>
          <p>
            If you are awarded PIP, the letter will tell you which components
            (Daily Living and/or Mobility) you have been awarded and at which
            rate (Standard or Enhanced).
          </p>
          <p>
            <strong className="text-foreground">
              If you disagree with the decision:
            </strong>{" "}
            You can request a Mandatory Reconsideration within one month. If you
            are still unhappy, you can appeal to an independent tribunal.
            Citizens Advice and other organisations can help you with this
            process.
          </p>
        </div>
      </section>
    </main>
  );
}
