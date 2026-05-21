# Panduan Kode Portfolio Duta Suksesi F.

Dokumen ini menjelaskan struktur proyek, fungsi setiap komponen, dan package/dependensi yang digunakan. Dibuat sebagai referensi cepat untuk developer yang ingin memahami atau mempresentasikan kode ini.

---

## Struktur Proyek

```
src/
├── App.jsx                   # Root component, titik masuk utama aplikasi
├── App.css                   # Global CSS (font, scrollbar, dsb.)
├── main.jsx                  # Entry point React (render ke DOM)
├── data/
│   └── portfolioData.js      # Data statis proyek & sertifikasi (Bahasa Indonesia)
├── components/
│   ├── Navbar.jsx            # Navigasi atas dengan scroll detection & mobile menu
│   ├── Hero.jsx              # Section landing page dengan animasi fade & Lanyard 3D
│   ├── About.jsx             # Section profil dengan IntersectionObserver reveal
│   ├── Projects.jsx          # Grid kartu proyek dengan masonry layout asimetris
│   ├── JourneyVault.jsx      # Timeline sertifikasi dengan pagination "Lihat Lebih Banyak"
│   ├── JourneyNode.jsx       # Satu kartu sertifikat di dalam timeline
│   ├── Contact.jsx           # Section kontak dengan link sosial
│   ├── Footer.jsx            # Footer dengan tagline dan ikon sosial
│   ├── Preloader.jsx         # Layar loading animasi (sementara di-comment di App.jsx)
│   ├── DotGrid.jsx           # Latar interaktif titik-titik Canvas yang bereaksi terhadap mouse
│   ├── SplitText.jsx         # Animasi teks per huruf/kata menggunakan GSAP SplitText
│   └── Lanyard.jsx           # ID Card 3D interaktif dengan fisika tali (Three.js + Rapier)
└── assets/
    └── lanyard/
        ├── card.glb           # Model 3D kartu identitas
        └── lanyard.png        # Tekstur tali gantungan
```

---

## Penjelasan Setiap Komponen

### `App.jsx`
Titik masuk utama yang merakit semua section portfolio secara berurutan. Mengatur state `isReady` yang dilewatkan ke komponen anak untuk menunda animasi sampai halaman siap.

### `src/data/portfolioData.js`
Berkas data statis yang menyimpan array `projects` (daftar proyek) dan `achievements` (daftar sertifikasi) dalam Bahasa Indonesia. Diimpor langsung oleh `Projects.jsx` dan `JourneyVault.jsx`. **Ini adalah satu-satunya tempat yang perlu diubah jika ingin menambah/mengedit proyek atau sertifikat.**

### `Navbar.jsx`
Navigasi tetap (fixed) di atas halaman. Mendeteksi scroll lewat `window.addEventListener('scroll')` dan menambahkan efek `backdrop-blur` setelah pengguna scroll lebih dari 20px. Punya menu hamburger untuk layar mobile.

### `Hero.jsx`
Section pembuka portofolio. Menampilkan teks sambutan yang dipecah per kata menggunakan `SplitText`, deskripsi singkat, dua tombol aksi, dan ID Card 3D interaktif `Lanyard` di sisi kanan.

### `About.jsx`
Section profil diri. Menggunakan `IntersectionObserver` bawaan browser untuk memunculkan elemen satu per satu (staggered reveal) saat user men-scroll ke section ini. Menampilkan bio, daftar tech stack, dan informasi pendidikan.

### `Projects.jsx`
Menampilkan grid kartu proyek dari data di `portfolioData.js`. Layout menggunakan grid 3 kolom dengan offset vertikal (masonry palsu) yang berbeda tiap kolom. Animasi kartu muncul saat di-scroll menggunakan `IntersectionObserver`.

### `JourneyVault.jsx`
Menampilkan timeline sertifikasi dari data di `portfolioData.js` menggunakan komponen `JourneyNode`. Fitur "Lihat Lebih Banyak" memunculkan 4 sertifikat tambahan setiap kali diklik. Menggunakan `AnimatePresence` dari Framer Motion untuk animasi masuk/keluar item.

### `JourneyNode.jsx`
Kartu individual satu sertifikat dalam timeline. Menampilkan tanggal terbit, judul, ID kredensial, dan gambar sertifikat. Punya efek hover glow radial dan overlay holografik.

