import Image from "next/image";
import Link from "next/link";
import { Building2, FileText, MessageCircleMore, ShieldCheck } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import { getTeamMembers } from "@/lib/data";
import { CmsImage } from "@/components/shared/cms-image";

export const metadata = createPageMetadata({
  title: "Tentang Kami",
  description: "Kenali Yuk Jadi Legal dan cara kami membantu pemilik usaha mengurus kebutuhan legal dengan proses yang lebih jelas dan mudah dipahami.",
  path: "/tentang-kami",
});

const serviceAreas = [
  [Building2, "Badan usaha", "Pendirian dan perubahan administrasi badan usaha."],
  [FileText, "Perizinan usaha", "NIB, OSS, izin usaha, dan kebutuhan kepatuhan bisnis."],
  [ShieldCheck, "Merek & dokumen", "Merek, kontrak, perjanjian, dan dokumen pendukung."],
  [MessageCircleMore, "Konsultasi legal", "Arah awal ketika kebutuhan Anda belum bisa ditentukan sendiri."],
] as const;

const principles = [
  ["Bahasa yang lebih sederhana", "Kami menjelaskan kebutuhan tanpa mengharuskan Anda memahami istilah legal terlebih dahulu."],
  ["Biaya dibahas sejak awal", "Ruang lingkup dan perkiraan biaya dibicarakan sebelum pekerjaan dilanjutkan."],
  ["Ada kabar selama proses", "Perkembangan penting disampaikan agar Anda tidak menebak-nebak."],
  ["Tetap bisa berdiskusi", "Jika kondisi berubah, langkah berikutnya dapat dibicarakan kembali bersama tim."],
] as const;

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <main className="bg-brand-surface">
      <section className="border-b border-brand-navy/10 bg-brand-paper">
        <div className="page-shell grid gap-7 py-8 sm:py-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-12 lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">
              Tentang Yuk Jadi Legal
            </p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.046em] text-brand-ink">
              Legalitas bisnis seharusnya membantu usaha berjalan, bukan membuat pemiliknya bingung.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
              Kami membantu pemilik usaha memahami dan mengurus badan usaha, perizinan, merek, serta dokumen bisnis dengan langkah yang lebih jelas.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[24px] bg-white">
            <div className="relative aspect-[5/4]">
              <Image src="/visuals/hero-columns.svg" alt="" fill className="object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">
              Kenapa kami ada
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-brand-ink sm:text-3xl">
              Banyak orang tahu tujuan bisnisnya, tapi belum tentu tahu jalur legal yang tepat.
            </h2>
          </div>

          <div className="border-l-2 border-brand-gold/70 pl-5 sm:pl-7">
            <p className="text-xl font-medium leading-8 tracking-[-0.025em] text-brand-ink sm:text-2xl sm:leading-9">
              “Tugas kami bukan membuat proses terlihat rumit. Tugas kami membantu Anda tahu apa yang perlu dilakukan, kenapa perlu dilakukan, dan apa langkah berikutnya.”
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Karena itu konsultasi dimulai dari kondisi usaha, bukan dari daftar layanan yang harus Anda pahami sendiri.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-navy/9 bg-white py-8 sm:py-10 lg:py-14">
        <div className="page-shell">
          <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">
                Yang kami bantu
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
                Kebutuhan legal yang dekat dengan operasional bisnis.
              </h2>
            </div>

            <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {serviceAreas.map(([Icon, title, description]) => (
                <article key={title} className="border-t border-brand-navy/10 py-5">
                  <div className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" />
                    <div>
                      <h3 className="text-base font-semibold text-brand-ink">{title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-brand-muted">{description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <Link
            href="/layanan"
            className="mt-5 inline-flex text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
          >
            Lihat semua layanan →
          </Link>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-10 lg:py-14">
        <div className="grid gap-7 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">
              Cara kami mendampingi
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
              Empat prinsip yang kami jaga.
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {principles.map(([title, description], index) => (
              <article key={title} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-t border-brand-navy/10 py-5">
                <span className="text-xs font-semibold text-brand-gold-dark">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-brand-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-brand-muted">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {team.length ? (
        <section className="bg-brand-navy-dark py-8 text-white sm:py-10 lg:py-14">
          <div className="page-shell">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold-soft">
                Tim
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                Orang yang mendampingi proses Anda.
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {team.slice(0, 6).map((member, index) => (
                <article key={member.id}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-white/5 sm:aspect-[4/3]">
                    {member.photoUrl ? (
                      <CmsImage src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <span className="text-5xl font-semibold text-white/10">0{index + 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-3">
                    <h3 className="text-sm font-semibold text-white sm:text-base">{member.name}</h3>
                    <p className="mt-1 text-xs text-brand-gold-soft">{member.role}</p>
                    <p className="mt-2 hidden text-sm leading-6 text-slate-300 sm:line-clamp-2">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-brand-navy/9 bg-brand-paper py-8 sm:py-10 lg:py-12">
        <div className="page-shell grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-brand-ink">
              Belum yakin harus mulai dari layanan yang mana?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted">
              Ceritakan kondisi usaha Anda. Tim akan membantu memetakan kebutuhan awal terlebih dahulu.
            </p>
          </div>
          <Link
            href="/kontak"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-[10px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:w-auto"
          >
            Konsultasikan kebutuhan →
          </Link>
        </div>
      </section>
    </main>
  );
}
