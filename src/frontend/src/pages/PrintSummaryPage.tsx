import { Button } from "@/components/ui/button";
import { pipActivities } from "@/data/pipActivities";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  Download,
  FileText,
  Printer,
} from "lucide-react";
import { useRef } from "react";

const checklistSteps = [
  { id: "gather-details", number: 1, title: "Gather Your Personal Details" },
  { id: "call-dwp", number: 2, title: "Call DWP to Request Form PIP2" },
  {
    id: "prepare-answers",
    number: 3,
    title: "Use This App to Prepare Your Answers",
  },
  { id: "post-form", number: 4, title: "Post Your Completed Form" },
  { id: "prepare-assessment", number: 5, title: "Prepare for Your Assessment" },
  { id: "understand-decision", number: 6, title: "Understand Your Decision" },
];

const evidenceItems = [
  { id: "gp-details", label: "GP contact details" },
  { id: "prescription-list", label: "Prescription list" },
  { id: "hospital-letters", label: "Hospital letters and clinic letters" },
  { id: "diagnosis-letters", label: "Diagnosis letters" },
  { id: "care-plan", label: "Care plan or support plan" },
  { id: "bad-day-diary", label: 'Diary of a "bad day"' },
  { id: "support-worker", label: "Support worker or carer statement" },
  { id: "therapy-records", label: "Therapy or treatment records" },
];

interface DocumentEntry {
  id: string;
  name: string;
  date: string;
  addedAt: number;
}

