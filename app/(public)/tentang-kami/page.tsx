import Link from "next/link";
import { Building2, FileText, MessageCircleMore, Route, ShieldCheck } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import { getTeamMembers } from "@/lib/data";
import { CmsImage } from "@/components/shared/cms-image";
import { PublicPageHero } from "@/components/site/public-page-hero";

export const metadata = createPageMetadata({
  title: "Tentang Kami",
  description: "Kenali Yuk Jadi Legal dan cara kami membantu pemilik usaha mengurus kebutuhan legal dengan proses yang lebih jelas dan mudah dipahami.",
  path: "/tentang-kami",
});

const focusAreas = [
  {
    icon: MessageCircleMore,
    title: "Pahami kondisi usaha",
    description: "Kami mulai dari kondisi dan tujuan bisnis, bukan meminta Anda memilih layanan sendiri.",
  },
  {
    icon: Route,
    title: "Petakan langkah yang relevan",
    description: "Kebutuhan dokumen, izin, dan proses dijelaskan sebelum pekerjaan dimulai.",
  },
  {
    icon: ShieldCheck,
    title: "Dampingi sampai selesai",
    description: "Anda tetap mendapat informasi tentang progres dan tindakan berikutnya.",
  },
] as const;

const serviceAreas = [
  [Building2, "Badan usaha", "Pendirian dan perubahan administrasi badan usaha."],
  [FileText, "Perizinan usaha", "NIB, OSS, izin usaha, dan kebutuhan kepatuhan bisnis."],
  [ShieldCheck, "Merek & dokumen", "Merek, kontrak, perjanjian, dan dokumen pendukung."],
  [MessageCircleMore, "Konsultasi legal", "Arah awal ketika kebutuhan Anda belum bisa ditentukan sendiri."],
] as const;

const principles = [
  ["Bahasa sederhana", "Penjelasan dibuat mudah dipahami tanpa harus menguasai istilah legal."],
  ["Biaya dibahas sejak awal", "Ruang lingkup dan perkiraan biaya dijelaskan sebelum pekerjaan dilanjutkan."],
  ["Ada kabar selama proses", "Perkembangan penting disampaikan agar Anda tidak menebak-nebak."],
  ["Tetap bisa berdiskusi", "Jika kondisi berubah, Anda tetap punya ruang untuk bertanya dan menyesuaikan langkah."],
] as const;

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        title="Legalitas bisnis seharusnya membantu usaha berjalan, bukan membuat pemiliknya bingung."
        description="Yuk Jadi Legal membantu pemilik usaha memahami dan mengurus badan usaha, perizinan, merek, dan dokumen bisnis dengan langkah yang lebih jelas."
      />

      <section className="page-shell py-9 sm:py-11 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Cara kami bekerja</p>
          <h2 className="mt-2 text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-brand-ink sm:text-3xl">
            Bukan sekadar mengurus dokumen. Kami bantu Anda memahami apa yang perlu dilakukan.
          </h2>
          <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-[15px]">
            Banyak pemilik usaha sudah tahu tujuan bisnisnya, tetapi belum tentu tahu izin, dokumen, atau proses legal yang dibutuhkan. Karena itu kami memetakan kebutuhan terlebih dahulu sebelum menentukan langkah.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-[14px] border border-brand-navy/10 bg-white p-4 sm:p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gold-pale">
                <Icon className="h-4.5 w-4.5 text-brand-navy" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-brand-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-navy-dark py-9 text-white sm:py-11 lg:py-14">
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-soft">Yang bisa kami bantu</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
              Kebutuhan legal bisnis dalam satu alur yang lebih mudah dipahami.
            </h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {serviceAreas.map(([Icon, title, description]) => (
              <article key={title} className="rounded-[14px] border border-white/12 bg-white/[0.04] p-4 sm:p-5">
                <Icon className="h-5 w-5 text-brand-gold-soft" />
                <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </article>
            ))}
          </div>

          <Link href="/layanan" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold-soft hover:text-white">
            Lihat semua layanan <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="page-shell py-9 sm:py-11 lg:py-14">
        <div className="grid gap-7 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Prinsip pendampingan</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
              Tetap jelas dari awal sampai akhir.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {principles.map(([title, description], index) => (
              <article key={title} className="rounded-[14px] border border-brand-navy/10 bg-white p-4 sm:p-5">
                <span className="text-xs font-semibold text-brand-gold-dark">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-semibold text-brand-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {team.length ? (
        <section className="border-y border-brand-navy/9 bg-white py-9 sm:py-11 lg:py-14">
          <div className="page-shell">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Tim</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
                Orang yang mendampingi proses Anda.
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {team.slice(0, 6).map((member, index) => (
                <article key={member.id}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-brand-navy sm:aspect-[4/3]">
                    {member.photoUrl ? (
                      <CmsImage src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <span className="text-5xl font-semibold text-white/12">0{index + 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-3">
                    <h3 className="text-sm font-semibold text-brand-ink sm:text-base">{member.name}</h3>
                    <p className="mt-1 text-xs font-medium text-brand-gold-dark">{member.role}</p>
                    <p className="mt-2 hidden text-sm leading-6 text-brand-muted sm:line-clamp-2">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-brand-paper py-9 sm:py-11 lg:py-14">
        <div className="page-shell grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-brand-ink">
              Belum yakin harus mulai dari layanan yang mana?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted">
              Ceritakan kondisi usaha Anda. Tim akan membantu memetakan kebutuhan awal terlebih dahulu.
            </p>
          </div>
          <Link href="/kontak" className="button-gold inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold sm:w-auto">
            Konsultasikan kebutuhan <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
