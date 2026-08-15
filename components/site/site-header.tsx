import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { MobileNav } from "@/components/site/mobile-nav";
import { BrandMark } from "@/components/shared/brand-mark";
import { getWhatsAppHref } from "@/lib/contact";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

const plainNavItems = [
  ["Cara Kerja", "/cara-kerja"],
  ["Tentang", "/tentang-kami"],
  ["Insight", "/artikel"],
  ["KBLI", "/kbli"],
] as const;

function selectedServices(settings: SiteSettings, services: Service[]) {
  const wanted = settings.menuServiceSlugs || [];
  const selected = wanted.map((slug) => services.find((item) => item.slug === slug)).filter((item): item is Service => Boolean(item));
  return selected.length ? selected.slice(0, 6) : services.filter((item) => item.featured).slice(0, 6);
}

function selectedCategories(settings: SiteSettings, categories: ServiceCategory[]) {
  const wanted = settings.menuCategorySlugs || [];
  const selected = wanted.map((slug) => categories.find((item) => item.slug === slug)).filter((item): item is ServiceCategory => Boolean(item));
  return selected.length ? selected.slice(0, 6) : categories.slice(0, 6);
}

export function SiteHeader({ settings, services, categories }: { settings: SiteSettings; services: Service[]; categories: ServiceCategory[] }) {
  const whatsappHref = getWhatsAppHref(settings.whatsapp, "Halo Yuk Jadi Legal, saya ingin konsultasi mengenai legalitas bisnis.");
  const consultationHref = whatsappHref || "/kontak";
  const consultationExternal = Boolean(whatsappHref);
  const menuServices = selectedServices(settings, services);
  const menuCategories = selectedCategories(settings, categories);
  const categoryMap = new Map(categories.map((item) => [item.slug, item.name]));

  return (
    <header className="sticky top-0 z-50 border-b border-brand-navy/10 bg-white/95 shadow-[0_8px_30px_rgba(5,31,58,.055)] backdrop-blur-xl">
      <div className="h-[3px] bg-[linear-gradient(90deg,#082e53_0%,#082e53_62%,#d4b031_62%,#d4b031_100%)]" />
      <div className="page-shell flex h-[70px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Yuk Jadi Legal">
          <BrandMark frameClassName="h-10 w-10 rounded-[11px]" />
          <span className="text-[14px] font-semibold tracking-[-0.02em] text-brand-navy-dark">Yuk Jadi <span className="text-brand-gold-dark">Legal</span></span>
        </Link>

        <nav className="hidden h-full items-center lg:flex" aria-label="Navigasi utama">
          <HeaderMenu label="Layanan" href="/layanan" width="w-[620px]">
            <div className="p-4">
              <div className="flex items-center justify-between border-b border-brand-navy/8 px-2 pb-3">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Layanan utama</p>
                  <p className="mt-1 text-xs text-brand-muted">Pilihan layanan yang sering dibutuhkan bisnis.</p>
                </div>
                <Link href="/layanan" className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-navy">Semua <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
              <div className="grid grid-cols-2 gap-1 pt-2">
                {menuServices.map((service, index) => (
                  <Link key={service.id} href={`/layanan/${service.slug}`} className="group/item flex items-start gap-3 rounded-[12px] px-3 py-3 transition hover:bg-brand-bluewash/60">
                    <span className="mt-0.5 text-[9px] font-semibold text-brand-gold-dark">0{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-xs font-semibold text-brand-navy-dark">{service.title}</p>
                      <p className="mt-1 text-[10px] text-brand-muted">{categoryMap.get(service.categorySlug) || "Layanan legal"}</p>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 text-brand-navy/25 transition group-hover/item:text-brand-gold-dark" />
                  </Link>
                ))}
              </div>
            </div>
          </HeaderMenu>

          <HeaderMenu label="Kategori" href="/layanan" width="w-[500px]">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-1">
                {menuCategories.map((category, index) => (
                  <Link key={category.id} href={`/layanan?category=${category.slug}`} className="group/item flex items-center gap-3 rounded-[12px] px-3 py-3 text-xs font-semibold text-brand-navy-dark transition hover:bg-brand-gold-pale">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-bluewash text-[9px] text-brand-navy">0{index + 1}</span>
                    <span className="min-w-0 flex-1">{category.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-brand-navy/25 transition group-hover/item:text-brand-gold-dark" />
                  </Link>
                ))}
              </div>
              <div className="mt-2 border-t border-brand-navy/8 px-2 pt-3">
                <Link href="/layanan" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-navy">Lihat semua kategori <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          </HeaderMenu>

          {plainNavItems.map(([label, href]) => (
            <Link key={href} href={href} className="flex h-full items-center px-3 text-[12px] font-medium text-brand-muted transition hover:text-brand-navy">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={consultationHref}
            target={consultationExternal ? "_blank" : undefined}
            rel={consultationExternal ? "noreferrer" : undefined}
            className="button-gold hidden items-center gap-2 px-4 py-2.5 text-xs font-semibold sm:inline-flex"
          >
            Konsultasi <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <MobileNav items={plainNavItems} services={menuServices} categories={menuCategories} consultationHref={consultationHref} consultationExternal={consultationExternal} />
        </div>
      </div>
    </header>
  );
}

function HeaderMenu({ label, href, width, children }: { label: string; href: string; width: string; children: ReactNode }) {
  return (
    <div className="group relative flex h-full items-center">
      <Link href={href} className="flex h-full items-center gap-1 px-3 text-[12px] font-medium text-brand-muted transition group-hover:text-brand-navy">
        {label}<ChevronDown className="h-3.5 w-3.5 transition duration-200 group-hover:rotate-180" />
      </Link>
      <div className={`pointer-events-none absolute left-1/2 top-[calc(100%-5px)] ${width} -translate-x-1/2 translate-y-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100`}>
        <div className="h-3" />
        <div className="overflow-hidden rounded-[16px] border border-brand-navy/12 bg-white shadow-[0_28px_70px_rgba(5,31,58,.14)]">
          <div className="h-[3px] bg-[linear-gradient(90deg,#d4b031,#082e53_68%,transparent)]" />
          {children}
        </div>
      </div>
    </div>
  );
}
