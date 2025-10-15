import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimationProvider from "./components/AnimationProvider";
import MainLayout from "./components/MainLayout";
import { LanguageProvider } from "./components/LanguageContext";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Seeds Financial Group | Wealth and Asset Management",
  description:
    "Seeds Financial Group provides advisory services using a wide range of wealth management, strategy and asset allocation plans, enabling our clients to achieve their financial goals and future needs.",
  keywords:
    "financial planning, wealth management, asset allocation, insurance, Hong Kong, CFP, financial advisor",
  authors: [{ name: "Seeds Financial Group" }],
  creator: "Seeds Financial Group",
  publisher: "Seeds Financial Group",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/assets/Seeds_Icon_Trans.png",
    apple: "/assets/Seeds_Icon_Trans.png",
  },
  openGraph: {
    title: "Seeds Financial Group | Wealth and Asset Management",
    description: "Professional financial advisory services in Hong Kong",
    url: "https://seedsfinancial.com",
    siteName: "Seeds Financial Group",
    images: [
      {
        url: "/assets/Seeds_Icon_Trans.png",
        width: 1200,
        height: 630,
        alt: "Seeds Financial Group Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seeds Financial Group | Wealth and Asset Management",
    description: "Professional financial advisory services in Hong Kong",
    images: ["/assets/Seeds_Icon_Trans.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1e40af",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased" suppressHydrationWarning>
        <AnimationProvider>
          <LanguageProvider>
            <MainLayout>{children}</MainLayout>
          </LanguageProvider>
        </AnimationProvider>
        <Analytics />
      </body>
    </html>
  );
}
