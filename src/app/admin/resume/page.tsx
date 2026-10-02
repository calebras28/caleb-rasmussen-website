import { Plus } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Field, Input, Textarea, Select } from "@/components/ui/input";
import { AdminHeader } from "@/components/admin/admin-header";
import { SubmitButton } from "@/components/admin/submit-button";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  addSkill,
  deleteSkill,
} from "@/lib/actions/resume-actions";
import { prisma } from "@/lib/prisma";
import { formatDateRange } from "@/lib/utils";

async function getResumeData() {
  try {
    const [experiences, education, skills] = await Promise.all([
      prisma.experience.findMany({ orderBy: [{ order: "asc" }, { startDate: "desc" }] }),
      prisma.education.findMany({ orderBy: [{ order: "asc" }, { startDate: "desc" }] }),
      prisma.resumeSkill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
    ]);
    return { experiences, education, skills };
  } catch {
    return { experiences: [], education: [], skills: [] };
  }
}

export default async function AdminResumePage() {
  const { experiences, education, skills } = await getResumeData();

  return (
    <>
      <AdminHeader
        title="Resume"
        description="Manage your experience, education, and skills."
      />

      <div className="flex flex-col gap-10">
        {/* Experience */}
        <section>
          <h2 className="mb-3 font-display text-xl font-black">Experience</h2>
          <div className="flex flex-col gap-3">
            {experiences.map((e) => (
              <Card key={e.id} className="flex items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-bold">
                    {e.role} <span className="font-normal text-muted">· {e.company}</span>
                  </p>
                  <p className="font-mono text-xs text-muted">
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </p>
                </div>
                <DeleteButton action={deleteExperience.bind(null, e.id)} iconOnly />
              </Card>
            ))}
            {experiences.length === 0 ? (
              <p className="text-sm text-muted">No experience entries yet.</p>
            ) : null}
          </div>

          <Card className="mt-4 p-5">
            <h3 className="mb-4 font-display font-bold">Add experience</h3>
            <form action={addExperience} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Role" htmlFor="role" required>
                  <Input id="role" name="role" required />
                </Field>
                <Field label="Company" htmlFor="company" required>
                  <Input id="company" name="company" required />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Location" htmlFor="exp-location">
                  <Input id="exp-location" name="location" />
                </Field>
                <Field label="Start date" htmlFor="exp-start" required>
                  <Input id="exp-start" name="startDate" type="date" required />
                </Field>
                <Field label="End date" htmlFor="exp-end" hint="Leave blank if current.">
                  <Input id="exp-end" name="endDate" type="date" />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" name="current" className="h-4 w-4 border-brutal accent-[var(--accent)]" />
                Current role
              </label>
              <Field label="Description" htmlFor="exp-desc" required>
                <Textarea id="exp-desc" name="description" rows={2} required />
              </Field>
              <Field label="Highlights" htmlFor="exp-highlights" hint="One per line.">
                <Textarea id="exp-highlights" name="highlights" rows={3} />
              </Field>
              <div>
                <SubmitButton pendingText="Adding...">
                  <Plus className="h-4 w-4" /> Add experience
                </SubmitButton>
              </div>
            </form>
          </Card>
        </section>

        {/* Education */}
        <section>
          <h2 className="mb-3 font-display text-xl font-black">Education</h2>
          <div className="flex flex-col gap-3">
            {education.map((e) => (
              <Card key={e.id} className="flex items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-bold">
                    {e.degree} <span className="font-normal text-muted">· {e.school}</span>
                  </p>
                  <p className="font-mono text-xs text-muted">
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </p>
                </div>
                <DeleteButton action={deleteEducation.bind(null, e.id)} iconOnly />
              </Card>
            ))}
            {education.length === 0 ? (
              <p className="text-sm text-muted">No education entries yet.</p>
            ) : null}
          </div>

          <Card className="mt-4 p-5">
            <h3 className="mb-4 font-display font-bold">Add education</h3>
            <form action={addEducation} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="School" htmlFor="school" required>
                  <Input id="school" name="school" required />
                </Field>
                <Field label="Degree" htmlFor="degree" required>
                  <Input id="degree" name="degree" required />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Field of study" htmlFor="edu-field">
                  <Input id="edu-field" name="field" />
                </Field>
                <Field label="Start date" htmlFor="edu-start" required>
                  <Input id="edu-start" name="startDate" type="date" required />
                </Field>
                <Field label="End date" htmlFor="edu-end" hint="Leave blank if current.">
                  <Input id="edu-end" name="endDate" type="date" />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" name="current" className="h-4 w-4 border-brutal accent-[var(--accent)]" />
                Currently enrolled
              </label>
              <Field label="Highlights" htmlFor="edu-highlights" hint="One per line.">
                <Textarea id="edu-highlights" name="highlights" rows={3} />
              </Field>
              <div>
                <SubmitButton pendingText="Adding...">
                  <Plus className="h-4 w-4" /> Add education
                </SubmitButton>
              </div>
            </form>
          </Card>
        </section>

        {/* Skills */}
        <section>
          <h2 className="mb-3 font-display text-xl font-black">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s.id}
                className="border-brutal shadow-brutal-sm inline-flex items-center gap-2 bg-surface px-3 py-1.5 text-sm"
              >
                <span className="font-mono text-xs text-muted">{s.category}</span>
                <span className="font-semibold">{s.name}</span>
                <DeleteButton action={deleteSkill.bind(null, s.id)} iconOnly className="border-0 !p-0 shadow-none" />
              </span>
            ))}
            {skills.length === 0 ? (
              <p className="text-sm text-muted">No skills yet.</p>
            ) : null}
          </div>

          <Card className="mt-4 p-5">
            <h3 className="mb-4 font-display font-bold">Add skill</h3>
            <form action={addSkill} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Category" htmlFor="skill-category" required>
                  <Input id="skill-category" name="category" placeholder="Languages" required />
                </Field>
                <Field label="Name" htmlFor="skill-name" required>
                  <Input id="skill-name" name="name" placeholder="TypeScript" required />
                </Field>
                <Field label="Level (1-5)" htmlFor="skill-level">
                  <Select id="skill-level" name="level" defaultValue="3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <div>
                <SubmitButton pendingText="Adding...">
                  <Plus className="h-4 w-4" /> Add skill
                </SubmitButton>
              </div>
            </form>
          </Card>
        </section>
      </div>
    </>
  );
}
