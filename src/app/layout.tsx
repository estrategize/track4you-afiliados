import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"] });

// Replace the existing metadata object with this one
export const metadata: Metadata = {
  title: {
    default: "Track4You Afiliados",
    template: "%s | Track4You Afiliados",
  },
  description: "Plataforma de afiliados da Track4you - Trackeamento de Telegram",
  icons: {
    // Set different favicons for light and dark themes
    icon: [
      { 
        url: 'track4you/favicon-black.svg', 
        media: '(prefers-color-scheme: light)', 
        type: 'image/svg+xml', 
        sizes: 'any' 
      },
      { 
        url: 'track4you/favicon-white.svg', 
        media: '(prefers-color-scheme: dark)', 
        type: 'image/svg+xml', 
        sizes: 'any' 
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
