import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

function inlineCSS() {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(opts, bundle) {
      const cssAssets = [];
      // Find all CSS assets
      for (const [fileName, info] of Object.entries(bundle)) {
        if (fileName.endsWith('.css')) {
          cssAssets.push(fileName);
          // Read the CSS content
          const cssContent = info.source;
          // Inject CSS into each JS entry point
          for (const [jsFileName, jsInfo] of Object.entries(bundle)) {
            if ((jsFileName.endsWith('.js') || jsFileName.endsWith('.mjs') || jsFileName.endsWith('.cjs')) && jsInfo.type === 'chunk') {
              // Create injection code
              const injectCode = `
try {
  if (typeof document !== 'undefined') {
    var style = document.createElement('style');
    style.textContent = ${JSON.stringify(cssContent)};
    document.head.appendChild(style);
  }
} catch (e) {
  console.error('Failed to inject CSS:', e);
}
`;
              jsInfo.code = injectCode + jsInfo.code;
            }
          }
          // Remove the separate CSS file
          delete bundle[fileName];
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), inlineCSS()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactHoverPanel',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'es.js' : 'js'}`,
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
