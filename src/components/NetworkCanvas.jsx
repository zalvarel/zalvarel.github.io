import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useMedia';

/* Konfigurasi topologi */
const LINK_DIST = 140; // jarak maksimum dua node terhubung (px)
const MOUSE_DIST = 180; // radius pengaruh kursor (px)
const SPEED = 0.25;

/**
 * Background "network topology": node bergerak pelan, terhubung garis kalau
 * berdekatan, dan tertarik serta menyala saat dekat kursor.
 * Hemat daya: berhenti saat hero tidak terlihat / tab disembunyikan.
 */
export default function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    const mouse = { x: -9999, y: -9999, active: false };
    let nodes = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Jumlah node menyesuaikan luas layar; lebih sedikit di mobile
      const isMobile = w < 768;
      const count = Math.round(Math.min((w * h) / (isMobile ? 16000 : 11000), isMobile ? 32 : 90));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        r: Math.random() * 1.6 + 1,
        glow: 0,
      }));
      if (reduced) draw(); // gambar statis sekali
    };

    const step = () => {
      for (const n of nodes) {
        // Tarikan lembut ke arah kursor
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_DIST && d > 1) {
            n.vx += (dx / d) * 0.02;
            n.vy += (dy / d) * 0.02;
            n.glow = Math.min(1, n.glow + 0.08);
          }
        }
        n.glow = Math.max(0, n.glow - 0.02);

        // Batasi kecepatan agar tetap tenang
        const sp = Math.hypot(n.vx, n.vy);
        const max = SPEED * 3;
        if (sp > max) {
          n.vx = (n.vx / sp) * max;
          n.vy = (n.vy / sp) * max;
        } else if (sp < SPEED * 0.4) {
          n.vx *= 1.05;
          n.vy *= 1.05;
        }

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Garis antar node
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const t = 1 - Math.sqrt(d2) / LINK_DIST;
          const g = Math.max(a.glow, b.glow);
          ctx.strokeStyle = `rgba(${g > 0.05 ? '196,160,255' : '139,92,246'},${t * (0.22 + g * 0.5)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Garis dari kursor ke node terdekat
      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
          if (d < MOUSE_DIST) {
            ctx.strokeStyle = `rgba(196,160,255,${(1 - d / MOUSE_DIST) * 0.45})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // Node
      for (const n of nodes) {
        if (n.glow > 0.05) {
          ctx.fillStyle = `rgba(167,121,255,${n.glow * 0.25})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 6 * n.glow, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${n.glow > 0.05 ? '230,215,255' : '167,139,250'},${0.55 + n.glow * 0.45})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.glow, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduced || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onPointerLeave = () => (mouse.active = false);
    const onVisibility = () => (document.hidden ? stop() : start());

    // Hanya animasi saat hero terlihat
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Tunda animasi sampai browser idle agar tidak memperlambat load awal
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 600));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    const idleId = idle(() => io.observe(canvas), { timeout: 1500 });

    if (!reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave);
      document.addEventListener('visibilitychange', onVisibility);
    }

    return () => {
      cancelIdle(idleId);
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />;
}
