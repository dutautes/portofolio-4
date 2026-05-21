# Panduan Kode Portfolio Duta Suksesi F.

Dokumen ini menjelaskan struktur proyek, fungsi setiap komponen, dan package/dependensi yang digunakan. Dibuat sebagai referensi cepat untuk memahami atau mengembangkan kode ini.

---

## Struktur Proyek

```
portofolio-duta/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/
│       ├── certificates/     # Gambar sertifikat (PNG)
│       └── projects/         # Gambar thumbnail proyek (PNG)
└── src/
    ├── main.jsx              # Entry point React (render ke DOM)
    ├── index.css             # Global CSS: font, scrollbar, Tailwind, custom utilities
    ├── App.jsx               # Root component, merakit semua section
    ├── data/
    │   └── portfolioData.js  # Satu-satunya sumber data: projects[] & achievements[]
    ├── components/
    │   ├── Navbar.jsx        # Navigasi fixed atas dengan scroll detection & mobile menu
    │   ├── Hero.jsx          # Landing section: SplitText + Lanyard 3D
    │   ├── About.jsx         # Profil, tech stack, pendidikan
    │   ├── Projects.jsx      # Grid kartu proyek dengan masonry asimetris
    │   ├── JourneyVault.jsx  # Timeline sertifikasi dengan pagination
    │   ├── JourneyNode.jsx   # Kartu individual satu sertifikat
    │   ├── Contact.jsx       # Link kontak (email, GitHub, LinkedIn)
    │   ├── Footer.jsx        # Footer tagline + ikon sosial
    │   ├── SplitText.jsx     # Animasi teks per huruf/kata via GSAP
    │   └── Lanyard.jsx       # ID Card 3D interaktif (Three.js + Rapier physics)
    └── assets/
        ├── hero.png
        └── lanyard/
            ├── card.glb      # Model 3D kartu identitas
            └── lanyard.png   # Tekstur tali gantungan
```

---

## Penjelasan Setiap Komponen

### `App.jsx`
Root component tanpa state. Merakit semua section secara berurutan di dalam satu wrapper `div` dengan background `#020617`.

### `src/data/portfolioData.js`
Sumber data tunggal untuk seluruh konten dinamis. Berisi dua export:
- `projects[]` — dipakai oleh `Projects.jsx`
- `achievements[]` — dipakai oleh `JourneyVault.jsx`

**Ini satu-satunya file yang perlu diubah untuk menambah/mengedit proyek atau sertifikat.**

### `Navbar.jsx`
Navigasi fixed di atas halaman. Mendeteksi scroll via `window.addEventListener('scroll')` dan menambahkan `backdrop-blur` + border setelah scroll > 20px. Punya hamburger menu untuk mobile yang menutup otomatis setelah link diklik.

### `Hero.jsx`
Section pembuka. Menampilkan teks sambutan yang dianimasikan per kata menggunakan `SplitText`, deskripsi singkat, dua tombol scroll (ke `#projects` dan `#contact`), serta `Lanyard` 3D di sisi kanan. Elemen dengan atribut `data-fade` dianimasikan masuk secara staggered via `requestAnimationFrame` saat mount.

### `About.jsx`
Section profil. Menggunakan `IntersectionObserver` untuk memunculkan elemen `[data-reveal]` satu per satu (staggered 120ms) saat section masuk viewport. Menampilkan bio, daftar tech stack, dan info pendidikan.

### `Projects.jsx`
Grid kartu proyek dari `portfolioData.js`. Layout 3 kolom dengan offset vertikal berbeda tiap kolom (masonry palsu via `lg:translate-y-*`). Animasi kartu muncul saat di-scroll menggunakan `IntersectionObserver`. Object `gradients` didefinisikan di luar komponen agar tidak dibuat ulang tiap render.

### `JourneyVault.jsx`
Timeline sertifikasi dari `portfolioData.js`. Menampilkan 4 item pertama, lalu menambah 4 lagi setiap kali tombol "Lihat Lebih Banyak" diklik (state `visibleCount`). Menggunakan Framer Motion untuk animasi heading saat scroll.

### `JourneyNode.jsx`
Kartu individual satu sertifikat. Menampilkan tanggal terbit, judul, ID kredensial, gambar sertifikat, dan link "View Credential" (jika ada). Punya efek hover: glow radial, overlay holografik, dan scale ringan. Dianimasikan masuk via `motion.div` dari Framer Motion.

