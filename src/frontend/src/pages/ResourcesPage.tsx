import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Brain,
  Calculator,
  ExternalLink,
  FileText,
  Globe,
  Heart,
  MapPin,
  Phone,
  Scale,
  Users,
} from "lucide-react";

interface ResourceLink {
  name: string;
  url?: string;
  phone?: string;
  description: string;
}

const officialResources: ResourceLink[] = [
  {
    name: "GOV.UK — Personal Independence Payment (PIP)",
    url: "https://www.gov.uk/pip",
    description:
      "The official government page for PIP, including how to claim, eligibility, and rates.",
  },
  {
    name: "GOV.UK — PIP: How to Claim",
    url: "https://www.gov.uk/pip/how-to-claim",
    description: "Step-by-step guidance on how to start your PIP claim.",
  },
  {
    name: "GOV.UK — Mandatory Reconsideration",
    url: "https://www.gov.uk/mandatory-reconsideration",
    description: "How to challenge a PIP decision you disagree with.",
  },
  {
    name: "DWP — PIP Helpline",
    phone: "0800 917 2222",
    description:
      "Call to start your PIP claim or get help with your application. Monday–Friday, 8am–6pm.",
  },
];

const supportResources: ResourceLink[] = [
  {
    name: "Citizens Advice",
    url: "https://www.citizensadvice.org.uk",
    description:
      "Free, independent advice on benefits, including help challenging PIP decisions and completing forms.",
  },
  {
    name: "Turn2us",
    url: "https://www.turn2us.org.uk",
    description:
      "Helps people in financial hardship access welfare benefits, charitable grants, and support services.",
  },
  {
    name: "Scope",
    url: "https://www.scope.org.uk",
    description:
      "Disability equality charity providing support and information for disabled people and their families.",
  },
  {
    name: "Mind",
    url: "https://www.mind.org.uk",
    description:
      "Mental health charity providing information and support for people with mental health conditions.",
  },
  {
    name: "Benefits and Work",
    url: "https://www.benefitsandwork.co.uk",
    description:
      "Detailed guides and resources to help claimants navigate the benefits system.",
  },
];

const benefitsCalculators: ResourceLink[] = [
  {
    name: "Entitledto Benefits Calculator",
    url: "https://www.entitledto.co.uk",
    description:
      "Free online calculator that shows which benefits you may be entitled to and estimates how much you could receive.",
  },
  {
    name: "Policy in Practice — Better Off Calculator",
    url: "https://www.betteroffcalculator.co.uk",
    description:
      "Helps you understand your full benefit entitlement and how changes to your circumstances might affect your income.",
  },
  {
    name: "Turn2us Benefits Calculator",
    url: "https://benefits-calculator.turn2us.org.uk",
    description:
      "A free, anonymous calculator to find out which benefits and grants you may be eligible for.",
  },
];

const legalAidResources: ResourceLink[] = [
  {
    name: "Law Centres Network",
    url: "https://www.lawcentres.org.uk",
    description:
      "Find your nearest Law Centre for free legal advice and representation, including welfare benefits appeals.",
  },
  {
    name: "Shelter",
    url: "https://www.shelter.org.uk",
    description:
      "Free housing and homelessness advice, including how housing benefit and PIP interact with your housing situation.",
  },
  {
    name: "Age UK",
    url: "https://www.ageuk.org.uk",
    description:
      "Free advice and support for older people on benefits, including PIP, Attendance Allowance, and Pension Credit.",
  },
  {
    name: "Disability Rights UK",
    url: "https://www.disabilityrightsuk.org",
    description:
      "Information and resources on disability rights, benefits, and independent living — run by and for disabled people.",
  },
];

