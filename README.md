# The Art of Us — Anniversary Edition

Website anniversary statis berbasis HTML5, CSS3, dan Vanilla JavaScript. Tidak membutuhkan bundler, framework, atau dependensi npm.

## Struktur

```text
anniversary-reimagined/
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
    ├── hero.webp                         (opsional, ganti ilustrasi SVG)
    └── bergema-sampai-selamanya.mp3      (tambahkan file audio sendiri)
```

## Personalisasi
- Hero: di `index.html`, ganti SVG di `.hero-image` dengan `<img src="./assets/hero.webp" alt="Foto kita">`.
- Galeri: ganti visual CSS `.memory-one .polaroid-image` sampai `.memory-four .polaroid-image` dengan elemen `<img>` dan `object-fit: cover`, atau gunakan foto sebagai `background-image`.
- Cerita: ubah array `chapters` di `app.js`.
- Surat: ubah isi `.love-letter` di `index.html`.
- Musik: letakkan audio yang kamu miliki di `assets/bergema-sampai-selamanya.mp3`. Browser memulai audio setelah interaksi pengguna.
- Wish tersimpan pada localStorage browser/perangkat yang dipakai; tidak tersinkron lintas perangkat.

## Deploy ke GitHub Pages
1. Buat repository GitHub baru.
2. Upload isi folder ini ke root repository (pastikan `index.html` berada di root).
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
6. Tunggu deploy selesai dan buka URL GitHub Pages yang ditampilkan.

Semua aset memakai path relatif `./...`, jadi cocok untuk GitHub Pages termasuk repository project pages.
