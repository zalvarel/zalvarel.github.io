import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Font di-self-host (hanya subset latin) → tidak ada request render-blocking ke Google Fonts
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-500.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import '@fontsource/plus-jakarta-sans/latin-800.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import './styles/base.css';
import './styles/sections.css';
import './styles/features.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
