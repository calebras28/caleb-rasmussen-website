import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database and email modules so the route can be tested in isolation.
const createMock = vi.fn().mockResolvedValue({ id: "msg_1" });
vi.mock("@/lib/prisma", () => ({
  prisma: { contactMessage: { create: (args: unknown) => createMock(args) } },
}));
vi.mock("@/lib/email", () => ({
  sendContactNotification: vi.fn().mockResolvedValue({ sent: false }),
}));

import { POST } from "@/app/api/contact/route";

function makeRequest(body: unknown, ip: string) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    createMock.mockClear();
  });

  it("returns 400 for invalid input and does not touch the database", async () => {
    const res = await POST(
      makeRequest({ name: "", email: "bad", message: "x" }, "10.0.0.1"),
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.fieldErrors).toBeTruthy();
    expect(createMock).not.toHaveBeenCalled();
  });

  it("persists a valid message and returns 201", async () => {
    const res = await POST(
      makeRequest(
        {
          name: "Jane Doe",
          email: "jane@example.com",
          subject: "Hi",
          message: "This is a legitimate message that is long enough.",
        },
        "10.0.0.2",
      ),
    );
    expect(res.status).toBe(201);
    expect(createMock).toHaveBeenCalledTimes(1);
  });

  it("rate limits repeated requests from the same IP", async () => {
    const ip = "10.0.0.3";
    const payload = {
      name: "Jane Doe",
      email: "jane@example.com",
      message: "This is a legitimate message that is long enough.",
    };
    // Limit is 5 per window.
    for (let i = 0; i < 5; i++) {
      const ok = await POST(makeRequest(payload, ip));
      expect(ok.status).toBe(201);
    }
    const blocked = await POST(makeRequest(payload, ip));
    expect(blocked.status).toBe(429);
  });
});
