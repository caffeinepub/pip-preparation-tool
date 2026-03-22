import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Info, Play } from "lucide-react";

const videos = [
  {
    title: "Understanding PIP: An Overview",
    description:
      "A general introduction to Personal Independence Payment — what it is, who can apply, and what it covers.",
    url: "https://www.youtube.com/results?search_query=pip+personal+independence+payment+explained+uk",
    tag: "Getting Started",
  },
  {
    title: "How to Fill In the PIP2 Form",
    description:
      "Step-by-step guidance on completing the PIP2 form, with tips on how to describe your conditions clearly.",
    url: "https://www.youtube.com/results?search_query=how+to+fill+in+pip2+form+uk",
    tag: "PIP2 Form",
  },
  {
    title: "What Happens at a PIP Assessment",
    description:
      "What to expect before, during, and after your PIP assessment, including how to prepare.",
    url: "https://www.youtube.com/results?search_query=pip+assessment+what+to+expect+uk",
    tag: "Assessment",
  },
  {
    title: "How to Appeal a PIP Decision",
    description:
      "Guidance on mandatory reconsideration and tribunal appeals if your PIP claim is refused or you receive a lower award.",
    url: "https://www.youtube.com/results?search_query=pip+mandatory+reconsideration+appeal+uk",
    tag: "Appeals",
  },
  {
    title: "Describing Your Condition on a Bad Day",
    description:
      "How to use the 'bad day rule' effectively when describing your condition on the PIP form and at assessment.",
    url: "https://www.youtube.com/results?search_query=pip+bad+day+rule+explained+uk",
    tag: "Tips",
  },
  {
    title: "PIP for Mental Health Conditions",
    description:
      "Specific guidance for claimants with mental health conditions — what descriptors apply and how to evidence them.",
    url: "https://www.youtube.com/results?search_query=pip+mental+health+uk+2024",
    tag: "Mental Health",
  },
];

export function VideoGuidancePage() {
  return (
    <main id="main-content" className="flex-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Video Guidance
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Curated video guides to help you understand PIP and prepare your
            claim. Click a card to search for relevant videos on YouTube.
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
            These are YouTube search links. We are not affiliated with any
            channel. Always check videos are up to date and published by a
            trusted organisation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Card
              key={video.url}
              className="flex flex-col hover:shadow-md transition-shadow"
              data-ocid="video.card"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs whitespace-nowrap"
                  >
                    {video.tag}
                  </Badge>
                </div>
                <CardTitle className="text-base leading-snug mt-2">
                  {video.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {video.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 mt-auto">
                <Button
                  asChild
                  size="sm"
                  className="w-full gap-2"
                  data-ocid="video.button"
                >
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch on YouTube: ${video.title} (opens in new tab)`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    Watch on YouTube
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
