import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FileText, Printer, Save } from "lucide-react";

interface LetterData {
  patientName: string;
  dob: string;
  nhsNumber: string;
  conditions: string;
  dailyLivingImpact: string;
  mobilityImpact: string;
  professionalName: string;
  professionalRole: string;
  letterDate: string;
}

const DEFAULT_LETTER: LetterData = {
  patientName: "",
  dob: "",
  nhsNumber: "",
  conditions: "",
  dailyLivingImpact: "",
  mobilityImpact: "",
  professionalName: "",
  professionalRole: "",
  letterDate: "",
};

export function LetterTemplatePage() {
  const [data, setData] = useLocalStorage<LetterData>(
    "pip-letter-data",
    DEFAULT_LETTER,
  );

  const update = (field: keyof LetterData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main
      id="main-content"
      className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      {/* Print button area - hidden in print */}
      <div className="print:hidden">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Supporting Letter Template
            </h1>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Use this template to help a GP, consultant, social worker, or carer
            write a supporting letter for your PIP claim or appeal. Fill in the
            details below, then print the letter to give to them.
          </p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
            <Save className="w-3 h-3" aria-hidden="true" />
            Your letter data is saved automatically on this device.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Form */}
          <section aria-labelledby="form-heading">
            <h2
              id="form-heading"
              className="font-heading text-lg font-bold text-foreground mb-4"
            >
              Patient Details
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient-name">Patient Full Name</Label>
                <Input
                  id="patient-name"
                  value={data.patientName}
                  onChange={(e) => update("patientName", e.target.value)}
                  placeholder="e.g. Jane Smith"
                  className="mt-1"
                  data-ocid="letter.input"
                />
              </div>
              <div>
                <Label htmlFor="patient-dob">Date of Birth</Label>
                <Input
                  id="patient-dob"
                  value={data.dob}
                  onChange={(e) => update("dob", e.target.value)}
                  placeholder="e.g. 15 March 1980"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="patient-nhs">NHS Number</Label>
                <Input
                  id="patient-nhs"
                  value={data.nhsNumber}
                  onChange={(e) => update("nhsNumber", e.target.value)}
                  placeholder="e.g. 123 456 7890"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="patient-conditions">Condition(s)</Label>
                <Input
                  id="patient-conditions"
                  value={data.conditions}
                  onChange={(e) => update("conditions", e.target.value)}
                  placeholder="e.g. Fibromyalgia, Anxiety, PTSD"
                  className="mt-1"
                />
              </div>
            </div>

            <h2 className="font-heading text-lg font-bold text-foreground mb-4 mt-6">
              Impact Description
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="daily-living">
                  How the condition affects daily living
                </Label>
                <Textarea
                  id="daily-living"
                  value={data.dailyLivingImpact}
                  onChange={(e) => update("dailyLivingImpact", e.target.value)}
                  placeholder="e.g. The patient requires assistance with washing, dressing, and preparing meals due to severe fatigue and pain. They are unable to safely use the hob unassisted."
                  rows={5}
                  className="mt-1"
                  data-ocid="letter.textarea"
                />
              </div>
              <div>
                <Label htmlFor="mobility">
                  How the condition affects mobility
                </Label>
                <Textarea
                  id="mobility"
                  value={data.mobilityImpact}
                  onChange={(e) => update("mobilityImpact", e.target.value)}
                  placeholder="e.g. The patient can walk no more than 20 metres on a typical day before severe pain prevents further movement. They use a walking stick and require rest periods."
                  rows={5}
                  className="mt-1"
                />
              </div>
            </div>

            <h2 className="font-heading text-lg font-bold text-foreground mb-4 mt-6">
              Professional Details
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="prof-name">
                  Name of professional completing letter
                </Label>
                <Input
                  id="prof-name"
                  value={data.professionalName}
                  onChange={(e) => update("professionalName", e.target.value)}
                  placeholder="e.g. Dr Sarah Jones"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="prof-role">Role / Job Title</Label>
                <Input
                  id="prof-role"
                  value={data.professionalRole}
                  onChange={(e) => update("professionalRole", e.target.value)}
                  placeholder="e.g. GP, Consultant Rheumatologist, Social Worker"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="letter-date">Date of Letter</Label>
                <Input
                  id="letter-date"
                  value={data.letterDate}
                  onChange={(e) => update("letterDate", e.target.value)}
                  placeholder={today}
                  className="mt-1"
                />
              </div>
            </div>
          </section>

          {/* Preview card */}
          <section aria-labelledby="preview-heading">
            <h2
              id="preview-heading"
              className="font-heading text-lg font-bold text-foreground mb-4"
            >
              Letter Preview
            </h2>
            <LetterPreview data={data} />
          </section>
        </div>

        <Button
          onClick={() => window.print()}
          className="flex items-center gap-2"
          data-ocid="letter.primary_button"
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          Print Letter
        </Button>
      </div>

      {/* Print-only: full page letter */}
      <div className="hidden print:block">
        <LetterPreview data={data} printMode />
      </div>
    </main>
  );
}

function LetterPreview({
  data,
  printMode = false,
}: {
  data: {
    patientName: string;
    dob: string;
    nhsNumber: string;
    conditions: string;
    dailyLivingImpact: string;
    mobilityImpact: string;
    professionalName: string;
    professionalRole: string;
    letterDate: string;
  };
  printMode?: boolean;
}) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const containerClass = printMode
    ? "font-sans text-base text-black"
    : "bg-white border border-border rounded-lg p-6 text-sm font-mono leading-relaxed text-foreground shadow-sm";

  return (
    <div className={containerClass}>
      <div className="mb-6">
        <p>{data.letterDate || today}</p>
      </div>

      <div className="mb-6">
        <p className="font-bold">
          To Whom It May Concern / PIP Assessment Team
        </p>
      </div>

      <div className="mb-6">
        <p>
          <strong>
            Re: PIP Supporting Letter for {data.patientName || "[Patient Name]"}
          </strong>
        </p>
        <p>Date of Birth: {data.dob || "[Date of Birth]"}</p>
        <p>NHS Number: {data.nhsNumber || "[NHS Number]"}</p>
      </div>

      <p className="mb-4">
        I am writing in support of the above-named patient's application for
        Personal Independence Payment (PIP). I have been involved in their care
        in my capacity as {data.professionalRole || "[Role]"}.
      </p>

      <p className="mb-4">
        {data.patientName || "[Patient Name]"} has been diagnosed with the
        following condition(s):{" "}
        <strong>{data.conditions || "[Conditions]"}</strong>.
      </p>

      <p className="font-semibold mb-2">Impact on Daily Living:</p>
      <p className="mb-4 whitespace-pre-wrap">
        {data.dailyLivingImpact ||
          "[Please describe how the condition affects daily living activities — washing, dressing, preparing food, managing medication, communicating with others, etc.]"}
      </p>

      <p className="font-semibold mb-2">Impact on Mobility:</p>
      <p className="mb-4 whitespace-pre-wrap">
        {data.mobilityImpact ||
          "[Please describe how the condition affects the patient's ability to walk, travel, or move around safely.]"}
      </p>

      <p className="mb-6">
        I hope this letter assists with the assessment process. Please do not
        hesitate to contact me should you require any further information.
      </p>

      <p className="mb-1">Yours sincerely,</p>
      <p className="mb-1">&nbsp;</p>
      <p className="mb-1">&nbsp;</p>
      <p className="font-semibold">{data.professionalName || "[Name]"}</p>
      <p>{data.professionalRole || "[Role / Job Title]"}</p>
    </div>
  );
}
