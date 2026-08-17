# CMS & Content Audit — V8.7

## Source of truth

Konten yang memang perlu sering diperbarui oleh admin tetap berasal dari Firestore/CMS:

- identitas brand dan informasi kontak;
- headline/deskripsi hero homepage;
- judul/deskripsi section layanan, alasan memilih Yuk Jadi Legal, dan CTA homepage;
- statistik homepage;
- pilihan layanan/kategori pada menu navigasi;
- layanan dan kategori layanan;
- artikel;
- partner/client;
- testimonial;
- FAQ;
- tim;
- lead konsultasi.

Konten berikut sengaja tetap berada di source code karena merupakan struktur/narasi produk yang jarang berubah:

- label pada pencari layanan di hero;
- penjelasan halaman Tentang Kami dan Cara Kerja;
- edukasi KBLI;
- Kebijakan Privasi dan Syarat & Ketentuan;
- label UI, empty state, pesan validasi, dan teks tombol.

## Cleanup V8.7

- field `heroEyebrow` dan `servicesEyebrow` dihapus dari model/default/seed karena UI tidak lagi menampilkannya;
- modul Studi Kasus dihapus dari CMS karena belum mempunyai output public dan hanya menjadi fitur mati;
- fallback copy `Biaya & scope` diganti menjadi `Biaya & kebutuhan`;
- label pengaturan Admin dibuat lebih mudah dipahami;
- dokumentasi dan seed diselaraskan dengan CMS yang benar-benar aktif.

Data lama yang sudah terlanjur ada sebagai field tambahan pada dokumen Firestore `siteSettings/main` tidak mengganggu aplikasi. Collection `caseStudies` lama juga dapat dihapus manual setelah deployment jika memang masih ada.
