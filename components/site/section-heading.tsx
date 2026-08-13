export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl">{title}</h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{description}</p> : null}
    </div>
  );
}
