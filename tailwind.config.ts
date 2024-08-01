import flowbitePlugin from 'flowbite/plugin';

import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
      },
    },
  },

  plugins: [flowbitePlugin],
} as Config;
