import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { getWhatsAppHref } from "@/lib/contact";
import type { Service, SiteSettings } from "@/types";

export function SiteFooter({ settings, services }: { settings: SiteSettings; services: Service[] }) {
  const featured = services.filter((service) => service.featured).slice(0, 4);
  const whatsappHref = getWhatsAppHref(settings.whatsapp, "Halo Yuk Jadi Legal, saya ingin konsultasi.");

  return (
    <footer className="footer-v7 relative overflow-hidden text-white">
      <div className="absolute right-[-80px] top-[-100px] h-72 w-72 rounded-full border border-brand-gold/10" />
      <div className="page-shell relative py-11 lg:py-14">
        <div className="grid gap-9 border-b border-white/10 pb-9 lg:grid-cols-[1.25fr_.7fr_1fr_.9fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark frameClassName="h-11 w-11 rounded-[12px]" />
              <p className="text-sm font-semibold">Yuk Jadi <span className="text-brand-gold-soft">Legal</span></p>
            </div>
            <p className="mt-4 max-w-sm text-xs leading-6 text-slate-300">{settings.brandTagline}</p>
          </div>

          <div>
            <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.11em] text-brand-gold-soft">Navigasi</p>
            <div className="grid gap-2.5 text-xs text-slate-300">
              <Link href="/layanan" className="hover:text-white">Layanan</Link>
              <Link href="/cara-kerja" className="hover:text-white">Cara Kerja</Link>
              <Link href="/tentang-kami" className="hover:text-white">Tentang Kami</Link>
              <Link href="/artikel" className="hover:text-white">Insight</Link>
              <Link href="/kontak" className="hover:text-white">Kontak</Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.11em] text-brand-gold-soft">Layanan populer</p>
            <div className="grid gap-2.5 text-xs text-slate-300">
              {featured.map((service) => <Link key={service.id} href={`/layanan/${service.slug}`} className="line-clamp-1 hover:text-white">{service.title}</Link>)}
            </div>
          </div>

          <div>
            <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.11em] text-brand-gold-soft">Hubungi kami</p>
            <div className="space-y-2.5 text-xs text-slate-300">
              {settings.email ? <a href={`mailto:${settings.email}`} className="block hover:text-white">{settings.email}</a> : null}
              {whatsappHref ? <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">WhatsApp <ArrowUpRight className="h-3.5 w-3.5" /></a> : null}
              {settings.officeHours ? <p>{settings.officeHours}</p> : null}
              {settings.address ? <p className="max-w-xs leading-5 text-slate-400">{settings.address}</p> : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {settings.brandName}. Semua hak dilindungi.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/kbli">KBLI</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>
            <Link href="/syarat-ketentuan">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
