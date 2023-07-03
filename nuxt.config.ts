// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API_BASE: process.env.NUXT_PUBLIC_API_BASE,
      NUXT_PUBLIC_API_ENV: process.env.NUXT_PUBLIC_API_ENV,
    },
  },
  nitro: {
    preset: "aws-lambda",
  },
  app: {
    cdnURL: process.env.NUXT_APP_CDN_URL,

    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
});
