import { Button } from "@/components/ui/button";
import { Link, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareBarProps {
  url: string;
  text?: string;
  className?: string;
}

export function ShareBar({
  url,
  text = "Free PIP preparation tool to help you claim Personal Independence Payment with confidence. No login required.",
  className = "",
}: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${text} ${url}`);

  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodedText}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleFacebook}
        aria-label="Share on Facebook"
        title="Share on Facebook"
        data-ocid="share.button"
        className="h-8 px-3 text-xs gap-1.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Facebook
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleWhatsApp}
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
        data-ocid="share.button"
        className="h-8 px-3 text-xs gap-1.5"
      >
        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
        WhatsApp
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        aria-label="Copy link"
        title="Copy link"
        data-ocid="share.button"
        className="h-8 px-3 text-xs gap-1.5"
      >
        <Link className="w-3.5 h-3.5" aria-hidden="true" />
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
