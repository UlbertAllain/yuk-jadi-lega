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

export function LegalQuickFinder({
  services,
  categories,
}: {
  services: Service[];
  categories: ServiceCategory[];
}) {
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
    <div className="border-y border-brand-navy/14 bg-white sm:rounded-[14px] sm:border lg:rounded-[18px]">
      <div className="border-b border-brand-navy/10 py-4 sm:px-5 sm:py-5">
        <h2 className="text-base font-semibold tracking-[-0.025em] text-brand-navy-dark sm:text-lg">
          Temukan layanan yang sesuai
        </h2>
        <p className="mt-1 text-xs leading-5 text-brand-muted">
          Pilih kebutuhan utama untuk melihat layanan yang paling relevan.
        </p>
      </div>

      <div className="py-4 sm:p-5">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {needs.map((item) => {
            const selected = item.id === active;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(item.id)}
                className={`min-h-[64px] border-b px-1 py-2.5 text-left transition sm:min-h-[72px] sm:rounded-[10px] sm:border sm:px-3 ${
                  selected
                    ? "border-brand-navy text-brand-navy"
                    : "border-brand-navy/10 text-brand-muted hover:text-brand-navy"
                }`}
              >
                <span className="text-[9px] font-semibold tabular-nums text-brand-gold-dark">{item.number}</span>
                <span className="mt-1.5 block text-sm font-semibold leading-5">{item.label}</span>
                <span className="mt-0.5 hidden text-[10px] leading-4 text-brand-muted sm:block">{item.helper}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 border-y border-brand-navy/12">
          <div className="flex items-center justify-between border-b border-brand-navy/8 py-3">
            <p className="text-xs font-semibold text-brand-navy-dark">
              Untuk {need.label.toLowerCase()}
            </p>
            <Link
              href={`/layanan?category=${need.slugs[0]}`}
              className="inline-flex min-h-10 items-center gap-1 text-[11px] font-semibold text-brand-navy"
            >
              Semua <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-brand-navy/8">
            {recommendations.map((service) => (
              <Link
                key={service.id}
                href={`/layanan/${service.slug}`}
                className="group grid min-h-[62px] grid-cols-[minmax(0,1fr)_28px] items-center gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="line-clamp-1 text-[12px] font-semibold text-brand-navy-dark">{service.title}</p>
                  <p className="mt-1 line-clamp-1 text-[10px] text-brand-muted">
                    {categoryMap.get(service.categorySlug) || "Layanan legal"} ·{" "}
                    {servicePriceLabel(service.startingPrice, service.priceType)}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-brand-navy/55 transition group-hover:text-brand-gold-dark" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
