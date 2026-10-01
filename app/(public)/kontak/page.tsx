import { createPageMetadata } from "@/lib/seo";
import { Mail, MapPin, MessageCircle, Timer } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
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
      <section className="editorial-surface border-b border-brand-navy/10">
        <div className="page-shell relative grid gap-9 py-10 sm:py-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:gap-12 lg:py-14">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">
              Konsultasi
            </p>
            <h1 className="mt-3 max-w-[660px] text-[clamp(2.35rem,4.3vw,3.7rem)] font-semibold leading-[1.03] tracking-[-0.046em] text-brand-navy-dark">
              Ceritakan kebutuhan bisnis Anda. Kami bantu tentukan langkah berikutnya.
            </h1>
            <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
              Anda tidak perlu tahu nama layanannya terlebih dahulu. Ceritakan kondisi usaha dan tujuan Anda, lalu tim kami akan membantu mengarahkan kebutuhan yang paling sesuai.
            </p>

            {contacts.length ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {contacts.map((contact) => {
                  const Icon = contact.icon;
                  const content = (
                    <div className="rounded-[14px] border border-brand-navy/10 bg-white p-4">
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-brand-navy" />
                        <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-brand-muted">
                          {contact.label}
                        </p>
                      </div>
                      <p className="mt-3 break-words text-sm font-semibold leading-6 text-brand-ink">
                        {contact.value}
                      </p>
                    </div>
                  );

                  return contact.href ? (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                      className="block transition hover:-translate-y-0.5"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={contact.label}>{content}</div>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="editorial-panel rounded-[18px] border border-brand-navy/10 bg-white/90 p-5 shadow-[0_18px_50px_rgba(4,29,54,0.06)] backdrop-blur-[1px] sm:p-7">
            <div className="border-b border-brand-navy/10 pb-5">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-[1.85rem]">
                Mulai konsultasi
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted">
                Isi informasi singkat agar tim bisa memahami kebutuhan Anda sebelum menghubungi.
              </p>
            </div>
            <div className="pt-2">
              <LeadForm services={serviceOptions} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
