import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // A fonte principal (sans-serif) continua sendo Figtree
        sans: ['var(--font-figtree)', ...defaultTheme.fontFamily.sans],
        
        // A fonte monoespaçada agora é Courier New, com os padrões do sistema como fallback
        mono: ['"Courier New"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
export default config
