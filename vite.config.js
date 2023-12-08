import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from "path"
import sveltePreprocess from "svelte-preprocess"

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [svelte({
    preprocess: sveltePreprocess({
      scss: {
        prepenData: `@import 'src/styles/_material.scss'`
      }
    })
  })],
  root,
  appType: "mpa",
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, "layouts/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      $lib: resolve("src/lib")
    }
  }
})
