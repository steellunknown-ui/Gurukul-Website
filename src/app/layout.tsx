import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import { COLLEGE_CONFIG } from "@/config/college-config";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COLLEGE_CONFIG.name} | Classes XI & XII (Science, Commerce, Arts)`,
  description: `${COLLEGE_CONFIG.name} — A premier higher secondary institution dedicated to academic rigor in Science (PCM/PCB/Bifocal), Commerce (Accounts & Maths), and Arts under Maharashtra State Board.`,
  keywords: [
    "Gurukul Junior College",
    "Junior College admissions XI",
    "FYJC Science Commerce Arts",
    "Maharashtra State Board Junior College",
    "Higher secondary college",
    "Bifocal Computer Science XI XII",
  ],
  authors: [{ name: COLLEGE_CONFIG.name }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gurukuljuniorcollege.edu.in",
    siteName: COLLEGE_CONFIG.name,
    title: `${COLLEGE_CONFIG.name} | Excellence in Higher Secondary Education`,
    description: COLLEGE_CONFIG.tagline,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6B1124",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} ${cinzel.variable} scroll-smooth overflow-x-hidden max-w-full`}
    >
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FCFAF7] text-[#1F1A1B] antialiased selection:bg-[#9E1B32] selection:text-white overflow-x-hidden w-full max-w-full">
        {children}
      </body>
    </html>
  );
}
