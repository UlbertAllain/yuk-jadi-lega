"use client";

import { useMemo, useState } from "react";
import { Edit3, Plus, Star, Trash2 } from "lucide-react";
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
import type { Testimonial } from "@/types";
import { CmsImage } from "@/components/shared/cms-image";

const emptyTestimonial: Testimonial = {
  id: "",
  name: "",
  company: "",
  role: "",
  quote: "",
  rating: 5,
  featured: false,
  published: true,
  avatarUrl: "",
};

export default function TestimonialsAdminPage() {
  const store = useAdminCollection<Testimonial>("testimonials");
  const [editing, setEditing] = useState<Testimonial>(emptyTestimonial);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const items = useMemo(
    () =>
      [...store.items].sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }
        return a.name.localeCompare(b.name, "id");
      }),
    [store.items],
  );

  function openNew() {
    setEditing(emptyTestimonial);
    setOpen(true);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const id = editing.id || `${slugify(editing.name)}-${Date.now()}`;
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
        eyebrow="Trust"
        title="Testimoni"
        description="Tampilkan pengalaman klien yang benar-benar diberikan dan layak dipublikasikan."
        action={
          <button type="button" onClick={openNew} className={buttonPrimary}>
            <Plus className="mr-2 h-4 w-4" />
            Testimoni
          </button>
        }
      />

      {store.error ? (
        <p className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {store.error}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <blockquote
            key={item.id}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex text-brand-gold">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              {item.featured ? (
                <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-700">
                  Homepage
                </span>
              ) : null}
            </div>

            <p className="mt-5 line-clamp-5 text-sm leading-7 text-slate-700">
              “{item.quote}”
            </p>

            <footer className="mt-6 flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
              <div className="flex min-w-0 items-center gap-3">
                {item.avatarUrl ? (
                  <CmsImage
                    src={item.avatarUrl}
                    alt={item.name}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-black text-slate-500">
                    {item.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-black text-slate-950">{item.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    {[item.role, item.company].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <IconButton
                  label={`Edit testimoni ${item.name}`}
                  onClick={() => {
                    setEditing(item);
                    setOpen(true);
                  }}
                >
                  <Edit3 className="h-4 w-4" />
                </IconButton>
                <IconButton
                  label={`Hapus testimoni ${item.name}`}
                  tone="danger"
                  onClick={() => {
                    if (confirm("Hapus testimoni ini?")) {
                      void store.remove(item.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>

      {!store.loading && !items.length ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-400">
          Belum ada testimoni.
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing.id ? "Edit Testimoni" : "Tambah Testimoni"}
      >
        <form onSubmit={submit} className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nama">
              <input
                required
                className={inputClass}
                value={editing.name}
                onChange={(event) =>
                  setEditing((current) => ({ ...current, name: event.target.value }))
                }
              />
            </Field>
            <Field label="Perusahaan">
              <input
                className={inputClass}
                value={editing.company}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    company: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Jabatan">
              <input
                className={inputClass}
                value={editing.role}
                onChange={(event) =>
                  setEditing((current) => ({ ...current, role: event.target.value }))
                }
              />
            </Field>
            <Field label="Rating">
              <select
                className={inputClass}
                value={editing.rating}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    rating: Number(event.target.value),
                  }))
                }
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} bintang
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Testimoni">
            <textarea
              required
              rows={6}
              className={textareaClass}
              value={editing.quote}
              onChange={(event) =>
                setEditing((current) => ({ ...current, quote: event.target.value }))
              }
            />
          </Field>

          <Field label="Foto">
            <MediaUploader
              value={editing.avatarUrl}
              onChange={(url) =>
                setEditing((current) => ({ ...current, avatarUrl: url }))
              }
              folder="yuk-jadi-legal/testimonials"
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
