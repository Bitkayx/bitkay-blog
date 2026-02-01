// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://bitkay-blog.netlify.app",

  vite: {
    plugins: [
      tailwindcss({
        config: {
          darkMode: "class",
          content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
          theme: {
            extend: {},
          },
        },
      }),
    ],
  },

  integrations: [preact()],
});
