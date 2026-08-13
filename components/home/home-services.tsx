import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  FileCheck2,
  Landmark,
  MessageSquareText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

const categoryIcons = [
  Building2,
  FileCheck2,
  ShieldCheck,
  BriefcaseBusiness,
  Landmark,
];

const reasons: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: MessageSquareText,
    title: "Bahasa yang manusiawi",
    description:
      "Kebutuhan legal dijelaskan dengan bahasa yang bisa dipahami orang non-legal.",
  },
  {
    icon: FileCheck2,
    title: "Alur yang jelas",
    description:
      "Kamu tahu apa yang perlu disiapkan, apa yang diproses, dan apa langkah berikutnya.",
  },
  {
    icon: BadgeCheck,
    title: "Ruang lingkup transparan",
    description: "Harga dan cakupan layanan dijelaskan sebelum proses dimulai.",
  },
  {
    icon: ShieldCheck,
    title: "Pendampingan terarah",
    description:
      "Bukan sekadar menerima dokumen; kebutuhanmu dipetakan sejak awal.",
  },
];

export function HomeServices({
  categories,
  featuredServices,
  settings,
}: {
  categories: ServiceCategory[];
  featuredServices: Service[];
  settings: SiteSettings;
}) {
  const visibleStats = settings.stats.filter(
    (stat) => stat.value.trim() && stat.value.trim() !== "—",
  );

  return (
    <>
      {categories.length ? (
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <SectionHeading
            eyebrow="Mulai dari kebutuhanmu"
            title="Nggak harus paham istilah legal dulu."
            description="Pilih kondisi yang paling dekat dengan kebutuhan bisnismu. Dari sana, Yuk Jadi Legal membantu mengarahkan langkah berikutnya."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];

              return (
                <Link
                  key={category.id}
                  href={`/layanan#${category.slug}`}
                  className="group rounded-[1.75rem] border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-brand-gold/50 hover:bg-brand-paper"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-green text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-7 text-lg font-black tracking-[-0.035em] text-slate-950">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-brand-gold-dark">
                    Lihat solusi <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {featuredServices.length ? (
        <section className="bg-brand-ink py-24 text-white lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold-soft">
                  Layanan unggulan
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                  Legalitas yang sering dibutuhkan bisnis.
                </h2>
              </div>
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 text-sm font-black text-brand-gold-soft"
              >
                Lihat semua layanan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Kenapa Yuk Jadi Legal"
          title="Bukan cuma selesai. Kamu juga perlu ngerti prosesnya."
          description="Kami membuat pengalaman legal lebih dekat dengan cara pemilik bisnis mengambil keputusan: jelas, relevan, dan tidak dipenuhi istilah yang tidak perlu."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-[1.75rem] bg-brand-paper p-7">
              <Icon className="h-6 w-6 text-brand-green" />
              <h3 className="mt-6 text-xl font-black tracking-[-0.04em] text-slate-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {visibleStats.length ? (
        <section className="border-y border-slate-200 bg-brand-paper py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {visibleStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[2rem] border border-white bg-white/70 p-8"
                >
                  <p className="text-5xl font-black tracking-[-0.06em] text-brand-green">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Cara kerja"
          title="Empat langkah. Nggak perlu dibuat rumit."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          {[
            ["01", "Ceritakan kebutuhan", "Mulai dari kondisi bisnismu, bukan dari istilah hukumnya."],
            ["02", "Siapkan data", "Kami bantu memberi checklist data dan dokumen yang dibutuhkan."],
            ["03", "Kami proses", "Proses berjalan sesuai ruang lingkup layanan yang sudah disepakati."],
            ["04", "Selesai & lanjut", "Dokumen diserahkan dan kebutuhan lanjutan dijelaskan bila ada."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 p-7"
            >
              <p className="text-5xl font-black tracking-[-0.08em] text-slate-100">
                {number}
              </p>
              <h3 className="mt-8 text-xl font-black tracking-[-0.04em] text-slate-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
