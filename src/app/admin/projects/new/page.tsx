import { AdminHeader } from "@/components/admin/admin-header";
import { Card } from "@/components/ui/card";
import { ProjectForm } from "@/components/admin/project-form";
import { createProject } from "@/lib/actions/project-actions";

export default function NewProjectPage() {
  return (
    <>
      <AdminHeader title="New project" description="Add a new project to your portfolio." />
      <Card className="p-6">
        <ProjectForm action={createProject} submitLabel="Create project" />
      </Card>
    </>
  );
}
