import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  // Rate limit by IP: 5 messages per 10 minutes.
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`contact:${ip}`, 5, 10 * 60_000);
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, subject, message, company } = parsed.data;

  // Honeypot: silently accept but do nothing if the hidden field is filled.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      },
    });
  } catch (error) {
    console.error("[contact] Failed to persist message:", error);
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please try again." },
      { status: 500 },
    );
  }

  // Fire-and-forget email notification (won't fail the request).
  void sendContactNotification({ name, email, subject, message });

  return NextResponse.json({ ok: true }, { status: 201 });
}
