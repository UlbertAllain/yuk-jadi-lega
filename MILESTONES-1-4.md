# Yuk Jadi Legal — Milestone 1–4

Dokumen ini merangkum perubahan pada paket pengembangan Milestone 1 sampai 4.

## Milestone 1 — Foundation & Catalog

- Kategori layanan diperluas menjadi 9 kategori utama.
- Seed katalog diperluas menjadi 66 layanan.
- Halaman `/layanan` menggunakan pencarian dan filter kategori.
- Card layanan dibuat lebih ringkas dan konsisten.
- Detail layanan mendukung model harga `starting-from`, `fixed`, dan `consultation`.
- Detail layanan mendukung SEO title, SEO description, dan keywords.
- Editor layanan dan kategori dipisah agar file CMS lebih mudah dipahami.
- Seeder memiliki mode `seed:reset` untuk membersihkan katalog lama (`serviceCategories`, `services`, `kbli`) sebelum mengisi data baru.

## Milestone 2 — Public UI

- Hero homepage disederhanakan menjadi tampilan corporate/legal yang lebih bersih.
- Direktori kategori homepage diubah menjadi grid 3 kolom pada desktop agar 9 kategori tetap proporsional.
- Header menambahkan akses ke KBLI.
- Footer menambahkan KBLI serta Syarat & Ketentuan.
- Halaman `/syarat-ketentuan` ditambahkan.
- Homepage memakai copy section yang dapat diubah melalui CMS.
- Halaman layanan mendukung deep-link kategori melalui `?category=<slug>`.

## Milestone 3 — CMS Upgrade

- CMS layanan mendukung model harga dan field SEO.
- CMS Settings sekarang dapat mengelola:
  - hero;
  - section layanan homepage;
  - value proposition;
  - CTA konsultasi;
  - kontak;
  - statistik;
  - social media.
- Menu admin menambahkan pengelolaan KBLI.
- CMS yang digunakan untuk artikel, FAQ, partner/client, testimonial, tim, leads, dan pengaturan website tetap dipertahankan.

## Milestone 4 — KBLI

- Halaman publik `/kbli` dengan pencarian kode, judul, uraian, dan kategori.
- Firestore collection baru: `kbli`.
- Security rules KBLI: public hanya membaca record `published`, admin dapat write.
- Admin `/admin/kbli` mendukung CRUD.
- Admin KBLI mendukung import JSON agar dataset resmi dapat diperluas tanpa menulis source code.
- Seed awal berisi 41 record referensi KBLI 2020 yang berasal dari hierarki BPS/OSS yang diverifikasi saat pengembangan.

## Cara memasang ke project yang sudah ada

1. Backup project dan `.env.local` lama.
2. Gunakan source pada ZIP ini sebagai source utama.
3. Salin kembali `.env.local` milik project lama jika diperlukan.
4. Jalankan:

```bash
npm ci
```

5. Deploy Firestore rules terbaru sesuai workflow Firebase project.
6. Untuk mengganti katalog lama dengan struktur baru, jalankan:

```bash
npm run seed:reset
```

`seed:reset` hanya membersihkan `serviceCategories`, `services`, dan `kbli`; collection CMS lain tidak dihapus.

7. Jalankan validasi lokal:

```bash
npm run lint
npm run build
npm run dev
```

## Catatan data

- Nama/cakupan kategori dan layanan memakai Bukalegal sebagai benchmark informasi publik, tetapi copywriting ditulis ulang untuk Yuk Jadi Legal.
- Harga pada seed adalah referensi awal dan harus diverifikasi kembali oleh pemilik bisnis sebelum production.
- KBLI adalah data regulatif. Untuk production skala penuh, import dataset resmi BPS/OSS melalui CMS dan jangan mengandalkan data yang tidak mempunyai sumber resmi.
- Partner, client, testimonial, tim, alamat, nomor WhatsApp, statistik, dan data perusahaan jangan diisi dengan data contoh yang tidak dapat dipertanggungjawabkan.
