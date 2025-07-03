import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Paleta de cores usando nomes semânticos e claros
      colors: {
        'background': colors.slate[900],     // Fundo principal do app
        'foreground': colors.white,          // Texto principal sobre o fundo (branco)
        'border': colors.slate[700],         // Cor de borda padrão
        'input': colors.slate[800],          // Cor de fundo para inputs
        'ring': colors.blue[500],            // Cor para anéis de foco (focus rings)
        
        'card': {
          DEFAULT: colors.gray[800],       // Fundo para elementos como cards
          foreground: colors.white,          // Texto de MAIOR destaque dentro dos cards
          'muted-foreground': colors.gray[400], // Texto de MENOR destaque dentro dos cards
          'inner': {
            DEFAULT: colors.gray[100],     // Fundo para um card DENTRO de outro card
          }
        },

        'primary': {
          DEFAULT: colors.blue[500],       // Cor primária para ações (Ex: Editar)
          foreground: colors.white,          // Texto sobre a cor primária
        },
        'accent': {
          DEFAULT: colors.violet[500],     // Cor de destaque para ações (Ex: Novo)
          foreground: colors.white,          // Texto sobre a cor de destaque
        },
        'destructive': {
          DEFAULT: colors.red[500],        // Cor para ações destrutivas (Ex: Deletar)
          foreground: colors.white,          // Texto sobre a cor destrutiva
          'subtle': {
            DEFAULT: colors.red[100],      // Fundo para alertas de perigo
            foreground: colors.red[700],   // Texto para alertas de perigo
            border: colors.red[400],       // Borda para alertas de perigo
          }
        },
        'success': {
          DEFAULT: colors.green[300],      // Cor para textos/elementos de sucesso
          foreground: colors.green[900],   // Cor de texto para fundos de sucesso (se necessário)
        },
        'warning': {
          DEFAULT: colors.yellow[300],     // Cor para textos/elementos de aviso
          foreground: colors.yellow[900],  // Cor de texto para fundos de aviso (se necessário)
        },
      },
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
