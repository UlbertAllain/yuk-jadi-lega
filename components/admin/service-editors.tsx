"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import {
  Field,
  Modal,
  buttonPrimary,
  inputClass,
  textareaClass,
} from "@/components/admin/admin-ui";
import { slugify } from "@/lib/format";
import type { Service, ServiceCategory, ServiceFaq } from "@/types";

function parseLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseFaqs(value: string): ServiceFaq[] {
  return parseLines(value)
    .map((line) => {
      const [question, ...rest] = line.split("::");
      return {
        question: question.trim(),
        answer: rest.join("::").trim(),
      };
    })
    .filter((item) => item.question && item.answer);
}

type ServiceEditorProps = {
  open: boolean;
  service: Service;
  categories: ServiceCategory[];
  saving: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setService: Dispatch<SetStateAction<Service>>;
};

export function ServiceEditorModal({
  open,
  service,
  categories,
  saving,
  onClose,
  onSubmit,
  setService,
}: ServiceEditorProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={service.id ? "Edit Layanan" : "Tambah Layanan"}
    >
      <form onSubmit={onSubmit} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nama layanan">
            <input
              required
              className={inputClass}
              value={service.title}
              onChange={(event) =>
                setService((current) => ({
                  ...current,
                  title: event.target.value,
                  slug: current.id ? current.slug : slugify(event.target.value),
                }))
              }
            />
          </Field>

          <Field label="Slug">
            <input
              required
              className={inputClass}
              value={service.slug}
              onChange={(event) =>
                setService((current) => ({
                  ...current,
                  slug: slugify(event.target.value),
                }))
              }
            />
          </Field>

          <Field label="Kategori">
            <select
              className={inputClass}
              value={service.categorySlug}
              onChange={(event) =>
                setService((current) => ({
                  ...current,
                  categorySlug: event.target.value,
                }))
              }
            >
              {categories.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Urutan tampil">
            <input
              inputMode="numeric"
              className={inputClass}
              value={String(service.order ?? 1)}
              onChange={(event) =>
                setService((current) => ({
                  ...current,
                  order: Number(event.target.value.replace(/\D/g, "")) || 1,
                }))
              }
            />
          </Field>

          <Field label="Harga mulai dari" hint="Kosongkan untuk menampilkan 'Konsultasikan'.">
            <input
              inputMode="numeric"
              className={inputClass}
              value={service.startingPrice ? String(service.startingPrice) : ""}
              onChange={(event) =>
                setService((current) => ({
                  ...current,
                  startingPrice:
                    Number(event.target.value.replace(/\D/g, "")) || 0,
                }))
              }
              placeholder="5500000"
            />
          </Field>

          <Field label="Estimasi proses">
            <input
              className={inputClass}
              value={service.duration || ""}
              onChange={(event) =>
                setService((current) => ({
                  ...current,
                  duration: event.target.value,
                }))
              }
            />
          </Field>
        </div>

        <Field label="Deskripsi singkat">
          <textarea
            required
            rows={3}
            className={textareaClass}
            value={service.shortDescription}
            onChange={(event) =>
              setService((current) => ({
                ...current,
                shortDescription: event.target.value,
              }))
            }
          />
        </Field>

        <Field label="Deskripsi lengkap">
          <textarea
            required
            rows={5}
            className={textareaClass}
            value={service.description}
            onChange={(event) =>
              setService((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
          />
        </Field>

        <Field label="Catatan harga">
          <input
            className={inputClass}
            value={service.priceNote || ""}
            onChange={(event) =>
              setService((current) => ({
                ...current,
                priceNote: event.target.value,
              }))
            }
          />
        </Field>

        <ListEditor
          label="Manfaat / cocok untuk"
          value={service.benefits}
          onChange={(benefits) =>
            setService((current) => ({ ...current, benefits }))
          }
        />
        <ListEditor
          label="Yang didapatkan"
          value={service.inclusions}
          onChange={(inclusions) =>
            setService((current) => ({ ...current, inclusions }))
          }
        />
        <ListEditor
          label="Persyaratan"
          value={service.requirements}
          onChange={(requirements) =>
            setService((current) => ({ ...current, requirements }))
          }
        />
        <ListEditor
          label="Tahapan proses"
          hint="Satu tahap per baris"
          value={service.processSteps}
          onChange={(processSteps) =>
            setService((current) => ({ ...current, processSteps }))
          }
        />

        <Field label="FAQ layanan" hint="Format per baris: Pertanyaan :: Jawaban">
          <textarea
            rows={5}
            className={textareaClass}
            value={service.faqs
              .map((item) => `${item.question} :: ${item.answer}`)
              .join("\n")}
            onChange={(event) =>
              setService((current) => ({
                ...current,
                faqs: parseFaqs(event.target.value),
              }))
            }
          />
        </Field>

        <div className="flex flex-wrap gap-5 rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={service.published}
              onChange={(event) =>
                setService((current) => ({
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
              checked={service.featured}
              onChange={(event) =>
                setService((current) => ({
                  ...current,
                  featured: event.target.checked,
                }))
              }
            />
            Tampilkan di homepage
          </label>
        </div>

        <button disabled={saving} className={buttonPrimary}>
          {saving ? "Menyimpan..." : "Simpan Layanan"}
        </button>
      </form>
    </Modal>
  );
}

function ListEditor({
  label,
  hint = "Satu item per baris",
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        rows={4}
        className={textareaClass}
        value={value.join("\n")}
        onChange={(event) => onChange(parseLines(event.target.value))}
      />
    </Field>
  );
}

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
  open,
  category,
  saving,
  onClose,
  onSubmit,
  onDelete,
  setCategory,
}: CategoryEditorProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={category.id ? "Edit Kategori" : "Tambah Kategori"}
    >
      <form onSubmit={onSubmit} className="grid gap-5">
        <Field label="Nama kategori">
          <input
            required
            className={inputClass}
            value={category.name}
            onChange={(event) =>
              setCategory((current) => ({
                ...current,
                name: event.target.value,
                slug: current.id ? current.slug : slugify(event.target.value),
              }))
            }
          />
        </Field>

        <Field
          label="Slug"
          hint={category.id ? "Slug kategori dikunci setelah dibuat agar relasi layanan tetap aman." : undefined}
        >
          <input
            required
            className={inputClass}
            value={category.slug}
            disabled={Boolean(category.id)}
            onChange={(event) =>
              setCategory((current) => ({
                ...current,
                slug: slugify(event.target.value),
              }))
            }
          />
        </Field>

        <Field label="Deskripsi">
          <textarea
            rows={4}
            className={textareaClass}
            value={category.description}
            onChange={(event) =>
              setCategory((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
          />
        </Field>

        <Field label="Urutan">
          <input
            inputMode="numeric"
            className={inputClass}
            value={String(category.order)}
            onChange={(event) =>
              setCategory((current) => ({
                ...current,
                order: Number(event.target.value.replace(/\D/g, "")) || 1,
              }))
            }
          />
        </Field>

        <label className="flex items-center gap-2 text-sm font-bold">
          <input
            type="checkbox"
            checked={category.published}
            onChange={(event) =>
              setCategory((current) => ({
                ...current,
                published: event.target.checked,
              }))
            }
          />
          Tayang
        </label>

        <div className="flex gap-3">
          <button disabled={saving} className={buttonPrimary}>
            {saving ? "Menyimpan..." : "Simpan Kategori"}
          </button>
          {category.id ? (
            <button
              type="button"
              onClick={onDelete}
              className="h-11 rounded-full border border-rose-200 px-5 text-sm font-black text-rose-600"
            >
              Hapus
            </button>
          ) : null}
        </div>
      </form>
    </Modal>
  );
}
