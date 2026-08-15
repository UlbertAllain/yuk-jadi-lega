"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import type { Service, ServiceCategory } from "@/types";

type NavItem = readonly [label: string, href: string];

export function MobileNav({
  items,
  services,
  categories,
  consultationHref,
  consultationExternal,
}: {
  items: readonly NavItem[];
  services: Service[];
  categories: ServiceCategory[];
  consultationHref: string;
  consultationExternal: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
        onClick={() => setOpen((current) => !current)}
        className="grid h-11 w-11 place-items-center border border-brand-navy/15 bg-brand-surface text-brand-navy"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          className="surface-shadow absolute right-0 top-14 max-h-[78vh] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto border border-brand-navy/10 bg-brand-surface"
        >
          <div className="h-[3px] bg-brand-gold" />
          <div className="p-4">
            <p className="editorial-kicker px-1 pb-3">Navigasi</p>

            <details className="group border-y border-brand-navy/10">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-brand-ink">
                Layanan utama <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="grid border-t border-brand-navy/8 pb-2">
                {services.map((service, index) => (
                  <Link
                    key={service.id}
                    href={`/layanan/${service.slug}`}
                    onClick={() => setOpen(false)}
                    className="grid grid-cols-[30px_1fr] gap-2 border-b border-brand-navy/8 py-3 text-sm font-semibold text-slate-600 transition hover:text-brand-navy"
                  >
                    <span className="text-[9px] font-semibold text-brand-gold-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {service.title}
                  </Link>
                ))}
                <Link
                  href="/layanan"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 py-2 text-xs font-semibold text-brand-navy"
                >
                  Semua layanan <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </details>

            <details className="group border-b border-brand-navy/10">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-brand-ink">
                Kategori <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="grid grid-cols-2 border-t border-brand-navy/8 pb-2">
                {categories.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/layanan?category=${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="border-b border-brand-navy/8 py-3 pr-3 text-xs font-semibold text-slate-600 transition even:border-l even:pl-3 hover:text-brand-navy"
                  >
                    <span className="mb-1 block text-[9px] font-semibold text-brand-gold-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {category.name}
                  </Link>
                ))}
              </div>
            </details>

            <nav className="grid" aria-label="Navigasi mobile">
              {items.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="border-b border-brand-navy/8 py-4 text-sm font-semibold text-slate-600 transition hover:text-brand-navy"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <a
              href={consultationHref}
              target={consultationExternal ? "_blank" : undefined}
              rel={consultationExternal ? "noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-between bg-brand-navy px-4 py-3.5 text-sm font-semibold text-white sm:hidden"
            >
              Konsultasi <ArrowUpRight className="h-4 w-4 text-brand-gold-soft" />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
