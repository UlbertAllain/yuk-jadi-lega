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
      <div className="page-shell py-10 sm:py-12 lg:py-20">
        <div className="grid gap-5 text-center sm:gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16 lg:text-left">
          <h1 className="mx-auto max-w-4xl text-[clamp(2.15rem,9vw,4.35rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-brand-navy-dark lg:mx-0">
            {title}
          </h1>

          <div className="mx-auto max-w-md lg:mx-0 lg:max-w-none">
            <p className="text-[14px] leading-7 text-brand-muted">{description}</p>
            {meta ? <div className="mt-4 border-t border-brand-navy/10 pt-4">{meta}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
