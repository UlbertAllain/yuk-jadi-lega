# Yuk Jadi Legal — Company Profile + CMS

Modern legal company profile + dynamic CMS untuk **Yuk Jadi Legal**.

## Scope Produk

Public website:

- Homepage conversion-oriented
- Partner & client
- Kategori dan katalog layanan
- Detail layanan dinamis
- Cara kerja
- Tentang kami + team
- Success stories / case studies
- Testimonials
- Artikel / insight
- FAQ
- Form konsultasi / leads
- Kontak
- Kebijakan privasi template
- Floating WhatsApp CTA

Admin CMS:

- Firebase Email/Password login
- Dashboard
- CRUD kategori + layanan
- CRUD artikel
- CRUD partner & client
- CRUD testimonial
- CRUD FAQ
- CRUD team
- CRUD case study
- Lead management + status follow-up
- Global website settings
- Cloudinary signed image upload (server-generated signature)

Yang **sengaja tidak masuk scope company profile + CMS**:

- Payment gateway
- Login/register client
- Client portal
- Tracking dokumen client
- Invoice
- Chat internal
- CRM kompleks

## Tech

- Next.js App Router + TypeScript
- Tailwind CSS v4
- Firebase Authentication
- Cloud Firestore
- Cloudinary (optional media upload)
- Lucide React

> Tidak menggunakan `firebase-admin`. CMS memakai Firebase client SDK dan Firestore Security Rules.

---

# Quick Start

## 1. Install

```bash
npm install
```

Copy env:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Public shell masih dapat dirender tanpa Firebase, tetapi seluruh konten dinamis akan kosong sampai Firebase dikonfigurasi dan seed dijalankan. Tidak ada fallback data contoh di runtime.

CMS `/admin` aktif setelah Firebase dikonfigurasi.

---

# Firebase Setup

## 2. Buat Firebase Project

Firebase Console → **Add project** → buat project baru.

Kemudian:

