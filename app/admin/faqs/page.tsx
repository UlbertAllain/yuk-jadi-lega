"use client";

import { useMemo, useState } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import {
  AdminPageHeader,
  Field,
  IconButton,
  Modal,
  buttonPrimary,
  inputClass,
  textareaClass,
} from "@/components/admin/admin-ui";
import { useAdminCollection } from "@/components/admin/use-admin-collection";
import { slugify } from "@/lib/format";
import type { Faq } from "@/types";

const emptyFaq: Faq = {
  id: "",
  question: "",
  answer: "",
  category: "Umum",
  order: 1,
  published: true,
};

export default function FaqsAdminPage() {
  const store = useAdminCollection<Faq>("faqs");
  const [editing, setEditing] = useState<Faq>(emptyFaq);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const items = useMemo(
    () => [...store.items].sort((a, b) => a.order - b.order),
    [store.items],
  );

  function openNew() {
    setEditing({ ...emptyFaq, order: items.length + 1 });
    setOpen(true);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const id = editing.id || slugify(editing.question).slice(0, 60);
      const { id: _id, ...payload } = editing;
      const saved = await store.save(id, payload);
      if (saved) setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <AdminPageHeader
        eyebrow="Konten"
        title="FAQ"
        description="Kelola pertanyaan umum. FAQ khusus layanan tetap dikelola dari menu Layanan agar konteksnya tidak tercampur."
        action={
          <button type="button" onClick={openNew} className={buttonPrimary}>
            <Plus className="mr-2 h-4 w-4" />
            FAQ
          </button>
        }
      />

      {store.error ? (
        <p className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {store.error}
        </p>
      ) : null}

      <div className="divide-y divide-slate-100 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
        {items.map((item) => (
          <article key={item.id} className="flex gap-5 p-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-brand-gold">
                  {item.category}
                </span>
                {!item.published ? (
                  <span className="text-xs text-slate-400">Draf</span>
                ) : null}
              </div>
              <h2 className="mt-2 font-black text-slate-950">{item.question}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.answer}</p>
            </div>

            <div className="flex shrink-0 gap-2">
              <IconButton
                label="Edit FAQ"
                onClick={() => {
                  setEditing(item);
                  setOpen(true);
                }}
              >
                <Edit3 className="h-4 w-4" />
              </IconButton>
              <IconButton
                label="Hapus FAQ"
                tone="danger"
                onClick={() => {
                  if (confirm("Hapus FAQ ini?")) {
                    void store.remove(item.id);
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </IconButton>
            </div>
          </article>
        ))}
      </div>

      {!store.loading && !items.length ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-400">
          Belum ada FAQ.
        </div>
      ) : null}

      <Modal open={open} onClose={() => setOpen(false)} title={editing.id ? "Edit FAQ" : "Tambah FAQ"}>
        <form onSubmit={submit} className="grid gap-5">
          <Field label="Pertanyaan">
            <input
              required
              className={inputClass}
              value={editing.question}
              onChange={(event) =>
                setEditing((current) => ({
                  ...current,
                  question: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="Jawaban">
            <textarea
              required
              rows={6}
              className={textareaClass}
              value={editing.answer}
              onChange={(event) =>
                setEditing((current) => ({
                  ...current,
                  answer: event.target.value,
                }))
              }
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Kategori">
              <input
                className={inputClass}
                value={editing.category}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Urutan">
              <input
                inputMode="numeric"
                className={inputClass}
                value={String(editing.order)}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    order: Number(event.target.value.replace(/\D/g, "")) || 1,
                  }))
                }
              />
            </Field>
          </div>

          <label className="flex items-center gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={editing.published}
              onChange={(event) =>
                setEditing((current) => ({
                  ...current,
                  published: event.target.checked,
                }))
              }
            />
            Tayang
          </label>

          <button disabled={saving} className={buttonPrimary}>
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
