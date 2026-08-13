import { Star } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import type { CaseStudy, TeamMember, Testimonial } from "@/types";
import { CmsImage } from "@/components/shared/cms-image";

export function HomeTrust({
  caseStudies,
  testimonials,
  team,
}: {
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  team: TeamMember[];
}) {
  return (
    <>
      {caseStudies.length ? (
        <section className="bg-brand-green py-24 text-white lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold-soft">
                  Studi kasus
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] sm:text-5xl">
                  Bukti kerja lebih kuat daripada janji.
                </h2>
                <p className="mt-5 text-sm leading-7 text-emerald-100/80">
                  Lihat bagaimana kebutuhan klien dipetakan, diproses, dan diselesaikan secara terarah.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {caseStudies.slice(0, 2).map((item) => (
                  <article key={item.id} className="rounded-[2rem] bg-white p-7 text-slate-900">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-gold">
                      {item.client}
                    </p>
                    <h3 className="mt-4 text-2xl font-black tracking-[-0.045em]">
                      {item.title}
                    </h3>
                    <div className="mt-6 space-y-5 text-sm leading-6 text-slate-600">
                      <div>
                        <p className="font-black text-slate-950">Tantangan</p>
                        <p className="mt-1">{item.challenge}</p>
                      </div>
                      <div>
                        <p className="font-black text-slate-950">Solusi</p>
                        <p className="mt-1">{item.solution}</p>
                      </div>
                      <div>
                        <p className="font-black text-slate-950">Hasil</p>
                        <p className="mt-1">{item.result}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {testimonials.length ? (
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <SectionHeading
            eyebrow="Testimoni"
            title="Pengalaman klien, diceritakan apa adanya."
            description="Cerita langsung dari klien membantu calon pengguna memahami pengalaman bekerja bersama Yuk Jadi Legal."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <blockquote
                key={item.id}
                className="flex h-full flex-col rounded-[2rem] border border-slate-200 p-7"
              >
                <div className="flex gap-1 text-brand-gold">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="mt-6 flex-1 text-lg font-semibold leading-8 text-slate-800">
                  “{item.quote}”
                </p>

                <footer className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-5">
                  {item.avatarUrl ? (
                    <CmsImage
                      src={item.avatarUrl}
                      alt={item.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-paper text-xs font-black text-brand-green">
                      {item.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-black text-slate-950">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {[item.role, item.company].filter(Boolean).join(" — ")}
                    </p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}

      {team.length ? (
        <section className="bg-brand-paper py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Tim"
              title="Legal tetap soal manusia dan kepercayaan."
              description="Kenali orang-orang yang membantu menangani kebutuhan legalitas bisnis."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {team.slice(0, 3).map((member, index) => (
                <article key={member.id} className="overflow-hidden rounded-[2rem] bg-white">
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
                    <p className="text-xl font-black tracking-[-0.04em] text-slate-950">
                      {member.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-brand-gold-dark">{member.role}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
