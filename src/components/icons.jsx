/* Ikon SVG inline. Logo brand diambil dari paket `simple-icons` (hanya
 * ikon yang di-import yang ikut ter-bundle). Ikon yang tidak tersedia di
 * simple-icons (Codex, LinkedIn, Email, dll.) digambar manual. */
import {
  siArchlinux,
  siCisco,
  siClaude,
  siCss,
  siFigma,
  siGithub,
  siInstagram,
  siJavascript,
  siKalilinux,
  siNodedotjs,
  siPython,
  siVirtualbox,
  siWhatsapp,
  siWireshark,
} from 'simple-icons';

const brand = (si) => ({ path: si.path, color: `#${si.hex}` });

// Path manual (viewBox 24x24)
const LINKEDIN =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z';
const CODEX =
  'M12 1.5 21.1 6.75v10.5L12 22.5 2.9 17.25V6.75L12 1.5zm0 2.31L4.9 7.9v8.2l7.1 4.09 7.1-4.09V7.9L12 3.81zM8.2 9.2l3.3 2.8-3.3 2.8-1.03-1.22L9.03 12 7.17 10.42 8.2 9.2zm4.3 4.8h4.3v1.6h-4.3V14z';

export const brandIcons = {
  whatsapp: brand(siWhatsapp),
  instagram: brand(siInstagram),
  github: brand(siGithub),
  linkedin: { path: LINKEDIN, color: '#0A66C2' },
  codex: { path: CODEX, color: '#ffffff' },
  claude: brand(siClaude),
  python: brand(siPython),
  nodejs: brand(siNodedotjs),
  javascript: brand(siJavascript),
  css: { path: siCss.path, color: '#2965f1' },
  // Beberapa warna brand dibuat lebih terang agar kontras di latar gelap
  kalilinux: { path: siKalilinux.path, color: '#6fb3e0' },
  figma: brand(siFigma),
  cisco: { path: siCisco.path, color: '#3fc1f0' },
  archlinux: brand(siArchlinux),
  wireshark: { path: siWireshark.path, color: '#5aa7ff' },
  virtualbox: { path: siVirtualbox.path, color: '#3d8bff' },
};

/** Ikon brand berbasis path tunggal. `colored` = pakai warna brand. */
export function BrandIcon({ name, size = 20, colored = false, ...rest }) {
  if (name === 'email') return <MailIcon size={size} {...rest} />;
  const icon = brandIcons[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={colored ? icon.color : 'currentColor'}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={icon.path} />
    </svg>
  );
}

/* ---------- Ikon UI (stroke) ---------- */
const Stroke = ({ size = 20, children, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

export const MailIcon = (p) => (
  <Stroke {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Stroke>
);
export const MenuIcon = (p) => (
  <Stroke {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);
export const CloseIcon = (p) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);
export const TerminalIcon = (p) => (
  <Stroke {...p}>
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
    <path d="m7 9 3 3-3 3M12.5 15H17" />
  </Stroke>
);
export const CopyIcon = (p) => (
  <Stroke {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </Stroke>
);
export const CheckIcon = (p) => (
  <Stroke {...p}>
    <path d="m5 12 5 5 9-10" />
  </Stroke>
);
export const ExternalIcon = (p) => (
  <Stroke {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </Stroke>
);
export const ZoomIcon = (p) => (
  <Stroke {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4M11 8v6M8 11h6" />
  </Stroke>
);
