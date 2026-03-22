import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Lightbulb,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from "lucide-react";

export function BadDayGuidePage() {
  const { t } = useLanguage();
  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">
          Assessment Guidance
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
          {t("badday.title")}
        </h1>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {t("badday.intro")}
        </p>
      </div>

      {/* Key info card */}
      <Card className="mb-8 border-primary/30 bg-primary/5">
        <CardContent className="pt-5">
          <div className="flex items-start gap-3">
            <Info
              className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-foreground mb-1">
                The PIP Assessment Standard
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                PIP is assessed on how your condition affects you on{" "}
                <strong className="text-foreground">
                  more than 50% of days
                </strong>{" "}
                — meaning your typical or average day, not your best day. If you
                have good days and bad days, describe what happens on your bad
                or typical days.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" className="space-y-3 mb-8">
        {/* Section 1 */}
        <AccordionItem
          value="why-worst-days"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle
                  className="w-4 h-4 text-primary"
                  aria-hidden="true"
                />
              </div>
              <span className="font-semibold text-foreground">
                Why Worst Days Matter
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                PIP assessors are trained to consider what your life is like on
                the majority of days — not a single snapshot. The law says an
                activity descriptor applies if it describes you on{" "}
                <strong className="text-foreground">more than 50%</strong> of
                days in a 12-month period.
              </p>
              <p>
                If your condition fluctuates — for example, you have a good week
                followed by two bad weeks — then the bad days are your typical
                reality. Describing only your good days would give an inaccurate
                picture.
              </p>
              <p>
                Many people are turned down not because their condition isn't
                severe, but because they described their best-case ability
                rather than their realistic, everyday experience.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 2 */}
        <AccordionItem
          value="typical-day"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-primary" aria-hidden="true" />
              </div>
              <span className="font-semibold text-foreground">
                What "Typical Day" Means Legally
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                The legal term used in PIP regulations is{" "}
                <em>"on the majority of days"</em>. Assessors must consider
                whether a descriptor applies on more than 50% of days in the
                relevant period (usually 12 months).
              </p>
              <p>
                This means if you have a flare-up 3 out of 5 days, or you have a
                painful morning most days, or you frequently can't complete a
                task — these <strong className="text-foreground">are</strong>{" "}
                your typical days.
              </p>
              <p>Descriptors include:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Whether you need aids, appliances, or assistive devices</li>
                <li>Whether you need prompting or supervision</li>
                <li>
                  Whether you need physical assistance from another person
                </li>
                <li>
                  Whether completing the activity causes pain, fatigue,
                  breathlessness, or takes much longer than expected
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 3 */}
        <AccordionItem
          value="honest-not-underselling"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2
                  className="w-4 h-4 text-primary"
                  aria-hidden="true"
                />
              </div>
              <span className="font-semibold text-foreground">
                Being Honest Without Underselling Yourself
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Many people with disabilities minimise their difficulties out of
                habit, pride, or because they want to appear capable. This is
                completely understandable — but it can seriously damage your PIP
                claim.
              </p>
              <p>
                Being honest means describing the{" "}
                <strong className="text-foreground">
                  full impact of your condition
                </strong>
                :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  How long it actually takes you to do something (not how long
                  it would take someone without your condition)
                </li>
                <li>Whether you need to rest before or after a task</li>
                <li>
                  Whether you attempt something but can't always finish it
                </li>
                <li>The pain, exhaustion, or anxiety it causes</li>
                <li>
                  Whether you avoid doing something because of your condition
                </li>
              </ul>
              <p>
                Describing these things accurately is not exaggerating — it is
                giving the DWP the full picture they need to make a fair
                decision.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 4 */}
        <AccordionItem
          value="practical-phrases"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare
                  className="w-4 h-4 text-primary"
                  aria-hidden="true"
                />
              </div>
              <span className="font-semibold text-foreground">
                Practical Phrases to Use
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Use these kinds of phrases to accurately describe your
                situation:
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "On most days...",
                  "I can sometimes manage, but...",
                  "It takes me much longer than usual because...",
                  "By the time I've finished, I need to rest for...",
                  "I've had to stop halfway through because...",
                  "I need someone to remind me to...",
                  "Without my [aid/medication], I would not be able to...",
                  "On a bad day, I cannot...",
                  "Even on good days, I still struggle with...",
                  "I worry that I might fall/hurt myself if I...",
                ].map((phrase) => (
                  <div
                    key={phrase}
                    className="tip-item text-foreground text-xs"
                  >
                    <MessageSquare
                      className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{phrase}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 5 */}
        <AccordionItem
          value="common-mistakes"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <XCircle
                  className="w-4 h-4 text-destructive"
                  aria-hidden="true"
                />
              </div>
              <span className="font-semibold text-foreground">
                Common Mistakes to Avoid
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <ul className="space-y-3">
              {[
                {
                  mistake: 'Saying "I can manage" without explaining the cost',
                  fix: 'Add: "...but it takes 3 times as long and leaves me exhausted for hours."',
                },
                {
                  mistake: "Describing your best day, not your typical day",
                  fix: "Ask yourself: what is true on most days, not just occasionally?",
                },
                {
                  mistake: "Forgetting to mention aids or medication",
                  fix: '"I can only do this because I use a walking frame / take strong painkillers."',
                },
                {
                  mistake: "Not mentioning the effect on your mental health",
                  fix: '"This activity makes me anxious / causes a panic attack / leads to a depressive episode."',
                },
                {
                  mistake: "Being too brief",
                  fix: "Use the extra space. More detail = fairer assessment. Attach additional sheets if needed.",
                },
                {
                  mistake: "Comparing yourself to others",
                  fix: "Compare yourself to how you were before your condition, or to how you would be without support.",
                },
              ].map((item) => (
                <li
                  key={item.mistake}
                  className="flex items-start gap-3 text-sm"
                >
                  <XCircle
                    className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {item.mistake}
                    </p>
                    <p className="text-muted-foreground mt-0.5 italic">
                      Better: {item.fix}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Section 6 */}
        <AccordionItem
          value="examples"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb
                  className="w-4 h-4 text-primary"
                  aria-hidden="true"
                />
              </div>
              <span className="font-semibold text-foreground">
                Example: Good vs. Weak Descriptions
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <p className="text-sm text-muted-foreground mb-4">
              This example is for preparing a meal (Activity 1 in the PIP
              assessment):
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-destructive/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                    <ThumbsDown className="w-4 h-4" aria-hidden="true" />
                    Weak Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "I can cook a meal but it's hard sometimes. I manage most of
                    the time."
                  </p>
                  <p className="text-xs text-destructive mt-3 font-medium">
                    Problem: Vague, focuses on what you can do, no detail on
                    frequency or impact.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-success/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-success">
                    <ThumbsUp className="w-4 h-4" aria-hidden="true" />
                    Strong Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "On most days, I can't stand at the cooker for more than 5
                    minutes due to pain and fatigue. I have to sit down between
                    tasks. It takes me over an hour to prepare a simple meal,
                    and afterwards I need to rest for 2–3 hours. About 3 days a
                    week, I'm unable to cook at all and rely on ready meals or
                    help from my carer."
                  </p>
                  <p className="text-xs text-success mt-3 font-medium">
                    Better: Specific, honest, covers frequency, time, aids, and
                    impact.
                  </p>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="section-card bg-muted/40 text-center">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Remember:{" "}
          <strong className="text-foreground">
            describing the full reality of your condition is not dishonest —
            it's what the DWP needs to make a fair decision.
          </strong>{" "}
          Take your time, be specific, and don't be afraid to use additional
          sheets of paper.
        </p>
      </div>
    </main>
  );
}
