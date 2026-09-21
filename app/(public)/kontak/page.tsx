import { createPageMetadata } from "@/lib/seo";
import { Mail, MapPin, MessageCircle, Timer } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getWhatsAppHref } from "@/lib/contact";
import { getServices, getSiteSettings } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Kontak & Konsultasi",
  description: "Hubungi Yuk Jadi Legal dan konsultasikan kebutuhan legalitas bisnis Anda.",
  path: "/kontak",
});

export default async function ContactPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const whatsappHref = getWhatsAppHref(settings.whatsapp);
  const serviceOptions = services.map(({ id, title, slug }) => ({ id, title, slug }));

  const contacts = [
    whatsappHref
      ? { label: "WhatsApp", value: `+${settings.whatsapp}`, href: whatsappHref, icon: MessageCircle }
      : null,
    settings.email ? { label: "Email", value: settings.email, href: `mailto:${settings.email}`, icon: Mail } : null,
    settings.address ? { label: "Alamat", value: settings.address, icon: MapPin } : null,
    settings.officeHours ? { label: "Jam kantor", value: settings.officeHours, icon: Timer } : null,
  ].filter(Boolean) as Array<{ label: string; value: string; href?: string; icon: typeof Mail }>;

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        title="Ceritakan kebutuhan bisnis Anda, kami bantu tentukan langkah berikutnya."
        description="Anda tidak perlu tahu nama layanannya terlebih dahulu. Ceritakan kondisi usaha dan tujuan Anda, lalu tim kami akan membantu mengarahkan kebutuhan yang paling sesuai."
      />

      <section className="page-shell grid gap-12 py-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-16 lg:py-20">
        <div className="content-start">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">Kontak</p>

          <div className="mt-4 border-y border-brand-navy/12">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              const content = (
                <div className="grid grid-cols-[34px_minmax(0,1fr)] gap-4 border-b border-brand-navy/8 py-5 last:border-b-0">
                  <Icon className="mt-0.5 h-5 w-5 text-brand-navy" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-brand-muted">
                      {contact.label}
                    </p>
                    <p className="mt-2 break-words text-sm font-semibold leading-6 text-brand-ink">
                      {contact.value}
                    </p>
                  </div>
                </div>
              );

              return contact.href ? (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                  className="block transition hover:bg-white/40"
                >
                  {content}
                </a>
              ) : (
                <div key={contact.label}>{content}</div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-brand-navy/14 pt-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-brand-ink">
              Mulai konsultasi
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted">
              Isi beberapa informasi singkat agar tim kami bisa memahami kebutuhan Anda sebelum menghubungi.
            </p>
          </div>
          <LeadForm services={serviceOptions} />
        </div>
      </section>
    </main>
  );
}
