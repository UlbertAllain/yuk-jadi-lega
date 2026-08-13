import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MobileNav } from "@/components/site/mobile-nav";
import { getWhatsAppHref } from "@/lib/contact";
import type { SiteSettings } from "@/types";

const navItems = [
  ["Layanan", "/layanan"],
  ["Cara Kerja", "/cara-kerja"],
  ["Tentang Kami", "/tentang-kami"],
  ["Insight", "/artikel"],
  ["FAQ", "/faq"],
] as const;

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const whatsappHref = getWhatsAppHref(
    settings.whatsapp,
    "Halo Yuk Jadi Legal, saya ingin konsultasi mengenai legalitas bisnis.",
  );
  const consultationHref = whatsappHref || "/kontak";
  const consultationExternal = Boolean(whatsappHref);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Yuk Jadi Legal"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-green text-sm font-black tracking-tight text-white">
            YJL
          </span>
          <span className="leading-tight">
            <span className="block text-base font-black tracking-[-0.03em] text-slate-950">
              {settings.brandName}
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              {settings.brandTagline}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex"
          aria-label="Navigasi utama"
        >
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              className="transition hover:text-brand-green"
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={consultationHref}
            target={consultationExternal ? "_blank" : undefined}
            rel={consultationExternal ? "noreferrer" : undefined}
            className="hidden items-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark sm:inline-flex"
          >
            Konsultasi
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <MobileNav
            items={navItems}
            consultationHref={consultationHref}
            consultationExternal={consultationExternal}
          />
        </div>
      </div>
    </header>
  );
}
