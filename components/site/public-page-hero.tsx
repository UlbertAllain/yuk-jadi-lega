import type { ReactNode } from "react";

export function PublicPageHero({ title, description, meta }: { eyebrow: string; title: ReactNode; description: string; meta?: ReactNode }) {
  return (
    <section className="public-hero-v7 relative overflow-hidden border-b border-brand-navy/10">
      <div className="hero-v7-grid absolute inset-0" />
      <div className="page-shell relative py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16">
          <div className="max-w-4xl">
            <h1 className="mt-4 text-[clamp(2.35rem,4.4vw,4.35rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-brand-navy-dark">{title}</h1>
          </div>
          <div className="rounded-[18px] border border-brand-navy/12 bg-white/88 p-5 shadow-[0_16px_40px_rgba(5,31,58,.065)] backdrop-blur-sm">
            <p className="text-[14px] leading-7 text-brand-muted">{description}</p>
            {meta ? <div className="mt-4 border-t border-brand-navy/9 pt-4">{meta}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
