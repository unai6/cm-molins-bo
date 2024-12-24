import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  server: {
    port: 8081,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/partials/_reset.scss";
          @use "@/assets/scss/partials/_base.scss";
          @use "@/assets/scss/partials/_tokens.scss";
          @use "@/assets/scss/partials/_mixins.scss";
          @use "@/assets/scss/partials/_functions";
          @use "@/assets/scss/partials/_helpers.scss";
          @use "@/assets/scss/partials/_transitions.scss";
          @use "@/assets/scss/partials/_animations.scss";
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  envPrefix: 'VUE_APP',
})
