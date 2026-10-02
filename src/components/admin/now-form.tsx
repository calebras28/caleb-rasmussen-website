"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Field, Input, Textarea, Select } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import type { ActionResult } from "@/lib/actions/guard";
import { PROJECT_STATUSES } from "@/lib/validations";
import { statusLabels } from "@/lib/labels";

type Action = (
  prev: ActionResult | undefined,
  formData: FormData,
) => Promise<ActionResult>;

export interface NowFormData {
  title: string;
  description: string;
  status: string;
  progress: number;
  technologies: string[];
  goals?: string | null;
  order: number;
}

export function NowForm({
  action,
  item,
  submitLabel = "Save",
}: {
  action: Action;
  item?: NowFormData;
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

      <Field label="Title" htmlFor="title" required error={fe?.title?.[0]}>
        <Input id="title" name="title" defaultValue={item?.title} required />
      </Field>

      <Field label="Description" htmlFor="description" required error={fe?.description?.[0]}>
        <Textarea id="description" name="description" rows={3} defaultValue={item?.description} required />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Status" htmlFor="status">
          <Select id="status" name="status" defaultValue={item?.status ?? "IN_DEVELOPMENT"}>
            {PROJECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Progress (%)" htmlFor="progress" error={fe?.progress?.[0]}>
          <Input id="progress" name="progress" type="number" min={0} max={100} defaultValue={item?.progress ?? 0} />
        </Field>
        <Field label="Display order" htmlFor="order">
          <Input id="order" name="order" type="number" min={0} defaultValue={item?.order ?? 0} />
        </Field>
      </div>

      <Field label="Technologies" htmlFor="technologies" hint="One per line.">
        <Textarea
          id="technologies"
          name="technologies"
          rows={3}
          defaultValue={item?.technologies.join("\n")}
        />
      </Field>

      <Field label="Current goal" htmlFor="goals">
        <Textarea id="goals" name="goals" rows={2} defaultValue={item?.goals ?? ""} />
      </Field>

      <div className="flex gap-3 border-t-[3px] border-border pt-5">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/now"
          className="border-brutal shadow-brutal-sm hover-brutal inline-flex items-center bg-surface px-5 py-2.5 font-display font-bold"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
