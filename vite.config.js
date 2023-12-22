import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from "path"
import sveltePreprocess from "svelte-preprocess"

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    root: resolve(root, ".."),
  },
  plugins: [svelte({
    preprocess: sveltePreprocess({
      scss: {
        prepenData: `@import 'src/styles/_material.scss'`
      }
    })
  })],
  resolve: {
    alias: {
      $lib: resolve("src/lib")
    }
  }
})
