import { Link } from '@tanstack/react-router';
import { Shield, Heart, Coffee } from 'lucide-react';

export function Footer() {
    const year = new Date().getFullYear();
    const hostname = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'unknown-app';

    return (
        <footer className="bg-card border-t border-border mt-auto" role="contentinfo">
            {/* Donation Section */}
            <div className="border-b border-border bg-muted/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                        {/* QR Code */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-2">
                            <div className="bg-white rounded-xl p-3 shadow-card border border-border">
                                <img
                                    src="/assets/generated/paypal-qr-danielle-boylan.dim_300x300.png"
                                    alt="PayPal QR code for Danielle Boylan — scan to donate"
                                    className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                                    width={128}
                                    height={128}
                                />
                            </div>
                            <p className="text-xs font-medium text-muted-foreground tracking-wide">
                                Scan to donate via PayPal
                            </p>
                        </div>

                        {/* Text content */}
                        <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
                            <div className="flex items-center gap-2">
                                <Coffee className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                                <p className="text-sm font-semibold text-foreground">Support This Tool</p>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                                If this free tool helped you prepare for your PIP claim, consider buying{' '}
                                <span className="font-medium text-foreground">Danielle Boylan</span> a coffee ☕
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                                Your support helps keep this resource free and up to date for everyone who needs it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                    {/* Privacy notice */}
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div>
                            <p className="text-sm font-semibold text-foreground mb-1">Your Privacy</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                All data is stored locally on your device only. Nothing is sent to any server.{' '}
                                <Link to="/privacy" className="text-primary underline hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded">
                                    Read our Privacy Notice
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div>
                        <p className="text-sm font-semibold text-foreground mb-1">Important Disclaimer</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            This tool is for preparation only. Not affiliated with the UK government or DWP. To start your claim, call{' '}
                            <a href="tel:08009172222" className="text-primary underline hover:no-underline">0800 917 2222</a>.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <p className="text-sm font-semibold text-foreground mb-1">Quick Links</p>
                        <nav aria-label="Footer navigation" className="flex flex-col gap-1">
                            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded">
                                Privacy Notice
                            </Link>
                            <Link to="/resources" className="text-xs text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded">
                                Resources & Support
                            </Link>
                            <a
                                href="https://www.gov.uk/pip"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                            >
                                Official GOV.UK PIP Page ↗
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                        © {year} PIP Prep Tool. For preparation guidance only.
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 text-crisis fill-crisis" aria-label="love" /> using{' '}
                        <a
                            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                        >
                            caffeine.ai
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
