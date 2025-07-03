import type { Metadata } from "next";
// 1. A importação da fonte foi alterada para Figtree
import { Figtree } from "next/font/google";
import "./globals.css";

// 2. A fonte Geist_Mono foi removida e a Figtree foi configurada
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree", // Cria a variável CSS para o Tailwind usar
});

export const metadata: Metadata = {
  title: "Track4You - Afiliados", // Título atualizado para o seu projeto
  description: "Painel de Afiliados da Track4You",
  icons: {
    // A propriedade 'icon' pode receber um array para cenários mais complexos.
    icon: [
      // Ícone para o modo claro (light mode)
      { 
        media: '(prefers-color-scheme: light)', 
        url: '/track4you/favicon-black.svg', // Caminho para o seu ícone claro
      },
      // Ícone para o modo escuro (dark mode)
      { 
        media: '(prefers-color-scheme: dark)', 
        url: '/track4you/favicon-white.svg', // Caminho para o seu ícone escuro
      },
    ],
    // É uma boa prática manter o apple-touch-icon para dispositivos iOS.
    apple: '/track4you/favicon-white.png',
    // E um favicon.ico como fallback para navegadores mais antigos.
    shortcut: '/track4you/favicon-white.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* 3. A className do body agora usa a variável da Figtree 
           e a classe 'font-sans' para aplicar a fonte como padrão.
      */}
      <body className={`${figtree.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
