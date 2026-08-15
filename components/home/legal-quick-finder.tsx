"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { servicePriceLabel } from "@/lib/format";
import type { Service, ServiceCategory } from "@/types";

const needs = [
  { id: "start", number: "01", label: "Mulai usaha", helper: "PT, CV, badan usaha", slugs: ["pendirian-perusahaan"] },
  { id: "permit", number: "02", label: "Perizinan", helper: "NIB, OSS, izin usaha", slugs: ["perizinan"] },
  { id: "protect", number: "03", label: "Merek & HKI", helper: "Merek, HKI, kontrak", slugs: ["hki", "kontrak"] },
  { id: "change", number: "04", label: "Perubahan usaha", helper: "Data, pengurus, modal", slugs: ["perubahan-perusahaan", "konsultasi"] },
] as const;

export function LegalQuickFinder({ services, categories }: { services: Service[]; categories: ServiceCategory[] }) {
  const [active, setActive] = useState<(typeof needs)[number]["id"]>("start");
  const need = needs.find((item) => item.id === active) || needs[0];
  const categoryMap = useMemo(() => new Map(categories.map((item) => [item.slug, item.name])), [categories]);

  const recommendations = useMemo(() => {
    const matched = services.filter((service) => need.slugs.some((slug) => slug === service.categorySlug));
    return [...(matched.length ? matched : services)]
      .sort((a, b) => Number(b.featured) - Number(a.featured) || (a.order ?? 0) - (b.order ?? 0))
      .slice(0, 3);
  }, [need, services]);

  return (
    <div className="finder-v71 relative overflow-hidden rounded-[22px] border border-brand-navy/16 bg-white shadow-[0_28px_70px_rgba(5,31,58,.13)]">
      <div className="border-b border-brand-navy/10 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold tracking-[-0.025em] text-brand-navy-dark">Temukan layanan yang sesuai</h2>
        <p className="mt-1 text-xs leading-5 text-brand-muted">Pilih kebutuhan utama Anda untuk melihat rekomendasi layanan.</p>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5">
          {needs.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(item.id)}
                className={`finder-option-v71 group relative min-h-[78px] overflow-hidden rounded-[14px] border px-4 py-3 text-left transition ${
                  selected
                    ? "border-brand-navy bg-white shadow-[0_8px_24px_rgba(5,31,58,.08)]"
                    : "border-brand-navy/12 bg-brand-cloud hover:border-brand-navy/25 hover:bg-white"
                }`}
              >
                <span className={`absolute inset-y-3 left-0 w-[3px] rounded-r-full transition ${selected ? "bg-brand-gold" : "bg-transparent group-hover:bg-brand-navy/15"}`} />
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[10px] font-semibold tabular-nums ${selected ? "text-brand-gold-dark" : "text-brand-muted"}`}>{item.number}</span>
                  <span className={`grid h-4 w-4 place-items-center rounded-full border ${selected ? "border-brand-gold bg-brand-gold" : "border-brand-navy/22 bg-white"}`}>
                    {selected ? <span className="h-1.5 w-1.5 rounded-full bg-brand-navy-dark" /> : null}
                  </span>
                </div>
                <span className="mt-2 block text-sm font-semibold leading-5 text-brand-navy-dark">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 overflow-hidden rounded-[16px] border border-brand-navy/12 bg-white">
          <div className="flex items-center justify-between border-b border-brand-navy/8 bg-brand-bluewash/55 px-4 py-3">
            <p className="text-xs font-semibold text-brand-navy-dark">Rekomendasi untuk {need.label.toLowerCase()}</p>
            <Link href={`/layanan?category=${need.slugs[0]}`} className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-navy hover:text-brand-gold-dark">
              Semua <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-brand-navy/8">
            {recommendations.map((service) => (
              <Link key={service.id} href={`/layanan/${service.slug}`} className="group grid grid-cols-[minmax(0,1fr)_30px] items-center gap-3 px-4 py-3.5 transition hover:bg-brand-cloud">
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold text-brand-navy-dark">{service.title}</p>
                  <p className="mt-1 truncate text-[10px] text-brand-muted">
                    {categoryMap.get(service.categorySlug) || "Layanan legal"} · {servicePriceLabel(service.startingPrice, service.priceType)}
                  </p>
                </div>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-brand-navy/10 bg-white text-brand-navy transition group-hover:border-brand-gold group-hover:bg-brand-gold">
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
