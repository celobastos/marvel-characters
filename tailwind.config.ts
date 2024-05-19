import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'site-background': "url('/assets/backgroundSite.jpg')",
      },
      fontFamily: {
        marvel: ['MarvelFont', 'sans-serif'], // Define your custom font here
      },
    },
  },
  plugins: [],
};

export default config;
