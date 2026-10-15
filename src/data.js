/* =====================================================================
 *  data.js: SEMUA konten website ada di sini.
 *  Edit teks, link, dan kontak di file ini tanpa perlu menyentuh komponen.
 *  Gambar disimpan di folder `public/assets/`.
 * ===================================================================== */

// Helper path aset agar tetap benar kalau `base` di vite.config.js berubah.
const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`;

/* ---------- Identitas ---------- */
export const profile = {
  name: 'Wildan Zalvarel Rizqullah',
  shortName: 'Wildan',
  logo: 'WildanZalvarel',
  photo: asset('profile-wildan.jpg'),
  photoAlt: 'Foto Wildan Zalvarel Rizqullah memakai jas almamater Telkom University',
};

/* ---------- Navbar ---------- */
// `id` harus sama dengan id section di halaman.
export const navLinks = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang saya' },
  { id: 'pendidikan', label: 'Pendidikan' },
  { id: 'pengalaman', label: 'Pengalaman' },
  { id: 'kontak', label: 'Kontak saya' },
];

/* ---------- Hero ---------- */
export const hero = {
  greeting: 'Hallo semua, saya',
  // Subtitle berganti-ganti dengan efek mengetik
  roles: ['Network & Security Enthusiast', 'Linux Enthusiast', 'Information Systems Student'],
  description:
    'Portofolio ini menampilkan proyek dan kontribusi saya sebagai pengembang di bidang teknologi.',
  cta: { label: 'Hubungi Saya', target: 'kontak' },
};

// Statistik kecil di bawah hero (angka akan menghitung naik)
export const stats = [
  { value: 9, suffix: '+', label: 'Bulan Pengalaman' },
  { value: 2, suffix: '', label: 'Perusahaan' },
  { value: 12, suffix: '+', label: 'Tools' },
];

/* ---------- Kontak & sosial media ----------
 * GANTI placeholder [ ... ] di bawah dengan data asli kamu.
 * - `href`  : link yang dibuka saat kartu diklik
 * - `value` : teks yang ditampilkan
 * - `copy`  : kalau diisi, muncul tombol salin ke clipboard
 */
export const socials = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: '+62 821-4385-9137',
    href: 'https://wa.me/6282143859137', // format: 62 + nomor tanpa 0 di depan
  },
  {
    key: 'github',
    label: 'GitHub',
    value: 'zalvarel',
    href: 'https://github.com/zalvarel',
    copy: 'zalvarel',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    value: '@virneeyy',
    href: 'https://www.tiktok.com/@virneeyy',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    value: '@pokerel.zip',
    href: 'https://www.instagram.com/pokerel.zip',
  },
  {
    key: 'email',
    label: 'Email',
    value: 'zalvarelwildan@gmail.com',
    href: 'mailto:zalvarelwildan@gmail.com',
    copy: 'zalvarelwildan@gmail.com',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: 'Wildan Rizqullah',
    href: 'https://www.linkedin.com/in/wildan-rizqullah-29a85540a',
  },
];

/* ---------- Tentang saya ---------- */
export const about = {
  title: 'Tentang saya',
  intro: {
    heading: 'Network Security Enthusiast · S1 Sistem Informasi Telkom University',
    body:
      'Saya mahasiswa Sistem Informasi Telkom University yang penasaran dengan cara kerja jaringan dan bagaimana menjaganya tetap aman. Saya belajar lewat praktik langsung di Linux dan lab latihan, mulai dari konfigurasi jaringan sampai dasar-dasar pengujian keamanan.',
  },
  connect: {
    heading: 'Mari Terkoneksi',
    body:
      'Saya selalu terbuka untuk kolaborasi, diskusi proyek, atau peluang profesional baru. Silakan hubungi saya melalui email, telepon, atau melalui jaringan profesional di bawah ini.',
  },
};

/* ---------- Pendidikan ---------- */
export const education = [
  {
    id: 'smkn-prigen',
    school: 'SMKN Prigen',
    period: '2023 – 2026',
    major: 'Kompetensi Keahlian Teknik Komputer Jaringan',
    logo: asset('logo-smkn-prigen.png'),
    logoAlt: 'Logo SMK Negeri Prigen',
    website: 'https://smkn1prigen.sch.id/', // dibuka oleh tombol "Baca lebih lanjut"
  },
  {
    id: 'telkom-university',
    school: 'Telkom University',
    period: '2026 – Sekarang',
    major: 'Program studi S1 Sistem Informasi',
    logo: asset('logo-telkom-university.png'),
    logoAlt: 'Logo Telkom University',
    website: 'https://telkomuniversity.ac.id/',
  },
];

/* ---------- Pengalaman ---------- */
export const experiences = [
  {
    id: 'lancar-artha',
    type: 'Pengalaman Kerja',
    company: 'PT. Lancar Artha Media Data',
    role: 'Network Engineer, Data Entry & Graphic Designer',
    duration: '3 bulan',
    description:
      'Network Engineer, Data Entry & Graphic Designer selama 3 bulan di PT. Lancar Artha Media Data. Bertanggung jawab atas konfigurasi dan pemeliharaan jaringan, data entry serta pelacakan komplain pelanggan, dan pembuatan materi desain grafis.',
    tags: ['Konfigurasi jaringan', 'Data entry', 'Komplain pelanggan', 'Desain grafis'],
    photo: asset('lancar-artha.jpg'),
    photoAlt: 'Wildan bersama tim PT. Lancar Artha Media Data',
    photoPosition: 'center 40%', // bagian foto yang ditampilkan di kartu (object-position)
  },
  {
    id: 'terabyte',
    type: 'Pengalaman Magang',
    company: 'PT. Terabyte Network Indonesia',
    role: 'Network Engineer Intern',
    duration: '6 bulan',
    description:
      'Network Engineer Intern selama 6 bulan di PT. Terabyte Network Indonesia. Bertanggung jawab atas konfigurasi dan pemeliharaan perangkat jaringan, troubleshooting gangguan koneksi, serta dokumentasi konfigurasi untuk menjaga stabilitas dan keamanan jaringan.',
    tags: ['Perangkat jaringan', 'Troubleshooting', 'Dokumentasi'],
    photo: asset('terabyte.jpg'),
    photoAlt: 'Wildan di kantor layanan BYTEHOME, PT. Terabyte Network Indonesia',
    photoPosition: 'center 30%',
  },
];

/* ---------- Tech stack ----------
 * `icon` = kunci ikon di src/components/icons.jsx
 * `level` = teks di tooltip saat ikon di-hover
 */
export const techStack = [
  { name: 'Codex', icon: 'codex', level: 'Asisten coding harian' },
  { name: 'Claude', icon: 'claude', level: 'Asisten coding harian' },
  { name: 'Python', icon: 'python', level: 'Pernah dipakai di proyek' },
  { name: 'Node.js', icon: 'nodejs', level: 'Pernah dipakai di proyek' },
  { name: 'JavaScript', icon: 'javascript', level: 'Pernah dipakai di proyek' },
  { name: 'CSS', icon: 'css', level: 'Pernah dipakai di proyek' },
  { name: 'Kali Linux', icon: 'kalilinux', level: 'Dipakai untuk lab keamanan' },
  { name: 'Figma', icon: 'figma', level: 'Dipakai untuk desain grafis' },
  { name: 'Cisco', icon: 'cisco', level: 'Dipakai saat magang & praktikum' },
  { name: 'Arch Linux', icon: 'archlinux', level: 'Daily driver' },
  { name: 'Wireshark', icon: 'wireshark', level: 'Analisis paket jaringan' },
  { name: 'VirtualBox', icon: 'virtualbox', level: 'Lab virtual sehari-hari' },
];

/* ---------- Footer ---------- */
export const footer = {
  copyright: '© 2026 Wildan Zalvarel Rizqullah',
  backToTop: 'Kembali ke atas',
};

/* ---------- Boot screen (loading) ---------- */
export const bootLines = [
  '[  OK  ] Memuat kernel wildan-os 6.9.0',
  '[  OK  ] Menjalankan network-manager',
  '[  OK  ] Mengaktifkan firewall (ufw)',
  '[  OK  ] Menghubungkan ke portofolio...',
];

/* ---------- Terminal easter egg ----------
 * Output perintah teks statis. Perintah dinamis (help, clear, nmap, dll.)
 * dibuat di src/components/Terminal.jsx memakai data di file ini.
 */
export const terminal = {
  user: 'guest',
  host: 'wildan-sec',
  welcome: [
    'Selamat datang di wildan-sec shell v1.0',
    "Ketik 'help' untuk melihat daftar perintah.",
  ],
  whoami: ['guest — tapi kamu sedang melihat portofolio milik Wildan Zalvarel Rizqullah 👋'],
  about: [
    'Wildan Zalvarel Rizqullah',
    'Network & Security Enthusiast · S1 Sistem Informasi Telkom University',
    'Suka ngoprek Linux, jaringan, dan keamanan lewat praktik langsung di lab.',
  ],
};
