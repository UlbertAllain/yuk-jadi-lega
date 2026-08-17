# Seed Reference

Seed awal Yuk Jadi Legal memakai Bukalegal sebagai **referensi struktur layanan dan harga awal yang dipublikasikan**, bukan sebagai sumber identitas perusahaan Yuk Jadi Legal.

Yang dapat dipakai sebagai benchmark awal:
- kategori layanan
- nama layanan umum
- pola cakupan layanan
- harga awal yang memang dipublikasikan secara terbuka

Yang **tidak** disalin sebagai milik Yuk Jadi Legal:
- partner
- client
- testimonial
- team
- studi kasus
- achievement
- alamat
- email
- nomor WhatsApp

Karena data-data tersebut akan menjadi klaim faktual tentang Yuk Jadi Legal, seed membiarkannya kosong. Masukkan data resmi melalui CMS setelah tersedia.

Semua harga, estimasi waktu, persyaratan, dan ruang lingkup layanan tetap perlu diverifikasi oleh pihak Yuk Jadi Legal sebelum website production.

## KBLI

KBLI tidak lagi disimpan pada `data/seed-data.json` atau Firestore. Halaman `/kbli` memakai endpoint internal `/api/kbli` yang mem-proxy API KBLI 2025 secara server-side. Admin tidak memiliki CRUD KBLI karena data ini merupakan reference/master data eksternal, bukan konten marketing Yuk Jadi Legal.
