import { useCallback, useEffect, useRef, useState } from 'react';
import { experiences, navLinks, profile, socials, techStack, terminal } from '../data';
import { CloseIcon, TerminalIcon } from './icons';

/* Daftar perintah (dipakai untuk help & autocomplete Tab) */
const COMMANDS = [
  ['help', 'Menampilkan daftar perintah'],
  ['whoami', 'Siapa kamu?'],
  ['about', 'Tentang Wildan'],
  ['skills', 'Tools & teknologi yang dipakai'],
  ['experience', 'Riwayat pengalaman kerja & magang'],
  ['contact', 'Cara menghubungi Wildan'],
  ['ping wildan', 'Cek apakah Wildan sedang online'],
  ['nmap portfolio', 'Scan "port" yang terbuka di portofolio ini'],
  ['goto <section>', 'Lompat ke section (mis. goto kontak)'],
  ['clear', 'Bersihkan layar'],
  ['exit', 'Tutup terminal'],
];
const COMPLETIONS = [
  ...COMMANDS.map(([c]) => c).filter((c) => !c.includes('<')),
  ...navLinks.map((l) => `goto ${l.id}`),
];

// Section sebagai "port terbuka" untuk perintah nmap
const PORTS = ['22', '80', '443', '3306', '8080', '25'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isEditable = (el) =>
  el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(() => terminal.welcome.map((text) => ({ text })));
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const history = useRef([]);
  const histIdx = useRef(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const triggerRef = useRef(null);

  const print = useCallback((items, type = 'out') => {
    const arr = (Array.isArray(items) ? items : [items]).map((text) => ({ text, type }));
    setLines((l) => [...l, ...arr]);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Pintasan ` (backtick) untuk buka/tutup
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '`') return;
      const inTerminal = e.target === inputRef.current;
      if (isEditable(e.target) && !inTerminal) return;
      e.preventDefault();
      setOpen((o) => {
        if (o) triggerRef.current?.focus();
        return !o;
      });
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Fokus ke input saat dibuka / setelah perintah async selesai
  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  // Auto-scroll ke baris terbaru
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  /* ---------- Eksekusi perintah ---------- */
  const run = async (raw) => {
    const cmd = raw.trim().replace(/\s+/g, ' ');
    print(`${terminal.user}@${terminal.host}:~$ ${raw}`, 'in');
    if (!cmd) return;
    history.current.push(cmd);
    histIdx.current = -1;

    const [name, ...args] = cmd.toLowerCase().split(' ');
    const arg = args.join(' ');

    switch (name) {
      case 'help':
        print(['Perintah yang tersedia:', ...COMMANDS.map(([c, d]) => `  ${c.padEnd(16)} ${d}`)]);
        print("Tips: ↑/↓ untuk riwayat, Tab untuk autocomplete, ` untuk buka/tutup.", 'muted');
        break;
      case 'whoami':
        print(terminal.whoami);
        break;
      case 'about':
        print(terminal.about);
        break;
      case 'skills':
        print(techStack.map((t) => `  ▸ ${t.name.padEnd(12)} ${t.level}`));
        break;
      case 'experience':
        experiences.forEach((e) => {
          print(`  ● ${e.company}`, 'accent');
          print(`    ${e.role} · ${e.type} · ${e.duration}`);
        });
        break;
      case 'contact':
        print(socials.map((s) => `  ${s.label.padEnd(10)} ${s.value}`));
        break;
      case 'ping': {
        if (arg !== 'wildan') {
          print(`ping: ${arg || '(kosong)'}: Nama host tidak dikenal. Coba 'ping wildan'.`, 'err');
          break;
        }
        setBusy(true);
        print(`PING wildan (10.0.0.7) 56(84) bytes of data.`);
        for (let i = 1; i <= 4; i++) {
          await sleep(350);
          const ms = (Math.random() * 8 + 3).toFixed(1);
          print(`64 bytes from wildan: icmp_seq=${i} ttl=64 time=${ms} ms`);
        }
        await sleep(250);
        print(['--- wildan ping statistics ---', '4 packets transmitted, 4 received, 0% packet loss']);
        print('✔ Wildan online dan siap diajak kolaborasi!', 'accent');
        setBusy(false);
        break;
      }
      case 'nmap': {
        if (arg !== 'portfolio') {
          print(`nmap: target '${arg || '(kosong)'}' tidak diizinkan. Scan hanya untuk 'portfolio' ya 😉`, 'err');
          break;
        }
        setBusy(true);
        print('Starting Nmap 7.95 ( https://nmap.org )');
        await sleep(500);
        print([
          'Nmap scan report for portfolio (zalvarel.github.io)',
          'Host is up (0.0042s latency).',
          '',
          'PORT       STATE  SERVICE',
        ]);
        for (let i = 0; i < navLinks.length; i++) {
          await sleep(160);
          const port = `${PORTS[i]}/tcp`.padEnd(10);
          print(`${port} open   ${navLinks[i].id}`, 'accent');
        }
        await sleep(200);
        print('Nmap done: 1 IP address (1 host up) scanned in 1.37 seconds');
        print("Tips: ketik 'goto <service>' untuk mengunjungi port tersebut.", 'muted');
        setBusy(false);
        break;
      }
      case 'goto': {
        const target = navLinks.find((l) => l.id === arg);
        if (!target) {
          print(`goto: section '${arg}' tidak ditemukan. Pilihan: ${navLinks.map((l) => l.id).join(', ')}`, 'err');
          break;
        }
        print(`Menuju #${target.id}...`, 'muted');
        document.getElementById(target.id)?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'sudo':
        print(`${terminal.user} tidak ada di file sudoers. Insiden ini akan dilaporkan ke ${profile.shortName} 🚨`, 'err');
        break;
      case 'clear':
        setLines([]);
        break;
      case 'exit':
        close();
        break;
      default:
        print(`${name}: perintah tidak ditemukan. Ketik 'help'.`, 'err');
    }
  };

  /* ---------- Keyboard: Enter, riwayat, Tab ---------- */
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (busy) return;
      const value = input;
      setInput('');
      run(value);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const h = history.current;
      if (!h.length) return;
      e.preventDefault();
      let i = histIdx.current;
      if (e.key === 'ArrowUp') i = i === -1 ? h.length - 1 : Math.max(0, i - 1);
      else i = i === -1 ? -1 : i + 1 >= h.length ? -1 : i + 1;
      histIdx.current = i;
      setInput(i === -1 ? '' : h[i]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const v = input.toLowerCase().trimStart();
      if (!v) return;
      const matches = COMPLETIONS.filter((c) => c.startsWith(v));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) {
        // Lengkapi sampai prefiks yang sama, lalu tampilkan pilihan
        let prefix = matches[0];
        for (const m of matches) while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
        if (prefix.length > v.length) setInput(prefix);
        else {
          print(`${terminal.user}@${terminal.host}:~$ ${input}`, 'in');
          print(matches.join('    '), 'muted');
        }
      }
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`term-trigger${open ? ' is-open' : ''}`}
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? 'Tutup terminal' : 'Buka terminal (pintasan: tombol `)'}
        aria-expanded={open}
        aria-controls="terminal-panel"
        title="Terminal ( ` )"
      >
        <TerminalIcon size={20} />
      </button>

      <div
        id="terminal-panel"
        className={`terminal${open ? ' is-open' : ''}`}
        role="dialog"
        aria-label="Terminal interaktif"
        hidden={!open}
      >
        <div className="terminal__bar">
          <span className="terminal__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="terminal__title">
            {terminal.user}@{terminal.host}: ~
          </span>
          <button type="button" className="terminal__close" onClick={close} aria-label="Tutup terminal">
            <CloseIcon size={16} />
          </button>
        </div>

        <div
          className="terminal__output"
          ref={outputRef}
          onClick={() => window.getSelection()?.isCollapsed && inputRef.current?.focus()}
        >
          <div role="log" aria-live="polite">
            {lines.map((l, i) => (
              <div key={i} className={`terminal__line terminal__line--${l.type || 'out'}`}>
                {l.text || '\u00a0'}
              </div>
            ))}
          </div>

          <label className="terminal__prompt">
            <span className="terminal__ps1" aria-hidden="true">
              {terminal.user}@{terminal.host}:~$
            </span>
            <span className="sr-only">Ketik perintah</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={busy}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              enterKeyHint="send"
            />
          </label>
        </div>
      </div>
    </>
  );
}
