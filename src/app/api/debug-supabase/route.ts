import { getSupabase, SUPABASE_STORES_TABLE } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

/**
 * GET /api/debug-supabase
 * Returns whether Supabase is configured and connection status (no secrets).
 * Use this to verify .env and DB connection when /api/stores returns [].
 */
export async function GET() {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  )?.trim();
  const hasKey = !!(
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY
  );
  const configured = !!(url && hasKey);
  const projectRef = url
    ? url.replace(/^https:\/\//, "").replace(/\.supabase\.co.*$/, "")
    : null;

  const out: {
    configured: boolean;
    projectRef: string | null;
    connectionOk?: boolean;
    storeCount?: number;
    error?: string;
  } = { configured, projectRef };

  if (!configured) {
    return NextResponse.json({
      ...out,
      message:
        "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env",
    });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ...out, connectionOk: false });
  }

  try {
    const { count, error } = await supabase
      .from(SUPABASE_STORES_TABLE)
      .select("id", { count: "exact", head: true });
    out.connectionOk = !error;
    out.storeCount = error ? undefined : (count ?? 0);
    if (error) out.error = error.message;
  } catch (e) {
    out.connectionOk = false;
    out.error = e instanceof Error ? e.message : "Connection failed";
  }

  return NextResponse.json(out);
}
