import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Timer } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { getWhatsAppHref } from "@/lib/contact";
import { getServices, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontak & Konsultasi",
  description: "Hubungi Yuk Jadi Legal dan konsultasikan kebutuhan legalitas bisnismu.",
};

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);
  const whatsappHref = getWhatsAppHref(settings.whatsapp);
  const serviceOptions = services.map(({ id, title, slug }) => ({
    id,
    title,
    slug,
  }));

  return (
    <main>
      <section className="bg-brand-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">
            Kontak
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
            Ceritakan dulu. Kita cari langkah yang paling masuk akal.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Kamu tidak perlu datang dengan nama layanan yang sudah pasti. Jelaskan kondisi bisnis dan kebutuhanmu, lalu kami bantu mengarahkannya.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.65fr_1.35fr] lg:px-8 lg:py-28">
        <div className="space-y-4">
          {whatsappHref ? (
            <ContactCard
              icon={<MessageCircle className="h-5 w-5 text-brand-green" />}
              label="WhatsApp"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="font-black text-slate-950"
              >
                +{settings.whatsapp}
              </a>
            </ContactCard>
          ) : null}

          {settings.email ? (
            <ContactCard
              icon={<Mail className="h-5 w-5 text-brand-green" />}
              label="Email"
            >
              <a href={`mailto:${settings.email}`} className="font-black text-slate-950">
                {settings.email}
              </a>
            </ContactCard>
          ) : null}

          {settings.address ? (
            <ContactCard
              icon={<MapPin className="h-5 w-5 text-brand-green" />}
              label="Alamat"
            >
              <p className="text-sm font-bold leading-6 text-slate-950">
                {settings.address}
              </p>
            </ContactCard>
          ) : null}

          {settings.officeHours ? (
            <ContactCard
              icon={<Timer className="h-5 w-5 text-brand-green" />}
              label="Jam kantor"
            >
              <p className="text-sm font-bold leading-6 text-slate-950">
                {settings.officeHours}
              </p>
            </ContactCard>
          ) : null}
        </div>

        <LeadForm services={serviceOptions} />
      </section>
    </main>
  );
}

function ContactCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      {icon}
      <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
