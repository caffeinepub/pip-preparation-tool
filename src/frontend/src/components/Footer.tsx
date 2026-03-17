import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Coffee,
  ExternalLink,
  Heart,
  Lock,
  Pencil,
  Shield,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

const ADMIN_PIN = "Danielle2024";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "unknown-app";

  const [paypalLink, setPaypalLink] = useLocalStorage<string>(
    "pip-donation-link",
    "",
  );
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const pinRef = useRef<HTMLInputElement>(null);

  const openPinPrompt = () => {
    setPin("");
    setPinError(false);
    setShowPinPrompt(true);
    setTimeout(() => pinRef.current?.focus(), 50);
  };

  const submitPin = () => {
    if (pin === ADMIN_PIN) {
      setShowPinPrompt(false);
      setDraft(paypalLink);
      setEditing(true);
      setPin("");
    } else {
      setPinError(true);
      setPin("");
      pinRef.current?.focus();
    }
  };

  const cancelPin = () => {
    setShowPinPrompt(false);
    setPin("");
    setPinError(false);
  };

  const saveEdit = () => {
    setPaypalLink(draft.trim());
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Donation Section */}
      <div className="border-b border-border bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* QR Code */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="bg-white rounded-xl p-3 shadow-card border border-border">
                <img
                  src="/assets/pp_my_qrcode_1772217875112.jpg"
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
            <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left flex-1">
              <div className="flex items-center gap-2">
                <Coffee
                  className="w-4 h-4 text-primary flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-foreground">
                  Support This Tool
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                If this free tool helped you prepare for your PIP claim,
                consider buying{" "}
                <span className="font-medium text-foreground">
                  Danielle Boylan
                </span>{" "}
                a coffee ☕
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                Your support helps keep this resource free and up to date for
                everyone who needs it.
              </p>

              {/* Donation link area */}
              {editing ? (
                <div className="flex items-center gap-2 w-full max-w-sm mt-1">
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="https://paypal.me/yourname"
                    className="text-xs h-8"
                    aria-label="PayPal donation link"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="text-success hover:text-success/80 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Save donation link"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-muted-foreground hover:text-destructive p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Cancel editing"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : showPinPrompt ? (
                <div className="flex flex-col gap-2 w-full max-w-sm mt-1">
                  <div className="flex items-center gap-2">
                    <Lock
                      className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-xs text-muted-foreground">
                      Enter admin password to edit
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      ref={pinRef}
                      type="password"
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value);
                        setPinError(false);
                      }}
                      placeholder="Password"
                      className={`text-xs h-8 ${pinError ? "border-destructive" : ""}`}
                      aria-label="Admin password"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitPin();
                        if (e.key === "Escape") cancelPin();
                      }}
                    />
                    <button
                      type="button"
                      onClick={submitPin}
                      className="text-success hover:text-success/80 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="Confirm password"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={cancelPin}
                      className="text-muted-foreground hover:text-destructive p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {pinError && (
                    <p className="text-xs text-destructive">
                      Incorrect password. Try again.
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  {paypalLink ? (
                    <a
                      href={paypalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      <Button size="sm" className="text-xs h-8 gap-1.5">
                        <ExternalLink
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                        Donate via PayPal
                      </Button>
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Scan the QR code above to donate.
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={openPinPrompt}
                    className="text-muted-foreground hover:text-primary transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={
                      paypalLink ? "Edit donation link" : "Add donation link"
                    }
                    title={
                      paypalLink ? "Edit donation link" : "Add your PayPal link"
                    }
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {/* Privacy notice */}
          <div className="flex items-start gap-3">
            <Shield
              className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Your Privacy
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All data is stored locally on your device only. Nothing is sent
                to any server.{" "}
                <Link
                  to="/privacy"
                  className="text-primary underline hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                >
                  Read our Privacy Notice
                </Link>
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Important Disclaimer
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This tool is for preparation only. Not affiliated with the UK
              government or DWP. To start your claim, call{" "}
              <a
                href="tel:08009172222"
                className="text-primary underline hover:no-underline"
              >
                0800 917 2222
              </a>
              .
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Quick Links
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-1">
              <Link
                to="/privacy"
                className="text-xs text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
              >
                Privacy Notice
              </Link>
              <Link
                to="/resources"
                className="text-xs text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
              >
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
            Built with{" "}
            <Heart
              className="w-3 h-3 text-crisis fill-crisis"
              aria-label="love"
            />{" "}
            using{" "}
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
