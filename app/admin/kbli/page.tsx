"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { useAdminCollection } from "@/components/admin/use-admin-collection";
import {
  AdminPageHeader,
  Field,
  Modal,
  buttonPrimary,
  inputClass,
  textareaClass,
} from "@/components/admin/admin-ui";
import { db } from "@/lib/firebase";
import type { KbliEntry } from "@/types";

const emptyEntry: KbliEntry = {
  id: "",
  code: "",
  title: "",
  description: "",
  category: "",
  source: "BPS KBLI 2020 / OSS RBA",
  order: 1,
  published: true,
};

export default function KbliAdminPage() {
  const collection = useAdminCollection<KbliEntry>("kbli");
  const [editing, setEditing] = useState<KbliEntry>(emptyEntry);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importValue, setImportValue] = useState("");
  const [importMessage, setImportMessage] = useState("");

  const items = useMemo(
    () => [...collection.items].sort((a, b) => a.code.localeCompare(b.code, "id")),
    [collection.items],
  );

  function startNew() {
    setEditing({ ...emptyEntry, order: items.length + 1 });
    setOpen(true);
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      const code = editing.code.trim();
      const duplicate = collection.items.some(
        (item) => item.id !== editing.id && item.code === code,
      );
      if (duplicate) {
        alert("Kode KBLI sudah digunakan.");
        return;
      }
      const id = editing.id || code;
      const { id: _id, ...payload } = editing;
      const saved = await collection.save(id, payload);
      if (saved) setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function importJson() {
    setImportMessage("");
    try {
      if (!db) throw new Error("Database belum tersedia.");

      const parsed = JSON.parse(importValue) as Array<Partial<KbliEntry>>;
      if (!Array.isArray(parsed)) throw new Error("Format harus berupa array JSON.");

      const normalized = parsed
        .map((item, index) => ({
          code: String(item.code || "").trim(),
          title: String(item.title || "").trim(),
          description: String(item.description || "").trim(),
          category: String(item.category || "").trim(),
          source: String(item.source || "BPS KBLI 2020 / OSS RBA").trim(),
          order: Number(item.order || index + 1),
          published: item.published !== false,
        }))
        .filter((item) => item.code && item.title && item.description);

      if (!normalized.length) throw new Error("Tidak ada record KBLI valid.");

      const chunkSize = 400;
      for (let start = 0; start < normalized.length; start += chunkSize) {
        const batch = writeBatch(db);
        for (const item of normalized.slice(start, start + chunkSize)) {
          batch.set(
            doc(db, "kbli", item.code),
            { ...item, updatedAt: serverTimestamp() },
            { merge: true },
          );
        }
        await batch.commit();
      }

      await collection.refresh();
      setImportMessage(`${normalized.length} record KBLI berhasil diproses.`);
      setImportValue("");
    } catch (error) {
      setImportMessage(error instanceof Error ? error.message : "Import gagal.");
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Resource"
        title="KBLI"
        description="Kelola referensi KBLI yang dapat dicari pengunjung. Gunakan sumber resmi BPS/OSS sebelum mempublikasikan data."
        action={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setImportOpen(true)}
              className="h-11 rounded-full border border-slate-200 bg-white px-5 text-sm font-black"
            >
              Import JSON
            </button>
            <button type="button" onClick={startNew} className={buttonPrimary}>
              <Plus className="mr-2 h-4 w-4" /> KBLI
            </button>
          </div>
        }
      />

      {collection.error ? (
        <p className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {collection.error}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-4">Kode</th>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-mono font-black text-brand-navy-dark">{item.code}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{item.title}</td>
                  <td className="px-6 py-4 text-slate-500">{item.category || "—"}</td>
                  <td className="px-6 py-4">{item.published ? "Tayang" : "Draf"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setEditing(item); setOpen(true); }}
                        className="rounded-full border border-slate-200 px-3 py-2 text-xs font-black"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => { if (confirm(`Hapus KBLI ${item.code}?`)) void collection.remove(item.id); }}
                        className="grid h-9 w-9 place-items-center rounded-full border border-rose-200 text-rose-600"
                        aria-label={`Hapus KBLI ${item.code}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!collection.loading && !items.length ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Belum ada data KBLI.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing.id ? "Edit KBLI" : "Tambah KBLI"}>
        <form onSubmit={save} className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Kode"><input required className={inputClass} value={editing.code} onChange={(e) => setEditing((c) => ({ ...c, code: e.target.value.replace(/\D/g, "") }))} /></Field>
            <Field label="Kategori"><input className={inputClass} value={editing.category || ""} onChange={(e) => setEditing((c) => ({ ...c, category: e.target.value }))} /></Field>
          </div>
          <Field label="Judul"><input required className={inputClass} value={editing.title} onChange={(e) => setEditing((c) => ({ ...c, title: e.target.value }))} /></Field>
          <Field label="Uraian"><textarea required rows={6} className={textareaClass} value={editing.description} onChange={(e) => setEditing((c) => ({ ...c, description: e.target.value }))} /></Field>
          <Field label="Sumber"><input className={inputClass} value={editing.source || ""} onChange={(e) => setEditing((c) => ({ ...c, source: e.target.value }))} /></Field>
          <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={editing.published} onChange={(e) => setEditing((c) => ({ ...c, published: e.target.checked }))} /> Tayang</label>
          <button disabled={saving} className={buttonPrimary}>{saving ? "Menyimpan..." : "Simpan KBLI"}</button>
        </form>
      </Modal>

      <Modal open={importOpen} onClose={() => setImportOpen(false)} title="Import KBLI dari JSON">
        <div className="grid gap-5">
          <p className="text-sm leading-7 text-slate-600">
            Format: array berisi <code>code</code>, <code>title</code>, <code>description</code>, dan opsional <code>category</code>. Data lama dengan ID yang sama akan diperbarui.
          </p>
          <textarea rows={12} className={textareaClass} value={importValue} onChange={(e) => setImportValue(e.target.value)} placeholder='[{"code":"62019","title":"...","description":"..."}]' />
          {importMessage ? <p className="rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-700">{importMessage}</p> : null}
          <button type="button" onClick={() => void importJson()} className={buttonPrimary}>Proses Import</button>
        </div>
      </Modal>
    </div>
  );
}
