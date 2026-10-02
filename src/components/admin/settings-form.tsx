"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Field, Input, Textarea } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import { updateSettings } from "@/lib/actions/settings-actions";
import type { ActionResult } from "@/lib/actions/guard";
import type { SiteSettings } from "@/types/content";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useActionState<ActionResult | undefined, FormData>(
    updateSettings,
    undefined,
  );
  const fe = state && !state.ok ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state?.ok ? (
        <p
          role="status"
          className="border-brutal flex items-center gap-2 bg-brand-lime p-3 text-sm font-semibold text-ink"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" /> Settings saved.
        </p>
      ) : null}
      {state && !state.ok ? (
        <p
          role="alert"
          className="border-brutal flex items-center gap-2 bg-brand-red/10 p-3 text-sm font-semibold text-brand-red"
        >
          <AlertCircle className="h-4 w-4 shrink-0" /> {state.error}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName" required error={fe?.fullName?.[0]}>
          <Input id="fullName" name="fullName" defaultValue={settings.fullName} required />
        </Field>
        <Field label="Tagline" htmlFor="tagline" required error={fe?.tagline?.[0]}>
          <Input id="tagline" name="tagline" defaultValue={settings.tagline} required />
        </Field>
      </div>

      <Field label="Bio" htmlFor="bio" required error={fe?.bio?.[0]}>
        <Textarea id="bio" name="bio" rows={3} defaultValue={settings.bio} required />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email" htmlFor="email" required error={fe?.email?.[0]}>
          <Input id="email" name="email" type="email" defaultValue={settings.email} required />
        </Field>
        <Field label="Location" htmlFor="location">
          <Input id="location" name="location" defaultValue={settings.location ?? ""} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="GitHub URL" htmlFor="githubUrl" error={fe?.githubUrl?.[0]}>
          <Input id="githubUrl" name="githubUrl" type="url" defaultValue={settings.githubUrl ?? ""} />
        </Field>
        <Field label="LinkedIn URL" htmlFor="linkedinUrl" error={fe?.linkedinUrl?.[0]}>
          <Input id="linkedinUrl" name="linkedinUrl" type="url" defaultValue={settings.linkedinUrl ?? ""} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Twitter URL" htmlFor="twitterUrl" error={fe?.twitterUrl?.[0]}>
          <Input id="twitterUrl" name="twitterUrl" type="url" defaultValue={settings.twitterUrl ?? ""} />
        </Field>
        <Field label="Website URL" htmlFor="websiteUrl" error={fe?.websiteUrl?.[0]}>
          <Input id="websiteUrl" name="websiteUrl" type="url" defaultValue={settings.websiteUrl ?? ""} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Resume URL" htmlFor="resumeUrl" hint="Path or URL to your resume PDF.">
          <Input id="resumeUrl" name="resumeUrl" defaultValue={settings.resumeUrl ?? ""} />
        </Field>
        <Field label="Avatar URL" htmlFor="avatarUrl" error={fe?.avatarUrl?.[0]}>
          <Input id="avatarUrl" name="avatarUrl" type="url" defaultValue={settings.avatarUrl ?? ""} />
        </Field>
      </div>

      <div className="border-t-[3px] border-border pt-5">
        <SubmitButton>Save settings</SubmitButton>
      </div>
    </form>
  );
}
