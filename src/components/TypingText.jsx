import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useMedia';

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1600;

/** Efek mengetik yang berganti-ganti antar kata. */
export default function TypingText({ words }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = words[index % words.length];
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && text === word) delay = HOLD_MS;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, reduced]);

  // Reduced motion: tampilkan kata pertama tanpa animasi
  if (reduced) return <span>{words[0]}</span>;

  return (
    <>
      {/* Pembaca layar membaca daftar lengkap, bukan huruf per huruf */}
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true" className="typing">
        {text}
        <span className="typing__caret" />
      </span>
    </>
  );
}
