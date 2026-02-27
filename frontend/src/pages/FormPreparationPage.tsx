import { useState, useCallback } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Save, CheckCircle } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { pipActivities } from '@/data/pipActivities';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function FormPreparationPage() {
    const [answers, setAnswers] = useLocalStorage<Record<string, string>>('pip-form-answers', {});
    const [expandedId, setExpandedId] = useState<string | null>(pipActivities[0].id);
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

    const answeredCount = pipActivities.filter((a) => (answers[a.id] || '').trim().length > 0).length;
    const progressPercent = Math.round((answeredCount / pipActivities.length) * 100);

    const handleAnswerChange = useCallback(
        (id: string, value: string) => {
            setAnswers((prev) => ({ ...prev, [id]: value }));
            // Show saved indicator briefly
            setSavedIds((prev) => new Set(prev).add(id));
            setTimeout(() => {
                setSavedIds((prev) => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
            }, 1500);
        },
        [setAnswers]
    );

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return (
        <main id="main-content" className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Form Preparation — PIP2
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Draft your answers to each activity area below. Your answers are saved automatically as you type. Use the tips to help you describe how your condition affects you on your worst days.
                </p>
            </div>

            {/* Progress */}
            <div className="section-card mb-6" role="region" aria-label="Form completion progress">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Sections Drafted</span>
                    <Badge variant={answeredCount === pipActivities.length ? 'default' : 'secondary'}>
                        {answeredCount} of {pipActivities.length}
                    </Badge>
                </div>
                <Progress value={progressPercent} className="h-2" aria-label={`${progressPercent}% of form sections drafted`} />
                <p className="text-xs text-muted-foreground mt-2">
                    Answers are saved automatically to your device as you type.
                </p>
            </div>

            {/* Activity Sections */}
            <div className="space-y-3" role="list" aria-label="PIP2 activity areas">
                {pipActivities.map((activity, index) => {
                    const isExpanded = expandedId === activity.id;
                    const hasAnswer = (answers[activity.id] || '').trim().length > 0;
                    const isSaved = savedIds.has(activity.id);

                    return (
                        <article
                            key={activity.id}
                            className={`border rounded-lg overflow-hidden transition-all ${
                                isExpanded ? 'border-primary/40 shadow-card' : 'border-border'
                            } ${hasAnswer ? 'bg-card' : 'bg-card'}`}
                            role="listitem"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => toggleExpand(activity.id)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                                aria-expanded={isExpanded}
                                aria-controls={`activity-content-${activity.id}`}
                                id={`activity-header-${activity.id}`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="font-semibold text-foreground text-sm sm:text-base truncate">
                                        {activity.title}
                                    </span>
                                    {hasAnswer && (
                                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" aria-label="Answer drafted" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                    {isSaved && (
                                        <span className="text-xs text-success font-medium flex items-center gap-1">
                                            <Save className="w-3 h-3" aria-hidden="true" />
                                            Saved
                                        </span>
                                    )}
                                    {isExpanded ? (
                                        <ChevronUp className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                                    )}
                                </div>
                            </button>

                            {/* Section Content */}
                            {isExpanded && (
                                <div
                                    id={`activity-content-${activity.id}`}
                                    role="region"
                                    aria-labelledby={`activity-header-${activity.id}`}
                                    className="px-4 pb-5 border-t border-border"
                                >
                                    {/* Question */}
                                    <div className="mt-4 mb-3">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                            The Question
                                        </p>
                                        <p className="text-foreground font-medium text-sm leading-relaxed bg-secondary/50 rounded-md px-3 py-2 border border-border">
                                            {activity.question}
                                        </p>
                                    </div>

                                    {/* Explanation */}
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                            What the Assessor is Looking For
                                        </p>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {activity.explanation}
                                        </p>
                                    </div>

                                    {/* Tips */}
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Lightbulb className="w-4 h-4 text-warning-foreground" aria-hidden="true" />
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                                Tips & Examples
                                            </p>
                                        </div>
                                        <ul className="space-y-1.5" aria-label={`Tips for ${activity.title}`}>
                                            {activity.tips.map((tip, i) => (
                                                <li key={i} className="tip-item">
                                                    <span className="text-primary font-bold text-xs flex-shrink-0 mt-0.5">→</span>
                                                    <span className="text-foreground/80">{tip}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Answer Textarea */}
                                    <div>
                                        <label
                                            htmlFor={`answer-${activity.id}`}
                                            className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2"
                                        >
                                            Your Draft Answer
                                        </label>
                                        <Textarea
                                            id={`answer-${activity.id}`}
                                            value={answers[activity.id] || ''}
                                            onChange={(e) => handleAnswerChange(activity.id, e.target.value)}
                                            placeholder={`Describe how ${activity.title.toLowerCase()} affects you. Focus on your worst days and be as specific as possible...`}
                                            className="min-h-[120px] text-sm resize-y"
                                            aria-label={`Draft answer for ${activity.title}`}
                                            aria-describedby={`tips-${activity.id}`}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                            <Save className="w-3 h-3" aria-hidden="true" />
                                            Saved automatically to your device
                                        </p>
                                    </div>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>

            {/* Clear answers */}
            <div className="mt-8 pt-6 border-t border-border">
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to clear all your drafted answers? This cannot be undone.')) {
                            setAnswers({});
                        }
                    }}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    aria-label="Clear all drafted answers"
                >
                    Clear all answers
                </button>
            </div>
        </main>
    );
}
