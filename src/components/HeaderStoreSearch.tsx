"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Store } from "@/types/store";
import StoreLogo from "@/components/StoreLogo";

/** Name or slug starts with query, or any word in the store name starts with query (e.g. "Best Amazon" + "a" → Amazon). */
function storeMatchesPrefix(s: Store, q: string): boolean {
  const rawName = (s.name ?? "").trim().toLowerCase();
  const slug = (s.slug ?? "").trim().toLowerCase();
  if (!q) return false;
  if (rawName.startsWith(q) || slug.startsWith(q)) return true;
  return rawName.split(/\s+/).some((w) => w.length > 0 && w.startsWith(q));
}

function filterStores(stores: Store[], raw: string): Store[] {
  const q = raw.trim().toLowerCase();
  if (!q) return [];
  return stores.filter((s) => storeMatchesPrefix(s, q));
}

type Props = {
  variant: "desktop" | "mobile";
  onPickStore?: () => void;
};

const MAX_SUGGESTIONS = 10;

export default function HeaderStoreSearch({ variant, onPickStore }: Props) {
  const [stores, setStores] = useState<Store[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/stores", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        setStores(
          Array.isArray(data) ? data.filter((s: Store) => s.status !== "disable") : []
        );
      } catch {
        if (!cancelled) setStores([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const matches = useMemo(() => {
    const list = filterStores(stores, q);
    const qn = q.trim().toLowerCase();
    return [...list].sort((a, b) => {
      const an = (a.name ?? "").toLowerCase();
      const bn = (b.name ?? "").toLowerCase();
      const aStarts = an.startsWith(qn) ? 0 : 1;
      const bStarts = bn.startsWith(qn) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return an.localeCompare(bn);
    });
  }, [stores, q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el || !open) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const showPanel = open && q.trim().length > 0;

  const formClass =
    variant === "desktop"
      ? "w-full max-w-[220px] flex rounded-full border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-[#34C759] focus-within:ring-2 focus-within:ring-[#34C759]/20 transition-all"
      : "flex gap-0 w-full rounded-lg border border-gray-200 bg-gray-50 focus-within:ring-2 focus-within:ring-[#34C759]/30 focus-within:border-[#34C759]";

  const inputClass =
    variant === "desktop"
      ? "flex-1 min-w-0 rounded-l-full bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
      : "flex-1 min-w-0 rounded-l-lg bg-transparent px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none";

  const btnClass =
    variant === "desktop"
      ? "rounded-r-full bg-[#34C759] px-4 py-2.5 text-white hover:bg-[#2db34d] transition-colors flex-shrink-0"
      : "rounded-r-lg bg-[#34C759] px-4 py-3 text-white hover:bg-[#2db34d] transition-colors flex-shrink-0";

  const afterPick = useCallback(() => {
    setOpen(false);
    setQ("");
    onPickStore?.();
  }, [onPickStore]);

  return (
    <div ref={wrapRef} className={variant === "desktop" ? "relative w-full max-w-[220px]" : "relative w-full"}>
      <form action="/stores" method="GET" className={formClass} autoComplete="off">
        {/* Hidden field submits ?q=… ; visible field has no name so the browser does not attach search history / autofill UI */}
        <input type="hidden" name="q" value={q} aria-hidden="true" tabIndex={-1} />
        <input
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={q}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Search stores..."
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className={inputClass}
        />
        <button type="submit" aria-label="Search" className={btnClass}>
          <svg
            className={variant === "desktop" ? "h-4 w-4" : "h-5 w-5"}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {showPanel && (
        <ul className="absolute left-0 right-0 top-full z-[60] mt-1 max-h-72 overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          {matches.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-500">No stores match. Press Enter to search.</li>
          ) : (
            <>
              {matches
                .filter((s) => (s.slug ?? "").trim().length > 0)
                .slice(0, MAX_SUGGESTIONS)
                .map((s) => {
                const slug = (s.slug ?? "").trim();
                return (
                  <li key={s.id}>
                    <Link
                      href={`/stores/${encodeURIComponent(slug)}`}
                      onClick={afterPick}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-[#34C759]/10"
                    >
                      <StoreLogo name={s.name ?? "?"} logoUrl={s.logoUrl} size="xs" rounded="md" />
                      <span className="min-w-0 truncate font-medium">{s.name}</span>
                    </Link>
                  </li>
                );
              })}
              {matches.length > MAX_SUGGESTIONS && (
                <li>
                  <Link
                    href={`/stores?q=${encodeURIComponent(q.trim())}`}
                    onClick={afterPick}
                    className="block px-4 py-2.5 text-center text-sm font-medium text-[#34C759] hover:bg-[#34C759]/10"
                  >
                    View all {matches.length} matches
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
