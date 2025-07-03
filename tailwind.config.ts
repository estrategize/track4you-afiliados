import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
// We re-introduce the colors import here
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // This `colors` object makes all of Tailwind's default color
      // palettes (e.g., slate, gray, red, blue) available as
      // utility classes throughout your project.
      colors: {
        ...colors,
      },
      fontFamily: {      
        sans: ['var(--font-figtree)', ...defaultTheme.fontFamily.sans],
        mono: ['"Courier New"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
export default config
