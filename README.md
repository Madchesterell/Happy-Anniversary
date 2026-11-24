# The Art of Us — Anniversary Edition

Website anniversary statis berbasis HTML, CSS, dan Vanilla JavaScript. Versi ini mempertahankan estetika Dark Warm Elegance dari proyek sumber dan menambahkan motion system yang ringan.

## Struktur proyek

```text
the-art-of-us-anniversary/
├── index.html
├── css/
│   ├── style.css
│   └── animations.css
├── js/
│   ├── script.js
│   └── animations.js
├── assets/
│   └── README.md
└── README.md
```

## Menjalankan

Buka `index.html` langsung di browser atau gunakan Live Server di VS Code. Semua file CSS dan JavaScript sudah dihubungkan dengan path relatif.

## Fitur yang ditambahkan

- Staggered entrance pada Hero dan floating photo frame.
- Debu cahaya ambient, scroll reveal berbasis `IntersectionObserver`, dan animasi aksen.
- Transisi fade + slide untuk lima chapter; tombol panah dan tab tetap sinkron.
- Archive card flip 3D dengan hover lift dekoratif yang tidak mengubah status flip.
- Segel surat berdenyut, surat bisa dibuka dan ditutup, lalu teks diketik ulang setiap kali dibuka.
- Api lilin berkedip, padam dengan asap, dan dapat dinyalakan kembali.
- Harapan tetap tersimpan secara lokal menggunakan `localStorage`.
- Dukungan `prefers-reduced-motion`.

## Aset pribadi

Belum ada foto atau audio pribadi yang disertakan pada file sumber yang diterima. Hero masih menggunakan ilustrasi SVG dan empat kartu arsip menggunakan placeholder gradien. Tambahkan audio bernama `assets/bergema-sampai-selamanya.mp3` jika ingin memakai pemutar musik. Panduan mengganti foto tersedia di `assets/README.md`.

## Catatan

Harapan tersimpan hanya pada browser/perangkat yang digunakan. Membersihkan data situs/browser dapat menghapus daftar tersebut.
