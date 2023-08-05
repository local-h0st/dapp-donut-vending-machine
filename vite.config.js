import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
    optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeModulesPolyfills(),
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
      define: {
        global: 'globalThis',
      },
    },
  },
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
