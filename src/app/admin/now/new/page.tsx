import { AdminHeader } from "@/components/admin/admin-header";
import { Card } from "@/components/ui/card";
import { NowForm } from "@/components/admin/now-form";
import { createNowItem } from "@/lib/actions/now-actions";

export default function NewNowItemPage() {
  return (
    <>
      <AdminHeader title="New item" description="Add something you're working on." />
      <Card className="p-6">
        <NowForm action={createNowItem} submitLabel="Create item" />
      </Card>
    </>
  );
}
