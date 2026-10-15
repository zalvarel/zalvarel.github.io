import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckIcon } from './icons';

const ToastContext = createContext(() => {});

/** Toast notifikasi global. Pakai: const toast = useToast(); toast('Disalin!') */
export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const timer = useRef(0);

  const show = useCallback((text) => {
    clearTimeout(timer.current);
    setMsg({ text, key: Date.now() });
    timer.current = setTimeout(() => setMsg(null), 2200);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {/* role="status" → pembaca layar mengumumkan isi toast */}
      <div className="toast-region" role="status" aria-live="polite">
        {msg && (
          <div key={msg.key} className="toast">
            <CheckIcon size={16} />
            {msg.text}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

/** Salin teks ke clipboard, dengan fallback untuk browser lama / non-HTTPS. */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}
