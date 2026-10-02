import { AdminHeader } from "@/components/admin/admin-header";
import { Card } from "@/components/ui/card";
import { MissionForm } from "@/components/admin/mission-form";
import { createMissionStory } from "@/lib/actions/mission-actions";

export default function NewMissionStoryPage() {
  return (
    <>
      <AdminHeader title="New mission story" description="Add a chapter to your mission timeline." />
      <Card className="p-6">
        <MissionForm action={createMissionStory} submitLabel="Create story" />
      </Card>
    </>
  );
}
