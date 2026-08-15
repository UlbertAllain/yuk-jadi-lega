"use client";

import { useMemo } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ExternalLink, Trash2 } from "lucide-react";
import { AdminPageHeader, IconButton } from "@/components/admin/admin-ui";
import { useAdminCollection } from "@/components/admin/use-admin-collection";
import { getWhatsAppHref } from "@/lib/contact";
import { db } from "@/lib/firebase";
import type { Lead } from "@/types";

type AdminLead = Lead & { id: string };

type FirestoreTimestampLike = {
  toDate: () => Date;
};

function toDate(value: unknown): Date | null {
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    return (value as FirestoreTimestampLike).toDate();
  }

  if (value instanceof Date) return value;
  return null;
}

function dateLabel(value: unknown) {
  const date = toDate(value);
  return date ? date.toLocaleString("id-ID") : "—";
}

function timestampValue(value: unknown) {
  return toDate(value)?.getTime() ?? 0;
}

export default function LeadsAdminPage() {
  const store = useAdminCollection<AdminLead>("leads");

  const items = useMemo(
    () =>
      [...store.items].sort(
        (a, b) => timestampValue(b.createdAt) - timestampValue(a.createdAt),
      ),
    [store.items],
  );

  async function changeStatus(id: string, status: Lead["status"]) {
    if (!db) return;

    await updateDoc(doc(db, "leads", id), {
      status,
      updatedAt: serverTimestamp(),
    });
    await store.refresh();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Konsultasi"
        title="Konsultasi Masuk"
        description="Kelola calon klien yang mengirim formulir konsultasi dan tandai progres tindak lanjut dengan status sederhana."
      />

      {store.error ? (
        <p className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {store.error}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-4">Calon klien</th>
                <th className="px-5 py-4">Layanan</th>
                <th className="px-5 py-4">Pesan</th>
                <th className="px-5 py-4">Masuk</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((lead) => {
                const message = `Halo ${lead.name}, kami dari Yuk Jadi Legal menindaklanjuti konsultasi Anda.`;
                const waHref = getWhatsAppHref(lead.whatsapp, message);

                return (
                  <tr key={lead.id}>
                    <td className="px-5 py-4">
                      <p className="font-black text-slate-950">{lead.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {lead.whatsapp}
                        {lead.email ? ` · ${lead.email}` : ""}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {lead.serviceSlug || "Konsultasi umum"}
                    </td>
                    <td className="max-w-xs px-5 py-4 text-slate-600">
                      <p className="line-clamp-2">{lead.message}</p>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {dateLabel(lead.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        onChange={(event) =>
                          void changeStatus(
                            lead.id,
                            event.target.value as Lead["status"],
                          )
                        }
                        className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold outline-none"
                      >
                        <option value="baru">Baru</option>
                        <option value="dihubungi">Dihubungi</option>
                        <option value="follow-up">Follow Up</option>
                        <option value="jadi-klien">Jadi Klien</option>
                        <option value="tidak-lanjut">Tidak Lanjut</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {waHref ? (
                          <a
                            href={waHref}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Hubungi ${lead.name} melalui WhatsApp`}
                            title={`Hubungi ${lead.name} melalui WhatsApp`}
                            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-brand-navy"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : null}
                        <IconButton
                          label={`Hapus konsultasi ${lead.name}`}
                          tone="danger"
                          onClick={() => {
                            if (confirm("Hapus lead ini?")) {
                              void store.remove(lead.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!store.loading && !items.length ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Belum ada konsultasi yang masuk.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
