import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { auth } from "@/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <span className="grid h-14 w-14 place-items-center border-brutal bg-accent text-accent-foreground shadow-brutal">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="font-display text-2xl font-black">Admin sign in</h1>
            <p className="text-sm text-muted">
              Sign in to manage your portfolio content.
            </p>
          </div>

          <LoginForm />
        </Card>

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/" className="font-semibold hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </Container>
  );
}
