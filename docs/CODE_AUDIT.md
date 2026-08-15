# Code Audit — Yuk Jadi Legal

## Prinsip arsitektur

Project ini sengaja dipertahankan sebagai **company profile + CMS**, bukan platform legal SaaS. Fitur yang tidak mendukung tujuan utama visitor memahami layanan, membangun kepercayaan, dan berkonsultasi tidak dimasukkan.

## Scope yang dipertahankan

Public:
- company profile
- katalog + detail layanan dengan search/filter
- partner/client
- testimonial
- team
- studi kasus
- artikel
- FAQ
- KBLI searchable
- kontak + lead form

Admin:
- Firebase Authentication untuk admin
- CRUD konten yang memang perlu berubah
- lead management sederhana
- website settings/homepage sections
- CRUD + import KBLI
- media upload via Cloudinary

Tidak ada payment gateway, akun client, client portal, invoice, tracking dokumen, chat, membership, atau CRM kompleks.

## Struktur

```text
app/
├── (public)/
└── admin/

components/
├── admin/
├── home/
├── shared/
└── site/

lib/
├── contact.ts
├── data.ts
├── firebase.ts
├── format.ts
└── site-defaults.ts

data/
└── seed-data.json

scripts/
└── seed.mjs
```

## Data flow

- Firestore adalah source of truth untuk konten dinamis.
- Runtime public **tidak memakai fallback seed/local data**.
- Jika Firebase belum dikonfigurasi atau collection kosong, query collection mengembalikan array kosong.
- Section opsional seperti partner, testimonial, team, studi kasus, dan statistik tidak dirender jika datanya kosong.
- `DEFAULT_SITE_SETTINGS` hanya menyediakan identitas/layout minimum agar aplikasi tetap dapat dirender sebelum `siteSettings/main` tersedia; ia tidak berisi klaim client, partner, testimonial, harga, atau statistik.

## Seed

`data/seed-data.json` digunakan sekali untuk mengisi data awal Firestore. Seed memuat 9 kategori, katalog layanan, subset KBLI terverifikasi, artikel, FAQ, dan pengaturan dasar. Partner, client, testimonial, team, studi kasus, kontak, serta statistik sengaja kosong karena harus menggunakan data resmi Yuk Jadi Legal.

## Clean-code decisions

- Query public dipusatkan di `lib/data.ts`.
- Firebase config tunggal di `lib/firebase.ts`.
- Helper WhatsApp tunggal di `lib/contact.ts`.
- Formatting helper dipusatkan di `lib/format.ts`.
- Domain type dipusatkan di `types/index.ts`.
- Tidak ada state-management library global karena tidak diperlukan.
- Tidak ada repository/service layer tambahan yang hanya membungkus satu query.
- Client Component dipakai hanya ketika interaksi browser memang diperlukan.
- Empty dynamic sections disembunyikan daripada menampilkan placeholder palsu.
- Input angka tidak memakai spinner `type=number`.

## Security

- Public hanya dapat membaca konten `published=true`.
- Public hanya dapat membuat lead dengan field terbatas.
- CMS write hanya untuk UID admin aktif.
- Collection `admins` tidak dapat ditulis dari aplikasi.
- V8 mengganti Cloudinary unsigned preset menjadi signed upload dengan signature server-side dan verifikasi admin.

## Validation checklist

Sebelum handoff production jalankan:

```bash
npm ci
npm run lint
npm run build
```

Lalu test flow pada `docs/FLOW_TEST.md`.
