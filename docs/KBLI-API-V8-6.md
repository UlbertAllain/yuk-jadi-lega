# V8.6 — KBLI 2025 API Migration

## Tujuan

KBLI diperlakukan sebagai reference/master data eksternal, bukan konten CMS. Karena itu halaman publik tidak lagi membaca collection Firestore `kbli`, dan menu Admin KBLI dihapus.

## Arsitektur

```text
Browser /kbli
  -> GET /api/kbli?q=...&page=...&limit=...
  -> server-side proxy Yuk Jadi Legal
  -> TenderX Open Data KBLI 2025 API
```

Referensi resmi standar klasifikasi tetap Badan Pusat Statistik (KBLI 2025). UI menyediakan tautan ke halaman klasifikasi BPS untuk verifikasi akhir.

## Kenapa memakai proxy internal

- Browser tidak tergantung langsung pada domain upstream.
- Format respons distandarkan untuk frontend Yuk Jadi Legal.
- Query dan limit divalidasi di server.
- Respons upstream dapat di-cache oleh Next.js untuk mengurangi request berulang.
- Provider upstream dapat diganti nanti tanpa mengubah komponen frontend.

## Endpoint internal

```text
GET /api/kbli?q=software&page=1&limit=20
```

Batas internal:
- `q`: maksimal 100 karakter
- `page`: minimal 1, maksimal 500
- `limit`: default 20, maksimal 50

## Firestore / CMS

V8.6 menghapus dependency KBLI dari:
- `lib/data.ts`
- `firestore.rules`
- `scripts/seed.mjs`
- `data/seed-data.json`
- menu Admin
- route `/admin/kbli`

Collection Firestore `kbli` lama, bila masih ada di project Firebase, tidak digunakan lagi. Collection tersebut dapat dihapus manual dari Firebase Console setelah deployment V8.6 terverifikasi.

## Catatan operasional

API upstream adalah layanan pihak ketiga. Jika upstream gagal, halaman menampilkan error yang aman dan menyediakan tautan ke referensi resmi BPS. Tidak ada API key atau env tambahan untuk V8.6.
