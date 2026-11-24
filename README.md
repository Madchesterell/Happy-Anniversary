# Our Little Forever — Anniversary Website

Website statis HTML5, CSS3, dan Vanilla JavaScript. Tidak membutuhkan Node.js, bundler, atau proses build.

## Jalankan lokal
Buka `index.html` di browser. Untuk hasil yang lebih konsisten, jalankan melalui Live Server atau server statis sederhana.

## Ganti aset
- Foto hero: di `index.html`, ganti SVG di `.hero-photo` dengan `<img src="./assets/hero.webp" alt="Foto kita">`.
- Foto galeri: ganti elemen `.polaroid-image` dengan elemen `<img>` atau atur `background-image` pada `.image-one` hingga `.image-four` di `styles.css`.
- Musik: letakkan file audio yang kamu miliki di `assets/bergema-sampai-selamanya.mp3`, atau ubah `src` elemen `<audio>` di bagian akhir `index.html`.
Pastikan kamu memiliki hak/izin untuk menggunakan file musik dan foto.

## Deploy ke GitHub Pages
1. Buat repository GitHub baru.
2. Upload `index.html`, `styles.css`, `app.js`, dan folder `assets` ke root repository.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
6. Tunggu proses deploy dan buka URL GitHub Pages yang ditampilkan.

Semua referensi aset menggunakan path relatif `./...`, sehingga cocok untuk GitHub Pages.
