import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

async function getUnreadCount(): Promise<number> {
  try {
    return await prisma.contactMessage.count({ where: { read: false } });
  } catch {
    return 0;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const unreadCount = await getUnreadCount();

  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-3 lg:grid-cols-[240px_1fr]">
      <AdminSidebar userEmail={session.user.email} unreadCount={unreadCount} />
      <div className="min-w-0 pb-10">{children}</div>
    </div>
  );
}
