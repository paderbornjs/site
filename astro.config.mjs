import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import solidSvg from 'vite-plugin-solid-svg'

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs({ devtools: true })],
  output: 'static',
  vite: {
    plugins: [solidSvg()],
  },
})
