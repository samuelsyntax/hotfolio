import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Starfield from "@/components/Starfield";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Sunday Samuel | Software Developer",
  description: "Software Developer Portfolio - Building innovative digital solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: 'Helvetica, Arial, sans-serif' }} suppressHydrationWarning>
        <ThemeProvider>
          <LoadingScreen />
          <Starfield />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
