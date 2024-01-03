import type { Metadata } from 'next'
import '../globals.css'
import { siteConfig } from '@/config/site'
import { SiteBlob } from '@/components/site-blob'
import { ThemeProvider } from "@/components/theme-provider"
import { StateContext } from '@/context/stateContext'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark
    }}
    >
      <html lang="en">
        <body className={`scroll-smooth`}>
            <StateContext>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <SiteBlob />
                <div>{children}</div>
              </ThemeProvider>
            </StateContext>
        </body>
      </html>
    </ClerkProvider>
  )
}