const disabilityCharities: ResourceLink[] = [
  {
    name: "Mencap",
    url: "https://www.mencap.org.uk",
    description:
      "Support and advice for people with a learning disability and their families, including help with benefits.",
  },
  {
    name: "Leonard Cheshire",
    url: "https://www.leonardcheshire.org",
    description:
      "Supports disabled people to live, learn, and work as independently as they choose, with practical advice on rights and benefits.",
  },
  {
    name: "RNIB (Royal National Institute of Blind People)",
    url: "https://www.rnib.org.uk",
    description:
      "Support, advice, and campaigning for people with sight loss, including guidance on claiming PIP.",
  },
  {
    name: "RNID (Royal National Institute for Deaf People)",
    url: "https://rnid.org.uk",
    description:
      "Information and support for people who are deaf or have hearing loss, including benefits advice.",
  },
  {
    name: "Cerebra",
    url: "https://cerebra.org.uk",
    description:
      "Helps children with brain conditions and their families, including a free legal rights service for benefit claims.",
  },
];

const mentalHealthResources: ResourceLink[] = [
  {
    name: "Mind",
    url: "https://www.mind.org.uk",
    description:
      "Mental health charity providing information, support, and advice for people experiencing mental health problems.",
  },
  {
    name: "Rethink Mental Illness",
    url: "https://www.rethink.org",
    description:
      "Provides expert, practical advice and information to everyone affected by severe mental illness, including benefits guidance.",
  },
  {
    name: "PAPYRUS — Prevention of Young Suicide",
    url: "https://www.papyrus-uk.org",
    phone: "0800 068 4141",
    description:
      "Confidential support and advice for young people struggling with thoughts of suicide, and those worried about them.",
  },
  {
    name: "Anxiety UK",
    url: "https://www.anxietyuk.org.uk",
    description:
      "Charity supporting people living with anxiety disorders, offering information, therapy, and a helpline.",
  },
];

const localSupportResources: ResourceLink[] = [
  {
    name: "GOV.UK — Find Your Local Council",
    url: "https://www.gov.uk/find-local-council",
    description:
      "Find your local council to access local welfare assistance, social care, and community support services.",
  },
  {
    name: "Trussell Trust — Find a Food Bank",
    url: "https://www.trusselltrust.org/get-help/find-a-foodbank/",
    description:
      "Locate your nearest food bank if you are struggling to afford food while waiting for a benefits decision.",
  },
  {
    name: "Turn2us — Local Support Finder",
    url: "https://www.turn2us.org.uk/get-support/local-support",
    description:
      "Search for local charities, support groups, and community organisations that can help with practical needs.",
  },
];

const appealResources: ResourceLink[] = [
  {
    name: "Citizens Advice — PIP Appeals Guide",
    url: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/pip-problems/challenging-a-pip-decision/",
    description:
      "Step-by-step guide to challenging a PIP decision, including mandatory reconsideration and tribunal appeals.",
  },
  {
    name: "Child Poverty Action Group (CPAG)",
    url: "https://cpag.org.uk",
    description:
      "Expert welfare rights information and resources, including detailed guidance on PIP appeals and tribunal procedures.",
  },
  {
    name: "NAWRA (National Association of Welfare Rights Advisers)",
    url: "https://www.nawra.org.uk",
    description:
      "Find a local welfare rights adviser who can provide specialist help with PIP appeals and complex benefit issues.",
  },
];

const crisisResources: ResourceLink[] = [
  {
    name: "Samaritans",
    url: "https://www.samaritans.org",
    phone: "116 123",
    description:
      "Free, confidential support for anyone in emotional distress or struggling to cope. Available 24 hours a day, 7 days a week.",
  },
  {
    name: "Mind — Crisis Support",
    url: "https://www.mind.org.uk/information-support/guides-to-support-and-services/crisis-services/",
    description:
      "Information about mental health crisis services and how to get urgent help.",
  },
  {
    name: "NHS 111",
    phone: "111",
    description:
      "Call 111 if you need urgent medical help or advice. Available 24 hours a day.",
  },
  {
    name: "Shout — Crisis Text Line",
    url: "https://giveusashout.org",
    description:
      "Text SHOUT to 85258 for free, confidential crisis support via text message, 24/7.",
  },
];