### `Contact.jsx`
Section kontak. Menampilkan tiga link (email, GitHub, LinkedIn) sebagai kartu klik. Menggunakan `IntersectionObserver` yang sama seperti `About.jsx` untuk animasi reveal.

### `Footer.jsx`
Komponen sederhana tanpa state. Menampilkan tagline dan tiga ikon sosial (GitHub, LinkedIn, Email) sebagai SVG inline.

### `SplitText.jsx`
Wrapper animasi teks berbasis GSAP. Memecah teks menjadi per huruf (`chars`), per kata (`words`), atau per baris (`lines`), lalu menganimasikannya saat elemen masuk viewport via `ScrollTrigger`. Menunggu `document.fonts.ready` sebelum memulai agar kalkulasi posisi huruf akurat.

### `Lanyard.jsx`
Simulasi ID Card 3D yang bisa ditarik dengan mouse. Dibangun dengan `React Three Fiber` dan engine fisika `@react-three/rapier`. Tali disimulasikan dengan 4 sendi fisik (`RopeJoint` + `SphericalJoint`). Performa disesuaikan otomatis untuk mobile (DPR lebih rendah, timestep fisika 30fps vs 60fps).

---

## Package & Dependensi

| Package | Versi | Digunakan Di | Fungsi |
|---|---|---|---|
| `react`, `react-dom` | ^19.2.4 | Semua | Library inti React |
| `vite` | ^8.0.1 | Build | Bundler & dev server |
| `@vitejs/plugin-react` | ^6.0.1 | Build | Plugin Vite untuk React (Fast Refresh) |
| `tailwindcss` | ^4.2.2 | Semua | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.2.2 | Build | Integrasi Tailwind v4 via Vite plugin |
| `gsap` | ^3.14.2 | `SplitText.jsx` | Animasi JavaScript berkinerja tinggi |
| `@gsap/react` | ^2.1.2 | `SplitText.jsx` | Hook `useGSAP` agar aman di React |
| `gsap/ScrollTrigger` | (bundled) | `SplitText.jsx` | Memicu animasi saat elemen di-scroll |
| `gsap/SplitText` | (bundled) | `SplitText.jsx` | Memecah teks di DOM per huruf/kata/baris |
| `framer-motion` | ^12.39.0 | `JourneyVault.jsx`, `JourneyNode.jsx` | Animasi deklaratif React |
| `three` | ^0.183.2 | `Lanyard.jsx` | Library grafis 3D WebGL |
| `@react-three/fiber` | ^9.5.0 | `Lanyard.jsx` | React renderer untuk Three.js |
| `@react-three/drei` | ^10.7.7 | `Lanyard.jsx` | Helper R3F: `Environment`, `Lightformer`, `useGLTF`, `useTexture` |
| `@react-three/rapier` | ^2.2.0 | `Lanyard.jsx` | Engine fisika 3D untuk React Three Fiber |
| `meshline` | ^3.3.1 | `Lanyard.jsx` | Garis lebar (tali) di Three.js |
| `lucide-react` | ^1.16.0 | `JourneyNode.jsx`, `JourneyVault.jsx` | Ikon SVG berbasis React |

---

## Alur Data

```
src/data/portfolioData.js
  ├── projects[]      →  Projects.jsx  →  Kartu Proyek
  └── achievements[]  →  JourneyVault.jsx  →  JourneyNode.jsx  →  Kartu Sertifikat
```

---

## Catatan Teknis

- **Tidak ada state management global** — semua state bersifat lokal di komponen masing-masing.
- **Animasi scroll** di `About.jsx`, `Projects.jsx`, dan `Contact.jsx` menggunakan `IntersectionObserver` bawaan browser (tanpa library tambahan).
- **Animasi teks** di `Hero.jsx` menggunakan GSAP via `SplitText.jsx`.
- **Animasi timeline** di `JourneyVault.jsx` dan `JourneyNode.jsx` menggunakan Framer Motion.
- **Semua teks UI** ditulis langsung (hardcoded) dalam Bahasa Indonesia di masing-masing komponen.
- **Custom utilities CSS** (`bg-white/3`, `bg-white/8`, `border-white/8`, dll.) didefinisikan manual di `index.css` sebagai workaround untuk nilai opacity non-standar di Tailwind v4.
- **Font** menggunakan Inter dari Google Fonts, dimuat via `@import` di `index.css`.
