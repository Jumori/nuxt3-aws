// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      API_ENV: process.env.API_ENV,
    },
  },
  nitro: {
    preset: "aws-lambda",
  },
  app: {
    cdnURL: process.env.APP_CDN_URL,

    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
});
