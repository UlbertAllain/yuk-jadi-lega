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
      <div className="page-shell py-8 sm:py-10 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,820px)_minmax(320px,380px)] lg:items-center lg:justify-between lg:gap-14">
          <h1 className="max-w-[820px] text-[clamp(2.15rem,4.3vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-brand-navy-dark">
            {title}
          </h1>

          <div className="max-w-[520px] lg:max-w-[420px]">
            <p className="text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">{description}</p>
            {meta ? <div className="mt-4 border-t border-brand-navy/10 pt-4">{meta}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
