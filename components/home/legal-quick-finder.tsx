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
    <div className="rounded-[16px] border border-brand-navy/9 bg-brand-paper/55 p-4 sm:p-5 lg:grid lg:grid-cols-[1fr_320px_190px] lg:items-center lg:gap-4 lg:px-6 lg:py-5">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold-dark">
          Mulai dari sini
        </p>
        <h2 className="mt-1.5 text-xl font-bold leading-tight text-brand-ink sm:text-[1.35rem]">
          Apa yang sedang bisnis Anda butuhkan?
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-brand-muted">
          <span className="inline-flex items-center gap-1.5">
            <CircleCheck className="h-3.5 w-3.5 text-emerald-600" />
            Konsultasi awal gratis
          </span>
          <span aria-hidden="true">•</span>
          <span>Respon 1×24 jam kerja</span>
        </div>
      </div>

      <label className="mt-4 block lg:mt-0">
        <span className="sr-only">Pilih jenis kebutuhan</span>
        <select
          value={active}
          onChange={(event) => setActive(event.target.value as (typeof needs)[number]["id"])}
          className="h-12 w-full rounded-[10px] border border-brand-navy/14 bg-white px-4 text-sm font-medium text-brand-ink outline-none transition focus:border-brand-gold/70"
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
        className="group mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark lg:mt-0"
      >
        Mulai konsultasi
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}
