import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ClipboardList,
  FileText,
  Phone,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Step-by-Step Checklist",
    description:
      "Track your progress through the PIP claim process with a clear, ordered checklist.",
    to: "/checklist",
  },
  {
    icon: FileText,
    title: "Form Preparation",
    description:
      "Draft your answers to all 12 PIP2 activity areas with plain-English guidance and tips.",
    to: "/form-preparation",
  },
  {
    icon: CheckCircle,
    title: "Evidence Helper",
    description:
      "Know exactly what evidence to gather and keep track of your documents.",
    to: "/evidence-helper",
  },
  {
    icon: BookOpen,
    title: "Assessment Guide",
    description:
      "Understand what to expect at your assessment and how to prepare effectively.",
    to: "/assessment-guide",
  },
];

export function HomePage() {
  return (
    <main id="main-content" className="flex-1">
      {/* Hero Section */}
      <section
        className="relative bg-primary overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-banner.dim_1200x400.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider mb-3">
              PIP Preparation Tool
            </p>
            <h1
              id="hero-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight"
            >
              Prepare Your PIP Claim with Confidence
            </h1>
            <p className="text-primary-foreground/90 text-lg sm:text-xl mb-8 leading-relaxed">
              A free, private tool to help you gather information, draft your
              answers, and prepare for your Personal Independence Payment
              assessment — all saved securely on your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-base px-8"
              >
                <Link to="/checklist">
                  Start Preparing Your Claim
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-medium"
              >
                <Link to="/resources">View Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 py-6"
        aria-label="Important disclaimer"
      >
        <Alert className="border-warning/50 bg-warning/10">
          <AlertTriangle
            className="h-5 w-5 text-warning-foreground"
            aria-hidden="true"
          />
          <AlertTitle className="text-warning-foreground font-semibold text-base">
            Important: Please Read Before Using This Tool
          </AlertTitle>
          <AlertDescription className="text-warning-foreground/90 mt-1 leading-relaxed">
            <strong>This tool is for preparation only.</strong> It is not
            affiliated with the UK government or the Department for Work and
            Pensions (DWP). This app does not submit your claim or guarantee an
            award.{" "}
            <strong>
              To start your PIP claim, you must call the DWP on{" "}
              <a
                href="tel:08009172222"
                className="underline font-bold hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                aria-label="Call DWP on 0800 917 2222"
              >
                0800 917 2222
              </a>
            </strong>
            . Lines are open Monday to Friday, 8am to 6pm.
          </AlertDescription>
        </Alert>
      </section>

      {/* How to Start Your Claim */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-8"
        aria-labelledby="how-to-start"
      >
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="how-to-start"
              className="font-semibold text-foreground text-base mb-1"
            >
              Step 1: Call the DWP to Start Your Claim
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Before using this tool, you need to call the DWP on{" "}
              <a
                href="tel:08009172222"
                className="text-primary font-semibold underline hover:no-underline"
              >
                0800 917 2222
              </a>{" "}
              to request the PIP2 form. This tool will then help you prepare
              your answers before you complete and return the form.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-12"
        aria-labelledby="features-heading"
      >
        <h2
          id="features-heading"
          className="font-heading text-2xl font-bold text-foreground mb-2"
        >
          What This Tool Helps You Do
        </h2>
        <p className="text-muted-foreground mb-6">
          Everything you need to prepare a thorough, well-evidenced PIP claim —
          all in one place.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.to}
                className="hover:shadow-card transition-shadow group"
              >
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  <Link
                    to={feature.to}
                    className="text-sm text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    aria-label={`Go to ${feature.title}`}
                  >
                    Get started{" "}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Privacy Assurance */}
      <section
        className="bg-secondary/50 border-t border-border"
        aria-labelledby="privacy-assurance"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle
                className="w-5 h-5 text-success"
                aria-hidden="true"
              />
            </div>
            <div>
              <h2
                id="privacy-assurance"
                className="font-semibold text-foreground text-lg mb-2"
              >
                Your Data Stays on Your Device
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                This tool does not require an account or login. All your
                answers, checklist progress, and document notes are saved only
                in your browser's local storage — they never leave your device
                and are never sent to any server. You can clear your data at any
                time.{" "}
                <Link
                  to="/privacy"
                  className="text-primary underline hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                >
                  Read our Privacy Notice
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
