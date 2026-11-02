"use client";

import type { ReactNode } from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bottom sheet on phones, right panel (placement="side") or centered modal (placement="center") from md.
 * Radix Dialog supplies the focus trap, Escape, scroll lock and aria wiring.
 */
export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  placement = "side",
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  placement?: "side" | "center";
  className?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay" />
        <Dialog.Content data-placement={placement} className={cn("sheet-content", className)}>
          <span aria-hidden className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-line-strong md:hidden" />
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 pb-3 pt-3 md:pt-5">
            <Dialog.Title className="display text-xl">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Cerrar"
              className="grid size-10 place-items-center rounded-full text-text-2 transition-colors hover:bg-paper-2 hover:text-ink"
            >
              <X size={20} aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">{description ?? title}</Dialog.Description>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6">{children}</div>
          {footer ? (
            <div className="shrink-0 border-t border-line bg-paper px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
              {footer}
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
