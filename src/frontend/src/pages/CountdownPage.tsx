import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CalendarClock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface PIPDate {
  id: string;
  label: string;
  date: string; // ISO date string YYYY-MM-DD
}

const SUGGESTED_LABELS = [
  "PIP2 form deadline",
  "Assessment date",
  "Mandatory reconsideration deadline",
  "Appeal hearing date",
  "Award review date",
  "GP letter request date",
];

function getDaysRemaining(dateStr: string): number {
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function getUrgencyClass(days: number): string {
  if (days < 0) return "border-destructive/50 bg-destructive/5";
  if (days <= 7) return "border-warning/50 bg-warning/5";
  if (days <= 14) return "border-warning/30 bg-warning/5";
  return "border-success/30 bg-success/5";
}

function getBadgeVariant(
  days: number,
): "destructive" | "secondary" | "default" | "outline" {
  if (days < 0) return "destructive";
  if (days <= 7) return "secondary";
  return "default";
}

function getDaysLabel(days: number): string {
  if (days === 0) return "Today!";
  if (days < 0)
    return `${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""} overdue`;
  return `${days} day${days !== 1 ? "s" : ""} remaining`;
}

export function CountdownPage() {
  const [dates, setDates] = useLocalStorage<PIPDate[]>("pip-dates", []);
  const [labelInput, setLabelInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [error, setError] = useState("");

  const addDate = () => {
    if (!labelInput.trim()) {
      setError("Please enter a label for this date.");
      return;
    }
    if (!dateInput) {
      setError("Please select a date.");
      return;
    }
    setError("");
    const newDate: PIPDate = {
      id: `${Date.now()}-${Math.random()}`,
      label: labelInput.trim(),
      date: dateInput,
    };
    setDates((prev) =>
      [...prev, newDate].sort((a, b) => a.date.localeCompare(b.date)),
    );
    setLabelInput("");
    setDateInput("");
  };

  const removeDate = (id: string) => {
    setDates((prev) => prev.filter((d) => d.id !== id));
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <main
      id="main-content"
      className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">
          Deadline Tracker
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Important Dates &amp; Deadlines
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Track your PIP deadlines so you never miss a key date. Add as many
          dates as you need — all saved automatically on your device.
        </p>
      </div>

      {/* Add new date form */}
      <section
        className="section-card mb-8"
        aria-label="Add a new date"
        data-ocid="dates.panel"
      >
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" aria-hidden="true" />
          Add a Date
        </h2>

        {/* Suggested labels */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Quick select:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_LABELS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setLabelInput(label)}
                className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted hover:bg-accent hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label
              htmlFor="date-label"
              className="text-sm font-medium mb-1.5 block"
            >
              Label
            </Label>
            <Input
              id="date-label"
              value={labelInput}
              onChange={(e) => {
                setLabelInput(e.target.value);
                setError("");
              }}
              placeholder="e.g. PIP2 form deadline"
              aria-required="true"
              data-ocid="dates.input"
            />
          </div>
          <div>
            <Label
              htmlFor="date-picker"
              className="text-sm font-medium mb-1.5 block"
            >
              Date
            </Label>
            <Input
              id="date-picker"
              type="date"
              value={dateInput}
              min={today}
              onChange={(e) => {
                setDateInput(e.target.value);
                setError("");
              }}
              aria-required="true"
            />
          </div>
        </div>

        {error && (
          <p
            className="text-sm text-destructive mb-3"
            role="alert"
            data-ocid="dates.error_state"
          >
            {error}
          </p>
        )}

        <Button
          onClick={addDate}
          className="w-full sm:w-auto"
          data-ocid="dates.primary_button"
        >
          <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
          Add Date
        </Button>
      </section>

      {/* Date list */}
      {dates.length === 0 ? (
        <div
          className="section-card text-center py-12"
          data-ocid="dates.empty_state"
        >
          <CalendarClock
            className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3"
            aria-hidden="true"
          />
          <p className="text-muted-foreground font-medium">
            No dates added yet
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first important date above to start tracking.
          </p>
        </div>
      ) : (
        <section aria-label="Your tracked dates">
          <h2 className="font-semibold text-foreground mb-4">
            Your Dates ({dates.length})
          </h2>
          <ul className="space-y-3" data-ocid="dates.list">
            {dates.map((d, idx) => {
              const days = getDaysRemaining(d.date);
              const displayDate = new Date(
                `${d.date}T00:00:00`,
              ).toLocaleDateString("en-GB", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              return (
                <li
                  key={d.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${getUrgencyClass(days)} transition-all`}
                  data-ocid={`dates.item.${idx + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {d.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {displayDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      variant={getBadgeVariant(days)}
                      className="text-xs whitespace-nowrap"
                    >
                      {getDaysLabel(days)}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => removeDate(d.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Remove date: ${d.label}`}
                      data-ocid={`dates.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Legend */}
      <div className="mt-8 section-card">
        <p className="text-xs font-semibold text-foreground mb-3">
          Colour key:
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border border-success/50 bg-success/20" />
            <span className="text-xs text-muted-foreground">15+ days away</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border border-warning/50 bg-warning/20" />
            <span className="text-xs text-muted-foreground">
              Coming soon (8–14 days)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border border-warning/70 bg-warning/30" />
            <span className="text-xs text-muted-foreground">
              Urgent (≤ 7 days)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border border-destructive/50 bg-destructive/20" />
            <span className="text-xs text-muted-foreground">Overdue</span>
          </div>
        </div>
      </div>
    </main>
  );
}
