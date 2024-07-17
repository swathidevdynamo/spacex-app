// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages:true,
  plugins: [
    '~/plugins/axios.ts',   
    '~/plugins/pinia.ts'
  ],
  modules:[
    '@pinia/nuxt'
  ]
})
