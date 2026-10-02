import { AdminHeader } from "@/components/admin/admin-header";
import { Card } from "@/components/ui/card";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteSettings } from "@/lib/content";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <AdminHeader
        title="Site settings"
        description="Your identity, bio, and social links. These power the whole site."
      />
      <Card className="p-6">
        <SettingsForm settings={settings} />
      </Card>
    </>
  );
}
