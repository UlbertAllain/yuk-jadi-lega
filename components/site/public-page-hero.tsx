import type { ReactNode } from "react";

export function PublicPageHero({
  title,
  description,
  meta,
}: {
  title: ReactNode;
  description: string;
  meta?: ReactNode;
}) {
  return (
    <section className="border-b border-brand-navy/10 bg-brand-surface">
      <div className="page-shell py-10 sm:py-12 lg:py-16">
        <div className="grid gap-6 text-center sm:gap-8 lg:grid-cols-[minmax(0,820px)_minmax(320px,380px)] lg:items-center lg:justify-between lg:gap-14 lg:text-left">
          <h1 className="mx-auto max-w-[820px] text-[clamp(2.25rem,4.3vw,3.9rem)] font-semibold leading-[1.03] tracking-[-0.047em] text-brand-navy-dark lg:mx-0">
            {title}
          </h1>

          <div className="mx-auto max-w-[420px] lg:mx-0">
            <p className="text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">{description}</p>
            {meta ? <div className="mt-4 border-t border-brand-navy/10 pt-4">{meta}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
