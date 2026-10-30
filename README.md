# BengkelPro

Landing page penjualan BengkelPro dalam bahasa Indonesia. Dibuat dengan HTML, CSS, dan JavaScript tanpa proses build atau dependensi aplikasi.

## Pratinjau lokal

Jalankan dari folder ini:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Buka http://127.0.0.1:4173.

## Publikasi Netlify

Unggah isi folder `dist` sebagai website statis, atau gunakan konfigurasi `netlify.toml`. Website Netlify lama tidak diubah otomatis oleh proyek ini.

## Kontak dan konten

- WhatsApp penjualan: `089649532860` (format internasional `6289649532860`). Tautan kontak berada di `dist/index.html`; pembentukan pesan ada di `dist/app.js`.
- Formulir membuka WhatsApp dengan pesan yang dapat ditinjau pengunjung sebelum dikirim. Tidak menyimpan data formulir ke server.
- Preview utama menggunakan gambar dashboard yang dikirim pengguna di `dist/assets/dashboard-bengkelpro.png`, dengan dialog untuk memperbesar gambar. Preview tiga modul lainnya tetap berupa ilustrasi dengan data contoh.
- Harga tidak dicantumkan karena paket resmi belum diberikan. Semua permintaan penawaran diarahkan ke konsultasi.
- Fitur didasarkan pada HTML awal yang diberikan pengguna.
- Font Google digunakan dengan fallback sistem jika tidak tersedia.

## Pemeriksaan

```sh
node --check dist/app.js
```

Periksa navigasi seluler, tab modul beserta kontrol keyboard, FAQ, dan formulir WhatsApp sebelum rilis.
