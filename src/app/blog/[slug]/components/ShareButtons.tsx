"use client";

import { useState } from "react";
import { Linkedin, Twitter, Link2, Check } from "lucide-react";

interface Props {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `https://anduber.org/blog/${slug}`;

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const baseBtn =
    "inline-flex items-center justify-center w-9 h-9 rounded-full border border-token-glass bg-token-secondary text-token-primary hover:border-gold-500/50 dark:hover:border-gold-400/50 hover:text-token-gold transition-all";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={baseBtn}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" aria-hidden="true" />
      </a>
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={baseBtn}
        aria-label="Share on X (Twitter)"
        title="Share on X (Twitter)"
      >
        <Twitter className="w-4 h-4" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={copy}
        className={baseBtn}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Copied" : "Copy link"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-token-teal" aria-hidden="true" />
        ) : (
          <Link2 className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
