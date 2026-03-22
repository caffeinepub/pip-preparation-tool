import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useLanguage } from "@/context/LanguageContext";
import { useDyslexiaFont } from "@/hooks/useDyslexiaFont";
import { useHighContrastMode } from "@/hooks/useHighContrastMode";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTextSize } from "@/hooks/useTextSize";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Contrast,
  Menu,
  Printer,
  Type,
  X,
} from "lucide-react";
import { useState } from "react";

const mainNavLinks = [
  { to: "/", labelKey: "nav.home" },
  { to: "/checklist", labelKey: "nav.checklist" },
  { to: "/form-preparation", labelKey: "nav.formPrep" },
  { to: "/evidence-helper", labelKey: "nav.evidence" },
  { to: "/assessment-guide", labelKey: "nav.assessment" },
  { to: "/resources", labelKey: "nav.resources" },
  { to: "/print-summary", labelKey: "nav.summary" },
];

const guideNavLinks = [
  { to: "/bad-day-guide", labelKey: "nav.badDayGuide" },
  { to: "/conditions", labelKey: "nav.conditions" },
  { to: "/dates", labelKey: "nav.dates" },
  { to: "/faq", labelKey: "nav.faq" },
  { to: "/appeals", labelKey: "nav.appeals" },
  { to: "/score-estimator", labelKey: "nav.scoreEstimator" },
  { to: "/letter-template", labelKey: "nav.letterTemplate" },
  { to: "/feedback", labelKey: "nav.feedback" },
  { to: "/timeline", labelKey: "nav.timeline" },
  { to: "/evidence-by-condition", labelKey: "nav.evidenceByCondition" },
  { to: "/assessment-card", labelKey: "nav.assessmentCard" },
  { to: "/video-guidance", label: "Video Guides" },
  { to: "/assessment-checklist", label: "Assessment Checklist" },
  { to: "/benefit-calculators", label: "Benefit Calculators" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHighContrast, toggleHighContrast] = useHighContrastMode();
  const [isDyslexiaFont, toggleDyslexiaFont] = useDyslexiaFont();
  const [notices] = useLocalStorage<
    Array<{
      id: string;
      title: string;
      body: string;
      date: string;
      active: boolean;
    }>
  >("pip-notices", []);
  const activeNotices = notices.filter((n) => n.active);
  const [textSize, setTextSize] = useTextSize();
  const { language, setLanguage, t } = useLanguage();
  const { easyRead, setEasyRead } = useAccessibility();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {/* Easy Read banner */}
      {easyRead && (
        <div className="bg-primary/10 border-b border-primary/20 text-center px-4 py-2 text-xs text-primary font-medium">
          Easy Read mode is on — content is shown in simpler language.
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: back button + logo */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Global back button — hidden on home page */}
            {!isHome && (
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1.5 flex-shrink-0"
                aria-label="Go back to previous page"
                data-ocid="nav.button"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs font-medium hidden sm:inline">
                  Back
                </span>
              </button>
            )}

            {/* Logo / App Name */}
            <Link
              to="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md flex-shrink-0"
              aria-label="PIP Prep Tool - Home"
              data-ocid="nav.link"
            >
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
                <span
                  className="text-primary-foreground font-bold text-sm"
                  aria-hidden="true"
                >
                  P
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="font-heading font-bold text-foreground text-lg leading-none block">
                  PIP Prep Tool
                </span>
                <span className="text-muted-foreground text-xs leading-none">
                  Preparation guidance only
                </span>
              </div>
              <span className="sm:hidden font-heading font-bold text-foreground text-lg">
                PIP Prep
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-0.5 flex-wrap"
            aria-label="Main navigation"
          >
            {mainNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-xs px-2 py-1.5 ${isActive(link.to) ? "nav-link-active" : ""}`}
                aria-current={isActive(link.to) ? "page" : undefined}
                data-ocid="nav.link"
              >
                {link.labelKey === "nav.summary" ? (
                  <span className="flex items-center gap-1">
                    <Printer className="w-3 h-3" aria-hidden="true" />
                    {t(link.labelKey)}
                  </span>
                ) : (
                  t(link.labelKey)
                )}
              </Link>
            ))}

            <div className="w-px h-4 bg-border mx-1" aria-hidden="true" />

            {guideNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-xs px-2 py-1.5 ${isActive(link.to) ? "nav-link-active" : ""}`}
                aria-current={isActive(link.to) ? "page" : undefined}
                data-ocid="nav.link"
              >
                {"label" in link
                  ? (link as { label: string }).label
                  : t((link as { labelKey: string }).labelKey)}
              </Link>
            ))}

            <div className="w-px h-4 bg-border mx-1" aria-hidden="true" />

            <Link
              to="/admin"
              className={`nav-link text-xs px-2 py-1.5 opacity-60 hover:opacity-100 ${
                isActive("/admin") ? "nav-link-active opacity-100" : ""
              }`}
              aria-current={isActive("/admin") ? "page" : undefined}
              data-ocid="nav.link"
            >
              {t("nav.admin")}
            </Link>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="hidden sm:flex items-center rounded-md border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                aria-label="English language"
                className={`px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-ocid="nav.toggle"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("cy")}
                aria-pressed={language === "cy"}
                aria-label="Welsh language / Cymraeg"
                className={`px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  language === "cy"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-ocid="nav.toggle"
              >
                CY
              </button>
            </div>

            {/* Easy Read toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEasyRead(!easyRead)}
              aria-pressed={easyRead}
              aria-label={
                easyRead ? "Disable Easy Read mode" : "Enable Easy Read mode"
              }
              className="hidden sm:flex items-center gap-1.5 text-xs"
              data-ocid="nav.toggle"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden xl:inline">{t("common.easyRead")}</span>
            </Button>

            {/* Text size controls - desktop */}
            <fieldset className="hidden sm:flex items-center gap-0.5">
              <legend className="sr-only">Text size</legend>
              {(
                [
                  {
                    size: "normal" as const,
                    label: "A",
                    ariaLabel: "Normal text size",
                  },
                  {
                    size: "large" as const,
                    label: "A+",
                    ariaLabel: "Large text size",
                  },
                  {
                    size: "xl" as const,
                    label: "A++",
                    ariaLabel: "Extra large text size",
                  },
                ] as const
              ).map(({ size, label, ariaLabel }) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setTextSize(size)}
                  aria-pressed={textSize === size}
                  aria-label={ariaLabel}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    textSize === size
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid="nav.toggle"
                >
                  {label}
                </button>
              ))}
            </fieldset>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleHighContrast}
              aria-pressed={isHighContrast}
              aria-label={
                isHighContrast
                  ? "Disable high contrast mode"
                  : "Enable high contrast mode"
              }
              className="hidden sm:flex items-center gap-1.5 text-xs"
            >
              <Contrast className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden xl:inline">
                {t("common.highContrast")}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleDyslexiaFont}
              aria-pressed={isDyslexiaFont}
              aria-label={
                isDyslexiaFont
                  ? "Disable dyslexia-friendly font"
                  : "Enable dyslexia-friendly font"
              }
              className="hidden sm:flex items-center gap-1.5 text-xs"
              data-ocid="nav.toggle"
            >
              <Type className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden xl:inline">Dyslexia Font</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* News ticker */}
      {activeNotices.length > 0 && (
        <section
          className="bg-primary text-primary-foreground overflow-hidden"
          aria-label="Important notices"
        >
          <div className="animate-marquee whitespace-nowrap py-1.5 text-sm font-medium flex gap-8">
            {activeNotices.map((n) => (
              <span key={n.id} className="px-4">
                📢 {n.title}: {n.body}
              </span>
            ))}
            {activeNotices.map((n) => (
              <span key={`${n.id}-dup`} className="px-4">
                📢 {n.title}: {n.body}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="lg:hidden border-t border-border bg-card"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              Main
            </p>
            <div className="space-y-0.5">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block nav-link text-sm ${isActive(link.to) ? "nav-link-active" : ""}`}
                  aria-current={isActive(link.to) ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {"label" in link
                    ? (link as { label: string }).label
                    : t((link as { labelKey: string }).labelKey)}
                </Link>
              ))}
            </div>

            <div className="border-t border-border my-3" />

            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              Guides
            </p>
            <div className="space-y-0.5">
              {guideNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block nav-link text-sm ${isActive(link.to) ? "nav-link-active" : ""}`}
                  aria-current={isActive(link.to) ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {"label" in link ? link.label : t(link.labelKey)}
                </Link>
              ))}
            </div>

            <div className="border-t border-border my-3" />

            <Link
              to="/admin"
              className={`block nav-link text-sm opacity-60 hover:opacity-100 ${
                isActive("/admin") ? "nav-link-active opacity-100" : ""
              }`}
              aria-current={isActive("/admin") ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
            >
              {t("nav.admin")}
            </Link>

            <div className="border-t border-border mt-3 pt-3 space-y-3">
              {/* Language toggle mobile */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                  Language
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    aria-pressed={language === "en"}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      language === "en"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                    data-ocid="nav.toggle"
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("cy")}
                    aria-pressed={language === "cy"}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      language === "cy"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                    data-ocid="nav.toggle"
                  >
                    Cymraeg
                  </button>
                </div>
              </div>

              {/* Easy Read mobile */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEasyRead(!easyRead)}
                aria-pressed={easyRead}
                className="w-full flex items-center gap-2 justify-center"
                data-ocid="nav.toggle"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                {easyRead ? "Disable Easy Read" : "Enable Easy Read"}
              </Button>

              {/* Text size */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                  Text Size
                </p>
                <div className="flex gap-2">
                  {(
                    [
                      { size: "normal" as const, label: "A - Normal" },
                      { size: "large" as const, label: "A+ Large" },
                      { size: "xl" as const, label: "A++ XL" },
                    ] as const
                  ).map(({ size, label }) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTextSize(size)}
                      aria-pressed={textSize === size}
                      className={`flex-1 py-1.5 rounded text-xs font-semibold transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        textSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid="nav.toggle"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleHighContrast}
                aria-pressed={isHighContrast}
                aria-label={
                  isHighContrast
                    ? "Disable high contrast mode"
                    : "Enable high contrast mode"
                }
                className="w-full flex items-center gap-2 justify-center"
              >
                <Contrast className="w-4 h-4" aria-hidden="true" />
                {isHighContrast
                  ? "Disable High Contrast"
                  : "Enable High Contrast"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleDyslexiaFont}
                aria-pressed={isDyslexiaFont}
                aria-label={
                  isDyslexiaFont
                    ? "Disable dyslexia-friendly font"
                    : "Enable dyslexia-friendly font"
                }
                className="w-full flex items-center gap-2 justify-center"
                data-ocid="nav.toggle"
              >
                <Type className="w-4 h-4" aria-hidden="true" />
                {isDyslexiaFont
                  ? "Disable Dyslexia Font"
                  : "Enable Dyslexia Font"}
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
