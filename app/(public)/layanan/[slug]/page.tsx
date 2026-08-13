import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { ServiceCard } from "@/components/site/service-card";
import { getWhatsAppHref } from "@/lib/contact";
import { getServiceBySlug, getServices, getSiteSettings } from "@/lib/data";
import { formatRupiah } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allServices, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getSiteSettings(),
  ]);

  if (!service) {
    notFound();
  }

  const related = allServices
    .filter(
      (item) =>
        item.id !== service.id && item.categorySlug === service.categorySlug,
    )
    .slice(0, 3);
  const price = formatRupiah(service.startingPrice);
  const waMessage = `Halo Yuk Jadi Legal, saya sedang melihat layanan ${service.title} dan ingin konsultasi.`;
  const whatsappHref = getWhatsAppHref(settings.whatsapp, waMessage);
  const consultationHref = whatsappHref || "/kontak";
  const serviceOptions = allServices.map(({ id, title, slug: serviceSlug }) => ({
    id,
    title,
    slug: serviceSlug,
  }));

  return (
    <main>
      <section className="bg-brand-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Semua layanan
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_.5fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold-soft">
                {service.categorySlug.replaceAll("-", " ")}
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                {service.shortDescription}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Mulai dari
              </p>
              <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">
                {price}
              </p>
              {service.priceNote ? (
                <p className="mt-3 text-xs leading-5 text-amber-200">
                  {service.priceNote}
                </p>
              ) : null}
              <a
                href={consultationHref}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noreferrer" : undefined}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold-soft px-5 py-3 text-sm font-black text-brand-ink"
              >
                Konsultasikan
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_.42fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
            Tentang layanan
          </p>
          <p className="mt-5 max-w-3xl text-2xl font-semibold leading-10 tracking-[-0.03em] text-slate-800">
            {service.description}
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <InfoCard
              icon={<Clock3 className="h-5 w-5 text-brand-green" />}
              label="Estimasi"
              value={service.duration || "Menyesuaikan proses"}
            />
            <InfoCard
              icon={<FileText className="h-5 w-5 text-brand-green" />}
              label="Dokumen"
              value="Checklist dibantu tim"
            />
            <InfoCard
              icon={<ShieldCheck className="h-5 w-5 text-brand-green" />}
              label="Pendampingan"
              value="Sesuai ruang lingkup"
            />
          </div>
        </div>

        {service.benefits.length ? (
          <aside className="rounded-[2rem] border border-slate-200 p-7">
            <p className="font-black text-slate-950">Cocok kalau kamu...</p>
            <CheckList items={service.benefits} />
          </aside>
        ) : null}
      </section>

      {(service.inclusions.length || service.requirements.length) && (
        <section className="bg-brand-paper py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
            <ListPanel
              eyebrow="Yang kamu dapatkan"
              title="Ruang lingkup layanan"
              items={service.inclusions}
            />
            <ListPanel
              eyebrow="Yang perlu disiapkan"
              title="Checklist awal"
              items={service.requirements}
            />
          </div>
        </section>
      )}

      {service.processSteps.length ? (
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
            Tahapan
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl">
            Dari konsultasi sampai selesai.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {service.processSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-[1.75rem] border border-slate-200 p-6"
              >
                <p className="text-3xl font-black tracking-[-0.06em] text-slate-200">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-7 text-sm font-black text-slate-900">{step}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {service.faqs.length ? (
        <section className="bg-brand-ink py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.6fr_1fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold-soft">
                FAQ layanan
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.055em]">
                Sebelum mulai, mungkin kamu ingin tahu ini.
              </h2>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="py-5">
                  <summary className="cursor-pointer font-bold">
                    {faq.question}
                  </summary>
                  <p className="pt-4 text-sm leading-7 text-slate-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-brand-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
              Konsultasi {service.title}
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950">
              Ceritakan kebutuhanmu sebelum mengambil keputusan.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Isi kebutuhanmu melalui formulir berikut. Tim kami akan menindaklanjuti informasi yang kamu kirim melalui kontak yang tersedia.
            </p>
          </div>
          <LeadForm services={serviceOptions} defaultService={service.slug} />
        </div>
      </section>

      {related.length ? (
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
            Layanan terkait
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.055em]">
            Mungkin kamu juga butuh ini.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-brand-paper p-5">
      {icon}
      <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
      {items.map((item) => (
        <p key={item} className="flex gap-3">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
          {item}
        </p>
      ))}
    </div>
  );
}

function ListPanel({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  if (!items.length) return null;

  return (
    <div className="rounded-[2rem] bg-white p-8">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-slate-950">
        {title}
      </h2>
      <CheckList items={items} />
    </div>
  );
}
