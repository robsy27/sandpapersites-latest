import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Validates server-side (never trusts the browser), screens obvious bots,
 * then hands the enquiry to Resend over its REST API — no SDK dependency.
 *
 * Configuration, all via environment variables so no address is committed
 * to the repo:
 *   RESEND_API_KEY     required to send anything
 *   CONTACT_TO_EMAIL   where enquiries land
 *   CONTACT_FROM_EMAIL optional; defaults to Resend's shared sender, which
 *                      delivers only to your own account address until you
 *                      verify a domain
 *
 * With no key set the route replies 503 `not_configured`, and the form tells
 * the visitor to email or ring instead — so an enquiry is never silently
 * swallowed.
 */

export const dynamic = "force-dynamic";

type Payload = {
  name?: unknown;
  email?: unknown;
  businessType?: unknown;
  message?: unknown;
  /** Honeypot — real people never see this field, so anything in it is a bot. */
  company?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(body: Payload) {
  const name = asString(body.name, 120);
  const email = asString(body.email, 200);
  const businessType = asString(body.businessType, 120);
  const message = asString(body.message, 4000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Enter your name.";
  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (!businessType) errors.businessType = "Pick a business type.";
  if (!message) errors.message = "Tell me what you need.";
  else if (message.length < 15) errors.message = "A sentence or two helps.";

  return { values: { name, email, businessType, message }, errors };
}

/* Small in-memory throttle. Resets on redeploy, which is fine — it exists to
   blunt casual flooding, not as a security boundary. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  /* Bot caught by the honeypot: report success so it doesn't retry. */
  if (asString(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { values, errors } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "invalid", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Sandpaper Sites <onboarding@resend.dev>";

  const text = [
    `New enquiry from the Sandpaper Sites website`,
    ``,
    `Name:          ${values.name}`,
    `Email:         ${values.email}`,
    `Business type: ${values.businessType}`,
    ``,
    `Message:`,
    values.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        /* So hitting reply in the inbox goes straight back to the enquirer. */
        reply_to: values.email,
        subject: `Website enquiry — ${values.name} (${values.businessType})`,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the enquiry:", response.status, detail);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (cause) {
    console.error("Could not reach the mail provider:", cause);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
