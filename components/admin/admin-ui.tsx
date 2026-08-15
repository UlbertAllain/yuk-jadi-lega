"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/format";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-gold">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] text-slate-950">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <div
        className="mx-auto my-5 w-full max-w-3xl rounded-[2rem] bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-[2rem] border-b border-slate-100 bg-white px-6 py-5">
          <h2 className="text-xl font-black tracking-[-0.04em] text-slate-950">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      <span>{label}</span>
      {children}
      {hint ? (
        <span className="text-xs font-normal leading-5 text-slate-400">{hint}</span>
      ) : null}
    </label>
  );
}

export function IconButton({
  label,
  onClick,
  children,
  tone = "default",
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-lg border transition hover:bg-slate-50",
        tone === "danger"
          ? "border-rose-100 text-rose-600 hover:bg-rose-50"
          : "border-slate-200 text-slate-700",
      )}
    >
      {children}
    </button>
  );
}

export const inputClass =
  "h-11 rounded-xl border border-slate-200 bg-white px-3.5 font-normal outline-none transition focus:border-brand-navy";

export const textareaClass =
  "rounded-xl border border-slate-200 bg-white px-3.5 py-3 font-normal leading-6 outline-none transition focus:border-brand-navy";

export const buttonPrimary =
  "inline-flex h-11 items-center justify-center rounded-full bg-brand-navy px-5 text-sm font-black text-white transition hover:bg-brand-navy-dark disabled:cursor-not-allowed disabled:opacity-50";
