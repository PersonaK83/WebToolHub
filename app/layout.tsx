import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: '웹툴 모음 - 무료 웹 도구 모음',
  description: '누구나 무료로 사용하는 간편한 웹 도구 모음',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-cream text-charcoal">
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
