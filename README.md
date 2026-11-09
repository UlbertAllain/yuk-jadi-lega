# Yuk Jadi Legal — Company Profile & Content Management

Website layanan legalitas usaha dengan pengelolaan konten melalui admin CMS. Public website menampilkan layanan, artikel, profil, FAQ, dan formulir konsultasi; admin mengelola konten serta tindak lanjut lead.

## Cakupan aplikasi

- Website publik: katalog layanan dan detailnya, artikel, case study, profil, FAQ, dan halaman kontak.
- CMS: pengelolaan kategori, layanan, artikel, tim, partner, testimonial, dan pengaturan situs.
- Form konsultasi yang menyimpan lead untuk tindak lanjut.
- Firebase Authentication/Firestore dan Cloudinary signed upload untuk media.
- Validasi dan pembatasan akses untuk operasi admin.

**Di luar scope:** pembayaran online, portal login pelanggan, tracking dokumen, dan workflow invoice.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Firebase Authentication, Firestore, Firebase Admin SDK, dan Cloudinary.

## Menjalankan

Gunakan Node.js yang kompatibel dengan Next.js 16.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`; login admin berada di `/admin/login`. Untuk Windows PowerShell, gunakan `Copy-Item .env.example .env.local`.

Konfigurasi Firebase, admin pertama, Firestore Rules, seeding, dan Cloudinary dijelaskan di [SETUP.md](SETUP.md). Jangan menjalankan `seed:reset` pada database berisi data produksi tanpa backup dan review efek script.

## Struktur

```text
app/(public)/          Halaman public
app/admin/             Panel admin
components/home/       Komponen homepage
components/admin/      CMS UI
components/site/       Navigasi, form, dan UI website
lib/                   Firebase, contact, SEO, dan integrasi
data/seed-data.json    Data referensi/seed
scripts/               Pemeriksaan environment dan seed
docs/                  Audit, scope MVP, hardening, test
```

## Pemeriksaan

```bash
npm run env:check
npm run verify
```

`verify` menjalankan lint, TypeScript, dan production build. Audit tambahan tersedia melalui `npm run quality:scan`, namun hasil scanner perlu ditinjau manual.

## Data dan keamanan

Data awal pada seed tidak menggantikan informasi resmi perusahaan. Layanan, harga, durasi proses, identitas mitra, testimoni, dan informasi kontak harus disetujui pemilik sebelum publikasi. Rahasiakan credential Firebase Admin dan Cloudinary; ikuti [production hardening](docs/PRODUCTION-HARDENING-V8.md) untuk aturan akses dan upload.
