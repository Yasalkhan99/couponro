"use client";

import { useCallback, useEffect, useState } from "react";

/** Square box + min size so layout never collapses when images fail or load late. */
const BOX: Record<
  "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl",
  { box: string; letter: string }
> = {
  "2xs": { box: "h-9 w-9 min-h-9 min-w-9", letter: "text-xs" },
  xs: { box: "h-10 w-10 min-h-10 min-w-10", letter: "text-sm" },
  sm: { box: "h-12 w-12 min-h-12 min-w-12", letter: "text-base" },
  md: { box: "h-14 w-14 min-h-14 min-w-14", letter: "text-lg" },
  lg: { box: "h-16 w-16 min-h-16 min-w-16", letter: "text-xl" },
  xl: { box: "h-20 w-20 min-h-20 min-w-20", letter: "text-2xl" },
  "2xl": { box: "h-24 w-24 min-h-24 min-w-24", letter: "text-3xl" },
  "3xl": { box: "h-32 w-32 min-h-32 min-w-32", letter: "text-4xl" },
};

export type StoreLogoSize = keyof typeof BOX;

const JUNK = new Set(["undefined", "null", "none", "n/a", ""]);

/**
 * Normalizes admin-entered logo URLs so <img src> can load them.
 * Handles protocol-relative URLs, bare domains, and paths saved without a leading "/".
 */
export function normalizeStoreLogoUrl(raw: string): string {
  const s = raw.trim();
  if (!s) return "";
  const lower = s.toLowerCase();
  if (JUNK.has(lower)) return "";

  if (s.startsWith("//")) return `https:${s}`;
  if (s.startsWith("https://")) return s;
  if (s.startsWith("http://")) {
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(s)) return s;
    // Avoid mixed-content blocking on HTTPS pages when the CDN supports TLS
    return `https://${s.slice(7)}`;
  }
  if (s.startsWith("data:")) return s;
  if (s.startsWith("/")) return s;

  // cdn.example.com/path/to/logo.png (no scheme)
  if (/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}\//i.test(s) || /^www\.[a-z0-9.-]+\//i.test(s)) {
    return `https://${s}`;
  }
  if (/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(s) || /^www\.[a-z0-9.-]+$/i.test(s)) {
    return `https://${s}/`;
  }

  // Relative file or API path (e.g. uploads/logo.png, storage/v1/.../public/...)
  if (!s.includes(" ") && (s.includes("/") || /\.(png|jpe?g|gif|webp|svg|avif|ico)(\?|#|$)/i.test(s))) {
    return `/${s.replace(/^\/+/, "")}`;
  }

  // Single token without slashes is unlikely to be a valid image URL
  return "";
}

type Props = {
  name: string;
  logoUrl?: string | null;
  size?: StoreLogoSize;
  className?: string;
  rounded?: "none" | "md" | "lg" | "xl";
  alt?: string;
};

const ROUNDED: Record<NonNullable<Props["rounded"]>, string> = {
  none: "rounded-none",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export default function StoreLogo({
  name,
  logoUrl,
  size = "lg",
  className = "",
  rounded = "lg",
  alt,
}: Props) {
  const raw = (logoUrl ?? "").trim();
  const src = normalizeStoreLogoUrl(raw);
  const [failed, setFailed] = useState(false);
  const showImg = src.length > 0 && !failed;
  const initial = (name?.trim() || "?").charAt(0).toUpperCase() || "?";

  useEffect(() => {
    setFailed(false);
  }, [src, raw]);

  const onError = useCallback(() => setFailed(true), []);

  const { box, letter } = BOX[size];
  const outer = `${box} ${ROUNDED[rounded]} flex shrink-0 items-center justify-center overflow-hidden border border-gray-200/90 bg-white ${className}`.trim();

  return (
    <div className={outer}>
      {showImg ? (
        <img // eslint-disable-line @next/next/no-img-element -- remote merchant logos; sizes vary
          src={src}
          alt={alt ?? `${name} logo`}
          className="max-h-[85%] max-w-[85%] h-auto w-auto object-contain object-center"
          loading="lazy"
          decoding="async"
          referrerPolicy="strict-origin-when-cross-origin"
          onError={onError}
        />
      ) : (
        <span
          className={`font-bold text-gray-500 select-none leading-none ${letter}`}
          aria-hidden
        >
          {initial}
        </span>
      )}
    </div>
  );
}
