"use client";

import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
  AdminPageHeader,
  Field,
  buttonPrimary,
  inputClass,
  textareaClass,
} from "@/components/admin/admin-ui";
import { NavigationMenuSettings } from "@/components/admin/navigation-menu-settings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-defaults";
import { db } from "@/lib/firebase";
import type { Service, ServiceCategory, SiteSettings, SiteStat } from "@/types";

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const [settingsSnapshot, servicesSnapshot, categoriesSnapshot] = await Promise.all([
          getDoc(doc(db!, "siteSettings", "main")),
          getDocs(collection(db!, "services")),
          getDocs(collection(db!, "serviceCategories")),
        ]);

        if (settingsSnapshot.exists()) {
          setSettings({
            ...DEFAULT_SITE_SETTINGS,
            ...settingsSnapshot.data(),
            id: settingsSnapshot.id,
          } as SiteSettings);
        }

        setServices(
          servicesSnapshot.docs
            .map((item) => ({ ...item.data(), id: item.id } as Service))
            .filter((item) => item.published)
            .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999)),
        );
        setCategories(
          categoriesSnapshot.docs
            .map((item) => ({ ...item.data(), id: item.id } as ServiceCategory))
            .filter((item) => item.published)
            .sort((a, b) => a.order - b.order),
        );
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function updateStat(index: number, key: keyof SiteStat, value: string) {
    const stats = settings.stats.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [key]: value } : item,
    );
    update("stats", stats);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!db) return;

    setSaving(true);
    setMessage("");

    try {
      const { id: _id, ...payload } = settings;
      await setDoc(
        doc(db, "siteSettings", "main"),
        {
          ...payload,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
      setMessage("Pengaturan berhasil disimpan.");
    } catch (error) {
      console.error(error);
      setMessage("Pengaturan belum berhasil disimpan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        eyebrow="Website"
        title="Pengaturan"
        description="Kelola identitas, konten homepage, kontak, statistik, dan tautan sosial tanpa mengubah source code."
      />

      {loading ? (
        <p className="text-sm text-slate-500">Memuat...</p>
      ) : (
        <form
          onSubmit={submit}
          className="grid gap-6 rounded-[1.75rem] border border-slate-200 bg-white p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nama brand">
              <input
                required
                className={inputClass}
                value={settings.brandName}
                onChange={(event) => update("brandName", event.target.value)}
              />
            </Field>
            <Field label="Deskripsi singkat brand" hint="Ditampilkan pada footer website.">
              <input
                className={inputClass}
                value={settings.brandTagline}
                onChange={(event) => update("brandTagline", event.target.value)}
              />
            </Field>
          </div>

          <SettingsSection title="Hero homepage">
            <Field label="Headline">
              <textarea
                rows={3}
                className={textareaClass}
                value={settings.heroTitle}
                onChange={(event) => update("heroTitle", event.target.value)}
              />
            </Field>
            <Field label="Deskripsi">
              <textarea
                rows={4}
                className={textareaClass}
                value={settings.heroDescription}
                onChange={(event) => update("heroDescription", event.target.value)}
              />
            </Field>
          </SettingsSection>


          <SettingsSection title="Section layanan homepage">
            <Field label="Judul">
              <textarea rows={2} className={textareaClass} value={settings.servicesTitle || ""} onChange={(event) => update("servicesTitle", event.target.value)} />
            </Field>
            <Field label="Deskripsi">
              <textarea rows={3} className={textareaClass} value={settings.servicesDescription || ""} onChange={(event) => update("servicesDescription", event.target.value)} />
            </Field>
          </SettingsSection>

          <SettingsSection title="Value proposition homepage">
            <Field label="Judul">
              <textarea rows={2} className={textareaClass} value={settings.whyUsTitle || ""} onChange={(event) => update("whyUsTitle", event.target.value)} />
            </Field>
            <Field label="Deskripsi">
              <textarea rows={3} className={textareaClass} value={settings.whyUsDescription || ""} onChange={(event) => update("whyUsDescription", event.target.value)} />
            </Field>
          </SettingsSection>

          <SettingsSection title="CTA konsultasi homepage">
            <Field label="Judul">
              <textarea rows={2} className={textareaClass} value={settings.ctaTitle || ""} onChange={(event) => update("ctaTitle", event.target.value)} />
            </Field>
            <Field label="Deskripsi">
              <textarea rows={3} className={textareaClass} value={settings.ctaDescription || ""} onChange={(event) => update("ctaDescription", event.target.value)} />
            </Field>
          </SettingsSection>

          <SettingsSection title="Menu navigasi / dropdown">
            <p className="-mt-1 text-xs leading-5 text-slate-500">
              Tentukan layanan dan kategori yang muncul saat pengunjung mengarahkan cursor ke menu Layanan atau Kategori di navbar.
            </p>
            <NavigationMenuSettings
              services={services}
              categories={categories}
              selectedServices={settings.menuServiceSlugs || []}
              selectedCategories={settings.menuCategorySlugs || []}
              onServicesChange={(value) => update("menuServiceSlugs", value)}
              onCategoriesChange={(value) => update("menuCategorySlugs", value)}
            />
          </SettingsSection>

          <SettingsSection title="Kontak" columns="sm:grid-cols-2">
            <Field label="WhatsApp" hint="Contoh: 62812... tanpa tanda +">
              <input
                required
                className={inputClass}
                value={settings.whatsapp}
                onChange={(event) =>
                  update("whatsapp", event.target.value.replace(/\D/g, ""))
                }
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                className={inputClass}
                value={settings.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </Field>
            <Field label="Jam kantor">
              <input
                className={inputClass}
                value={settings.officeHours || ""}
                onChange={(event) => update("officeHours", event.target.value)}
              />
            </Field>
            <Field label="Alamat">
              <textarea
                rows={3}
                className={textareaClass}
                value={settings.address}
                onChange={(event) => update("address", event.target.value)}
              />
            </Field>
          </SettingsSection>

          <div className="border-t border-slate-100 pt-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-gold">
              Achievement / Numbers
            </p>
            <p className="mb-5 mt-2 text-xs leading-5 text-slate-400">
              Isi hanya dengan data yang dapat dipertanggungjawabkan. Kosongkan nilai jika belum tersedia.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {settings.stats.map((stat, index) => (
                <div key={`${stat.label}-${index}`} className="rounded-xl bg-slate-50 p-4">
                  <input
                    aria-label={`Nilai statistik ${index + 1}`}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-black outline-none focus:border-brand-navy"
                    value={stat.value === "—" ? "" : stat.value}
                    placeholder="Contoh: 100+"
                    onChange={(event) =>
                      updateStat(index, "value", event.target.value)
                    }
                  />
                  <input
                    aria-label={`Label statistik ${index + 1}`}
                    className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand-navy"
                    value={stat.label}
                    onChange={(event) =>
                      updateStat(index, "label", event.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <SettingsSection title="Media sosial" columns="sm:grid-cols-3">
            <Field label="Instagram">
              <input
                type="url"
                className={inputClass}
                value={settings.instagram || ""}
                placeholder="https://instagram.com/..."
                onChange={(event) => update("instagram", event.target.value)}
              />
            </Field>
            <Field label="LinkedIn">
              <input
                type="url"
                className={inputClass}
                value={settings.linkedin || ""}
                placeholder="https://linkedin.com/..."
                onChange={(event) => update("linkedin", event.target.value)}
              />
            </Field>
            <Field label="TikTok">
              <input
                type="url"
                className={inputClass}
                value={settings.tiktok || ""}
                placeholder="https://tiktok.com/@..."
                onChange={(event) => update("tiktok", event.target.value)}
              />
            </Field>
          </SettingsSection>

          {message ? (
            <p className="rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
              {message}
            </p>
          ) : null}

          <button disabled={saving} className={buttonPrimary}>
            {saving ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </form>
      )}
    </div>
  );
}

function SettingsSection({
  title,
  columns,
  children,
}: {
  title: string;
  columns?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-slate-100 pt-6">
      <p className="mb-5 text-xs font-black uppercase tracking-[0.16em] text-brand-gold">
        {title}
      </p>
      <div className={`grid gap-5 ${columns || ""}`}>{children}</div>
    </div>
  );
}
