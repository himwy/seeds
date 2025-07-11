import type { Metadata } from "next";
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
  icons: {
    icon: "/assets/Seeds_Icon_Trans.png",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AnimationProvider>
          <LanguageProvider>
            <MainLayout>{children}</MainLayout>
          </LanguageProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
