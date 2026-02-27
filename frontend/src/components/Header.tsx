import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, Sun, Contrast, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHighContrastMode } from '@/hooks/useHighContrastMode';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/checklist', label: 'Checklist' },
    { to: '/form-preparation', label: 'Form Prep' },
    { to: '/evidence-helper', label: 'Evidence' },
    { to: '/assessment-guide', label: 'Assessment' },
    { to: '/resources', label: 'Resources' },
];

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isHighContrast, toggleHighContrast] = useHighContrastMode();
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs" role="banner">
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / App Name */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                        aria-label="PIP Prep Tool - Home"
                    >
                        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-foreground font-bold text-sm" aria-hidden="true">P</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-heading font-bold text-foreground text-lg leading-none block">PIP Prep Tool</span>
                            <span className="text-muted-foreground text-xs leading-none">Preparation guidance only</span>
                        </div>
                        <span className="sm:hidden font-heading font-bold text-foreground text-lg">PIP Prep</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`nav-link ${isActive(link.to) ? 'nav-link-active' : ''}`}
                                aria-current={isActive(link.to) ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right controls */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleHighContrast}
                            aria-pressed={isHighContrast}
                            aria-label={isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
                            className="hidden sm:flex items-center gap-1.5 text-xs"
                        >
                            <Contrast className="w-3.5 h-3.5" aria-hidden="true" />
                            <span className="hidden lg:inline">High Contrast</span>
                        </Button>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        >
                            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden border-t border-border bg-card"
                    role="navigation"
                    aria-label="Mobile navigation"
                >
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`block nav-link ${isActive(link.to) ? 'nav-link-active' : ''}`}
                                aria-current={isActive(link.to) ? 'page' : undefined}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-border">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleHighContrast}
                                aria-pressed={isHighContrast}
                                aria-label={isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
                                className="w-full flex items-center gap-2 justify-center"
                            >
                                <Contrast className="w-4 h-4" aria-hidden="true" />
                                {isHighContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
