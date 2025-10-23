// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.scss'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss', 
  ],
  runtimeConfig: {
    // Private variables: only available server-side
    apiBaseurl: process.env.API_BASEURL || '',
    xApiKey: process.env.X_API_KEY || '',
}
})
