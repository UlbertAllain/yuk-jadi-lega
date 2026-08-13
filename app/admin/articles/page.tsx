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
import { MediaUploader } from "@/components/admin/media-uploader";
import { useAdminCollection } from "@/components/admin/use-admin-collection";
import { slugify } from "@/lib/format";
import type { Article } from "@/types";

function today() {
  return new Date().toISOString().slice(0, 10);
}

const emptyArticle: Article = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  category: "Memulai Usaha",
  content: "",
  publishedAt: today(),
  featured: false,
  published: true,
  coverImageUrl: "",
};

export default function ArticlesAdminPage() {
  const store = useAdminCollection<Article>("articles");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Article>(emptyArticle);
  const [saving, setSaving] = useState(false);

  const items = useMemo(
    () =>
      [...store.items].sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }
        return b.publishedAt.localeCompare(a.publishedAt);
      }),
    [store.items],
  );

  function openNew() {
    setEditing({ ...emptyArticle, publishedAt: today() });
    setOpen(true);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const slug = editing.slug || slugify(editing.title);
      const duplicate = store.items.some(
        (item) => item.id !== editing.id && item.slug === slug,
      );
      if (duplicate) {
        alert("Slug artikel sudah digunakan. Gunakan slug yang berbeda.");
        return;
      }
      const id = editing.id || slug;
      const { id: _id, ...payload } = editing;

      const saved = await store.save(id, { ...payload, slug });
      if (saved) setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Konten"
        title="Artikel & Insight"
        description="Kelola konten edukasi untuk membantu calon klien memahami topik legal sebelum berkonsultasi."
        action={
          <button type="button" onClick={openNew} className={buttonPrimary}>
            <Plus className="mr-2 h-4 w-4" />
            Artikel
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
                    {item.category}
                  </p>
                  {item.featured ? (
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-700">
                      Prioritas
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-2 text-xl font-black tracking-[-0.04em] text-slate-950">
                  {item.title}
                </h2>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  item.published
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {item.published ? "Tayang" : "Draf"}
              </span>
            </div>

            <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
              {item.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
              <p className="truncate text-xs text-slate-400">
                {item.publishedAt} · /{item.slug}
              </p>
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
                    if (confirm(`Hapus ${item.title}?`)) {
                      void store.remove(item.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!store.loading && !items.length ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-400">
          Belum ada artikel.
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing.id ? "Edit Artikel" : "Tambah Artikel"}
      >
        <form onSubmit={submit} className="grid gap-5">
          <Field label="Judul">
            <input
              required
              className={inputClass}
              value={editing.title}
              onChange={(event) =>
                setEditing((current) => ({
                  ...current,
                  title: event.target.value,
                  slug: current.id ? current.slug : slugify(event.target.value),
                }))
              }
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Slug">
              <input
                required
                className={inputClass}
                value={editing.slug}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    slug: slugify(event.target.value),
                  }))
                }
              />
            </Field>
            <Field label="Tanggal publish">
              <input
                type="date"
                className={inputClass}
                value={editing.publishedAt}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    publishedAt: event.target.value,
                  }))
                }
              />
            </Field>
          </div>

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
            <div className="flex items-end gap-5 pb-2 text-sm font-bold">
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
                Prioritaskan
              </label>
            </div>
          </div>

          <Field label="Ringkasan">
            <textarea
              required
              rows={3}
              className={textareaClass}
              value={editing.excerpt}
              onChange={(event) =>
                setEditing((current) => ({
                  ...current,
                  excerpt: event.target.value,
                }))
              }
            />
          </Field>

          <Field
            label="Isi artikel"
            hint="Gunakan paragraf kosong untuk memisahkan bagian agar artikel tetap mudah dibaca."
          >
            <textarea
              required
              rows={12}
              className={textareaClass}
              value={editing.content}
              onChange={(event) =>
                setEditing((current) => ({
                  ...current,
                  content: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="Cover image">
            <MediaUploader
              value={editing.coverImageUrl}
              onChange={(url) =>
                setEditing((current) => ({ ...current, coverImageUrl: url }))
              }
              folder="yuk-jadi-legal/articles"
            />
          </Field>

          <button disabled={saving} className={buttonPrimary}>
            {saving ? "Menyimpan..." : "Simpan Artikel"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
