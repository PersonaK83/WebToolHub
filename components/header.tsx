'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, User, LogOut, Settings, Shield } from 'lucide-react'
import { useAuth } from '@/lib/hooks/use-auth'
import { useProfile } from '@/lib/hooks/use-profile'
import { Button } from '@/components/ui/button'

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')
  const { user, loading: authLoading, signOut } = useAuth()
  const { profile } = useProfile(user?.id)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const handleLoginClick = () => {
    router.push('/auth/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-charcoal/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-charcoal hover:text-forest-green transition-colors">
              웹툴 모음
            </Link>
          </div>

          {/* Desktop Navigation & User Menu (Right Aligned) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-charcoal hover:text-forest-green transition-colors">
                {language === 'ko' ? '홈' : 'Home'}
              </Link>
              <Link href="#tools" className="text-charcoal hover:text-forest-green transition-colors">
                {language === 'ko' ? '도구' : 'Tools'}
              </Link>
              <Link href="/blog" className="text-charcoal hover:text-forest-green transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-charcoal hover:text-forest-green transition-colors">
                Contact
              </Link>
              <Link href="/support" className="text-charcoal hover:text-forest-green transition-colors">
                Support
              </Link>
            </nav>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="px-3 py-1.5 text-sm font-medium text-charcoal hover:text-forest-green border border-charcoal/20 rounded-lg hover:border-forest-green/50 transition-colors"
            >
              {language === 'ko' ? 'KO' : 'EN'}
            </button>

            {/* User Menu / Login Button */}
            {authLoading ? (
              <div className="px-4 py-2 text-charcoal/50">로딩 중...</div>
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-charcoal/5 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-charcoal">{profile?.username || profile?.full_name || user.email?.split('@')[0]}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-charcoal/10 shadow-lg py-2 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-charcoal hover:bg-charcoal/5 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      프로필 설정
                    </Link>
                    {profile?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-charcoal hover:bg-charcoal/5 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        관리자
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut()
                        setIsUserMenuOpen(false)
                      }}
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={handleLoginClick}>
                로그인
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-charcoal/10">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-charcoal hover:text-forest-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === 'ko' ? '홈' : 'Home'}
              </Link>
              <Link
                href="#tools"
                className="text-charcoal hover:text-forest-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === 'ko' ? '도구' : 'Tools'}
              </Link>
              <Link
                href="/blog"
                className="text-charcoal hover:text-forest-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-charcoal hover:text-forest-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/support"
                className="text-charcoal hover:text-forest-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              <button
                onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
                className="text-left px-4 py-2 rounded-lg font-medium text-charcoal border border-charcoal/20 hover:border-forest-green/50 transition-colors"
              >
                {language === 'ko' ? 'KO / EN' : 'EN / KO'}
              </button>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-charcoal hover:text-forest-green transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    프로필 설정
                  </Link>
                  {profile?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="text-charcoal hover:text-forest-green transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      관리자
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLoginClick()
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg font-medium bg-forest-green text-white hover:bg-forest-green/90 transition-colors"
                >
                  로그인
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
