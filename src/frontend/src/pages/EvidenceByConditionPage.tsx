import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FileCheck, Printer } from "lucide-react";

const conditions = [
  "Depression",
  "Anxiety",
  "PTSD",
  "Schizophrenia",
  "Bipolar Disorder",
  "OCD",
  "Personality Disorders",
  "Autism (ASD)",
  "ADHD",
  "Dyspraxia",
  "Fibromyalgia",
  "ME/CFS",
  "Chronic Pain",
  "Chronic Fatigue Syndrome",
  "MS (Multiple Sclerosis)",
  "Epilepsy",
  "Cerebral Palsy",
  "Parkinson's Disease",
  "Stroke Effects",
  "Dementia / Memory Conditions",
  "Rheumatoid Arthritis",
  "Osteoarthritis",
  "Back Conditions",
  "Joint Hypermobility (EDS/HSD)",
  "Crohn's Disease",
  "IBD / IBS",
  "Diabetes Complications",
  "Visual Impairment",
  "Hearing Impairment",
  "Deafblindness",
  "COPD",
  "Asthma",
  "Heart Conditions",
  "Cancer",
  "Kidney Disease",
  "Mobility / Wheelchair Users",
  "Lupus (SLE)",
  "Learning Disabilities",
];

interface EvidenceItem {
  id: string;
  label: string;
  conditions: string[];
}

const evidenceItems: EvidenceItem[] = [
  {
    id: "gp-letter",
    label: "GP letter confirming your diagnosis and its impact on daily life",
    conditions: conditions,
  },
  {
    id: "specialist-letter",
    label:
      "Specialist consultant or hospital letter (e.g. neurologist, rheumatologist, psychiatrist)",
    conditions: [
      "MS (Multiple Sclerosis)",
      "Epilepsy",
      "Parkinson's Disease",
      "Stroke Effects",
      "Dementia / Memory Conditions",
      "Rheumatoid Arthritis",
      "Lupus (SLE)",
      "Heart Conditions",
      "Cancer",
      "Kidney Disease",
      "Crohn's Disease",
      "IBD / IBS",
      "COPD",
      "Diabetes Complications",
      "Visual Impairment",
      "Hearing Impairment",
      "Deafblindness",
      "Fibromyalgia",
      "Cerebral Palsy",
      "Joint Hypermobility (EDS/HSD)",
    ],
  },
  {
    id: "psychiatric-report",
    label: "Psychiatric or psychology assessment report",
    conditions: [
      "Depression",
      "Anxiety",
      "PTSD",
      "Schizophrenia",
      "Bipolar Disorder",
      "OCD",
      "Personality Disorders",
      "Autism (ASD)",
      "ADHD",
    ],
  },
  {
    id: "cpn-letter",
    label:
      "CPN (Community Psychiatric Nurse) or community mental health team letter",
    conditions: [
      "Depression",
      "Anxiety",
      "PTSD",
      "Schizophrenia",
      "Bipolar Disorder",
      "OCD",
      "Personality Disorders",
    ],
  },
  {
    id: "crisis-records",
    label:
      "Crisis team records or hospital admission records for mental health",
    conditions: [
      "Depression",
      "Anxiety",
      "PTSD",
      "Schizophrenia",
      "Bipolar Disorder",
      "OCD",
      "Personality Disorders",
    ],
  },
  {
    id: "care-plan",
    label:
      "Care plan or support plan from your care coordinator or social worker",
    conditions: [
      "Depression",
      "Anxiety",
      "PTSD",
      "Schizophrenia",
      "Bipolar Disorder",
      "Autism (ASD)",
      "ADHD",
      "Dementia / Memory Conditions",
      "Learning Disabilities",
      "Cerebral Palsy",
    ],
  },
  {
    id: "medication-list",
    label: "Full medication list including dosages and side effects",
    conditions: conditions,
  },
  {
    id: "physio-report",
    label: "Physiotherapy assessment or treatment report",
    conditions: [
      "Rheumatoid Arthritis",
      "Osteoarthritis",
      "Back Conditions",
      "Fibromyalgia",
      "MS (Multiple Sclerosis)",
      "Cerebral Palsy",
      "Parkinson's Disease",
      "Stroke Effects",
      "Mobility / Wheelchair Users",
      "Joint Hypermobility (EDS/HSD)",
      "Chronic Pain",
    ],
  },
  {
    id: "ot-assessment",
    label: "Occupational therapy (OT) assessment report",
    conditions: [
      "Rheumatoid Arthritis",
      "Osteoarthritis",
      "Back Conditions",
      "MS (Multiple Sclerosis)",
      "Cerebral Palsy",
      "Parkinson's Disease",
      "Stroke Effects",
      "Mobility / Wheelchair Users",
      "Dementia / Memory Conditions",
      "Learning Disabilities",
      "Autism (ASD)",
      "ADHD",
    ],
  },
  {
    id: "mobility-aids",
    label:
      "Prescription or documentation for mobility aids, equipment, or adaptations",
    conditions: [
      "MS (Multiple Sclerosis)",
      "Cerebral Palsy",
      "Parkinson's Disease",
      "Stroke Effects",
      "Rheumatoid Arthritis",
      "Osteoarthritis",
      "Back Conditions",
      "Mobility / Wheelchair Users",
      "Fibromyalgia",
    ],
  },
  {
    id: "hospital-discharge",
    label: "Hospital discharge summaries or admission records",
    conditions: [
      "Heart Conditions",
      "Cancer",
      "Kidney Disease",
      "Crohn's Disease",
      "COPD",
      "Epilepsy",
      "Stroke Effects",
      "MS (Multiple Sclerosis)",
      "IBD / IBS",
    ],
  },
  {
    id: "cognitive-assessment",
    label: "Cognitive or neuropsychological assessment report",
    conditions: [
      "Dementia / Memory Conditions",
      "Stroke Effects",
      "Autism (ASD)",
      "ADHD",
      "Learning Disabilities",
      "Dyspraxia",
    ],
  },
  {
    id: "educational-psych",
    label:
      "Educational psychology report or EHCP (Education, Health and Care Plan)",
    conditions: ["Autism (ASD)", "ADHD", "Dyspraxia", "Learning Disabilities"],
  },
  {
    id: "school-work-support",
    label: "School, college, or workplace support records",
    conditions: ["Autism (ASD)", "ADHD", "Dyspraxia", "Learning Disabilities"],
  },
  {
    id: "ophthalmology-report",
    label: "Ophthalmology report or visual acuity records",
    conditions: ["Visual Impairment", "Deafblindness"],
  },
  {
    id: "audiology-report",
    label: "Audiology report and hearing test results",
    conditions: ["Hearing Impairment", "Deafblindness"],
  },
  {
    id: "aids-adaptations",
    label:
      "Documentation of sensory aids (hearing aids, white cane, communication aids)",
    conditions: ["Visual Impairment", "Hearing Impairment", "Deafblindness"],
  },
  {
    id: "test-results",
    label: "Relevant test results (blood tests, scans, ECG, spirometry etc.)",
    conditions: [
      "Diabetes Complications",
      "COPD",
      "Asthma",
      "Heart Conditions",
      "Crohn's Disease",
      "IBD / IBS",
      "Kidney Disease",
      "Lupus (SLE)",
      "Rheumatoid Arthritis",
    ],
  },
  {
    id: "carer-letter",
    label:
      "Letter from a carer, family member, or support worker describing how they help you",
    conditions: conditions,
  },
];

