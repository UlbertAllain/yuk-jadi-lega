import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { getPartners, getTeamMembers } from "@/lib/data";
import { CmsImage } from "@/components/shared/cms-image";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali cara Yuk Jadi Legal membantu bisnis memahami dan mengurus kebutuhan legal secara lebih sederhana.",
};

export default async function AboutPage() {
  const [team, partners] = await Promise.all([getTeamMembers(), getPartners()]);

  return (
    <main>
      <section className="bg-brand-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">
            Tentang Yuk Jadi Legal
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
            Legalitas seharusnya bisa dipahami pemilik bisnis, bukan hanya orang legal.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
            Yuk Jadi Legal dibangun untuk membuat percakapan soal badan usaha,
            perizinan, merek, dan dokumen bisnis terasa lebih jelas dari awal.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
            Cara kami berpikir
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950">
            Bukan sekadar “urus dokumen”.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-slate-600">
          <p>
            Masalah legal sering terasa berat bukan karena semua prosesnya selalu
            rumit, tetapi karena calon klien tidak tahu harus mulai dari mana,
            dokumen apa yang perlu disiapkan, dan istilah apa yang benar-benar
            relevan.
          </p>
          <p>
            Karena itu pengalaman Yuk Jadi Legal dirancang dari sudut pandang
            pemilik bisnis: pahami kebutuhan, jelaskan pilihan, susun langkah,
            lalu proses sesuai ruang lingkup yang disepakati.
          </p>
        </div>
      </section>

      <section className="bg-brand-ink py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Mudah dipahami", "Bahasa yang dekat dengan pemilik bisnis."],
              ["Transparan", "Ruang lingkup dan kebutuhan dijelaskan sebelum proses."],
              ["Terarah", "Kamu tahu apa yang dilakukan dan langkah berikutnya."],
              ["Human", "Konsultasi tetap terasa seperti bicara dengan manusia."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-[2rem] border border-white/10 p-7">
                <CheckCircle2 className="h-6 w-6 text-brand-gold-soft" />
                <h3 className="mt-7 text-xl font-black tracking-[-0.04em]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {team.length ? (
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
            Tim
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl">
            Orang-orang di balik layanan.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {team.map((member, index) => (
              <article
                key={member.id}
                className="overflow-hidden rounded-[2rem] border border-slate-200"
              >
                <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-brand-green to-brand-ink text-7xl font-black text-white/10">
                  {member.photoUrl ? (
                    <CmsImage
                      src={member.photoUrl}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    `0${index + 1}`
                  )}
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-black tracking-[-0.04em]">{member.name}</h3>
                  <p className="mt-1 text-sm font-bold text-brand-gold-dark">{member.role}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {partners.length ? (
        <section className="bg-brand-paper py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
              Ekosistem kerja sama
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950">
              Partner dan klien.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => {
                const content = partner.logoUrl ? (
                  <CmsImage
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-10 max-w-40 object-contain"
                  />
                ) : (
                  partner.name
                );

                const className =
                  "flex min-h-28 items-center justify-center rounded-2xl bg-white p-6 text-center font-black text-slate-700";

                return partner.website ? (
                  <a
                    key={partner.id}
                    href={partner.website}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={partner.id} className={className}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
