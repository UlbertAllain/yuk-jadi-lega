"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import { Field, Modal, buttonPrimary, inputClass, textareaClass } from "@/components/admin/admin-ui";
import { slugify } from "@/lib/format";
import type { ServiceCategory } from "@/types";

type CategoryEditorProps = {
  open: boolean;
  category: ServiceCategory;
  saving: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
  setCategory: Dispatch<SetStateAction<ServiceCategory>>;
};

export function CategoryEditorModal({
  open, category, saving, onClose, onSubmit, onDelete, setCategory,
}: CategoryEditorProps) {
  return (
    <Modal open={open} onClose={onClose} title={category.id ? "Edit Kategori" : "Tambah Kategori"}>
      <form onSubmit={onSubmit} className="grid gap-5">
        <Field label="Nama kategori">
          <input required className={inputClass} value={category.name} onChange={(event) =>
            setCategory((current) => ({ ...current, name: event.target.value, slug: current.id ? current.slug : slugify(event.target.value) }))
          } />
        </Field>
        <Field label="Slug" hint={category.id ? "Slug kategori dikunci setelah dibuat agar relasi layanan tetap aman." : undefined}>
          <input required className={inputClass} value={category.slug} disabled={Boolean(category.id)} onChange={(event) =>
            setCategory((current) => ({ ...current, slug: slugify(event.target.value) }))
          } />
        </Field>
        <Field label="Deskripsi">
          <textarea rows={4} className={textareaClass} value={category.description} onChange={(event) =>
            setCategory((current) => ({ ...current, description: event.target.value }))
          } />
        </Field>
        <Field label="Urutan">
          <input inputMode="numeric" className={inputClass} value={String(category.order)} onChange={(event) =>
            setCategory((current) => ({ ...current, order: Number(event.target.value.replace(/\D/g, "")) || 1 }))
          } />
        </Field>
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" checked={category.published} onChange={(event) =>
            setCategory((current) => ({ ...current, published: event.target.checked }))
          } />
          Tayang
        </label>
        <div className="flex gap-3">
          <button disabled={saving} className={buttonPrimary}>{saving ? "Menyimpan..." : "Simpan Kategori"}</button>
          {category.id ? <button type="button" onClick={onDelete} className="h-11 rounded-full border border-rose-200 px-5 text-sm font-black text-rose-600">Hapus</button> : null}
        </div>
      </form>
    </Modal>
  );
}
