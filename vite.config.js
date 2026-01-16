import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Demo config (default)
export default defineConfig({
  plugins: [react()],
  base: '/react-hover-panel/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

// Library build config
export const libConfig = defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactHoverPanel',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'es' : 'js'}`,
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});

