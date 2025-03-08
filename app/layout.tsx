import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavigationMenu } from "@/components/navigation-menu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "POSITION | Architecture Studio",
  description: "An architectural practice that explores ideas across disciplines and scales",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationMenu />
        {children}
      </body>
    </html>
  )
}



import './globals.css'