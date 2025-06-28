import "@/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import { TRPCReactProvider } from "@/trpc/react"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Daechul.AI - AI-Powered Business Mortgage Platform",
  description: "Transform your business mortgage experience with AI-powered underwriting. Get faster approvals, better rates, and complete transparency.",
  keywords: ["business mortgage", "AI underwriting", "loan application", "fintech"],
  authors: [{ name: "Daechul.AI Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  )
}