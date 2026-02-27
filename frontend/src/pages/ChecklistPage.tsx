import { CheckCircle2, Circle, Phone, FileText, PenLine, Send, ClipboardCheck, BookOpen } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

interface ChecklistStep {
    id: string;
    number: number;
    title: string;
    description: string;
    icon: React.ElementType;
    actionLabel?: string;
    actionTo?: string;
    actionHref?: string;
}

const steps: ChecklistStep[] = [
    {
        id: 'gather-details',
        number: 1,
        title: 'Gather Your Personal Details',
        description:
            'Collect your National Insurance number, GP contact details, details of any specialists or consultants, and information about your condition(s) and how they affect your daily life.',
        icon: FileText,
        actionLabel: 'View Evidence Helper',
        actionTo: '/evidence-helper',
    },
    {
        id: 'call-dwp',
        number: 2,
        title: 'Call DWP to Request Form PIP2',
        description:
            'Call the DWP on 0800 917 2222 (Monday–Friday, 8am–6pm) to start your claim. They will send you the PIP2 "How your disability affects you" form. You have 1 month to return it.',
        icon: Phone,
        actionLabel: 'Call 0800 917 2222',
        actionHref: 'tel:08009172222',
    },
    {
        id: 'prepare-answers',
        number: 3,
        title: 'Use This App to Prepare Your Answers',
        description:
            'Use the Form Preparation section to draft your answers to each activity area. Take your time and describe your worst days. Use the tips and examples provided to help you.',
        icon: PenLine,
        actionLabel: 'Start Form Preparation',
        actionTo: '/form-preparation',
    },
    {
        id: 'post-form',
        number: 4,
        title: 'Post Your Completed Form',
        description:
            'Transfer your prepared answers onto the official PIP2 form. Keep a copy of everything you send. Post it to the address on the form before the deadline. Consider using recorded delivery.',
        icon: Send,
    },
    {
        id: 'prepare-assessment',
        number: 5,
        title: 'Prepare for Your Assessment',
        description:
            'After returning your form, you may be invited to a face-to-face, telephone, or video assessment. Read our Assessment Guide to understand what to expect and how to prepare.',
        icon: ClipboardCheck,
        actionLabel: 'Read Assessment Guide',
        actionTo: '/assessment-guide',
    },
    {
        id: 'understand-decision',
        number: 6,
        title: 'Understand Your Decision',
        description:
            'You will receive a decision letter explaining whether you have been awarded PIP and at what rate. If you disagree with the decision, you have the right to request a Mandatory Reconsideration. Citizens Advice can help.',
        icon: BookOpen,
        actionLabel: 'View Resources',
        actionTo: '/resources',
    },
];

export function ChecklistPage() {
    const [checked, setChecked] = useLocalStorage<Record<string, boolean>>('pip-checklist', {});

    const completedCount = steps.filter((s) => checked[s.id]).length;
    const progressPercent = Math.round((completedCount / steps.length) * 100);

    const toggleStep = (id: string) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <main id="main-content" className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Your PIP Claim Checklist
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Follow these steps to prepare and submit your PIP claim. Tick each step as you complete it — your progress is saved automatically.
                </p>
            </div>

            {/* Progress Bar */}
            <div
                className="section-card mb-8"
                role="region"
                aria-label="Checklist progress"
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-foreground">Your Progress</span>
                    <Badge variant={completedCount === steps.length ? 'default' : 'secondary'}>
                        {completedCount} of {steps.length} steps completed
                    </Badge>
                </div>
                <Progress
                    value={progressPercent}
                    className="h-3"
                    aria-label={`${progressPercent}% of checklist completed`}
                />
                {completedCount === steps.length && (
                    <p className="text-success text-sm font-medium mt-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        Well done! You've completed all the preparation steps.
                    </p>
                )}
            </div>

            {/* Steps */}
            <ol className="space-y-4" aria-label="PIP claim preparation steps">
                {steps.map((step) => {
                    const isChecked = !!checked[step.id];
                    const Icon = step.icon;
                    return (
                        <li
                            key={step.id}
                            className={`step-item ${isChecked ? 'step-item-completed' : ''}`}
                        >
                            <button
                                onClick={() => toggleStep(step.id)}
                                className="flex-shrink-0 mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
                                aria-pressed={isChecked}
                                aria-label={`Mark step ${step.number} "${step.title}" as ${isChecked ? 'incomplete' : 'complete'}`}
                            >
                                {isChecked ? (
                                    <CheckCircle2 className="w-6 h-6 text-success" aria-hidden="true" />
                                ) : (
                                    <Circle className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
                                )}
                            </button>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-3 mb-1">
                                    <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex-shrink-0">
                                        Step {step.number}
                                    </span>
                                    <h2
                                        className={`font-semibold text-base leading-snug ${isChecked ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                                    >
                                        {step.title}
                                    </h2>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-3 ml-0">
                                    {step.description}
                                </p>

                                {/* Action button */}
                                {step.actionTo && (
                                    <Button asChild variant="outline" size="sm" className="text-xs">
                                        <Link to={step.actionTo}>{step.actionLabel}</Link>
                                    </Button>
                                )}
                                {step.actionHref && (
                                    <Button asChild variant="outline" size="sm" className="text-xs">
                                        <a href={step.actionHref}>{step.actionLabel}</a>
                                    </Button>
                                )}
                            </div>

                            <div className="flex-shrink-0 hidden sm:block">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isChecked ? 'bg-success/20' : 'bg-muted'}`}>
                                    <Icon className={`w-4 h-4 ${isChecked ? 'text-success' : 'text-muted-foreground'}`} aria-hidden="true" />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>

            {/* Reset button */}
            <div className="mt-8 pt-6 border-t border-border">
                <button
                    onClick={() => setChecked({})}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    aria-label="Reset all checklist steps to incomplete"
                >
                    Reset all steps
                </button>
            </div>
        </main>
    );
}
