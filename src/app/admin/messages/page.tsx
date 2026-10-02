import { Card } from "@/components/ui/card";
import { AdminHeader } from "@/components/admin/admin-header";
import { MessageCard } from "@/components/admin/message-card";
import { prisma } from "@/lib/prisma";

async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <>
      <AdminHeader
        title="Messages"
        description={
          messages.length > 0
            ? `${messages.length} total · ${unread} unread`
            : "Messages from your contact form appear here."
        }
      />

      {messages.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="font-display text-lg font-bold">No messages yet</p>
          <p className="mt-1 text-sm text-muted">
            When someone uses your contact form, their message will show up here.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <MessageCard
              key={m.id}
              message={{
                id: m.id,
                name: m.name,
                email: m.email,
                subject: m.subject,
                message: m.message,
                read: m.read,
                createdAt: m.createdAt.toISOString(),
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
