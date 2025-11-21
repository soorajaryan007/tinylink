import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TinyLink",
  description: "Minimal URL shortener built with Next.js + Drizzle + Neon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
