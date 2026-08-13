import Link from "next/link";
import { getWhatsAppHref } from "@/lib/contact";
import type { Service, SiteSettings } from "@/types";

type SocialLink = {
  label: string;
  href?: string;
};

export function SiteFooter({
  settings,
  services,
}: {
  settings: SiteSettings;
  services: Service[];
}) {
  const socialLinks: SocialLink[] = [
    { label: "Instagram", href: settings.instagram },
    { label: "LinkedIn", href: settings.linkedin },
    { label: "TikTok", href: settings.tiktok },
  ];
  const activeSocialLinks = socialLinks.filter((item) => item.href);
  const whatsappHref = getWhatsAppHref(settings.whatsapp);

  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr_.8fr_.9fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-black text-brand-green">
                YJL
              </span>
              <div>
                <p className="font-black tracking-[-0.03em]">{settings.brandName}</p>
                <p className="text-sm text-slate-400">{settings.brandTagline}</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-300">
              Membantu bisnis memahami dan mengurus kebutuhan legal dengan proses yang lebih jelas, manusiawi, dan terarah.
            </p>

            {activeSocialLinks.length ? (
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-slate-300">
                {activeSocialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Perusahaan
            </p>
            <div className="grid gap-3 text-sm text-slate-200">
              <Link href="/tentang-kami">Tentang Kami</Link>
              <Link href="/cara-kerja">Cara Kerja</Link>
              <Link href="/artikel">Artikel</Link>
              <Link href="/kontak">Kontak</Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Layanan
            </p>
            <div className="grid gap-3 text-sm text-slate-200">
              {services.slice(0, 5).map((service) => (
                <Link key={service.id} href={`/layanan/${service.slug}`}>
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Hubungi
            </p>
            <div className="space-y-3 text-sm leading-6 text-slate-200">
              {settings.email ? (
                <a href={`mailto:${settings.email}`} className="block hover:text-white">
                  {settings.email}
                </a>
              ) : null}
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-white"
                >
                  +{settings.whatsapp}
                </a>
              ) : null}
              {settings.address ? <p>{settings.address}</p> : null}
              {settings.officeHours ? (
                <p className="text-slate-400">{settings.officeHours}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {settings.brandName}. Semua hak dilindungi.</p>
          <div className="flex gap-5">
            <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
