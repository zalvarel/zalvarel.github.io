import { useEffect, useRef } from 'react';
import { CloseIcon } from './icons';

/**
 * Modal berbasis <dialog> native: fokus otomatis terkunci di dalam modal,
 * Escape menutup, dan fokus kembali ke tombol pemicu saat ditutup.
 */
export default function Modal({ open, onClose, labelledBy, className = '', children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      document.body.classList.add('no-scroll');
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open]);

  // Bersihkan kunci scroll setelah dialog tertutup (termasuk via Escape)
  const handleClose = () => {
    document.body.classList.remove('no-scroll');
    onClose();
  };

  // Klik di area backdrop (di luar konten) menutup modal
  const onClick = (e) => {
    if (e.target === ref.current) ref.current.close();
  };

  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={labelledBy}
      onClose={handleClose}
      onClick={onClick}
    >
      <div className="modal__body">
        <button
          type="button"
          className="icon-btn modal__close"
          aria-label="Tutup"
          onClick={() => ref.current.close()}
        >
          <CloseIcon size={20} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
