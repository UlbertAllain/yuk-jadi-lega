import Link from "next/link";
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
    number: "01",
    title: "Memahami kebutuhan usaha",
    description: "Kami mulai dari kondisi usaha dan tujuan Anda, bukan langsung meminta Anda memilih layanan sendiri.",
  },
  {
    number: "02",
    title: "Menentukan langkah yang relevan",
    description: "Kebutuhan dokumen, perizinan, dan proses dijelaskan dengan bahasa yang lebih sederhana sebelum pekerjaan dimulai.",
  },
  {
    number: "03",
    title: "Mendampingi sampai tahap akhir",
    description: "Anda tetap mendapat informasi tentang perkembangan proses dan apa yang perlu dilakukan berikutnya.",
  },
] as const;

const serviceAreas = [
  ["Badan usaha", "Pendirian, perubahan data, dan kebutuhan administrasi badan usaha."],
  ["Perizinan usaha", "NIB, OSS, izin usaha, dan kebutuhan legal lain yang berkaitan dengan kegiatan bisnis."],
  ["Merek & dokumen bisnis", "Perlindungan merek, kontrak, perjanjian, dan dokumen pendukung usaha."],
  ["Konsultasi legal", "Membantu memahami langkah yang tepat ketika kebutuhan Anda belum bisa ditentukan sejak awal."],
] as const;

const principles = [
  ["Bahasa yang lebih sederhana", "Kami menjelaskan kebutuhan dan proses tanpa membuat Anda harus memahami istilah legal terlebih dahulu."],
  ["Biaya dibicarakan sejak awal", "Perkiraan biaya dan hal yang termasuk dalam layanan dijelaskan sebelum pekerjaan dilanjutkan."],
  ["Ada kabar selama proses", "Anda tidak dibiarkan menebak-nebak. Informasi diberikan pada tahap yang memang perlu diketahui."],
  ["Tetap bisa berdiskusi", "Kalau ada kondisi yang berubah atau pertanyaan baru, Anda tetap punya ruang untuk berkonsultasi dengan tim."],
] as const;

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        title="Legalitas bisnis seharusnya membantu usaha berjalan, bukan membuat pemiliknya bingung."
        description="Yuk Jadi Legal membantu pemilik usaha memahami dan mengurus kebutuhan badan usaha, perizinan, merek, serta dokumen bisnis dengan langkah yang lebih jelas dari awal."
      />

      <section className="page-shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div>
            <h2 className="max-w-md text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-brand-ink sm:text-4xl">
              Kami membantu Anda memahami apa yang perlu dilakukan, bukan sekadar mengurus dokumen.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-brand-muted">
              Banyak pemilik usaha sudah tahu tujuan bisnisnya, tetapi belum tentu tahu dokumen, izin, atau proses legal apa yang perlu disiapkan. Di situlah kami membantu: memetakan kebutuhan terlebih dahulu, lalu menjelaskan langkah yang paling relevan untuk kondisi usaha Anda.
            </p>
          </div>

          <div className="divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {focusAreas.map((item) => (
              <article key={item.number} className="grid gap-4 py-6 sm:grid-cols-[64px_minmax(0,1fr)] sm:py-7">
                <span className="text-sm font-semibold tabular-nums text-brand-gold-dark">{item.number}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-brand-ink">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-white lg:py-20">
        <div className="page-shell">
          <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
            <div>
              <h2 className="max-w-md text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl">Kebutuhan legal yang bisa kami bantu.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Anda tidak harus hafal nama layanannya. Ceritakan kegiatan usaha dan tujuan yang ingin dicapai, lalu tim membantu mengarahkan kebutuhan yang paling sesuai.
              </p>
              <Link href="/layanan" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold-soft hover:text-white">
                Lihat semua layanan <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {serviceAreas.map(([title, description], index) => (
                <article key={title} className="border-t border-white/14 py-5 sm:py-6">
                  <span className="text-[10px] font-semibold text-brand-gold-soft">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14">
          <div>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-brand-ink sm:text-4xl">Cara kami mendampingi klien.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-brand-muted">
              Tujuannya sederhana: membuat Anda tetap paham apa yang sedang terjadi selama proses berjalan.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {principles.map(([title, description], index) => (
              <article key={title} className="border-t border-brand-navy/12 py-6">
                <span className="text-[10px] font-semibold text-brand-gold-dark">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-brand-ink">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-brand-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {team.length ? (
        <section className="border-y border-brand-navy/9 bg-white py-16 lg:py-24">
          <div className="page-shell">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-14">
              <div>
                <h2 className="section-title">Tim yang mendampingi proses Anda.</h2>
              </div>
              <p className="section-copy">Di balik setiap konsultasi dan proses layanan, ada tim yang membantu memahami kebutuhan bisnis Anda.</p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {team.slice(0, 6).map((member, index) => (
                <article key={member.id} className="card-premium overflow-hidden rounded-[24px]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand-navy">
                    {member.photoUrl ? (
                      <CmsImage src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="page-hero-grid grid h-full place-items-center"><span className="text-7xl font-semibold text-white/10">0{index + 1}</span></div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-brand-ink">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-gold-dark">{member.role}</p>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-brand-muted">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-shell py-14 lg:py-20">
        <div className="rounded-[28px] border border-brand-navy/10 bg-brand-paper px-6 py-8 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">Belum yakin harus mulai dari layanan yang mana?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted">Ceritakan kondisi usaha Anda. Tim kami akan membantu memetakan kebutuhan awal sebelum Anda memutuskan layanan.</p>
          </div>
          <Link href="/kontak" className="button-gold mt-6 inline-flex shrink-0 items-center gap-2 px-5 py-3 text-sm font-semibold lg:mt-0">
            Konsultasikan kebutuhan <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
