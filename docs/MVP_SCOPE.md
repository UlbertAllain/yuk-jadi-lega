# MVP Scope — Yuk Jadi Legal

## Goal

Membuat company profile legal service yang terasa sebagai versi modern/level-up dari benchmark seperti Bukalegal, dengan fokus:

1. calon klien cepat memahami layanan;
2. trust dibangun lewat partner, testimonial, team, studi kasus, dan konten edukasi;
3. conversion diarahkan ke konsultasi/WhatsApp;
4. tim Yuk Jadi Legal bisa mengelola konten sendiri melalui CMS;
5. tidak over-engineered menjadi legal SaaS.

## Public Information Architecture

```text
/
/layanan
/layanan/[slug]
/tentang-kami
/cara-kerja
/artikel
/artikel/[slug]
/faq
/kontak
/kebijakan-privasi
```

## Admin Information Architecture

```text
/admin
/admin/login
/admin/services
/admin/articles
/admin/partners
/admin/testimonials
/admin/faqs
/admin/team
/admin/case-studies
/admin/leads
/admin/settings
```

## Out of Scope

- payment gateway
- customer auth
- customer dashboard
- online tracking
- invoice
- upload dokumen klien
- case management
- chat
- multi-role internal workflow

Jika bisnis nantinya membutuhkan fitur tersebut, lanjut sebagai Phase 2 / Portal Klien.
