"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Field, Input, Textarea } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import type { ActionResult } from "@/lib/actions/guard";

type Action = (
  prev: ActionResult | undefined,
  formData: FormData,
) => Promise<ActionResult>;

export interface MissionFormData {
  title: string;
  location: string;
  date: string;
  body: string;
  order: number;
  photos: string; // pre-serialized "url | caption | location | date" lines
}

export function MissionForm({
  action,
  story,
  submitLabel = "Save",
}: {
  action: Action;
  story?: MissionFormData;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState<ActionResult | undefined, FormData>(
    action,
    undefined,
  );
  const fe = state && !state.ok ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state && !state.ok ? (
        <p
          role="alert"
          className="border-brutal flex items-center gap-2 bg-brand-red/10 p-3 text-sm font-semibold text-brand-red"
        >
          <AlertCircle className="h-4 w-4 shrink-0" /> {state.error}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title" htmlFor="title" required error={fe?.title?.[0]}>
          <Input id="title" name="title" defaultValue={story?.title} required />
        </Field>
        <Field label="Location" htmlFor="location" required error={fe?.location?.[0]}>
          <Input id="location" name="location" defaultValue={story?.location} required />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Date" htmlFor="date" required error={fe?.date?.[0]}>
          <Input id="date" name="date" type="date" defaultValue={story?.date} required />
        </Field>
        <Field label="Display order" htmlFor="order">
          <Input id="order" name="order" type="number" min={0} defaultValue={story?.order ?? 0} />
        </Field>
      </div>

      <Field label="Story" htmlFor="body" required error={fe?.body?.[0]}>
        <Textarea id="body" name="body" rows={5} defaultValue={story?.body} required />
      </Field>

      <Field
        label="Photos"
        htmlFor="photos"
        hint="One per line: url | caption | location | YYYY-MM-DD (only the URL is required)."
      >
        <Textarea
          id="photos"
          name="photos"
          rows={5}
          defaultValue={story?.photos}
          placeholder={"https://example.com/photo.jpg | A great day | City | 2021-03-05"}
        />
      </Field>

      <div className="flex gap-3 border-t-[3px] border-border pt-5">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/mission"
          className="border-brutal shadow-brutal-sm hover-brutal inline-flex items-center bg-surface px-5 py-2.5 font-display font-bold"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