function ResourceCard({ resource }: { resource: ResourceLink }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        {resource.phone && !resource.url ? (
          <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
        ) : (
          <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {resource.url ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded inline-flex items-center gap-1"
              aria-label={`${resource.name} (opens in new tab)`}
            >
              {resource.name}
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          ) : (
            <span className="font-semibold text-sm text-foreground">
              {resource.name}
            </span>
          )}
          {resource.phone && (
            <a
              href={`tel:${resource.phone.replace(/\s/g, "")}`}
              className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Call ${resource.name} on ${resource.phone}`}
            >
              📞 {resource.phone}
            </a>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {resource.description}
        </p>
      </div>
    </div>
  );
}

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  resources: ResourceLink[];
}

function ResourceSection({ id, title, icon, resources }: SectionProps) {
  return (
    <section aria-labelledby={id} className="mb-8">
      <h2
        id={id}
        className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2"
      >
        {icon}
        {title}
      </h2>
      <div className="space-y-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.name} resource={resource} />
        ))}
      </div>
    </section>
  );
}

export function ResourcesPage() {
  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Resources & Support
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          A comprehensive list of free official and charity resources to help
          you with your PIP claim and provide wider support. All resources
          listed here are free to use.
        </p>
      </div>

      {/* Crisis Support — shown first for visibility */}
      <section aria-labelledby="crisis-support" className="mb-8">
        <div className="crisis-card">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle
              className="w-6 h-6 text-crisis flex-shrink-0"
              aria-hidden="true"
            />
            <div>
              <h2
                id="crisis-support"
                className="font-heading text-lg font-bold text-foreground"
              >
                Crisis Support
              </h2>
              <p className="text-xs text-muted-foreground">
                If you are in crisis or need urgent support, please reach out
                immediately.
              </p>
            </div>
            <Badge className="ml-auto bg-crisis/20 text-crisis border-crisis/30 hover:bg-crisis/30">
              Urgent
            </Badge>
          </div>
          <div className="space-y-3">
            {crisisResources.map((resource) => (
              <ResourceCard key={resource.name} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Official Resources */}
      <ResourceSection
        id="official-resources"
        title="Official Resources"
        icon={<Globe className="w-5 h-5 text-primary" aria-hidden="true" />}
        resources={officialResources}
      />

      {/* PIP Appeal & Mandatory Reconsideration */}
      <ResourceSection
        id="pip-appeals"
        title="PIP Appeal & Mandatory Reconsideration"
        icon={<FileText className="w-5 h-5 text-primary" aria-hidden="true" />}
        resources={appealResources}
      />

      {/* Benefits Calculators */}
      <ResourceSection
        id="benefits-calculators"
        title="Benefits Calculators"
        icon={
          <Calculator className="w-5 h-5 text-primary" aria-hidden="true" />
        }
        resources={benefitsCalculators}
      />

      {/* Support Organisations */}
      <ResourceSection
        id="support-organisations"
        title="Support Organisations"
        icon={<Heart className="w-5 h-5 text-primary" aria-hidden="true" />}
        resources={supportResources}
      />

      {/* Legal Aid & Welfare Rights */}
      <ResourceSection
        id="legal-aid"
        title="Legal Aid & Welfare Rights"
        icon={<Scale className="w-5 h-5 text-primary" aria-hidden="true" />}
        resources={legalAidResources}
      />

      {/* Disability Charities & Advocacy */}
      <ResourceSection
        id="disability-charities"
        title="Disability Charities & Advocacy"
        icon={<Users className="w-5 h-5 text-primary" aria-hidden="true" />}
        resources={disabilityCharities}
      />

      {/* Mental Health Support */}
      <ResourceSection
        id="mental-health"
        title="Mental Health Support"
        icon={<Brain className="w-5 h-5 text-primary" aria-hidden="true" />}
        resources={mentalHealthResources}
      />

      {/* Local & Practical Support */}
      <ResourceSection
        id="local-support"
        title="Local & Practical Support"
        icon={<MapPin className="w-5 h-5 text-primary" aria-hidden="true" />}
        resources={localSupportResources}
      />

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Disclaimer:</strong> The links
          above are provided for information only. PIP Prep Tool is not
          affiliated with any of these organisations. Always verify information
          directly with the relevant organisation. Links were correct at the
          time of publication but may change.
        </p>
      </div>
    </main>
  );
}
