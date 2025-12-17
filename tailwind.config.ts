import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2d5016',
          light: '#4a7c2a',
          dark: '#1a3009',
        },
        accent: {
          yellow: '#fbbf24',
          green: '#22c55e',
        },
      },
    },
  },
  plugins: [],
}
export default config

