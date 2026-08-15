# Yuk Jadi Legal — V8 Production Hardening

V8 memisahkan akses Firebase antara server dan browser agar App Check dapat dipakai tanpa merusak Server Components.

## Arsitektur V8

```text
Public Server Components
        ↓
Firebase Admin SDK
        ↓
Cloud Firestore

Browser (Admin + Lead Form)
        ↓
Firebase Web SDK + App Check
        ↓
Cloud Firestore

Admin Media Uploader
        ↓ Firebase Auth ID token
/api/admin/cloudinary-signature
        ↓ cek admins/{uid}.active
        ↓ server-side signature
Cloudinary signed upload
```

## 1. Install dependency baru

V8 menambahkan `firebase-admin@13.10.0`.

```bash
npm install
```

Jalankan ini sekali setelah patch agar `package-lock.json` ikut diperbarui sebelum commit.

## 2. Firebase Admin credentials

Firebase Console → Project Settings → Service accounts → Generate new private key.

Jangan commit file JSON service account.

Salin nilainya ke environment:

```env
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
```

Tambahkan ketiganya juga ke Vercel → Project → Settings → Environment Variables → Production.

## 3. Firebase App Check

Gunakan reCAPTCHA Enterprise score-based site key untuk web app, lalu isi:

```env
NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY=
```

### Local development

Untuk localhost saja:

```env
NEXT_PUBLIC_FIREBASE_APP_CHECK_DEBUG=true
```

Buka browser console saat `npm run dev`. Firebase akan menampilkan App Check debug token. Daftarkan token itu di Firebase Console → App Check → Manage debug tokens.

Jangan set debug mode di Vercel Production.

### Enforcement

Jangan menekan **Enforce** sebelum deployment V8 sudah berjalan dan metrics App Check menunjukkan request browser valid.

Urutan aman:

1. deploy V8,
2. pastikan public pages normal,
3. login Admin dan lakukan read/write,
4. kirim Lead Form,
5. pantau App Check metrics,
6. baru aktifkan enforcement untuk Cloud Firestore.

Public Server Components sudah memakai Firebase Admin SDK sehingga tidak bergantung pada browser attestation.

## 4. Cloudinary signed upload

Unsigned preset lama tidak lagi dipakai oleh `MediaUploader`.

Isi server env berikut:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

`CLOUDINARY_API_SECRET` tidak pernah dikirim ke browser. Browser meminta signature ke route internal yang lebih dulu memverifikasi Firebase ID token dan dokumen `admins/{uid}.active`.

Setelah signed upload berhasil, variable lama berikut bisa dihapus:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
```

Opsional, setelah App Check production terbukti sehat:

```env
FIREBASE_APP_CHECK_ENFORCE_CUSTOM_API=true
```

Ini membuat endpoint signature juga menolak request yang tidak membawa App Check token valid.

## 5. Security headers

`next.config.ts` sekarang mengaktifkan:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `X-Permitted-Cross-Domain-Policies: none`
- `Strict-Transport-Security`
- `poweredByHeader: false`

CSP sengaja belum dipaksakan di V8 agar integrasi Firebase/Cloudinary tidak rusak karena policy terlalu agresif. CSP sebaiknya dipasang setelah seluruh origin produksi sudah diinventarisasi.

## 6. Environment audit

Setelah `.env.local` dilengkapi:

```bash
npm run env:check
```

Script tidak mencetak isi secret; hanya mengecek keberadaan dan beberapa mismatch umum.

## 7. Pre-deploy QA

Jalankan:

```bash
npm install
npm run env:check
npm run lint
npm run build
```

Test manual:

1. homepage + seluruh halaman public dapat membaca Firestore,
2. login `/admin/login`,
3. edit satu Settings lalu simpan,
4. upload gambar dari Article/Partner/Testimonial/Team,
5. kirim form konsultasi dari public,
6. lead muncul di Admin,
7. logout/login ulang,
8. cek response headers di browser DevTools.

## 8. Vercel

Pastikan variable V8 dimasukkan untuk **Production**, lalu redeploy.

`NEXT_PUBLIC_SITE_URL` untuk deployment saat ini:

```env
NEXT_PUBLIC_SITE_URL=https://yuk-jadi-legal.vercel.app
```

Jika pindah custom domain, ubah value tersebut lalu redeploy agar metadata, sitemap, dan robots memakai domain canonical yang benar.
