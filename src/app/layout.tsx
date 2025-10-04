import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Multi-Agent Fake-News Detection Platform",
  description: "AI-powered fake news detection with explainable results",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
