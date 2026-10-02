"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton({ className }: { className?: string }) {
  return (
    <Button
      variant="secondary"
      onClick={() => window.print()}
      className={className}
    >
      <Printer className="h-5 w-5" /> Print
    </Button>
  );
}
