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
  Megaphone,
  Pencil,
  Shield,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ADMIN_PIN = "2024ForrealDanBowie";

interface SupportLink {
  id: string;
  title: string;
  url: string;
}

interface AdConfig {
  imageUrl: string;
  linkUrl: string;
  text: string;
}

const DEFAULT_AD: AdConfig = { imageUrl: "", linkUrl: "", text: "" };

export function Footer() {
  const year = new Date().getFullYear();
  const [supportLinks] = useLocalStorage<SupportLink[]>(
    "pip-support-links",
    [],
  );

  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "unknown-app";

  // --- Visit counter ---
  const [visitCount, setVisitCount] = useState(0);
  useEffect(() => {
    const stored = Number.parseInt(
      localStorage.getItem("pip-visit-count") ?? "0",
      10,
    );
    const next = stored + 1;
    localStorage.setItem("pip-visit-count", String(next));
    setVisitCount(next);
  }, []);

  // --- Donation link ---
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

  const submitPin = (context: "donation" | "ad") => {
    if (pin === ADMIN_PIN) {
      setShowPinPrompt(false);
      setPin("");
      if (context === "donation") {
        setDraft(paypalLink);
        setEditing(true);
      } else {
        setAdDraft({ ...adConfig });
        setEditingAd(true);
      }
    } else {
      setPinError(true);
      setPin("");
      pinRef.current?.focus();
    }
  };

  const cancelPin = () => {
    setShowPinPrompt(false);
    setPinPromptContext(null);
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

  // --- Ad section ---
  const [adConfig, setAdConfig] = useLocalStorage<AdConfig>(
    "pip-ad",
    DEFAULT_AD,
  );
  const [editingAd, setEditingAd] = useState(false);
  const [adDraft, setAdDraft] = useState<AdConfig>({ ...DEFAULT_AD });
  const [pinPromptContext, setPinPromptContext] = useState<
    "donation" | "ad" | null
  >(null);
  const adPinRef = useRef<HTMLInputElement>(null);

  const openAdPinPrompt = () => {
    setPin("");
    setPinError(false);
    setPinPromptContext("ad");
    setShowPinPrompt(true);
    setTimeout(() => adPinRef.current?.focus(), 50);
  };

  const openDonationPinPrompt = () => {
    setPinPromptContext("donation");
    openPinPrompt();
  };

  const hasAd = adConfig.imageUrl.trim() !== "" || adConfig.text.trim() !== "";

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Sponsored Ad Banner */}
      {(hasAd || editingAd) && (
        <div className="border-b border-border bg-muted/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
              Sponsored
            </p>
            {hasAd && !editingAd && (
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-background rounded-xl border border-border p-4 shadow-sm">
                {adConfig.imageUrl && (
                  <div className="flex-shrink-0">
                    <img
                      src={adConfig.imageUrl}
                      alt="Sponsored advertisement"
                      className="h-16 w-auto max-w-[120px] object-contain rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left">
                  {adConfig.text && (
                    <p className="text-sm text-foreground leading-relaxed">
                      {adConfig.linkUrl ? (
                        <a
                          href={adConfig.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary underline"
                          data-ocid="ad.link"
                        >
                          {adConfig.text}
                        </a>
                      ) : (
                        adConfig.text
                      )}
                    </p>
                  )}
                  {adConfig.linkUrl && !adConfig.text && (
                    <a
                      href={adConfig.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline"
                      data-ocid="ad.link"
                    >
                      Visit Sponsor ↗
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Ad Edit Form */}
            {editingAd && (
              <div className="bg-background rounded-xl border border-border p-4 shadow-sm space-y-3">
                <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Megaphone className="w-3.5 h-3.5" />
                  Edit Advertisement
                </p>
                <div className="space-y-2">
                  <div>
                    <label
                      htmlFor="ad-image-url"
                      className="text-xs text-muted-foreground block mb-1"
                    >
                      Ad Image URL
                    </label>
                    <Input
                      id="ad-image-url"
                      value={adDraft.imageUrl}
                      onChange={(e) =>
                        setAdDraft((p) => ({ ...p, imageUrl: e.target.value }))
                      }
                      placeholder="https://example.com/image.png"
                      className="text-xs h-8"
                      data-ocid="ad.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ad-link-url"
                      className="text-xs text-muted-foreground block mb-1"
                    >
                      Ad Link URL
                    </label>
                    <Input
                      id="ad-link-url"
                      value={adDraft.linkUrl}
                      onChange={(e) =>
                        setAdDraft((p) => ({ ...p, linkUrl: e.target.value }))
                      }
                      placeholder="https://example.com"
                      className="text-xs h-8"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ad-text"
                      className="text-xs text-muted-foreground block mb-1"
                    >
                      Ad Text
                    </label>
                    <Input
                      id="ad-text"
                      value={adDraft.text}
                      onChange={(e) =>
                        setAdDraft((p) => ({ ...p, text: e.target.value }))
                      }
                      placeholder="Sponsored message..."
                      className="text-xs h-8"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => {
                      setAdConfig(adDraft);
                      setEditingAd(false);
                    }}
                    data-ocid="ad.save_button"
                  >
                    Save Ad
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7"
                    onClick={() => {
                      setAdConfig(DEFAULT_AD);
                      setAdDraft({ ...DEFAULT_AD });
                      setEditingAd(false);
                    }}
                    data-ocid="ad.delete_button"
                  >
                    Clear Ad
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7"
                    onClick={() => setEditingAd(false)}
                    data-ocid="ad.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Ad pin prompt */}
            {!editingAd && showPinPrompt && pinPromptContext === "ad" && (
              <div className="flex flex-col gap-2 w-full max-w-sm mt-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    Enter admin password
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    ref={adPinRef}
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
                      if (e.key === "Enter") submitPin("ad");
                      if (e.key === "Escape") cancelPin();
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => submitPin("ad")}
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
            )}

            {/* Admin gear button for ad */}
            {!editingAd && !(showPinPrompt && pinPromptContext === "ad") && (
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={openAdPinPrompt}
                  className="text-muted-foreground hover:text-primary transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Manage advertisement"
                  title="Admin: Manage advertisement"
                  data-ocid="ad.open_modal_button"
                >
                  <Megaphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ad section toggle when no ad exists yet */}
      {!hasAd && !editingAd && (
        <div className="border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex justify-end">
            {showPinPrompt && pinPromptContext === "ad" ? (
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    Enter admin password to add an ad
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    ref={adPinRef}
                    type="password"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setPinError(false);
                    }}
                    placeholder="Password"
                    className={`text-xs h-8 ${pinError ? "border-destructive" : ""}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitPin("ad");
                      if (e.key === "Escape") cancelPin();
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => submitPin("ad")}
                    className="text-success hover:text-success/80 p-1 rounded"
                    aria-label="Confirm"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={cancelPin}
                    className="text-muted-foreground hover:text-destructive p-1 rounded"
                    aria-label="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {pinError && (
                  <p className="text-xs text-destructive">
                    Incorrect password.
                  </p>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={openAdPinPrompt}
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 p-1 rounded"
                title="Admin: Add advertisement"
                data-ocid="ad.open_modal_button"
              >
                <Megaphone className="w-3 h-3" />
                <span>Add ad</span>
              </button>
            )}
          </div>
        </div>
      )}

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
                    data-ocid="donation.input"
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
              ) : showPinPrompt && pinPromptContext === "donation" ? (
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
                        if (e.key === "Enter") submitPin("donation");
                        if (e.key === "Escape") cancelPin();
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => submitPin("donation")}
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
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {paypalLink ? (
                    <a
                      href={paypalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                      data-ocid="donation.link"
                    >
                      <Button
                        size="sm"
                        className="text-xs h-8 gap-1.5"
                        data-ocid="donation.primary_button"
                      >
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
                    onClick={openDonationPinPrompt}
                    className="text-muted-foreground hover:text-primary transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={
                      paypalLink ? "Edit donation link" : "Add donation link"
                    }
                    title={
                      paypalLink ? "Edit donation link" : "Add your PayPal link"
                    }
                    data-ocid="donation.edit_button"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Support Links Section */}
      {supportLinks.length > 0 && (
        <div className="border-b border-border bg-muted/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span aria-hidden="true">❤️</span> Support Our Work
            </p>
            <div className="flex flex-wrap gap-3">
              {supportLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  data-ocid="support.link"
                >
                  {link.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

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
              <Link
                to="/feedback"
                className="text-xs text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
              >
                Share Feedback
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
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            {visitCount > 0 && (
              <p
                className="text-xs text-muted-foreground"
                data-ocid="visits.panel"
              >
                Visits: {visitCount.toLocaleString()}
              </p>
            )}
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
      </div>
    </footer>
  );
}
