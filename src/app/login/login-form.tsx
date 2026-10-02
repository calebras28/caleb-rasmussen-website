"use client";

import { useActionState } from "react";
import { AlertCircle, Loader2, LogIn } from "lucide-react";
import { authenticate, type LoginState } from "@/lib/actions/auth-actions";
import { Field, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field label="Email" htmlFor="email" required>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          required
        />
      </Field>

      <Field label="Password" htmlFor="password" required>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </Field>

      {state?.error ? (
        <p
          role="alert"
          className="border-brutal flex items-center gap-2 bg-brand-red/10 p-3 text-sm font-semibold text-brand-red"
        >
          <AlertCircle className="h-4 w-4 shrink-0" /> {state.error}
        </p>
      ) : null}

      <Button type="submit" variant="accent" size="lg" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Signing in...
          </>
        ) : (
          <>
            <LogIn className="h-5 w-5" /> Sign in
          </>
        )}
      </Button>
    </form>
  );
}
