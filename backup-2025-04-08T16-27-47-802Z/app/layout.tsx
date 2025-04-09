import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AttractionPlan™ Dashboard',
  description: 'Enterprise Dashboard System for Attraction Operators',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
