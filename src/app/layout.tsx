import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfairSC = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-sans",
  weight: ["100", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BELLOA - Salão de Beleza Premium | Enhance Your Natural Beauty",
  description: "Salão de beleza premium. Servicios de cabelo, maquiagem, tratamentos faciais e manicure. Agende sua experiência de beleza única.",
  keywords: ["salão de beleza", "beleza premium", "cabelo", "maquiagem", "tratamento facial", "manicure", "coloração"],
  authors: [{ name: "BELLOA" }],
  openGraph: {
    title: "BELLOA - Salão de Beleza Premium",
    description: "Enhance Your Natural Beauty - Agende sua experiência",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn(playfairSC.variable, poppins.variable, "font-sans")}>
      <body className="min-h-screen antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
