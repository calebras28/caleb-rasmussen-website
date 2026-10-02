"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Field, Input, Textarea, Select } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import type { ActionResult } from "@/lib/actions/guard";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/validations";
import { categoryLabels, statusLabels } from "@/lib/labels";
import type { Project } from "@/types/content";

type Action = (
  prev: ActionResult | undefined,
  formData: FormData,
) => Promise<ActionResult>;

export function ProjectForm({
  action,
  project,
  submitLabel = "Save project",
}: {
  action: Action;
  project?: Project;
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
          <Input id="title" name="title" defaultValue={project?.title} required />
        </Field>
        <Field label="Slug" htmlFor="slug" required error={fe?.slug?.[0]} hint="URL: /projects/your-slug">
          <Input id="slug" name="slug" defaultValue={project?.slug} required />
        </Field>
      </div>

      <Field label="Summary" htmlFor="summary" required error={fe?.summary?.[0]} hint="One-line description shown on cards.">
        <Input id="summary" name="summary" defaultValue={project?.summary} required />
      </Field>

      <Field label="Description" htmlFor="description" required error={fe?.description?.[0]}>
        <Textarea id="description" name="description" rows={4} defaultValue={project?.description} required />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Category" htmlFor="category">
          <Select id="category" name="category" defaultValue={project?.category ?? "FULLSTACK"}>
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Status" htmlFor="status">
          <Select id="status" name="status" defaultValue={project?.status ?? "COMPLETED"}>
            {PROJECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Date" htmlFor="date" required error={fe?.date?.[0]}>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={project?.date ? project.date.slice(0, 10) : ""}
            required
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="GitHub URL" htmlFor="githubUrl" error={fe?.githubUrl?.[0]}>
          <Input id="githubUrl" name="githubUrl" type="url" defaultValue={project?.githubUrl ?? ""} />
        </Field>
        <Field label="Live URL" htmlFor="liveUrl" error={fe?.liveUrl?.[0]}>
          <Input id="liveUrl" name="liveUrl" type="url" defaultValue={project?.liveUrl ?? ""} />
        </Field>
      </div>

      <Field label="Cover image URL" htmlFor="coverImage" error={fe?.coverImage?.[0]}>
        <Input id="coverImage" name="coverImage" type="url" defaultValue={project?.coverImage ?? ""} />
      </Field>

      <Field label="Technologies" htmlFor="technologies" hint="One per line.">
        <Textarea
          id="technologies"
          name="technologies"
          rows={4}
          defaultValue={project?.technologies.join("\n")}
          placeholder={"Next.js\nTypeScript\nPostgreSQL"}
        />
      </Field>

      <Field label="Key features" htmlFor="features" hint="One per line.">
        <Textarea
          id="features"
          name="features"
          rows={4}
          defaultValue={project?.features.join("\n")}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Problem" htmlFor="problem">
          <Textarea id="problem" name="problem" rows={3} defaultValue={project?.problem ?? ""} />
        </Field>
        <Field label="Solution" htmlFor="solution">
          <Textarea id="solution" name="solution" rows={3} defaultValue={project?.solution ?? ""} />
        </Field>
      </div>

      <Field label="Technical architecture" htmlFor="architecture">
        <Textarea id="architecture" name="architecture" rows={3} defaultValue={project?.architecture ?? ""} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Challenges" htmlFor="challenges">
          <Textarea id="challenges" name="challenges" rows={3} defaultValue={project?.challenges ?? ""} />
        </Field>
        <Field label="What I learned" htmlFor="whatILearned">
          <Textarea id="whatILearned" name="whatILearned" rows={3} defaultValue={project?.whatILearned ?? ""} />
        </Field>
      </div>

      <Field label="Future improvements" htmlFor="futureImprovements">
        <Textarea
          id="futureImprovements"
          name="futureImprovements"
          rows={3}
          defaultValue={project?.futureImprovements ?? ""}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Display order" htmlFor="order" hint="Lower numbers appear first.">
          <Input id="order" name="order" type="number" min={0} defaultValue={project?.order ?? 0} />
        </Field>
        <label className="flex items-center gap-3 self-end pb-3">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured}
            className="h-5 w-5 border-brutal accent-[var(--accent)]"
          />
          <span className="font-display text-sm font-bold uppercase tracking-wide">
            Featured project
          </span>
        </label>
      </div>

      <div className="flex gap-3 border-t-[3px] border-border pt-5">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/projects"
          className="border-brutal shadow-brutal-sm hover-brutal inline-flex items-center bg-surface px-5 py-2.5 font-display font-bold"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
