"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f1f5f9", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: "28rem", padding: "2rem", background: "white", borderRadius: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>Something went wrong</h1>
          <p style={{ color: "#475569", fontSize: "0.875rem", marginBottom: "1.5rem" }}>A critical error occurred. Try again or go home.</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{ padding: "0.5rem 1rem", background: "#34C759", color: "white", border: "none", borderRadius: "0.5rem", fontWeight: 500, cursor: "pointer" }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{ padding: "0.5rem 1rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", color: "#334155", textDecoration: "none", fontWeight: 500 }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
