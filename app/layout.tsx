import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'PixelPie | Beautiful Websites & Creative Tools',
  description: 'Logic meets aesthetics. Custom web apps and creative tools meticulously engineered to multiply your time. Stop thinking. Start building.',
  keywords: ['Custom Web Apps', 'B2B Automation', 'Creative Tools', 'Web Design', 'Next.js Agency'],
  openGraph: {
    title: 'PixelPie | Custom Web Apps & Creative Tools',
    description: 'We code bespoke solutions that do the heavy lifting for you.',
    url: 'https://www.pixelpiestudio.com',
    siteName: 'PixelPieStudio',
    images: [
      {
        url: 'https://res.cloudinary.com/dpx6w78bt/image/upload/v1781789913/studio_ux8qqe.png', 
        width: 1200,
        height: 630,
        alt: 'PixelPie Studio Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pixelpiestudio.com', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} min-h-screen bg-white text-[#171717] overflow-x-hidden`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
