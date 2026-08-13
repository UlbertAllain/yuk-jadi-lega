"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

type NavItem = readonly [label: string, href: string];

export function MobileNav({
  items,
  consultationHref,
  consultationExternal,
}: {
  items: readonly NavItem[];
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
        className="grid h-11 w-11 place-items-center rounded-full border border-slate-200"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          className="absolute right-0 top-14 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10"
        >
          <nav className="grid gap-1" aria-label="Navigasi mobile">
            {items.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-brand-paper hover:text-brand-green"
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
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-3 text-sm font-black text-white sm:hidden"
          >
            Konsultasi
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      ) : null}
    </div>
  );
}
