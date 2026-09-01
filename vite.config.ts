import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssr: {
    // react-phone-number-input imports its own CSS from inside
    // FinalCTASection; left externalized, the Node import of the SSR
    // bundle crashes on the .css file. Bundling it lets Vite strip the
    // style import during the --ssr build.
    noExternal: ['react-phone-number-input'],
  },
});
