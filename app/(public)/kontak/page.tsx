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

      <section className="page-shell grid gap-9 py-10 sm:py-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12 lg:py-16">
        <div className="order-2 content-start lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">Kontak</p>

          <div className="mt-4 border-y border-brand-navy/12">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              const content = (
                <div className="grid grid-cols-[34px_minmax(0,1fr)] gap-4 border-b border-brand-navy/8 py-5 last:border-b-0">
                  <Icon className="mt-0.5 h-5 w-5 text-brand-navy" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-muted">
                      {contact.label}
                    </p>
                    <p className="mt-2 break-words text-[15px] font-semibold leading-6 text-brand-ink">
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

        <div className="order-1 lg:order-2 lg:border-l lg:border-brand-navy/14 lg:pl-10">
          <div className="mb-5 sm:mb-6">
            <h2 className="text-[1.65rem] font-semibold tracking-[-0.035em] text-brand-ink sm:text-[1.8rem]">
              Mulai konsultasi
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-7 text-brand-muted">
              Isi beberapa informasi singkat agar tim kami bisa memahami kebutuhan Anda sebelum menghubungi.
            </p>
          </div>
          <LeadForm services={serviceOptions} />
        </div>
      </section>
    </main>
  );
}
