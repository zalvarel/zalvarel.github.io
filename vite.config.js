import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Repo `zalvarel.github.io` = GitHub Pages user site → di-serve dari root "/".
// Kalau nanti dipindah ke repo lain (mis. /portfolio/), ganti base menjadi '/portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
