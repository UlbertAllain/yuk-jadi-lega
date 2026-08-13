import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/layanan/${service.slug}`}
      className="group flex min-h-[310px] flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-2xl hover:shadow-slate-900/5"
    >
      <div>
        <div className="mb-8 flex items-center justify-between">
          <span className="rounded-full bg-brand-paper px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
            {service.categorySlug.replaceAll("-", " ")}
          </span>
          <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-green" />
        </div>

        <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          {service.shortDescription}
        </p>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
          Mulai dari
        </p>
        <p className="mt-1 font-black text-slate-950">
          {formatRupiah(service.startingPrice)}
        </p>
      </div>
    </Link>
  );
}
