import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, FileText, Calendar } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface DocumentEntry {
    id: string;
    name: string;
    date: string;
    addedAt: number;
}

const evidenceItems = [
    {
        id: 'gp-details',
        label: 'GP contact details',
        description: 'Name, address, and phone number of your GP surgery.',
    },
    {
        id: 'prescription-list',
        label: 'Prescription list',
        description: 'A list of all current medications, dosages, and frequency.',
    },
    {
        id: 'hospital-letters',
        label: 'Hospital letters and clinic letters',
        description: 'Any letters from hospital consultants, specialists, or outpatient clinics.',
    },
    {
        id: 'diagnosis-letters',
        label: 'Diagnosis letters',
        description: 'Letters confirming your diagnosis from a doctor or specialist.',
    },
    {
        id: 'care-plan',
        label: 'Care plan or support plan',
        description: 'Any formal care plan from social services, a care coordinator, or similar.',
    },
    {
        id: 'bad-day-diary',
        label: 'Diary of a "bad day"',
        description: 'A written account of what a typical bad day looks like for you — what you can and cannot do.',
    },
    {
        id: 'support-worker',
        label: 'Support worker or carer statement',
        description: 'A written statement from anyone who helps you with daily tasks.',
    },
    {
        id: 'therapy-records',
        label: 'Therapy or treatment records',
        description: 'Records from physiotherapy, occupational therapy, mental health services, etc.',
    },
];

export function EvidenceHelperPage() {
    const [evidenceChecked, setEvidenceChecked] = useLocalStorage<Record<string, boolean>>(
        'pip-evidence-checklist',
        {}
    );
    const [documents, setDocuments] = useLocalStorage<DocumentEntry[]>('pip-document-list', []);
    const [newDocName, setNewDocName] = useState('');
    const [newDocDate, setNewDocDate] = useState('');
    const [nameError, setNameError] = useState('');

    const toggleEvidence = (id: string) => {
        setEvidenceChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const addDocument = () => {
        if (!newDocName.trim()) {
            setNameError('Please enter a document name.');
            return;
        }
        setNameError('');
        const entry: DocumentEntry = {
            id: `doc-${Date.now()}`,
            name: newDocName.trim(),
            date: newDocDate,
            addedAt: Date.now(),
        };
        setDocuments((prev) => [...prev, entry]);
        setNewDocName('');
        setNewDocDate('');
    };

    const removeDocument = (id: string) => {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
    };

    const gatheredCount = evidenceItems.filter((e) => evidenceChecked[e.id]).length;

    return (
        <main id="main-content" className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Evidence & Document Helper
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Strong evidence significantly improves your chances of a successful PIP claim. Use this page to track what evidence you have gathered and keep a list of your documents.
                </p>
            </div>

            {/* Evidence Checklist */}
            <section aria-labelledby="evidence-checklist-heading" className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 id="evidence-checklist-heading" className="font-heading text-xl font-bold text-foreground">
                        Evidence Checklist
                    </h2>
                    <Badge variant={gatheredCount === evidenceItems.length ? 'default' : 'secondary'}>
                        {gatheredCount} of {evidenceItems.length} gathered
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    Tick each item as you gather it. Your progress is saved automatically.
                </p>

                <ul className="space-y-3" aria-label="Evidence items checklist">
                    {evidenceItems.map((item) => {
                        const isChecked = !!evidenceChecked[item.id];
                        return (
                            <li
                                key={item.id}
                                className={`flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer ${
                                    isChecked
                                        ? 'bg-success/10 border-success/30'
                                        : 'bg-card border-border hover:border-primary/30'
                                }`}
                                onClick={() => toggleEvidence(item.id)}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleEvidence(item.id);
                                    }}
                                    className="flex-shrink-0 mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
                                    aria-pressed={isChecked}
                                    aria-label={`Mark "${item.label}" as ${isChecked ? 'not gathered' : 'gathered'}`}
                                >
                                    {isChecked ? (
                                        <CheckCircle2 className="w-5 h-5 text-success" aria-hidden="true" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                                    )}
                                </button>
                                <div>
                                    <p className={`font-medium text-sm ${isChecked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Document List */}
            <section aria-labelledby="document-list-heading">
                <h2 id="document-list-heading" className="font-heading text-xl font-bold text-foreground mb-2">
                    My Document List
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                    Keep a record of the documents you have gathered. Enter the document name and date (e.g., date of the letter). No files are uploaded — this is a reference list only.
                </p>

                {/* Add Document Form */}
                <div className="section-card mb-5">
                    <h3 className="font-semibold text-foreground text-sm mb-4">Add a Document</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
                        <div>
                            <Label htmlFor="doc-name" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                                Document Name <span className="text-destructive" aria-hidden="true">*</span>
                            </Label>
                            <Input
                                id="doc-name"
                                value={newDocName}
                                onChange={(e) => {
                                    setNewDocName(e.target.value);
                                    if (nameError) setNameError('');
                                }}
                                placeholder="e.g., GP letter dated Jan 2025"
                                aria-required="true"
                                aria-describedby={nameError ? 'doc-name-error' : undefined}
                                aria-invalid={!!nameError}
                                onKeyDown={(e) => e.key === 'Enter' && addDocument()}
                            />
                            {nameError && (
                                <p id="doc-name-error" className="text-xs text-destructive mt-1" role="alert">
                                    {nameError}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="doc-date" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                                Date (optional)
                            </Label>
                            <Input
                                id="doc-date"
                                type="date"
                                value={newDocDate}
                                onChange={(e) => setNewDocDate(e.target.value)}
                                aria-label="Document date"
                            />
                        </div>
                        <Button
                            onClick={addDocument}
                            className="flex items-center gap-2"
                            aria-label="Add document to list"
                        >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                            Add
                        </Button>
                    </div>
                </div>

                {/* Document List */}
                {documents.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed border-border rounded-lg">
                        <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
                        <p className="text-muted-foreground text-sm">No documents added yet.</p>
                        <p className="text-muted-foreground text-xs mt-1">Add your first document above.</p>
                    </div>
                ) : (
                    <ul className="space-y-2" aria-label="Your document list" aria-live="polite">
                        {documents.map((doc) => (
                            <li
                                key={doc.id}
                                className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
                            >
                                <FileText className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                                    {doc.date && (
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                            <Calendar className="w-3 h-3" aria-hidden="true" />
                                            {new Date(doc.date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => removeDocument(doc.id)}
                                    className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    aria-label={`Remove document "${doc.name}"`}
                                >
                                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {documents.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to clear all documents from your list?')) {
                                    setDocuments([]);
                                }
                            }}
                            className="text-sm text-muted-foreground hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                            aria-label="Clear all documents from list"
                        >
                            Clear all documents
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
