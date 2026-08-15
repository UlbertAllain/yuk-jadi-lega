import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Timer } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getWhatsAppHref } from "@/lib/contact";
import { getServices, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontak & Konsultasi",
  description: "Hubungi Yuk Jadi Legal dan konsultasikan kebutuhan legalitas bisnis Anda.",
};

export default async function ContactPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const whatsappHref = getWhatsAppHref(settings.whatsapp);
  const serviceOptions = services.map(({ id, title, slug }) => ({ id, title, slug }));

  const contacts = [
    whatsappHref ? { label: "WhatsApp", value: `+${settings.whatsapp}`, href: whatsappHref, icon: MessageCircle } : null,
    settings.email ? { label: "Email", value: settings.email, href: `mailto:${settings.email}`, icon: Mail } : null,
    settings.address ? { label: "Alamat", value: settings.address, icon: MapPin } : null,
    settings.officeHours ? { label: "Jam kantor", value: settings.officeHours, icon: Timer } : null,
  ].filter(Boolean) as Array<{ label: string; value: string; href?: string; icon: typeof Mail }>;

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        eyebrow="Kontak & konsultasi"
        title="Ceritakan kebutuhan bisnis. Tim bantu petakan langkahnya."
        description="Tidak harus tahu nama layanannya. Jelaskan kondisi bisnis, tujuan, dan kebutuhan awal agar tim bisa mengarahkan pilihan yang paling relevan."
      />

      <section className="page-shell grid gap-8 py-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-10 lg:py-16">
        <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            const content = (
              <div className="card-premium flex min-h-[132px] gap-4 rounded-[22px] p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-navy text-white"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">{contact.label}</p>
                  <p className="mt-2 break-words text-sm font-semibold leading-6 text-brand-ink">{contact.value}</p>
                </div>
              </div>
            );
            return contact.href ? <a key={contact.label} href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noreferrer" : undefined}>{content}</a> : <div key={contact.label}>{content}</div>;
          })}
        </div>

        <div className="overflow-hidden rounded-[26px] border border-brand-navy/10 bg-white shadow-[0_22px_60px_rgba(6,23,46,.08)]">
          <div className="border-b border-brand-navy/10 bg-brand-navy px-6 py-5 text-white sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-soft">Form konsultasi</p>
            <p className="mt-1 text-sm font-normal text-slate-200">Isi informasi awal agar tim memahami konteks sebelum menghubungi Anda.</p>
          </div>
          <LeadForm services={serviceOptions} />
        </div>
      </section>
    </main>
  );
}
