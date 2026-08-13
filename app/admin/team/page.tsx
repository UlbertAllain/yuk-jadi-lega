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
import type { TeamMember } from "@/types";
import { CmsImage } from "@/components/shared/cms-image";

const emptyMember: TeamMember = {
  id: "",
  name: "",
  role: "",
  bio: "",
  photoUrl: "",
  order: 1,
  published: true,
};

export default function TeamAdminPage() {
  const store = useAdminCollection<TeamMember>("teamMembers");
  const [editing, setEditing] = useState<TeamMember>(emptyMember);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const items = useMemo(
    () => [...store.items].sort((a, b) => a.order - b.order),
    [store.items],
  );

  function openNew() {
    setEditing({ ...emptyMember, order: items.length + 1 });
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
        title="Tim"
        description="Tampilkan orang yang benar-benar terlibat dalam layanan. Pastikan jabatan dan afiliasi yang ditulis sesuai fakta."
        action={
          <button type="button" onClick={openNew} className={buttonPrimary}>
            <Plus className="mr-2 h-4 w-4" />
            Anggota
          </button>
        }
      />

      {store.error ? (
        <p className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {store.error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
          >
            <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-brand-green to-brand-ink text-6xl font-black text-white/10">
              {item.photoUrl ? (
                <CmsImage
                  src={item.photoUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                `0${index + 1}`
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-black text-slate-950">{item.name}</h2>
                  <p className="mt-1 text-xs font-bold text-brand-gold">{item.role}</p>
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
                      if (confirm("Hapus profil tim ini?")) {
                        void store.remove(item.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">{item.bio}</p>
            </div>
          </article>
        ))}
      </div>

      {!store.loading && !items.length ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-400">
          Belum ada profil tim.
        </div>
      ) : null}

      <Modal open={open} onClose={() => setOpen(false)} title={editing.id ? "Edit Profil" : "Tambah Profil"}>
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
            <Field label="Jabatan">
              <input
                required
                className={inputClass}
                value={editing.role}
                onChange={(event) =>
                  setEditing((current) => ({ ...current, role: event.target.value }))
                }
              />
            </Field>
          </div>

          <Field label="Bio">
            <textarea
              rows={5}
              className={textareaClass}
              value={editing.bio}
              onChange={(event) =>
                setEditing((current) => ({ ...current, bio: event.target.value }))
              }
            />
          </Field>

          <Field label="Foto">
            <MediaUploader
              value={editing.photoUrl}
              onChange={(url) =>
                setEditing((current) => ({ ...current, photoUrl: url }))
              }
              folder="yuk-jadi-legal/team"
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
