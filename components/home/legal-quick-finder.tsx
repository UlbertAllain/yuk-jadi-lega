"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

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
    <div className="border-y border-brand-navy/10 bg-brand-surface px-0 py-4 sm:py-5 lg:grid lg:grid-cols-[1fr_330px_180px] lg:items-center lg:gap-4 lg:px-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-gold-dark">
          Kebutuhan Anda
        </p>
        <p className="mt-1 text-sm font-medium leading-6 text-brand-ink">
          Pilih kebutuhan awal. Tim kami akan bantu mengarahkan langkah berikutnya.
        </p>
      </div>

      <label className="mt-4 block lg:mt-0">
        <span className="sr-only">Pilih jenis kebutuhan</span>
        <select
          value={active}
          onChange={(event) => setActive(event.target.value as (typeof needs)[number]["id"])}
          className="h-11 w-full rounded-[8px] border border-brand-navy/14 bg-white px-3.5 text-sm font-medium text-brand-ink outline-none transition focus:border-brand-gold/70"
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
        className="group mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy-dark lg:mt-0"
      >
        Mulai konsultasi
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}
