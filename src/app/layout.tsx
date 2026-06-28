import type { Metadata } from "next";
import { Inter, Geist_Mono, Engagement } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const engagement = Engagement({
  variable: "--font-engagement",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moriarty — Présentation PSE",
  description:
    "Présentation du projet de création d'entreprise Moriarty pour commission PSE.",
  openGraph: {
    title: "Moriarty — Présentation PSE",
    description: "Studio web · Sites modernes, utiles et accessibles",
    url: "https://www.moriarty-design.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${geistMono.variable} ${engagement.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
