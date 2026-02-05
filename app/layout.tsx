import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nassia Chemlal - Développeuse Fullstack Junior",
  description: "Portfolio de Nassia Chemlal - Développeuse Fullstack Junior spécialisée en développement web, WordPress, React, Vue.js et Symfony",
  keywords: "développeuse web, fullstack, WordPress, React, Vue.js, Symfony, portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

