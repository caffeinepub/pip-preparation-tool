import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { HelpCircle, Phone } from "lucide-react";

const faqs = [
  {
    id: "what-is-pip",
    question: "What is PIP?",
    answer:
      "PIP (Personal Independence Payment) is a benefit provided by the UK government to help with the extra costs of living with a long-term physical or mental health condition or disability. It is not means-tested, so your income or savings do not affect your eligibility. PIP is awarded in two components — Daily Living and Mobility — each at either a standard or enhanced rate.",
  },
  {
    id: "how-to-start",
    question: "How do I start a PIP claim?",
    answer:
      "You start your PIP claim by calling the Department for Work and Pensions (DWP) on 0800 917 2222 (Monday to Friday, 8am–6pm). This call is free. You cannot start a PIP claim online. After your call, the DWP will send you a PIP2 form — 'How your disability affects you' — which you must complete and return within the given deadline.",
  },
  {
    id: "after-call",
    question: "What happens after I call the DWP?",
    answer:
      "After your call, the DWP will send you the PIP2 form in the post. You typically have around 4 weeks (1 month) to complete and return it. Use this app to prepare your answers before filling in the official form. After they receive your form, they will arrange a healthcare assessment — either face-to-face, by phone, or by video call.",
  },
  {
    id: "pip2-form",
    question: "What is the PIP2 form?",
    answer:
      "The PIP2 form is called 'How your disability affects you.' It asks you about 12 activity areas across Daily Living (such as preparing food, washing, dressing, and communicating) and 2 Mobility activities (planning a journey and moving around). You describe how your condition affects your ability to carry out these activities on a typical day. The answers you give — along with any evidence you provide — form the basis of your PIP claim.",
  },
  {
    id: "assessment",
    question: "What happens at a PIP assessment?",
    answer:
      "A healthcare professional (employed by an assessment provider, not the DWP) will ask you questions about how your condition affects your daily life. They base their questions on the same activity areas as the PIP2 form. The assessment is not a medical examination — they are assessing your functional ability. The assessor writes a report and sends it to the DWP, who then makes the final decision. Assessments can be face-to-face, over the phone, or by video call.",
  },
  {
    id: "bring-someone",
    question: "Can I bring someone to my assessment?",
    answer:
      "Yes. You can bring a friend, family member, or carer to your PIP assessment for support. They can help you answer questions and take notes. You can also ask for the assessment to be recorded — you must request this in advance. Having support at your assessment is completely allowed and can be very helpful.",
  },
  {
    id: "how-long",
    question: "How long does a PIP claim take?",
    answer:
      "PIP claims typically take 12–20 weeks from your initial call to receiving a decision, though times vary. The DWP has been experiencing delays, and some claimants wait longer. You can check your claim status by calling the DWP PIP enquiry line on 0800 121 4433. If you are terminally ill, your claim is processed urgently under the Special Rules.",
  },
  {
    id: "turned-down",
    question: "What if I'm turned down?",
    answer:
      "If your claim is refused or you disagree with the rate awarded, do not give up. You have the right to request a Mandatory Reconsideration — a review of the decision by a different DWP decision maker. Statistics show that a significant proportion of decisions are changed at Mandatory Reconsideration or appeal. Citizens Advice or a local welfare rights organisation can help you challenge the decision.",
  },
  {
    id: "mandatory-reconsideration",
    question: "What is mandatory reconsideration?",
    answer:
      "Mandatory Reconsideration (MR) is the first stage of challenging a PIP decision. You must request it within 1 month of receiving your decision letter. A different DWP decision maker reviews your case. You can provide additional evidence at this stage. If the decision is not changed to your satisfaction, you can then appeal to an independent tribunal. Always request MR in writing and keep a copy.",
  },
  {
    id: "appeal",
    question: "Can I appeal if mandatory reconsideration fails?",
    answer:
      "Yes. If you are still unhappy after Mandatory Reconsideration, you can appeal to the Social Security and Child Support Tribunal, which is independent of the DWP. You must appeal within 1 month of receiving your MR decision. Tribunal appeals are heard by an independent panel and have a high success rate — approximately 68% of PIP tribunal appeals succeed. Free legal advice is available from Citizens Advice and other organisations.",
  },
  {
    id: "working",
    question: "Can I claim PIP if I'm working?",
    answer:
      "Yes. PIP is not affected by whether you are working or not. It is based entirely on how your condition affects your daily living and mobility — not your employment status or income. You can be in full-time work and still be entitled to PIP if your condition has a significant impact on your daily life.",
  },
  {
    id: "other-benefits",
    question: "Does PIP affect other benefits?",
    answer:
      "Receiving PIP does not reduce most other benefits — it can actually increase them. For example, receiving the PIP Daily Living component may make you eligible for a higher rate of Universal Credit or the disability premiums within other legacy benefits. Receiving PIP Mobility at the enhanced rate automatically qualifies you for a Motability vehicle. Always check with a benefits adviser to understand the full impact on your personal situation.",
  },
  {
    id: "fluctuating",
    question: "What if my condition fluctuates?",
    answer:
      "Fluctuating conditions are specifically recognised in PIP rules. If a descriptor applies on more than 50% of days in a year, it counts for PIP purposes. This means you should describe your bad days and flare-ups, not just your best days. Keep a diary of your symptoms to help demonstrate the variability of your condition, and include this evidence with your claim.",
  },
  {
    id: "what-counts",
    question: "What counts as a disability for PIP?",
    answer:
      "PIP is not limited to physical disabilities. Any long-term condition (expected to last at least 12 months) that affects your daily living or mobility activities can qualify. This includes mental health conditions, neurodevelopmental conditions like autism and ADHD, chronic pain and fatigue conditions, neurological conditions, and more. The key is the functional impact, not the diagnosis.",
  },
  {
    id: "reviews",
    question: "How often is PIP reviewed?",
    answer:
      "PIP awards are reviewed periodically — the frequency depends on your individual award. Reviews can be every 2 years, every 5 years, or in some cases be awarded with a longer ongoing period. When a review comes up, you will receive a form asking you to describe how your condition currently affects you. The tips and guidance in this app apply equally to PIP reviews as to new claims.",
  },
];

export function FAQPage() {
  const { t } = useLanguage();
  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">
          {faqs.length} Questions Answered
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
          {t("faq.title")}
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          {t("faq.intro")}
        </p>
      </div>

      {/* Call to action */}
      <Card className="mb-8 border-primary/30 bg-primary/5">
        <CardContent className="pt-5">
          <div className="flex items-start gap-3">
            <Phone
              className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-foreground mb-1">
                To start your claim: call the DWP
              </p>
              <p className="text-sm text-muted-foreground">
                Call{" "}
                <a
                  href="tel:08009172222"
                  className="text-primary font-semibold underline hover:no-underline"
                >
                  0800 917 2222
                </a>{" "}
                (Monday–Friday, 8am–6pm, free to call). This tool helps you
                prepare — it does not submit your claim.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" className="space-y-3" data-ocid="faq.panel">
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="section-card px-0 py-0 overflow-hidden"
            data-ocid={`faq.item.${idx + 1}`}
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
              <div className="flex items-start gap-3">
                <HelpCircle
                  className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="font-semibold text-foreground">
                  {faq.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5">
              <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 section-card bg-muted/40 text-center">
        <p className="text-sm text-muted-foreground">
          Can't find the answer you're looking for?{" "}
          <a
            href="https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            Citizens Advice has detailed PIP guidance
          </a>
          .
        </p>
      </div>
    </main>
  );
}
