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
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
        onClick={() => setOpen((current) => !current)}
        className="grid h-11 w-11 place-items-center text-brand-navy"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-[61px] z-50 max-h-[calc(100dvh-61px)] overflow-y-auto border-t border-brand-navy/10 bg-brand-surface"
        >
          <div className="page-shell pb-6 pt-2">
            <a
              href={consultationHref}
              target={consultationExternal ? "_blank" : undefined}
              rel={consultationExternal ? "noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="my-3 flex min-h-12 items-center justify-between bg-brand-navy px-4 py-3 text-sm font-semibold text-white"
            >
              Konsultasi gratis <ArrowUpRight className="h-4 w-4 text-brand-gold-soft" />
            </a>

            <details className="group border-y border-brand-navy/10">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold text-brand-ink">
                Layanan utama <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="grid border-t border-brand-navy/8 pb-2">
                {services.map((service, index) => (
                  <Link
                    key={service.id}
                    href={`/layanan/${service.slug}`}
                    onClick={() => setOpen(false)}
                    className="grid min-h-12 grid-cols-[30px_1fr] items-center gap-2 border-b border-brand-navy/8 py-3 text-sm font-semibold text-slate-600"
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
                  className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-brand-navy"
                >
                  Semua layanan <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </details>

            <details className="group border-b border-brand-navy/10">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold text-brand-ink">
                Kategori <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="grid grid-cols-2 border-t border-brand-navy/8 pb-2">
                {categories.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/layanan?category=${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="min-h-14 border-b border-brand-navy/8 py-3 pr-3 text-xs font-semibold text-slate-600 even:border-l even:pl-3"
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
                  className="flex min-h-12 items-center border-b border-brand-navy/8 py-3 text-sm font-semibold text-slate-600"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
