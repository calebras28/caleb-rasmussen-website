/**
 * Optional email notifications via Resend's REST API. This is env-gated: if the
 * required variables aren't set, we simply skip sending (the message is still
 * persisted to the database). No extra dependency is required — we use fetch.
 */

interface ContactEmailPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactNotification(
  payload: ContactEmailPayload,
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    return { sent: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: payload.email,
        subject: payload.subject
          ? `[Portfolio] ${payload.subject}`
          : `[Portfolio] New message from ${payload.name}`,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
      }),
    });

    if (!res.ok) {
      return { sent: false, error: `Resend responded ${res.status}` };
    }
    return { sent: true };
  } catch (error) {
    return { sent: false, error: (error as Error).message };
  }
}
