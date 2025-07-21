import { md3 } from "vuetify/blueprints/md3";
import colors from "vuetify/util/colors";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Yellowdog Digital - Home",
      titleTemplate: "%s - Yellowdog Digital",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "A modern, open-source, and privacy-focused alternative to Google Analytics.",
        },
        { name: "theme-color", content: "#ffffff" },
        { name: "author", content: "Yellowdog Digital" },
        {
          name: "keywords",
          content:
            "analytics, open-source, privacy-focused, alternative, Google Analytics",
        },
        { name: "robots", content: "index, follow" },
        { name: "og:title", content: "Yellowdog Digital - Home" },
        {
          name: "og:description",
          content:
            "A modern, open-source, and privacy-focused alternative to Google Analytics.",
        },
        { name: "og:image", content: "/hero.png" },
        { name: "og:url", content: "https://yellowdog.digital" },
        { name: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Yellowdog Digital - Home" },
        {
          name: "twitter:description",
          content:
            "A modern, open-source, and privacy-focused alternative to Google Analytics.",
        },
        { name: "twitter:image", content: "/hero.png" },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    baseURL: "/",
  },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "vuetify-nuxt-module",
  ],
  experimental: {
    typedPages: true,
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
      blueprint: md3,
      theme: {
        cspNonce: "1337-yd",
        defaultTheme: "light",
        themes: {
          light: {
            dark: false,
            colors: {
              primary: colors.deepPurple.accent1, // Orange
              secondary: colors.yellow.lighten3, // Deep Orange
              accent: colors.amber.base, // Amber
              // error: colors.red.base, // Red
              // info: colors.blue.base, // Blue
              // success: colors.green.base, // Green
              // warning: colors.red.accent1, // Yellow
              // background: colors., // White
              // surface: colors.surface, // Light Grey
              // onPrimary: colors.onPrimary, // White text on primary
              // onSecondary: colors.onSecondary, // White text on secondary
              // onAccent: colors.onAccent, // White text on accent
              // onError: colors.onError, // White text on error
              // onInfo: colors.onInfo, // White text on info
              // onSuccess: colors.onSuccess, // White text on success
              // onWarning: colors.onWarning, // Black text on warning
              // onBackground: colors.onBackground, // Black text on background
              // onSurface: colors.onSurface, // Black text on surface
              // onDark: colors.onDark, // White text on dark
            },
          },
          dark: {
            colors: {
              primary: colors.deepPurple.accent1, // Orange
              secondary: colors.yellow.lighten3, // Deep Orange
              accent: colors.amber.base, // Amber
            },
          },
        },
      },
    },
  },
  content: {
    experimental: {},
    build: {
      markdown: {},
    },
    preview: {
      dev: true,

      api: "https://api.nuxt.studio",

      gitInfo: {
        name: "project-yd",
        owner: "patgpt",
        url: "https://github.com/patgpt/project-yd",
      },
    },
  },
});
