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
} from "@/components/admin/admin-ui";
import { MediaUploader } from "@/components/admin/media-uploader";
import { useAdminCollection } from "@/components/admin/use-admin-collection";
import { slugify } from "@/lib/format";
import type { Partner } from "@/types";
import { CmsImage } from "@/components/shared/cms-image";

const emptyPartner: Partner = {
  id: "",
  name: "",
  type: "partner",
  website: "",
  logoUrl: "",
  published: true,
  order: 1,
};

export default function PartnersAdminPage() {
  const store = useAdminCollection<Partner>("partners");
  const [editing, setEditing] = useState<Partner>(emptyPartner);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const items = useMemo(
    () => [...store.items].sort((a, b) => a.order - b.order),
    [store.items],
  );

  function openNew() {
    setEditing({ ...emptyPartner, order: items.length + 1 });
    setOpen(true);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const id = editing.id || slugify(editing.name);
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
        title="Partner & Klien"
        description="Kelola partner profesional dan klien yang memang sudah memiliki hubungan kerja sama dengan Yuk Jadi Legal."
        action={
          <button type="button" onClick={openNew} className={buttonPrimary}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah
          </button>
        }
      />

      {store.error ? (
        <p className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {store.error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6"
          >
            <div className="grid h-24 place-items-center rounded-xl bg-slate-50">
              {item.logoUrl ? (
                <CmsImage
                  src={item.logoUrl}
                  alt={item.name}
                  className="max-h-12 max-w-44 object-contain"
                />
              ) : (
                <span className="font-black text-slate-500">{item.name}</span>
              )}
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-black text-slate-950">{item.name}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {item.type === "partner" ? "Partner" : "Klien"}
                </p>
                {!item.published ? (
                  <p className="mt-2 text-xs text-slate-400">Tidak ditampilkan</p>
                ) : null}
              </div>

              <div className="flex gap-2">
                <IconButton
                  label={`Edit ${item.name}`}
                  onClick={() => {
                    setEditing(item);
                    setOpen(true);
                  }}
                >
                  <Edit3 className="h-4 w-4" />
                </IconButton>
                <IconButton
                  label={`Hapus ${item.name}`}
                  tone="danger"
                  onClick={() => {
                    if (confirm(`Hapus ${item.name}?`)) {
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
          Belum ada partner atau klien.
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing.id ? "Edit Partner / Klien" : "Tambah Partner / Klien"}
      >
        <form onSubmit={submit} className="grid gap-5">
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

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Tipe">
              <select
                className={inputClass}
                value={editing.type}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    type: event.target.value as Partner["type"],
                  }))
                }
              >
                <option value="partner">Partner</option>
                <option value="client">Klien</option>
              </select>
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

          <Field label="Website" hint="Opsional. Gunakan URL lengkap, misalnya https://...">
            <input
              type="url"
              className={inputClass}
              value={editing.website || ""}
              onChange={(event) =>
                setEditing((current) => ({
                  ...current,
                  website: event.target.value,
                }))
              }
              placeholder="https://..."
            />
          </Field>

          <Field label="Logo">
            <MediaUploader
              value={editing.logoUrl}
              onChange={(url) =>
                setEditing((current) => ({ ...current, logoUrl: url }))
              }
              folder="yuk-jadi-legal/partners"
            />
          </Field>

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
            Tampilkan di website
          </label>

          <button disabled={saving} className={buttonPrimary}>
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
