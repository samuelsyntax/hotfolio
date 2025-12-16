import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Starfield from "@/components/Starfield";

export const metadata: Metadata = {
  title: "Alex Chen | Software Developer",
  description: "Software Developer Portfolio - Building innovative digital solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <ThemeProvider>
          <Starfield />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
