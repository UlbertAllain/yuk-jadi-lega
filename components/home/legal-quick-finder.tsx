"use client";

import { useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";

const needs = [
  { id: "start", label: "Pendirian badan usaha" },
  { id: "permit", label: "Perizinan & OSS" },
  { id: "protect", label: "Merek & dokumen" },
  { id: "change", label: "Perubahan usaha" },
  { id: "consult", label: "Belum yakin, ingin konsultasi dulu" },
] as const;

export function LegalQuickFinder({
  consultationHref,
  consultationExternal,
}: {
  consultationHref: string;
  consultationExternal: boolean;
}) {
  const [active, setActive] = useState<(typeof needs)[number]["id"]>("consult");

  return (
    <div className="rounded-[18px] border border-brand-navy/10 bg-white/95 p-5 shadow-[0_20px_55px_rgba(4,29,54,.08)] backdrop-blur-sm sm:p-6">
      <h2 className="editorial-heading text-2xl font-semibold leading-tight tracking-[-0.025em] text-brand-ink sm:text-[1.8rem]">
        Konsultasikan kebutuhan Anda
      </h2>
      <p className="mt-2 max-w-lg text-sm leading-6 text-brand-muted">
        Ceritakan sedikit tentang bisnis atau rencana Anda. Kami bantu memetakan layanan yang paling sesuai.
      </p>

      <label className="mt-5 block">
        <span className="sr-only">Pilih jenis kebutuhan</span>
        <select
          value={active}
          onChange={(event) => setActive(event.target.value as (typeof needs)[number]["id"])}
          className="h-12 w-full rounded-[10px] border border-brand-navy/15 bg-brand-surface px-4 text-sm font-medium text-brand-ink outline-none transition focus:border-brand-gold/70"
        >
          {needs.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <a
        href={consultationHref}
        target={consultationExternal ? "_blank" : undefined}
        rel={consultationExternal ? "noreferrer" : undefined}
        className="group mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark"
      >
        Mulai konsultasi
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-brand-muted">
        <span className="inline-flex items-center gap-1.5">
          <CircleCheck className="h-3.5 w-3.5 text-emerald-600" />
          Konsultasi awal gratis
        </span>
        <span aria-hidden="true">•</span>
        <span>Respon dalam 1×24 jam kerja</span>
      </div>
    </div>
  );
}
