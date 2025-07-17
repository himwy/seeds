import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AnimationProvider from "./components/AnimationProvider";
import MainLayout from "./components/MainLayout";
import { LanguageProvider } from "./components/LanguageContext";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Seeds Financial Group | Risk and Asset Management",
  description:
    "Seeds Financial Group provides advisory services using a wide range of risk management, strategy and asset allocation plans, enabling our clients to achieve their financial goals and future needs.",
  keywords:
    "financial planning, risk management, asset allocation, insurance, Hong Kong, CFP, financial advisor",
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
    title: "Seeds Financial Group | Risk and Asset Management",
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
    title: "Seeds Financial Group | Risk and Asset Management",
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
    <html lang="en" className={poppins.variable}>
      <body className="antialiased" suppressHydrationWarning>
        <AnimationProvider>
          <LanguageProvider>
            <MainLayout>{children}</MainLayout>
          </LanguageProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
