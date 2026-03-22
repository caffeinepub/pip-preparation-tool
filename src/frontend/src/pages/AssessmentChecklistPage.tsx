import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FileText, Printer, RotateCcw } from "lucide-react";

const categories = [
  {
    id: "documents",
    title: "Documents to Bring",
    items: [
      { id: "doc-appointment", label: "Appointment letter" },
      { id: "doc-photo-id", label: "Photo ID (passport or driving licence)" },
      {
        id: "doc-medical-letters",
        label: "Medical evidence letters from GP or specialists",
      },
      {
        id: "doc-prescriptions",
        label: "Current prescription list or medication printout",
      },
      { id: "doc-aids", label: "Details of any care or mobility aids you use" },
    ],
  },
  {
    id: "before",
    title: "Before You Go",
    items: [
      {
        id: "before-transport",
        label: "Arrange suitable transport to and from the assessment",
      },
      {
        id: "before-confirm",
        label: "Confirm the date, time, and exact location",
      },
      {
        id: "before-support",
        label: "Plan who is coming with you (friend, carer, advocate)",
      },
      {
        id: "before-phone",
        label: "Charge your phone in case of emergencies or delays",
      },
      { id: "before-eat", label: "Eat and drink beforehand if possible" },
    ],
  },
  {
    id: "on-the-day",
    title: "On the Day",
    items: [
      { id: "day-arrive", label: "Arrive 10–15 minutes early" },
      {
        id: "day-all-conditions",
        label: "Mention all your conditions, not just your main one",
      },
      {
        id: "day-worst-days",
        label: "Describe your worst days, not just how you are today",
      },
      { id: "day-breaks", label: "Ask for breaks if you need them" },
      {
        id: "day-support-person",
        label: "Remember you can bring a support person with you",
      },
    ],
  },
  {
    id: "after",
    title: "After the Assessment",
    items: [
      {
        id: "after-notes",
        label: "Write down what was discussed as soon as possible",
      },
      {
        id: "after-evidence",
        label: "Check if you need to send any further supporting evidence",
      },
      {
        id: "after-rights",
        label:
          "Know your rights: you can request a mandatory reconsideration if you disagree",
      },
      {
        id: "after-decision",
        label: "Wait for your written decision — it may take several weeks",
      },
    ],
  },
];

const allItemIds = categories.flatMap((c) => c.items.map((i) => i.id));

export function AssessmentChecklistPage() {
  const [checked, setChecked] = useLocalStorage<string[]>(
    "pip-assessment-day-checklist",
    [],
  );

  const toggle = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const completedCount = checked.filter((id) => allItemIds.includes(id)).length;
  const totalCount = allItemIds.length;

  const handleReset = () => {
    setChecked([]);
  };

  return (
    <main id="main-content" className="flex-1">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-start justify-between gap-4 mb-8 print:hidden">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Assessment Day Checklist
            </h1>
            <p className="text-muted-foreground">
              Use this checklist to prepare for your PIP assessment. Your
              progress is saved automatically.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2"
              data-ocid="checklist.secondary_button"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => window.print()}
              className="flex items-center gap-2"
              data-ocid="checklist.primary_button"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              Print
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 print:hidden">
          <p className="text-sm font-medium text-primary">
            {completedCount} of {totalCount} items completed
          </p>
        </div>

        {/* Print header */}
        <div className="hidden print:block mb-6">
          <h1 className="text-2xl font-bold">PIP Assessment Day Checklist</h1>
          <p className="text-sm text-gray-600 mt-1">
            Preparation guidance only — not affiliated with the DWP
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((category) => {
            const categoryCompleted = category.items.filter((item) =>
              checked.includes(item.id),
            ).length;
            return (
              <Card
                key={category.id}
                data-ocid={`checklist.${category.id}.panel`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span className="flex items-center gap-2">
                      <FileText
                        className="w-4 h-4 text-primary"
                        aria-hidden="true"
                      />
                      {category.title}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {categoryCompleted}/{category.items.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.items.map((item, idx) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <Checkbox
                        id={item.id}
                        checked={checked.includes(item.id)}
                        onCheckedChange={() => toggle(item.id)}
                        className="mt-0.5"
                        data-ocid={`checklist.checkbox.${idx + 1}`}
                      />
                      <Label
                        htmlFor={item.id}
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-muted-foreground print:hidden">
          Your checklist progress is automatically saved on this device.
        </p>
      </div>
    </main>
  );
}