export function EvidenceByConditionPage() {
  const [selectedConditions, setSelectedConditions] = useLocalStorage<string[]>(
    "pip-evidence-selected-conditions",
    [],
  );
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    "pip-evidence-checklist",
    {},
  );

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
  };

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const relevantItems = evidenceItems.filter((item) =>
    selectedConditions.some((c) => item.conditions.includes(c)),
  );

  const checkedCount = relevantItems.filter((item) => checked[item.id]).length;

  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Badge variant="secondary" className="mb-3">
              38+ Conditions
            </Badge>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Evidence Checklist by Condition
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Select your condition(s) below to see a personalised list of
              evidence you should try to gather for your PIP claim.
            </p>
          </div>
          {relevantItems.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="flex items-center gap-2 print:hidden flex-shrink-0"
              data-ocid="evidence.primary_button"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              Print Checklist
            </Button>
          )}
        </div>
      </div>

      {/* Condition selector */}
      <section
        className="section-card mb-6"
        aria-labelledby="conditions-heading"
      >
        <h2
          id="conditions-heading"
          className="font-heading font-bold text-foreground text-base mb-4"
        >
          Step 1: Select your condition(s)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center gap-2">
              <Checkbox
                id={`cond-${condition}`}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={() => toggleCondition(condition)}
                data-ocid="evidence.checkbox"
              />
              <Label
                htmlFor={`cond-${condition}`}
                className="text-sm cursor-pointer leading-snug"
              >
                {condition}
              </Label>
            </div>
          ))}
        </div>
        {selectedConditions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {selectedConditions.map((c) => (
              <Badge key={c} variant="secondary" className="text-xs">
                {c}
              </Badge>
            ))}
          </div>
        )}
      </section>

      {/* Evidence checklist */}
      {selectedConditions.length === 0 ? (
        <div
          className="section-card text-center py-10 text-muted-foreground"
          data-ocid="evidence.empty_state"
        >
          <FileCheck
            className="w-10 h-10 mx-auto mb-3 opacity-30"
            aria-hidden="true"
          />
          <p className="font-medium">Select one or more conditions above</p>
          <p className="text-sm mt-1">
            Your personalised evidence checklist will appear here.
          </p>
        </div>
      ) : (
        <section aria-labelledby="checklist-heading">
          <div className="flex items-center justify-between mb-4">
            <h2
              id="checklist-heading"
              className="font-heading font-bold text-foreground text-base"
            >
              Step 2: Your Evidence Checklist
            </h2>
            <span className="text-sm text-muted-foreground">
              {checkedCount} of {relevantItems.length} gathered
            </span>
          </div>

          <div className="space-y-3">
            {relevantItems.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                  checked[item.id]
                    ? "bg-success/10 border-success/30"
                    : "bg-card border-border"
                }`}
                data-ocid={`evidence.item.${idx + 1}`}
              >
                <Checkbox
                  id={`ev-${item.id}`}
                  checked={!!checked[item.id]}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="mt-0.5"
                  data-ocid={`evidence.checkbox.${idx + 1}`}
                />
                <Label
                  htmlFor={`ev-${item.id}`}
                  className="text-sm cursor-pointer leading-relaxed flex-1"
                >
                  {item.label}
                </Label>
              </div>
            ))}
          </div>

          {checkedCount === relevantItems.length &&
            relevantItems.length > 0 && (
              <div
                className="mt-6 p-4 bg-success/10 border border-success/30 rounded-lg text-center"
                aria-live="polite"
                data-ocid="evidence.success_state"
              >
                <p className="text-success font-semibold text-sm">
                  ✓ Well done! You have gathered all recommended evidence for
                  your selected conditions.
                </p>
              </div>
            )}
        </section>
      )}
    </main>
  );
}
