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
import type { CaseStudy } from "@/types";

const emptyCaseStudy: CaseStudy = {
  id: "",
  title: "",
  client: "",
  challenge: "",
  solution: "",
  result: "",
  published: true,
  featured: true,
};

export default function CaseStudiesAdminPage() {
  const store = useAdminCollection<CaseStudy>("caseStudies");
  const [editing, setEditing] = useState<CaseStudy>(emptyCaseStudy);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const items = useMemo(
    () =>
      [...store.items].sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }
        return a.title.localeCompare(b.title, "id");
      }),
    [store.items],
  );

  function openNew() {
    setEditing(emptyCaseStudy);
    setOpen(true);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const id = editing.id || `${slugify(editing.title)}-${Date.now()}`;
      const { id: _id, ...payload } = editing;
      const saved = await store.save(id, payload);
      if (saved) setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Proof"
        title="Studi Kasus"
        description="Ringkas masalah, solusi, dan hasil dari pekerjaan nyata. Publikasikan hanya informasi yang aman dan disetujui klien."
        action={
          <button type="button" onClick={openNew} className={buttonPrimary}>
            <Plus className="mr-2 h-4 w-4" />
            Studi Kasus
          </button>
        }
      />

      {store.error ? (
        <p className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {store.error}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-black uppercase tracking-wider text-brand-gold">
                    {item.client}
                  </p>
                  {item.featured ? (
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-700">
                      Homepage
                    </span>
                  ) : null}
                  {!item.published ? (
                    <span className="text-xs text-slate-400">Draf</span>
                  ) : null}
                </div>
                <h2 className="mt-2 text-xl font-black tracking-[-0.04em] text-slate-950">
                  {item.title}
                </h2>
              </div>

              <div className="flex shrink-0 gap-2">
                <IconButton
                  label={`Edit ${item.title}`}
                  onClick={() => {
                    setEditing(item);
                    setOpen(true);
                  }}
                >
                  <Edit3 className="h-4 w-4" />
                </IconButton>
                <IconButton
                  label={`Hapus ${item.title}`}
                  tone="danger"
                  onClick={() => {
                    if (confirm("Hapus studi kasus ini?")) {
                      void store.remove(item.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </div>
            </div>

            <div className="mt-5 grid gap-4 text-sm leading-6 text-slate-500">
              <div>
                <b className="text-slate-800">Tantangan:</b> {item.challenge}
              </div>
              <div>
                <b className="text-slate-800">Solusi:</b> {item.solution}
              </div>
              <div>
                <b className="text-slate-800">Hasil:</b> {item.result}
              </div>
            </div>
          </article>
        ))}
      </div>

      {!store.loading && !items.length ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-400">
          Belum ada studi kasus.
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing.id ? "Edit Studi Kasus" : "Tambah Studi Kasus"}
      >
        <form onSubmit={submit} className="grid gap-5">
          <Field label="Judul">
            <input
              required
              className={inputClass}
              value={editing.title}
              onChange={(event) =>
                setEditing((current) => ({ ...current, title: event.target.value }))
              }
            />
          </Field>

          <Field label="Klien">
            <input
              required
              className={inputClass}
              value={editing.client}
              onChange={(event) =>
                setEditing((current) => ({ ...current, client: event.target.value }))
              }
            />
          </Field>

          <Field label="Tantangan">
            <textarea
              required
              rows={4}
              className={textareaClass}
              value={editing.challenge}
              onChange={(event) =>
                setEditing((current) => ({
                  ...current,
                  challenge: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="Solusi">
            <textarea
              required
              rows={4}
              className={textareaClass}
              value={editing.solution}
              onChange={(event) =>
                setEditing((current) => ({ ...current, solution: event.target.value }))
              }
            />
          </Field>

          <Field label="Hasil">
            <textarea
              required
              rows={4}
              className={textareaClass}
              value={editing.result}
              onChange={(event) =>
                setEditing((current) => ({ ...current, result: event.target.value }))
              }
            />
          </Field>

          <div className="flex flex-wrap gap-5 text-sm font-bold">
            <label className="flex items-center gap-2">
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
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    featured: event.target.checked,
                  }))
                }
              />
              Prioritaskan di homepage
            </label>
          </div>

          <button disabled={saving} className={buttonPrimary}>
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
