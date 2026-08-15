import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getTeamMembers } from "@/lib/data";
import { CmsImage } from "@/components/shared/cms-image";
import { PublicPageHero } from "@/components/site/public-page-hero";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali cara Yuk Jadi Legal membantu bisnis memahami dan mengurus kebutuhan legal secara lebih sederhana.",
};

const values = [
  ["Mudah dipahami", "Bahasa yang dekat dengan pemilik bisnis tanpa kehilangan konteks."],
  ["Transparan", "Scope, kebutuhan, dan titik penting proses dibicarakan sejak awal."],
  ["Terarah", "Setiap proses punya checklist dan langkah berikutnya yang jelas."],
  ["Human", "Konsultasi tetap terasa seperti percakapan, bukan sekadar tiket."],
] as const;

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        eyebrow="Tentang Yuk Jadi Legal"
        title="Membuat proses legal lebih mudah dipahami pemilik bisnis."
        description="Kami membantu menerjemahkan kebutuhan badan usaha, perizinan, merek, dan dokumen bisnis menjadi langkah yang lebih jelas dan terstruktur."
      />

      <section className="page-shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="section-kicker">Cara kami bekerja</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-brand-ink sm:text-4xl">Bukan sekadar mengurus dokumen.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map(([title, description], index) => (
              <div key={title} className="card-premium card-accent-top rounded-[22px] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-semibold tracking-[-0.06em] text-brand-navy/12">0{index + 1}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-navy text-white"><Check className="h-4 w-4" /></span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-brand-ink">{title}</h3>
                <p className="mt-2 text-sm font-normal leading-7 text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {team.length ? (
        <section className="border-y border-brand-navy/9 bg-white py-16 lg:py-24">
          <div className="page-shell">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-14">
              <div>
                <p className="section-kicker">Tim</p>
                <h2 className="section-title mt-4">Orang-orang di balik proses.</h2>
              </div>
              <p className="section-copy">Pendampingan tetap dijalankan oleh manusia yang memahami konteks kebutuhan bisnis.</p>
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
                    <span className="absolute bottom-4 left-4 rounded-lg bg-brand-gold px-2.5 py-1.5 text-[10px] font-semibold text-brand-navy">0{index + 1}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-brand-ink">{member.name}</h3>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">{member.role}</p>
                    <p className="mt-3 line-clamp-3 text-sm font-normal leading-6 text-brand-muted">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

    </main>
  );
}
