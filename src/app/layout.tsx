import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import SmoothScrollProvider from "@/components/providers/SmoothScroll"
import CustomCursor from "@/components/ui/CustomCursor"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  // Update this URL when you deploy to your custom domain
  metadataBase: new URL("https://pnpsites.vercel.app"),
  title: "PnP Sites | Full Stack Web Developers",
  description:
    "Premium websites and full stack applications built with Next.js, TypeScript, and modern web technology. Parth Sites — Websites That Work.",
  keywords: [
    "web developer",
    "full stack developer",
    "next.js developer",
    "react developer",
    "parth sites",
    "website development",
  ],
  openGraph: {
    title: "PnP Sites | Full Stack Web Developers",
    description:
      "Premium websites and full stack applications built with Next.js, TypeScript, and modern web technology. Parth Sites — Websites That Work.",
    type: "website",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          {children}
          <CustomCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
