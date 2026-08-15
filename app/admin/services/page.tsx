"use client";

import { useMemo, useState } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { CategoryEditorModal } from "@/components/admin/category-editor-modal";
import { ServiceEditorModal } from "@/components/admin/service-editor-modal";
import {
  AdminPageHeader,
  IconButton,
  buttonPrimary,
} from "@/components/admin/admin-ui";
import { useAdminCollection } from "@/components/admin/use-admin-collection";
import { servicePriceLabel, slugify } from "@/lib/format";
import type { Service, ServiceCategory } from "@/types";

const emptyService: Service = {
  id: "",
  title: "",
  slug: "",
  categorySlug: "pendirian-perusahaan",
  shortDescription: "",
  description: "",
  startingPrice: 0,
  priceType: "starting-from",
  priceNote: "",
  duration: "",
  order: 1,
  featured: false,
  published: true,
  benefits: [],
  inclusions: [],
  requirements: [],
  processSteps: [],
  faqs: [],
};

const emptyCategory: ServiceCategory = {
  id: "",
  name: "",
  slug: "",
  description: "",
  order: 1,
  published: true,
};

export default function ServicesAdminPage() {
  const services = useAdminCollection<Service>("services");
  const categories = useAdminCollection<ServiceCategory>("serviceCategories");

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service>(emptyService);
  const [editingCategory, setEditingCategory] =
    useState<ServiceCategory>(emptyCategory);
  const [saving, setSaving] = useState(false);

  const sortedServices = useMemo(
    () =>
      [...services.items].sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB || a.title.localeCompare(b.title, "id");
      }),
    [services.items],
  );

  const sortedCategories = useMemo(
    () => [...categories.items].sort((a, b) => a.order - b.order),
    [categories.items],
  );

  function openNewService() {
    setEditingService({
      ...emptyService,
      categorySlug: sortedCategories[0]?.slug || "pendirian-perusahaan",
      order: sortedServices.length + 1,
    });
    setServiceModalOpen(true);
  }

  function openNewCategory() {
    setEditingCategory({
      ...emptyCategory,
      order: sortedCategories.length + 1,
    });
    setCategoryModalOpen(true);
  }

  async function saveService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const slug = editingService.slug || slugify(editingService.title);
      const duplicate = services.items.some(
        (item) => item.id !== editingService.id && item.slug === slug,
      );

      if (duplicate) {
        alert("Slug layanan sudah digunakan. Gunakan slug yang berbeda.");
        return;
      }

      const id = editingService.id || slug;
      const { id: _id, ...payload } = editingService;
      const saved = await services.save(id, { ...payload, slug });
      if (saved) setServiceModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function saveCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const slug = editingCategory.slug || slugify(editingCategory.name);
      const duplicate = categories.items.some(
        (item) => item.id !== editingCategory.id && item.slug === slug,
      );

      if (duplicate) {
        alert("Slug kategori sudah digunakan. Gunakan slug yang berbeda.");
        return;
      }

      const id = editingCategory.id || slug;
      const { id: _id, ...payload } = editingCategory;
      const saved = await categories.save(id, { ...payload, slug });
      if (saved) setCategoryModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory() {
    const categoryIsUsed = services.items.some(
      (service) => service.categorySlug === editingCategory.slug,
    );

    if (categoryIsUsed) {
      alert("Kategori masih digunakan oleh layanan. Pindahkan layanan terlebih dahulu.");
      return;
    }

    if (confirm("Hapus kategori ini?")) {
      const removed = await categories.remove(editingCategory.id);
      if (removed) setCategoryModalOpen(false);
    }
  }

  const error = services.error || categories.error;

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Konten"
        title="Layanan"
        description="Kelola kategori, detail layanan, urutan tampil, harga, persyaratan, proses, dan FAQ layanan."
        action={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={openNewCategory}
              className="h-11 rounded-full border border-slate-200 bg-white px-5 text-sm font-black"
            >
              + Kategori
            </button>
            <button type="button" onClick={openNewService} className={buttonPrimary}>
              <Plus className="mr-2 h-4 w-4" />
              Layanan
            </button>
          </div>
        }
      />

      {error ? (
        <p className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="mb-7 flex flex-wrap gap-2">
        {sortedCategories.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setEditingCategory(item);
              setCategoryModalOpen(true);
            }}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600"
          >
            {item.name} · {item.published ? "aktif" : "draf"}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-4">Urutan</th>
                <th className="px-6 py-4">Layanan</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedServices.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-slate-500">{item.order ?? "—"}</td>
                  <td className="px-6 py-4">
                    <p className="font-black text-slate-900">{item.title}</p>
                    <p className="mt-1 max-w-md truncate text-xs text-slate-400">
                      /{item.slug}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {categoryLabel(sortedCategories, item.categorySlug)}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">
                    {servicePriceLabel(item.startingPrice, item.priceType)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.published
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.published ? "Tayang" : "Draf"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <IconButton
                        label={`Edit ${item.title}`}
                        onClick={() => {
                          setEditingService(item);
                          setServiceModalOpen(true);
                        }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        label={`Hapus ${item.title}`}
                        tone="danger"
                        onClick={() => {
                          if (confirm(`Hapus ${item.title}?`)) {
                            void services.remove(item.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}

              {!services.loading && !sortedServices.length ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Belum ada layanan. Jalankan seed atau tambah layanan secara manual.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <ServiceEditorModal
        open={serviceModalOpen}
        service={editingService}
        categories={sortedCategories}
        saving={saving}
        onClose={() => setServiceModalOpen(false)}
        onSubmit={saveService}
        setService={setEditingService}
      />

      <CategoryEditorModal
        open={categoryModalOpen}
        category={editingCategory}
        saving={saving}
        onClose={() => setCategoryModalOpen(false)}
        onSubmit={saveCategory}
        onDelete={deleteCategory}
        setCategory={setEditingCategory}
      />
    </div>
  );
}

function categoryLabel(categories: ServiceCategory[], slug: string) {
  return categories.find((item) => item.slug === slug)?.name || slug;
}
