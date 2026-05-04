"use client";

import { useEffect } from "react";

export default function StudioRedirect({ url }: { url: string }) {
  useEffect(() => {
    if (url && typeof window !== "undefined") {
      window.location.replace(url);
    }
  }, [url]);

  return (
    <div
      id="studio-page"
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      <div
        className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center"
        style={{ color: "#1e293b" }}
      >
        <p className="text-lg font-medium" style={{ color: "#475569" }}>
          Redirecting to Sanity Studio…
        </p>
        <p className="text-sm mt-2" style={{ color: "#94a3b8" }}>
          <a href={url} style={{ color: "#34C759" }}>
            Click here if nothing happens
          </a>
        </p>
      </div>
    </div>
  );
}