1. Project Settings
2. Your apps
3. Add app → **Web**
4. Copy Firebase config ke `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 3. Aktifkan Authentication

Firebase Console:

**Authentication → Sign-in method → Email/Password → Enable**

Lalu:

**Authentication → Users → Add user**

Contoh:

```text
admin@yukjadilegal.id
password-yang-kuat
```

Setelah user dibuat, copy **UID** user tersebut.

## 4. Buat Firestore Database

Firebase Console:

**Firestore Database → Create database**

Pilih region yang paling sesuai dengan deployment kamu.

## 5. Daftarkan UID Admin

Di Firestore Console buat collection:

```text
admins
```

Document ID harus sama dengan **UID Firebase Authentication**.

Contoh:

```text
admins/{FIREBASE_AUTH_UID}
```

Fields:

```text
active: true        (boolean)
email: admin@yukjadilegal.id  (string)
```

> Document admin dibuat manual dari Firebase Console. Security Rules project ini sengaja tidak mengizinkan aplikasi membuat dirinya sendiri menjadi admin.

## 6. Deploy Firestore Rules

Rules tersedia di:

```text
firestore.rules
```

Cara paling mudah: copy isi `firestore.rules` ke Firebase Console → Firestore → Rules → Publish.

Atau via Firebase CLI:

```bash
npx firebase-tools login
npx firebase-tools use --add
npx firebase-tools deploy --only firestore:rules
```

Rules:

- Konten published bisa dibaca public
- Hanya UID yang terdaftar di `admins` dan `active=true` yang bisa mengubah CMS
- Public hanya boleh **create** lead dengan field terbatas
- Leads hanya dapat dibaca/diubah/dihapus admin
- Collection `admins` tidak dapat ditulis dari aplikasi

---

# Seed Data

## 7. Isi credential seed sementara

Di `.env.local`:

```env
SEED_ADMIN_EMAIL=admin@yukjadilegal.id
SEED_ADMIN_PASSWORD=password-yang-kamu-buat
```

Lalu:

```bash
npm run seed
```

Seeder akan login sebagai admin Firebase dan mengisi:

```text
serviceCategories
services
articles
testimonials
partners
faqs
teamMembers
caseStudies
siteSettings/main
```

Setelah seed berhasil, **hapus `SEED_ADMIN_PASSWORD` dari `.env.local` jika tidak diperlukan lagi**. Jangan memasukkan credential seed ke Vercel.

### Tentang data seed

`data/seed-data.json` menggunakan **kategori layanan, beberapa nama layanan, dan harga referensi yang terlihat secara publik di Bukalegal** sebagai benchmark awal. Copywriting layanan ditulis ulang untuk Yuk Jadi Legal.

Seed **tidak mengisi** partner, client, testimonial, team, case study, statistik pencapaian, WhatsApp, email, maupun alamat karena data tersebut harus berasal dari Yuk Jadi Legal sendiri. Section yang datanya kosong otomatis tidak tampil di public website.

Sebelum production, verifikasi kembali daftar layanan, harga, estimasi proses, dan seluruh informasi legal yang ditampilkan.

---

# Cloudinary Setup

Cloudinary hanya diperlukan jika admin ingin upload gambar langsung dari CMS. Tanpa Cloudinary, admin masih bisa paste URL gambar secara manual.

## 8. Konfigurasi signed upload

V8 tidak lagi membutuhkan unsigned upload preset. Ambil Cloud Name, API Key, dan API Secret dari Cloudinary Console, lalu isi `.env.local` bersama konfigurasi Firebase Admin dan App Check:

```env
NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY=recaptcha_enterprise_site_key
FIREBASE_ADMIN_PROJECT_ID=firebase_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
CLOUDINARY_CLOUD_NAME=nama_cloud
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret
```

Browser meminta signature ke endpoint server `/api/admin/cloudinary-signature`. Endpoint tersebut memverifikasi Firebase ID token, memastikan `admins/{uid}.active == true`, lalu menghasilkan signature menggunakan `CLOUDINARY_API_SECRET`. API Secret tetap berada di server dan tidak pernah dikirim ke browser.

Panduan lengkap V8 ada di `docs/PRODUCTION-HARDENING-V8.md`.

---

# Run

```bash
npm run dev
```

Buka:

```text
http://localhost:3000
```

Admin:

```text
http://localhost:3000/admin/login
```

---

# Flow Test

## Public

1. Buka homepage
2. Coba kategori “Mulai Bisnis”
3. Buka detail `Pendirian PT Lengkap`
4. Pastikan benefits, inclusions, requirements, process, price, dan FAQ tampil
5. Buka halaman Artikel
6. Buka FAQ
7. Buka Kontak
8. Isi form konsultasi
9. Pastikan muncul success state

## Admin

1. Login `/admin/login`
2. Dashboard harus terbuka
3. Buka Leads → lead dari form public harus masuk
4. Ubah status lead menjadi `Dihubungi`
5. Edit satu layanan
6. Tambah artikel
7. Tambah FAQ
8. Edit partner/testimonial
9. Edit Site Settings dan ganti WhatsApp/hero
10. Refresh public website dan cek perubahan

## Media

1. Konfigurasi Cloudinary
2. Edit Artikel / Partner / Team
3. Upload gambar
4. Pastikan URL Cloudinary tersimpan dan gambar tampil di public

Checklist lebih lengkap ada di `docs/FLOW_TEST.md`.

---

# Production / Vercel

Push project ke GitHub kemudian import ke Vercel.

Tambahkan environment variable berikut di Vercel:

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY
FIREBASE_ADMIN_PROJECT_ID
FIREBASE_ADMIN_CLIENT_EMAIL
FIREBASE_ADMIN_PRIVATE_KEY
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

**Jangan masukkan:**

```text
SEED_ADMIN_EMAIL
SEED_ADMIN_PASSWORD
```

Set:

```env
NEXT_PUBLIC_SITE_URL=https://domain-yuk-jadi-legal.com
```

Lalu deploy.

---

# Data Collections

```text
admins/{uid}
serviceCategories/{id}
services/{id}
articles/{id}
testimonials/{id}
partners/{id}
faqs/{id}
teamMembers/{id}
caseStudies/{id}
leads/{id}
siteSettings/main
```

---

# Catatan Sebelum Go Live

- Konfirmasi daftar layanan resmi Yuk Jadi Legal
- Konfirmasi harga resmi
- Konfirmasi estimasi proses
- Masukkan logo partner/client yang benar-benar bekerja sama
- Masukkan testimonial asli dengan izin publikasi yang sesuai
- Masukkan team/legal experts dengan jabatan dan afiliasi yang valid
- Isi angka achievement hanya dengan data yang dapat dibuktikan
- Review halaman Kebijakan Privasi
- Review copy legal/service oleh orang yang memahami layanan Yuk Jadi Legal
- Test mobile + desktop
- Test Firestore Rules
- Test admin account
- Test lead form
- Test WhatsApp URL
- Set custom domain + production env



## Production hardening V8

Setup Firebase Admin SDK, App Check, Cloudinary signed upload, security headers, dan environment production dijelaskan di `docs/PRODUCTION-HARDENING-V8.md`. Setelah melengkapi `.env.local`, jalankan `npm run env:check`.