### `Contact.jsx`
Section kontak yang menampilkan link ke email, GitHub, dan LinkedIn dalam bentuk kartu klik. Menggunakan `IntersectionObserver` yang sama seperti `About.jsx` untuk animasi reveal.

### `Footer.jsx`
Bagian bawah halaman yang menampilkan tagline dan ikon sosial (GitHub, LinkedIn, Email). Komponen sederhana tanpa state.

### `Preloader.jsx`
Layar loading dengan angka persentase yang naik secara acak, diakhiri dengan animasi tirai menyapu ke atas. Saat ini di-comment di `App.jsx`.

### `DotGrid.jsx`
Background interaktif berupa grid titik-titik yang digambar di HTML5 Canvas. Titik-titik bereaksi terhadap gerakan mouse (didorong menjauh) dan klik (efek ledakan gelombang kejut). Menggunakan `GSAP InertiaPlugin` untuk efek membal saat kembali ke posisi semula.

### `SplitText.jsx`
Wrapper komponen untuk animasi teks berbasis GSAP. Memecah teks menjadi per huruf (`chars`), per kata (`words`), atau per baris (`lines`), lalu menganimasikannya saat elemen masuk viewport menggunakan `ScrollTrigger`. Menunggu font browser selesai dimuat sebelum memulai (`document.fonts.ready`).

### `Lanyard.jsx`
Simulasi ID Card 3D yang bisa digeser-geser. Dibangun dengan `React Three Fiber` (React wrapper untuk Three.js) dan engine fisika `@react-three/rapier`. Tali (band) disimulasikan dengan 4 sendi fisik yang disambungkan menggunakan `RopeJoint` dan `SphericalJoint`. Kartu bisa ditarik dengan mouse.

---

## Package & Dependensi Utama

| Package | Digunakan Di | Fungsi |
|---|---|---|
| `react`, `react-dom` | Semua komponen | Library inti React untuk membangun UI |
| `vite` | Build tool | Bundler dan dev server yang cepat |
| `tailwindcss` | Semua komponen | Utility-first CSS framework untuk styling |
| `gsap` | `DotGrid.jsx`, `SplitText.jsx` | Animasi JavaScript berkinerja tinggi |
| `@gsap/react` | `SplitText.jsx` | Hook `useGSAP` agar aman dipakai di React |
| `gsap/ScrollTrigger` | `SplitText.jsx` | Plugin GSAP untuk memicu animasi saat di-scroll |
| `gsap/SplitText` | `SplitText.jsx` | Plugin GSAP untuk memecah teks di DOM |
| `gsap/InertiaPlugin` | `DotGrid.jsx` | Plugin GSAP untuk animasi berbasis inersia dan kecepatan |
| `framer-motion` | `JourneyVault.jsx`, `JourneyNode.jsx` | Animasi deklaratif React (masuk/keluar elemen) |
| `three` | `Lanyard.jsx` | Library grafis 3D WebGL |
| `@react-three/fiber` | `Lanyard.jsx` | React renderer untuk Three.js (pakai JSX buat scene 3D) |
| `@react-three/drei` | `Lanyard.jsx` | Koleksi helper R3F: `Environment`, `Lightformer`, `useGLTF`, `useTexture` |
| `@react-three/rapier` | `Lanyard.jsx` | Engine fisika 3D berbasis Rapier untuk React Three Fiber |
| `meshline` | `Lanyard.jsx` | Membuat garis lebar (tali) di Three.js yang tidak bisa dibuat dengan `LineGeometry` biasa |
| `lucide-react` | `JourneyNode.jsx`, `JourneyVault.jsx` | Library ikon SVG berbasis React |

---

## Alur Data

```
src/data/portfolioData.js
  ├── projects[]  →  Projects.jsx  →  Kartu Proyek
  └── achievements[]  →  JourneyVault.jsx  →  JourneyNode.jsx  →  Kartu Sertifikat
```

Semua teks UI sudah ditulis langsung (hardcoded) dalam **Bahasa Indonesia** di masing-masing komponen. Untuk mengubah teks, cukup edit langsung di file komponen yang bersangkutan.
