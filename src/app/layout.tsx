import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siri Personality Profile",
  description: "MBTI-based personality assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="dark">
      <body
        className={`${inter.variable} antialiased font-sans bg-black min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
