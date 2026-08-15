import { Star } from "lucide-react";
import { CmsImage } from "@/components/shared/cms-image";
import type { Partner, Testimonial } from "@/types";

export function HomeTrust({ partners, testimonials }: { partners: Partner[]; testimonials: Testimonial[] }) {
  const visiblePartners = partners.slice(0, 10);
  const visibleTestimonials = testimonials.slice(0, 3);

  if (!visiblePartners.length && !visibleTestimonials.length) return null;

  return (
    <section className="trust-v71 border-b border-brand-navy/8">
      {visiblePartners.length ? (
        <div className="partner-v71 overflow-hidden border-b border-brand-navy/8">
          <div className="page-shell py-14 lg:py-16">
            <h2 className="text-center text-2xl font-semibold tracking-[-0.035em] text-brand-navy-dark sm:text-3xl">
              Dipercaya berbagai bisnis dan organisasi
            </h2>
            <div className="partner-marquee-v71 relative mt-9 overflow-hidden rounded-[18px] border border-brand-navy/10 bg-white py-5 shadow-[0_14px_34px_rgba(5,31,58,.045)]">
              <div className="partner-marquee-fade-left absolute inset-y-0 left-0 z-10 w-16 sm:w-28" />
              <div className="partner-marquee-fade-right absolute inset-y-0 right-0 z-10 w-16 sm:w-28" />
              <div className="partner-marquee-track-v71 flex w-max items-center">
                <PartnerGroup partners={visiblePartners} />
                <PartnerGroup partners={visiblePartners} ariaHidden />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {visibleTestimonials.length ? (
        <div className="testimonial-v71 py-20 lg:py-24">
          <div className="page-shell">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="section-title max-w-2xl">Apa kata klien kami?</h2>
              <p className="max-w-md text-sm leading-7 text-brand-muted">Pengalaman klien setelah menggunakan layanan Yuk Jadi Legal.</p>
            </div>

            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {visibleTestimonials.map((testimonial, index) => (
                <article key={testimonial.id} className={`testimonial-card-v71 relative rounded-[20px] border p-6 ${index === 1 ? "border-brand-navy/15 bg-brand-bluewash/55" : "border-brand-navy/12 bg-white"}`}>
                  <div className="flex items-center gap-1 text-brand-gold">
                    {Array.from({ length: Math.max(1, Math.min(5, testimonial.rating || 5)) }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 min-h-[110px] text-sm leading-7 text-brand-ink">“{testimonial.quote}”</blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t border-brand-navy/9 pt-4">
                    <Avatar testimonial={testimonial} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-brand-navy-dark">{testimonial.name}</p>
                      <p className="mt-0.5 truncate text-[10px] text-brand-muted">{[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}</p>
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

function PartnerGroup({ partners, ariaHidden = false }: { partners: Partner[]; ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20" aria-hidden={ariaHidden || undefined}>
      {partners.map((partner, index) => (
        <div key={`${partner.id}-${index}`} className="flex h-12 min-w-[150px] items-center justify-center px-3">
          {partner.logoUrl ? (
            <CmsImage src={partner.logoUrl} alt={ariaHidden ? "" : partner.name} className="max-h-9 w-auto max-w-[145px] object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0" />
          ) : (
            <span className="whitespace-nowrap text-center text-sm font-semibold text-brand-navy/60">{partner.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  if (testimonial.avatarUrl) {
    return <CmsImage src={testimonial.avatarUrl} alt={testimonial.name} className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-brand-navy/10" />;
  }
  return <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-navy text-[9px] font-semibold text-white">{initials || "YJL"}</span>;
}
