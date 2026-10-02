"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";

import { Field, Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/validations";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        if (payload.fieldErrors) {
          Object.entries(payload.fieldErrors).forEach(([key, messages]) => {
            const msg = Array.isArray(messages) ? messages[0] : String(messages);
            setError(key as keyof ContactInput, { message: msg });
          });
        }
        setServerError(payload.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      reset();
      setStatus("success");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border-brutal shadow-brutal flex flex-col items-center gap-3 bg-brand-lime p-8 text-center text-ink">
        <CheckCircle2 className="h-12 w-12" />
        <h3 className="font-display text-2xl font-black">Message sent!</h3>
        <p className="max-w-sm text-sm">
          Thanks for reaching out — I&apos;ll get back to you as soon as I can.
        </p>
        <Button variant="primary" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* Honeypot field (hidden from users, catches bots) */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={errors.name?.message}>
          <Input
            id="name"
            placeholder="Jane Doe"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="subject" error={errors.subject?.message}>
        <Input
          id="subject"
          placeholder="What's this about?"
          aria-invalid={!!errors.subject}
          {...register("subject")}
        />
      </Field>

      <Field
        label="Message"
        htmlFor="message"
        required
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          rows={6}
          placeholder="Tell me a bit about your project, role, or question..."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      {serverError ? (
        <p
          role="alert"
          className="border-brutal flex items-center gap-2 bg-brand-red/10 p-3 text-sm font-semibold text-brand-red"
        >
          <AlertCircle className="h-4 w-4 shrink-0" /> {serverError}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-fit"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" /> Send message
          </>
        )}
      </Button>
    </form>
  );
}
