import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Phone,
  Scale,
} from "lucide-react";

export function AppealsPage() {
  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">
          <Scale className="w-3 h-3 mr-1.5" aria-hidden="true" />
          Your Rights
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Appealing a PIP Decision
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          A PIP refusal or lower-than-expected award is very common — it does{" "}
          <strong>not</strong> mean you are not entitled. Many people
          successfully challenge decisions at review or tribunal.
        </p>
      </div>

      {/* Disclaimer */}
      <Alert className="mb-8 border-warning/50 bg-warning/10">
        <AlertTriangle className="h-4 w-4 text-warning" aria-hidden="true" />
        <AlertDescription className="text-sm leading-relaxed">
          <strong>Important:</strong> This guide is for information only and is
          not legal advice. Seek support from{" "}
          <a
            href="https://www.citizensadvice.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Citizens Advice
          </a>{" "}
          or a welfare rights adviser before appealing.
        </AlertDescription>
      </Alert>

      {/* Steps overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            step: "1",
            title: "Mandatory Reconsideration",
            desc: "Request a review within 28 days",
          },
          {
            step: "2",
            title: "Tribunal Appeal",
            desc: "Independent judge reviews your case",
          },
          {
            step: "3",
            title: "Success",
            desc: "~68% of tribunal appeals succeed",
          },
        ].map((item) => (
          <div key={item.step} className="section-card flex items-start gap-3">
            <span
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              {item.step}
            </span>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Accordion sections */}
      <Accordion type="multiple" className="space-y-3">
        <AccordionItem
          value="mr"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="font-semibold text-foreground text-left flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                1
              </span>
              Step 1: Mandatory Reconsideration
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">
                  Mandatory Reconsideration (MR)
                </strong>{" "}
                is the first step — you must do this before you can appeal to a
                tribunal. You are asking the DWP to look at your case again.
              </p>
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <p className="font-semibold text-foreground text-xs uppercase tracking-wide mb-1">
                  ⏰ Deadline
                </p>
                <p>
                  You have <strong className="text-foreground">28 days</strong>{" "}
                  from the date on your decision letter to request a Mandatory
                  Reconsideration. After 28 days you may lose the right to
                  challenge.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">
                  How to request:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong>Phone:</strong> Call DWP PIP on{" "}
                    <a
                      href="tel:08001214433"
                      className="text-primary underline"
                    >
                      0800 121 4433
                    </a>{" "}
                    — tell them you want to request a Mandatory Reconsideration
                  </li>
                  <li>
                    <strong>In writing:</strong> Write a letter clearly
                    requesting MR and send it to the address on your decision
                    letter
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">
                  What to include:
                </p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>
                    A written statement explaining why you disagree with the
                    decision
                  </li>
                  <li>
                    Any new medical evidence — GP letters, specialist reports,
                    carer statements
                  </li>
                  <li>
                    Details of how your condition affects each PIP activity on a
                    typical or bad day
                  </li>
                </ul>
              </div>
              <p>
                The DWP aims to complete MR within 6 weeks, but it can take
                longer. They will write to you with a Mandatory Reconsideration
                Notice.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="tribunal"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="font-semibold text-foreground text-left flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                2
              </span>
              Step 2: Tribunal Appeal
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                If your MR is unsuccessful, you can appeal to the{" "}
                <strong className="text-foreground">
                  Social Security and Child Support (SSCS) Tribunal
                </strong>{" "}
                — an independent court. An independent judge (and sometimes
                panel members) will review your case.
              </p>
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <p className="font-semibold text-foreground text-xs uppercase tracking-wide mb-1">
                  ⏰ Deadline
                </p>
                <p>
                  You have <strong className="text-foreground">28 days</strong>{" "}
                  from the date of your Mandatory Reconsideration Notice to
                  submit your tribunal appeal.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">
                  How to appeal:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    Complete form <strong>SSCS1</strong> — available from HM
                    Courts &amp; Tribunals Service
                  </li>
                  <li>Attach your Mandatory Reconsideration Notice</li>
                  <li>Submit online or by post to HMCTS</li>
                  <li>
                    <a
                      href="https://www.gov.uk/appeal-benefit-decision"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline inline-flex items-center gap-1"
                    >
                      Appeal online at GOV.UK{" "}
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
              <p>
                The tribunal is{" "}
                <strong className="text-foreground">independent</strong> of the
                DWP. The judge does not work for the government. Waiting times
                vary but can be 6–18 months.
              </p>
              <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                <p className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <CheckCircle
                    className="w-4 h-4 text-success"
                    aria-hidden="true"
                  />
                  Most appeals that reach tribunal succeed
                </p>
                <p className="text-sm mt-1">
                  Approximately 68% of PIP tribunal appeals are decided in the
                  claimant's favour. Do not give up because the DWP refused your
                  claim.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="preparation"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="font-semibold text-foreground text-left">
              Preparing Your Case
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Strong evidence is the most important factor in a successful
                appeal. Gather as much as you can:
              </p>
              <ul className="space-y-2">
                {[
                  "GP letter describing your condition and its functional impact",
                  "Specialist consultant reports or letters",
                  "Occupational therapist assessments",
                  "Social worker reports or care assessments",
                  "Carer or family member supporting statements describing what they help you with",
                  "Prescription records showing your medication",
                  "Hospital appointment letters and discharge summaries",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle
                      className="w-4 h-4 text-success flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-accent rounded-lg p-4">
                <p className="font-semibold text-foreground mb-1">
                  Get support
                </p>
                <p>
                  A Citizens Advice adviser or welfare rights officer can help
                  you prepare your case for free. They know the system and can
                  dramatically improve your chances of success.
                </p>
              </div>
              <p>
                You can bring someone with you to the tribunal hearing — a
                friend, family member, or support worker. You can also ask for a
                written hearing if attending in person is difficult.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="deadlines"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="font-semibold text-foreground text-left">
              Important Deadlines
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: "Request MR",
                    days: "28 days",
                    desc: "from your PIP decision letter date",
                  },
                  {
                    title: "Tribunal appeal",
                    days: "28 days",
                    desc: "from your MR Notice date",
                  },
                  {
                    title: "MR decision",
                    days: "~6 weeks",
                    desc: "for DWP to respond (can be longer)",
                  },
                  {
                    title: "Tribunal wait",
                    days: "6–18 months",
                    desc: "typical waiting time",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-muted/40 rounded-lg p-3">
                    <p className="font-semibold text-foreground text-sm">
                      {item.title}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {item.days}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="pt-2">
                Use the{" "}
                <Link
                  to="/dates"
                  className="text-primary underline inline-flex items-center gap-1"
                >
                  Dates &amp; Deadlines tool{" "}
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>{" "}
                to track your specific deadlines and set reminders.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="success"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="font-semibold text-foreground text-left">
              Success Rates
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                <p className="text-3xl font-bold text-success mb-1">68%</p>
                <p>
                  of PIP tribunal appeals are decided in the claimant's favour
                  (HMCTS statistics, 2023).
                </p>
              </div>
              <p>
                This means that if you believe the DWP got it wrong, you have a{" "}
                <strong className="text-foreground">
                  better than even chance
                </strong>{" "}
                of winning at tribunal. The key reasons people win:
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  New evidence submitted that wasn't in the original assessment
                </li>
                <li>Assessor made errors in the report</li>
                <li>
                  The person could better explain the impact of their condition
                  in person
                </li>
                <li>
                  Representation from Citizens Advice or a welfare rights worker
                </li>
              </ul>
              <p className="font-medium text-foreground">
                Don't give up. A refusal is not the end.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="contacts"
          className="section-card px-0 py-0 overflow-hidden"
        >
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="font-semibold text-foreground text-left">
              Useful Contacts &amp; Resources
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-3">
              {[
                {
                  name: "Citizens Advice",
                  phone: "0800 144 8848",
                  desc: "Free help with benefits, appeals, and legal rights",
                  url: "https://www.citizensadvice.org.uk",
                },
                {
                  name: "DIAL UK",
                  phone: null,
                  desc: "Disability information and advice line",
                  url: "https://www.dialuk.info",
                },
                {
                  name: "Welfare Rights",
                  phone: null,
                  desc: "Local welfare rights services — search via your council",
                  url: "https://www.gov.uk/find-local-council",
                },
                {
                  name: "Appeal Online (GOV.UK)",
                  phone: null,
                  desc: "Submit your SSCS1 tribunal appeal form online",
                  url: "https://www.gov.uk/appeal-benefit-decision",
                },
              ].map((contact) => (
                <div
                  key={contact.name}
                  className="flex items-start gap-3 bg-muted/40 rounded-lg p-3"
                >
                  <Phone
                    className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {contact.name}
                    </p>
                    {contact.phone && (
                      <p className="text-sm">
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, "")}`}
                          className="text-primary underline"
                        >
                          {contact.phone}
                        </a>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {contact.desc}
                    </p>
                    <a
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline inline-flex items-center gap-1 mt-0.5"
                    >
                      Visit website{" "}
                      <ExternalLink
                        className="w-2.5 h-2.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link to="/dates">
            <ArrowRight className="w-4 h-4 mr-2" aria-hidden="true" />
            Track Your Deadlines
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/resources">More Support Resources</Link>
        </Button>
      </div>
    </main>
  );
}