export function PrintSummaryPage() {
  const [answers] = useLocalStorage<Record<string, string>>(
    "pip-form-answers",
    {},
  );
  const [checklist] = useLocalStorage<Record<string, boolean>>(
    "pip-checklist",
    {},
  );
  const [evidenceChecked] = useLocalStorage<Record<string, boolean>>(
    "pip-evidence-checklist",
    {},
  );
  const [documents] = useLocalStorage<DocumentEntry[]>("pip-document-list", []);

  const printRef = useRef<HTMLDivElement>(null);

  const answeredCount = pipActivities.filter(
    (a) => (answers[a.id] || "").trim().length > 0,
  ).length;
  const checklistCount = checklistSteps.filter((s) => checklist[s.id]).length;
  const evidenceCount = evidenceItems.filter(
    (e) => evidenceChecked[e.id],
  ).length;
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const lines: string[] = [];
    lines.push("PIP CLAIM PREPARATION SUMMARY");
    lines.push("=".repeat(50));
    lines.push(`Generated: ${today}`);
    lines.push("");
    lines.push(
      "DISCLAIMER: This is a preparation tool only. Not affiliated with the UK government or DWP.",
    );
    lines.push("To start your claim, call the DWP on 0800 917 2222.");
    lines.push("");

    lines.push("CHECKLIST PROGRESS");
    lines.push("-".repeat(30));
    for (const step of checklistSteps) {
      const done = !!checklist[step.id];
      lines.push(`${done ? "[x]" : "[ ]"} Step ${step.number}: ${step.title}`);
    }
    lines.push("");

    lines.push("FORM PREPARATION - PIP2 DRAFT ANSWERS");
    lines.push("-".repeat(30));
    for (const activity of pipActivities) {
      const answer = (answers[activity.id] || "").trim();
      lines.push(`\n${activity.title.toUpperCase()}`);
      lines.push(`Question: ${activity.question}`);
      lines.push("Your Answer:");
      lines.push(answer || "(No answer drafted yet)");
    }
    lines.push("");

    lines.push("EVIDENCE CHECKLIST");
    lines.push("-".repeat(30));
    for (const item of evidenceItems) {
      const gathered = !!evidenceChecked[item.id];
      lines.push(`${gathered ? "[x]" : "[ ]"} ${item.label}`);
    }
    lines.push("");

    if (documents.length > 0) {
      lines.push("DOCUMENT LIST");
      lines.push("-".repeat(30));
      for (const doc of documents) {
        const date = doc.date
          ? new Date(doc.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "No date";
        lines.push(`- ${doc.name} (${date})`);
      }
      lines.push("");
    }

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pip-preparation-summary-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main
      id="main-content"
      className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      {/* Page Header */}
      <div className="mb-6 print:hidden">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Printable Summary
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          A summary of everything you have prepared — your checklist progress,
          drafted PIP2 answers, and evidence list. Print or export this to bring
          to your assessment.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 print:hidden">
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer className="w-4 h-4" aria-hidden="true" />
          Print Summary
        </Button>
        <Button
          variant="outline"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          Export as Text File
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 print:bg-white print:border-gray-400">
        <AlertTriangle
          className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <p className="text-sm text-amber-900 leading-relaxed">
          <strong>Important:</strong> This tool is for preparation only. It is
          not affiliated with the UK government or the DWP. To start your claim,
          you must call the DWP on{" "}
          <a href="tel:08009172222" className="underline">
            0800 917 2222
          </a>
          . This app does not submit your claim or guarantee an award.
        </p>
      </div>

      {/* Printable Content */}
      <div ref={printRef} className="space-y-8">
        {/* Header for print */}
        <div className="hidden print:block border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-2xl font-bold">PIP Claim Preparation Summary</h1>
          <p className="text-sm text-gray-600 mt-1">Generated: {today}</p>
        </div>

        {/* Overview Stats */}
        <section aria-labelledby="overview-heading">
          <h2
            id="overview-heading"
            className="font-heading text-xl font-bold text-foreground mb-4 pb-2 border-b border-border"
          >
            Overview
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="section-card text-center print:border print:border-gray-300 print:p-3">
              <p className="text-2xl font-bold text-primary">
                {checklistCount}/{checklistSteps.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Checklist steps
              </p>
            </div>
            <div className="section-card text-center print:border print:border-gray-300 print:p-3">
              <p className="text-2xl font-bold text-primary">
                {answeredCount}/{pipActivities.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PIP2 sections drafted
              </p>
            </div>
            <div className="section-card text-center print:border print:border-gray-300 print:p-3">
              <p className="text-2xl font-bold text-primary">
                {evidenceCount}/{evidenceItems.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Evidence gathered
              </p>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section aria-labelledby="checklist-heading">
          <h2
            id="checklist-heading"
            className="font-heading text-xl font-bold text-foreground mb-4 pb-2 border-b border-border"
          >
            Checklist Progress
          </h2>
          <ol className="space-y-2">
            {checklistSteps.map((step) => {
              const done = !!checklist[step.id];
              return (
                <li key={step.id} className="flex items-center gap-3">
                  {done ? (
                    <CheckCircle2
                      className="w-5 h-5 text-success flex-shrink-0"
                      aria-label="Completed"
                    />
                  ) : (
                    <Circle
                      className="w-5 h-5 text-muted-foreground flex-shrink-0"
                      aria-label="Not completed"
                    />
                  )}
                  <span
                    className={`text-sm ${
                      done
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    Step {step.number}: {step.title}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        {/* PIP2 Draft Answers */}
        <section aria-labelledby="pip2-heading">
          <h2
            id="pip2-heading"
            className="font-heading text-xl font-bold text-foreground mb-4 pb-2 border-b border-border"
          >
            Form Preparation — PIP2 Draft Answers
          </h2>
          {answeredCount === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
              <FileText
                className="w-10 h-10 text-muted-foreground mx-auto mb-2"
                aria-hidden="true"
              />
              <p className="text-muted-foreground text-sm">
                No answers drafted yet.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Go to Form Preparation to draft your answers.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {pipActivities.map((activity) => {
                const answer = (answers[activity.id] || "").trim();
                if (!answer) return null;
                return (
                  <div
                    key={activity.id}
                    className="border border-border rounded-lg p-4 print:border-gray-300 print:break-inside-avoid"
                  >
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 italic">
                      {activity.question}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {answer}
                    </p>
                  </div>
                );
              })}
              {pipActivities.some((a) => !(answers[a.id] || "").trim()) && (
                <div className="border border-dashed border-border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Sections not yet drafted:
                  </p>
                  <ul className="space-y-1">
                    {pipActivities
                      .filter((a) => !(answers[a.id] || "").trim())
                      .map((a) => (
                        <li
                          key={a.id}
                          className="text-xs text-muted-foreground flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                          {a.title}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Evidence Checklist */}
        <section aria-labelledby="evidence-heading">
          <h2
            id="evidence-heading"
            className="font-heading text-xl font-bold text-foreground mb-4 pb-2 border-b border-border"
          >
            Evidence Checklist
          </h2>
          <ul className="space-y-2">
            {evidenceItems.map((item) => {
              const gathered = !!evidenceChecked[item.id];
              return (
                <li key={item.id} className="flex items-center gap-3">
                  {gathered ? (
                    <CheckCircle2
                      className="w-5 h-5 text-success flex-shrink-0"
                      aria-label="Gathered"
                    />
                  ) : (
                    <Circle
                      className="w-5 h-5 text-muted-foreground flex-shrink-0"
                      aria-label="Not gathered"
                    />
                  )}
                  <span
                    className={`text-sm ${
                      gathered
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Document List */}
        {documents.length > 0 && (
          <section aria-labelledby="docs-heading">
            <h2
              id="docs-heading"
              className="font-heading text-xl font-bold text-foreground mb-4 pb-2 border-b border-border"
            >
              My Document List
            </h2>
            <ul className="space-y-2">
              {documents.map((doc) => (
                <li key={doc.id} className="flex items-start gap-3">
                  <FileText
                    className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {doc.name}
                    </p>
                    {doc.date && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Print footer */}
        <div className="hidden print:block border-t-2 border-gray-300 pt-4 mt-8">
          <p className="text-xs text-gray-500">
            This summary was prepared using the PIP Prep Tool. For preparation
            purposes only. Not affiliated with the UK government or DWP. To
            start your claim, call 0800 917 2222.
          </p>
        </div>
      </div>
    </main>
  );
}
