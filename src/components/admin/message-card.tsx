"use client";

import { useTransition } from "react";
import { Check, Mail, MailOpen, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DeleteButton } from "./delete-button";
import { toggleMessageRead, deleteMessage } from "@/lib/actions/message-actions";
import { timeAgo } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export function MessageCard({ message }: { message: Message }) {
  const [pending, startTransition] = useTransition();

  return (
    <Card className={message.read ? "p-5" : "p-5 border-l-[6px] border-l-brand-red"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display font-bold">
            {message.name}{" "}
            {!message.read ? (
              <span className="ml-1 align-middle text-xs font-bold uppercase text-brand-red">
                New
              </span>
            ) : null}
          </p>
          <a
            href={`mailto:${message.email}`}
            className="text-sm text-accent hover:underline"
          >
            {message.email}
          </a>
        </div>
        <span className="font-mono text-xs text-muted">
          {timeAgo(message.createdAt)}
        </span>
      </div>

      {message.subject ? (
        <p className="mt-2 font-semibold">{message.subject}</p>
      ) : null}
      <p className="mt-2 whitespace-pre-wrap text-sm text-muted">
        {message.message}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 border-t-[3px] border-border pt-4">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await toggleMessageRead(message.id, !message.read);
            })
          }
          className="border-brutal shadow-brutal-sm hover-brutal inline-flex items-center gap-1.5 bg-surface px-3 py-1.5 text-sm font-bold"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : message.read ? (
            <Mail className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          {message.read ? "Mark unread" : "Mark read"}
        </button>

        <a
          href={`mailto:${message.email}${
            message.subject ? `?subject=Re: ${encodeURIComponent(message.subject)}` : ""
          }`}
          className="border-brutal shadow-brutal-sm hover-brutal inline-flex items-center gap-1.5 bg-surface px-3 py-1.5 text-sm font-bold"
        >
          <MailOpen className="h-4 w-4" /> Reply
        </a>

        <DeleteButton action={deleteMessage.bind(null, message.id)} className="ml-auto" />
      </div>
    </Card>
  );
}
