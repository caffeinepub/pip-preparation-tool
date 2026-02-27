import { Shield, Trash2, Database, Lock, Eye, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const dataItems = [
    { key: 'pip-checklist', label: 'Checklist progress', description: 'Which steps you have ticked off in the PIP claim checklist.' },
    { key: 'pip-form-answers', label: 'Form preparation answers', description: 'Your draft answers to the PIP2 activity areas.' },
    { key: 'pip-evidence-checklist', label: 'Evidence checklist', description: 'Which evidence items you have marked as gathered.' },
    { key: 'pip-document-list', label: 'Document list', description: 'The names and dates of documents you have added to your list.' },
    { key: 'pip-high-contrast-mode', label: 'High contrast preference', description: 'Whether you have enabled high contrast mode.' },
];

export function PrivacyNoticePage() {
    const clearAllData = () => {
        if (window.confirm('Are you sure you want to clear ALL your saved data? This cannot be undone.')) {
            dataItems.forEach((item) => localStorage.removeItem(item.key));
            window.location.reload();
        }
    };

    return (
        <main id="main-content" className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                        Privacy Notice
                    </h1>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    Your privacy is important to us. This notice explains exactly how this tool handles your data.
                </p>
            </div>

            {/* Key Summary */}
            <Alert className="border-success/40 bg-success/10 mb-8">
                <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
                <AlertDescription className="text-foreground/90 leading-relaxed">
                    <strong>In plain English:</strong> This tool stores your data only on your own device. Nothing is ever sent to any server. No one else can see your data. You can delete it at any time.
                </AlertDescription>
            </Alert>

            {/* Sections */}
            <div className="space-y-8">
                {/* What data is stored */}
                <section aria-labelledby="what-data">
                    <h2 id="what-data" className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary" aria-hidden="true" />
                        What Data is Stored
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        This tool saves the following information in your browser's local storage so you can return and continue where you left off:
                    </p>
                    <ul className="space-y-2" aria-label="List of stored data items">
                        {dataItems.map((item) => (
                            <li key={item.key} className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
                                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                                    <p className="text-xs font-mono text-muted-foreground/70 mt-0.5">Key: {item.key}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Where data is stored */}
                <section aria-labelledby="where-stored">
                    <h2 id="where-stored" className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" aria-hidden="true" />
                        Where is My Data Stored?
                    </h2>
                    <div className="section-card text-sm text-muted-foreground leading-relaxed space-y-3">
                        <p>
                            All data is stored exclusively in your browser's <strong className="text-foreground">local storage</strong> — a feature built into your web browser that stores data on your device only.
                        </p>
                        <p>
                            <strong className="text-foreground">No data is ever sent to any server.</strong> This tool has no backend database, no user accounts, and no analytics tracking. Your answers, checklist progress, and document list never leave your device.
                        </p>
                        <p>
                            Your data is only accessible in the browser on the device you used to enter it. It is not synced across devices.
                        </p>
                    </div>
                </section>

                {/* Who can see data */}
                <section aria-labelledby="who-sees">
                    <h2 id="who-sees" className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" aria-hidden="true" />
                        Who Can See My Data?
                    </h2>
                    <div className="section-card text-sm text-muted-foreground leading-relaxed space-y-3">
                        <p>
                            Only you can see your data. The PIP Prep Tool team cannot access it. No third parties can access it. It is stored only on your device.
                        </p>
                        <p>
                            <strong className="text-foreground">Important:</strong> If you share your device or browser with others, they may be able to see your data. If this is a concern, use a private/incognito browsing window, or clear your data after each session (see below).
                        </p>
                    </div>
                </section>

                {/* How to clear data */}
                <section aria-labelledby="clear-data">
                    <h2 id="clear-data" className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                        <Trash2 className="w-5 h-5 text-primary" aria-hidden="true" />
                        How to Clear Your Data
                    </h2>
                    <div className="section-card text-sm text-muted-foreground leading-relaxed space-y-4">
                        <p>You can clear your saved data at any time using one of the following methods:</p>

                        <div>
                            <p className="font-semibold text-foreground mb-2">Option 1: Use the button below (clears all PIP Prep Tool data)</p>
                            <button
                                onClick={clearAllData}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive border border-destructive/30 rounded-md text-sm font-medium hover:bg-destructive/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                aria-label="Clear all saved data from this tool"
                            >
                                <Trash2 className="w-4 h-4" aria-hidden="true" />
                                Clear All My Saved Data
                            </button>
                        </div>

                        <div>
                            <p className="font-semibold text-foreground mb-2">Option 2: Clear browser storage manually</p>
                            <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                                <li><strong className="text-foreground">Chrome/Edge:</strong> Settings → Privacy and security → Clear browsing data → Cookies and other site data</li>
                                <li><strong className="text-foreground">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data → Clear Data</li>
                                <li><strong className="text-foreground">Safari:</strong> Settings → Safari → Clear History and Website Data</li>
                            </ol>
                        </div>

                        <div>
                            <p className="font-semibold text-foreground mb-2">Option 3: Use private/incognito mode</p>
                            <p>
                                If you open this tool in a private or incognito browser window, your data will be automatically deleted when you close the window.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section aria-labelledby="contact">
                    <h2 id="contact" className="font-heading text-xl font-bold text-foreground mb-3">
                        Questions?
                    </h2>
                    <div className="section-card text-sm text-muted-foreground leading-relaxed">
                        <p>
                            This tool is provided as a free preparation aid. It is not affiliated with the UK government or the DWP. If you have questions about the PIP process itself, please visit{' '}
                            <a
                                href="https://www.gov.uk/pip"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                            >
                                GOV.UK/pip
                            </a>{' '}
                            or contact{' '}
                            <a
                                href="https://www.citizensadvice.org.uk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                            >
                                Citizens Advice
                            </a>.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
