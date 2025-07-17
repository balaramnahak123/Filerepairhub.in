import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "FilesHub - Free Mobile Device Firmware, Flash Files & Repair Tools",
    template: "%s | FilesHub",
  },
  description:
    "Download free firmware, flash files, and repair tools for mobile devices. Complete collection of Samsung, Xiaomi, Oppo, Vivo firmware files and flashing tools for mobile device repair.",
  keywords: [
    "mobile firmware",
    "flash files",
    "mobile repair tools",
    "samsung firmware",
    "xiaomi firmware",
    "oppo firmware",
    "vivo firmware",
    "flashing tools",
    "mobile device repair",
    "stock rom",
    "custom firmware",
    "usb drivers",
    "adb tools",
    "fastboot",
    "odin tool",
    "sp flash tool",
    "mobile phone repair",
    "firmware download",
    "free tools",
  ],
  authors: [{ name: "FilesHub Team" }],
  creator: "FilesHub",
  publisher: "FilesHub",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fileshub.com",
    title: "FilesHub - Free Mobile Device Firmware & Repair Tools",
    description:
      "Download free firmware, flash files, and repair tools for mobile devices. Complete collection for Samsung, Xiaomi, Oppo, Vivo and more.",
    siteName: "FilesHub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FilesHub - Mobile Device Firmware & Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FilesHub - Free Mobile Device Firmware & Repair Tools",
    description: "Download free firmware, flash files, and repair tools for mobile devices.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://fileshub.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://fileshub.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FilesHub",
              description: "Free mobile device firmware, flash files and repair tools",
              url: "https://fileshub.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://fileshub.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <AuthProvider>
            <div className="relative min-h-screen bg-background text-foreground">
              {children}
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
