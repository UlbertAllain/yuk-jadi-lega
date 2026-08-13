# Setup Singkat — Yuk Jadi Legal MVP

## 1. Install

```bash
npm install
cp .env.example .env.local
```

Windows PowerShell:

```powershell
npm install
Copy-Item .env.example .env.local
```

## 2. Firebase

1. Buat Firebase project.
2. Add Web App → copy config ke `.env.local`.
3. Authentication → aktifkan Email/Password.
4. Authentication → buat admin user.
5. Copy UID admin.
6. Buat Firestore database.
7. Firestore → buat document `admins/{UID}`:

```text
active = true
email  = email-admin
```

8. Publish isi `firestore.rules` melalui Firebase Console.

## 3. Seed data awal

Tambahkan sementara ke `.env.local`:

```env
SEED_ADMIN_EMAIL=email-admin
SEED_ADMIN_PASSWORD=password-admin
```

Jalankan:

```bash
npm run seed
```

Seed mengisi kategori layanan, layanan, artikel, FAQ, dan pengaturan dasar. Partner/client, testimonial, tim, studi kasus, kontak, dan statistik sengaja kosong sampai data resmi Yuk Jadi Legal dimasukkan.

Setelah sukses, hapus `SEED_ADMIN_PASSWORD` jika tidak diperlukan lagi.

## 4. Cloudinary — opsional

Buat **Unsigned Upload Preset**, lalu isi:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

Tanpa Cloudinary, website tetap berjalan dan admin masih bisa paste image URL manual.

## 5. Start

```bash
npm run dev
```

Public:

```text
http://localhost:3000
```

Admin:

```text
http://localhost:3000/admin/login
```

## 6. Urutan test

1. Login admin.
2. Edit Settings → nomor WhatsApp, email, alamat, hero.
3. Verifikasi layanan, harga, estimasi, dan persyaratan dari seed.
4. Tambahkan partner/client resmi.
5. Tambahkan testimonial asli.
6. Tambahkan profil tim resmi.
7. Tambahkan studi kasus jika sudah ada data yang layak dipublikasikan.
8. Kirim form konsultasi dari public.
9. Buka Leads admin dan ubah status.
10. Test mobile + desktop.
11. Jalankan `npm run lint` dan `npm run build`.

Lihat `README.md` dan `docs/FLOW_TEST.md` untuk setup lengkap.
