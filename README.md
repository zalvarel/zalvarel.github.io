# Portofolio Wildan Zalvarel Rizqullah

Portofolio pribadi interaktif bertema **Network & Security Enthusiast**, dibuat dengan **Vite + React** (tanpa backend) dan di-deploy ke **GitHub Pages**:
<https://zalvarel.github.io/>

## Fitur

- Background canvas *network topology* yang bereaksi ke kursor (jumlah node lebih sedikit di mobile)
- Efek mengetik di subtitle hero, statistik dengan counter
- Cursor glow (khusus desktop), scroll reveal, kartu dengan tilt 3D + spotlight
- Tech stack "orbit": garis paket data mengalir ke bola, tooltip saat hover/fokus/tap
- Timeline pengalaman yang terisi saat scroll, foto bisa dibuka di lightbox
- Modal detail pendidikan, salin email/GitHub ke clipboard dengan toast
- **Terminal easter egg**: klik ikon terminal di kanan bawah atau tekan `` ` ``
  - Perintah: `help`, `whoami`, `about`, `skills`, `experience`, `contact`, `ping wildan`, `nmap portfolio`, `goto <section>`, `clear`, `exit`
  - ↑/↓ untuk riwayat, Tab untuk autocomplete
- Boot screen ala terminal (≤ 1,5 detik, bisa di-skip, sekali per sesi)
- Menghormati `prefers-reduced-motion`; navigasi keyboard, aria-label, dan focus ring lengkap

## Menjalankan di lokal

Butuh **Node.js 20+**.

```bash
npm install
npm run dev       # buka http://localhost:5173
npm run build     # hasil build di folder dist/
npm run preview   # cek hasil build di http://localhost:4173
```

## Mengubah konten

Semua teks, link, dan kontak ada di **`src/data.js`**. Komponen tidak perlu disentuh.

| Yang ingin diubah | Bagian di `src/data.js` |
| --- | --- |
| Nama, foto profil | `profile` |
| Teks hero, daftar teks mengetik | `hero` |
| Angka statistik | `stats` |
| WhatsApp, Instagram, Email, LinkedIn, GitHub | `socials` |
| Tentang saya | `about` |
| Pendidikan + isi modal | `education` |
| Pengalaman | `experiences` |
| Tech stack + teks tooltip | `techStack` |
| Teks boot screen / terminal | `bootLines`, `terminal` |

Gambar ada di **`public/assets/`**. Ganti file-nya dengan nama yang sama:

| File | Ukuran yang disarankan |
| --- | --- |
| `profile.jpg` | ± 840 × 1040 px (rasio 21:26), latar gelap/transparan |
| `lancar-artha.jpg`, `terabyte.jpg` | ± 1280 × 800 px (rasio 16:10), maks. ~200 KB |
| `logo-smkn-prigen.png`, `logo-telkom-university.png` | 128 × 128 px, PNG transparan |
| `og-image.png` | 1200 × 630 px (gambar saat link dibagikan di sosmed) |
| `apple-touch-icon.png` | 180 × 180 px |

Tips: kompres foto (mis. lewat <https://squoosh.app>) agar skor Lighthouse tetap tinggi.

## Deploy ke GitHub Pages

Repo ini dikonfigurasi untuk **user site** `zalvarel.github.io` (`base: '/'` di `vite.config.js`).

1. Buat repo baru di GitHub dengan nama persis **`zalvarel.github.io`**.
2. Push project ini ke branch `main`:
   ```bash
   git init
   git add .
   git commit -m "Portofolio pertama"
   git branch -M main
   git remote add origin https://github.com/zalvarel/zalvarel.github.io.git
   git push -u origin main
   ```
3. Di GitHub buka **Settings → Pages → Build and deployment → Source**, lalu pilih **GitHub Actions**.
4. Workflow `.github/workflows/deploy.yml` otomatis build & deploy setiap kali ada push ke `main`. Pantau progresnya di tab **Actions**.
5. Setelah selesai, website tersedia di <https://zalvarel.github.io/>.

> Kalau suatu saat dipindah ke repo lain (mis. `portfolio`), ubah `base` di `vite.config.js` menjadi `'/portfolio/'` dan sesuaikan URL di `index.html`, `public/robots.txt`, serta `public/sitemap.xml`.

## Struktur folder

```
├─ index.html                 # meta SEO, Open Graph, favicon
├─ public/
│  ├─ favicon.svg, robots.txt, sitemap.xml
│  └─ assets/                 # foto & logo
├─ src/
│  ├─ data.js                 # ← SEMUA konten
│  ├─ App.jsx, main.jsx
│  ├─ components/             # Navbar, Hero, About, Education, Experience, TechStack,
│  │                          # Contact, Footer, Terminal, BootScreen, NetworkCanvas,
│  │                          # CursorGlow, TiltCard, TypingText, Counter, Modal, Toast, icons
│  ├─ hooks/                  # useMedia (reduced motion, pointer), useInView
│  └─ styles/                 # base.css, sections.css, features.css
└─ .github/workflows/deploy.yml
```
