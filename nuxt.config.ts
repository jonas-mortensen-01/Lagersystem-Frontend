// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.scss'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss', 
  ]
})
