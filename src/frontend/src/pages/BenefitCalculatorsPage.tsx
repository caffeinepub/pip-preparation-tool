import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Info } from "lucide-react";

const calculators = [
  {
    name: "Turn2us Benefits Calculator",
    url: "https://www.turn2us.org.uk/get-support/tools-and-support/benefits-calculator",
    description:
      "Free, anonymous benefits checker that searches all benefits including PIP, Universal Credit, and housing support.",
    helps: "Check all benefits you may be entitled to",
  },
  {
    name: "EntitledTo",
    url: "https://www.entitledto.co.uk",
    description:
      "Comprehensive benefits calculator used by over a million people each year. Covers all major UK welfare benefits.",
    helps: "Full benefits entitlement overview",
  },
  {
    name: "Policy in Practice – Better Off Calculator",
    url: "https://www.betteroffcalculator.co.uk",
    description:
      "Detailed income and benefits breakdown to show your full financial picture, including the impact of working.",
    helps: "Understand income and benefit interactions",
  },
  {
    name: "Citizens Advice Benefits Calculator",
    url: "https://www.citizensadvice.org.uk/benefits/",
    description:
      "Trusted benefits guidance from Citizens Advice. Includes tools to check eligibility and advice on claiming.",
    helps: "Trusted advice and eligibility guidance",
  },
  {
    name: "GOV.UK Benefit Cap Calculator",
    url: "https://www.gov.uk/benefit-cap-calculator",
    description:
      "The official government tool to check if the benefit cap applies to your household.",
    helps: "Check if the benefit cap affects you",
  },
  {
    name: "Age UK Benefits Calculator",
    url: "https://www.ageuk.org.uk/information-advice/money-legal/benefits-entitlements/",
    description:
      "Benefits information and tools specifically tailored for older adults, including Attendance Allowance and Pension Credit.",
    helps: "Benefits guidance for older adults",
  },
];

export function BenefitCalculatorsPage() {
  return (
    <main id="main-content" className="flex-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Benefit Calculators &amp; Tools
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Use these trusted tools to check what benefits you may be entitled
            to alongside PIP. All tools are free and anonymous.
          </p>
        </div>

        {/* Disclaimer */}
        <div
          className="flex items-start gap-3 bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8"
          role="note"
        >
          <Info
            className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-sm text-primary">
            These are external tools. PIP Prep Tool is not affiliated with any
            of them. Always verify calculations with a qualified welfare
            advisor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.map((calc, idx) => (
            <Card
              key={calc.url}
              className="flex flex-col hover:shadow-md transition-shadow"
              data-ocid={`calculators.item.${idx + 1}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base leading-snug">
                  {calc.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {calc.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 mt-auto space-y-3">
                <div className="text-xs text-muted-foreground bg-muted/40 rounded px-2 py-1">
                  ✓ {calc.helps}
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-full gap-2"
                  data-ocid="calculators.button"
                >
                  <a
                    href={calc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${calc.name} (opens in new tab)`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    Visit Tool
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
