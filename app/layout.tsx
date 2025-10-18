import type { Metadata } from "next";
import { Orbit } from "next/font/google";
import "./globals.css";

const orbit = Orbit({
  variable: "--font-orbit",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Meetly",
  description: "Meet new people and Share real moments",
  icons: {
    icon: "/mocha-favicon-ico.webp",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
