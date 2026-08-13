# Flow Test — Yuk Jadi Legal MVP

## A. Setup awal

- [ ] `.env.local` berisi konfigurasi Firebase yang benar
- [ ] Firebase Authentication Email/Password aktif
- [ ] UID admin sudah terdaftar di `admins/{uid}` dengan `active=true`
- [ ] Firestore Rules sudah dipublish
- [ ] `npm run seed` berhasil
- [ ] Homepage membaca data dari Firestore
- [ ] Tidak ada fallback data lokal ketika Firestore kosong/error

## B. Public website

- [ ] Homepage tampil tanpa error
- [ ] Kategori layanan tampil
- [ ] Layanan unggulan tampil
- [ ] Partner/client hanya tampil jika ada data resmi
- [ ] Statistik hanya tampil jika nilainya diisi
- [ ] Studi kasus hanya tampil jika ada data
- [ ] Testimoni hanya tampil jika ada data
- [ ] Tim hanya tampil jika ada data
- [ ] Artikel tampil
- [ ] FAQ tampil
- [ ] Detail layanan dapat dibuka dari slug
- [ ] Detail artikel dapat dibuka dari slug
- [ ] Tombol WhatsApp memakai nomor dari Site Settings
- [ ] Jika WhatsApp kosong, CTA konsultasi mengarah ke halaman kontak

## C. Lead form

- [ ] Form dapat dikirim tanpa login
- [ ] Lead baru masuk ke collection `leads`
- [ ] Field yang tersimpan sesuai Firestore Rules
- [ ] Pesan sukses tampil setelah submit
- [ ] Submit invalid ditolak oleh form

## D. Admin

- [ ] Login admin berhasil
- [ ] User non-admin tidak dapat mengakses CMS
- [ ] Dashboard tampil
- [ ] CRUD kategori layanan bekerja
- [ ] CRUD layanan bekerja
- [ ] CRUD artikel bekerja
- [ ] CRUD partner/client bekerja
- [ ] CRUD testimonial bekerja
- [ ] CRUD FAQ bekerja
- [ ] CRUD team bekerja
- [ ] CRUD case study bekerja
- [ ] Lead dapat dibaca dan statusnya dapat diubah
- [ ] Site Settings dapat disimpan

## E. Dynamic content

- [ ] Tambah layanan dari admin → muncul di public
- [ ] Edit layanan → perubahan muncul di public
- [ ] Unpublish layanan → hilang dari public
- [ ] Tambah artikel → muncul di public
- [ ] Tambah partner/client → section trust muncul
- [ ] Tambah testimonial → section testimonial muncul
- [ ] Tambah team → section team muncul
- [ ] Isi achievement → section statistik muncul

## F. Cloudinary

- [ ] Unsigned upload preset dikonfigurasi
- [ ] Upload cover artikel berhasil
- [ ] Upload logo partner berhasil
- [ ] Upload foto team berhasil
- [ ] URL hasil upload tersimpan ke Firestore
- [ ] Gambar tampil di public

## G. Sebelum production

- [ ] Daftar layanan sudah diverifikasi
- [ ] Harga sudah diverifikasi
- [ ] Estimasi proses sudah diverifikasi
- [ ] Kontak Yuk Jadi Legal sudah diisi
- [ ] Partner/client yang ditampilkan benar-benar memiliki hubungan kerja sama
- [ ] Testimoni asli dan mendapat izin publikasi
- [ ] Data tim/jabatan valid
- [ ] Achievement memakai data yang dapat dibuktikan
- [ ] Kebijakan Privasi direview
- [ ] Mobile dan desktop direview
- [ ] `npm run lint` lulus
- [ ] `npm run build` lulus
