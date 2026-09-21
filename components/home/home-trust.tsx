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

  if (!visiblePartners.length && !visibleTestimonials.length) return null;

  return (
    <section className="border-b border-brand-navy/8 bg-brand-surface">
      {visiblePartners.length ? (
        <div className="border-b border-brand-navy/8">
          <div className="page-shell py-10 sm:py-12 lg:py-16">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
              Dipercaya berbagai bisnis dan organisasi
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:mt-8 sm:gap-x-8 sm:gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
              {visiblePartners.map((partner) => (
                <div key={partner.id} className="flex min-h-12 items-center justify-center">
                  {partner.logoUrl ? (
                    <CmsImage
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-9 w-auto max-w-[145px] object-contain opacity-65 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  ) : (
                    <span className="text-center text-sm font-semibold text-brand-navy/60">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {visibleTestimonials.length ? (
        <div className="py-14 sm:py-16 lg:py-24">
          <div className="page-shell">
            <div className="grid gap-4 text-center md:grid-cols-[1fr_420px] md:items-end md:gap-10 md:text-left">
              <h2 className="mx-auto max-w-2xl section-title md:mx-0">Apa kata klien kami?</h2>
              <p className="mx-auto max-w-md text-sm leading-7 text-brand-muted md:mx-0">
                Pengalaman klien setelah menggunakan layanan Yuk Jadi Legal.
              </p>
            </div>

            <div className="mt-8 grid gap-7 sm:mt-10 sm:gap-8 lg:grid-cols-3">
              {visibleTestimonials.map((testimonial) => (
                <article key={testimonial.id} className="border-t border-brand-navy/16 pt-5 text-center lg:text-left">
                  <div className="flex items-center gap-1 text-brand-gold">
                    {Array.from({
                      length: Math.max(1, Math.min(5, testimonial.rating || 5)),
                    }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-7 text-brand-ink sm:mt-5 sm:min-h-[110px]">
                    “{testimonial.quote}”
                  </blockquote>
                  <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
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
