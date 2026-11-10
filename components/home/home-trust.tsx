import { Star } from "lucide-react";
import { CmsImage } from "@/components/shared/cms-image";
import type { Partner, Testimonial } from "@/types";

export function HomeTrust({
  partners,
  testimonials,
}: {
  partners: Partner[];
  testimonials: Testimonial[];
}) {
  const visiblePartners = partners.slice(0, 10);
  const visibleTestimonials = testimonials.slice(0, 3);
  const partnerLoop = visiblePartners.length
    ? Array.from(
        { length: Math.max(1, Math.ceil(8 / visiblePartners.length)) },
        () => visiblePartners,
      ).flat()
    : [];
  const testimonialLoop = visibleTestimonials.length
    ? Array.from(
        { length: Math.max(1, Math.ceil(6 / visibleTestimonials.length)) },
        () => visibleTestimonials,
      ).flat()
    : [];

  if (!visiblePartners.length && !visibleTestimonials.length) return null;

  return (
    <section className="border-b border-brand-navy/8 bg-brand-surface">
      {visiblePartners.length ? (
        <div className="border-b border-brand-navy/8 py-8 sm:py-9">
          <div className="page-shell">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
              Dipercaya berbagai bisnis dan organisasi
            </p>

            <div className="partner-marquee mt-6">
              <div className="partner-marquee-track">
                {[0, 1].map((groupIndex) => (
                  <div
                    key={groupIndex}
                    className="partner-marquee-group"
                    aria-hidden={groupIndex === 1}
                  >
                    {partnerLoop.map((partner, loopIndex) => (
                      <div
                        key={`${groupIndex}-${loopIndex}-${partner.id}`}
                        className="partner-marquee-item"
                      >
                        {partner.logoUrl ? (
                          <CmsImage
                            src={partner.logoUrl}
                            alt={
                              groupIndex === 0 && loopIndex < visiblePartners.length
                                ? partner.name
                                : ""
                            }
                            className="max-h-11 w-auto max-w-[160px] object-contain opacity-75 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-brand-navy/70">
                            {partner.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {visibleTestimonials.length ? (
        <div className="py-10 sm:py-12 lg:py-14">
          <div className="page-shell">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
              <h2 className="section-title max-w-xl">Apa kata klien kami?</h2>
              <p className="max-w-lg text-sm leading-7 text-brand-muted md:justify-self-end">
                Pengalaman klien setelah menggunakan layanan Yuk Jadi Legal.
              </p>
            </div>
          </div>

          <div className="testimonial-marquee mt-7">
            <div className="testimonial-marquee-track">
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  className="testimonial-marquee-group"
                  aria-hidden={groupIndex === 1}
                >
                  {testimonialLoop.map((testimonial, loopIndex) => (
                    <article
                      key={`${groupIndex}-${loopIndex}-${testimonial.id}`}
                      className="testimonial-marquee-card"
                    >
                      <div className="flex items-center gap-1 text-brand-gold">
                        {Array.from({
                          length: Math.max(1, Math.min(5, testimonial.rating || 5)),
                        }).map((_, starIndex) => (
                          <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>

                      <blockquote className="mt-4 min-h-[84px] text-sm leading-7 text-brand-ink">
                        “{testimonial.quote}”
                      </blockquote>

                      <div className="mt-5 flex items-center gap-3 border-t border-brand-navy/8 pt-4">
                        <Avatar testimonial={testimonial} />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-brand-navy-dark">
                            {testimonial.name}
                          </p>
                          <p className="mt-0.5 truncate text-[10px] text-brand-muted">
                            {[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (testimonial.avatarUrl) {
    return (
      <CmsImage
        src={testimonial.avatarUrl}
        alt={testimonial.name}
        className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-brand-navy/10"
      />
    );
  }

  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-navy text-[9px] font-semibold text-white">
      {initials || "YJL"}
    </span>
  );
}
