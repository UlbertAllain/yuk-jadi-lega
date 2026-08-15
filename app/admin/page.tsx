"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  Handshake,
  MessageSquareText,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { db } from "@/lib/firebase";
import type { Lead } from "@/types";

const cards = [
  ["services", "Layanan", BriefcaseBusiness, "/admin/services"],
  ["articles", "Artikel", BookOpenText, "/admin/articles"],
  ["partners", "Partner & Klien", Handshake, "/admin/partners"],
  ["leads", "Konsultasi", MessageSquareText, "/admin/leads"],
] as const;

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (!db) return;

    async function load() {
      const countPairs = await Promise.all(
        cards.map(async ([collectionName]) => {
          const snapshot = await getCountFromServer(collection(db!, collectionName));
          return [collectionName, snapshot.data().count] as const;
        }),
      );
      setCounts(Object.fromEntries(countPairs));

      const latest = await getDocs(
        query(collection(db!, "leads"), orderBy("createdAt", "desc"), limit(5)),
      );
      setLeads(
        latest.docs.map(
          (item) => ({ ...item.data(), id: item.id }) as Lead,
        ),
      );
    }

    void load().catch((error) => {
      console.error("Gagal memuat dashboard", error);
    });
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Ringkasan konten website dan konsultasi terbaru yang perlu ditindaklanjuti."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([key, label, Icon, href]) => (
          <Link
            key={key}
            href={href}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-paper text-brand-navy">
                <Icon className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-slate-300" />
            </div>
            <p className="mt-6 text-4xl font-black tracking-[-0.06em] text-slate-950">
              {counts[key] ?? "—"}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-500">{label}</p>
          </Link>
        ))}
      </div>

      <section className="mt-7 rounded-[1.75rem] border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-gold">
              Konsultasi terbaru
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950">
              Permintaan dari website
            </h2>
          </div>
          <Link href="/admin/leads" className="text-sm font-black text-brand-navy">
            Lihat semua →
          </Link>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="pb-3">Nama</th>
                <th className="pb-3">WhatsApp</th>
                <th className="pb-3">Layanan</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="py-4 font-bold text-slate-900">{lead.name}</td>
                  <td className="py-4 text-slate-600">{lead.whatsapp}</td>
                  <td className="py-4 text-slate-600">
                    {lead.serviceSlug || "Konsultasi umum"}
                  </td>
                  <td className="py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
              {!leads.length ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    Belum ada konsultasi masuk.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
