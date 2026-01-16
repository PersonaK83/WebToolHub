'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInInput } from '@/lib/validations/auth'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInInput) => {
    setLoading(true)
    setError(null)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (signInError) throw signInError

      // 사용자 프로필 확인 (정지 여부 체크)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_active, suspended_until, suspend_reason')
          .eq('id', user.id)
          .single()

        if (profile) {
          if (!profile.is_active) {
            throw new Error('계정이 비활성화되었습니다.')
          }

          if (profile.suspended_until && new Date(profile.suspended_until) > new Date()) {
            throw new Error(
              `계정이 정지되었습니다. 사유: ${profile.suspend_reason || '없음'}`
            )
          }
        }
      }

      router.push(redirect)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'naver') => {
    setSocialLoading(provider)
    setError(null)

    try {
      // Supabase는 기본적으로 kakao와 naver를 지원하지 않습니다.
      // 커스텀 OAuth provider 설정이 필요합니다.
      if (provider === 'kakao' || provider === 'naver') {
        setError(`${provider === 'kakao' ? 'Kakao' : 'Naver'} 로그인은 현재 준비 중입니다. Google 로그인을 이용해주세요.`)
        setSocialLoading(null)
        return
      }

      const { error: socialError } = await supabase.auth.signInWithOAuth({
        provider: provider as 'google', // Google만 실제로 작동
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (socialError) throw socialError
    } catch (err) {
      setError(err instanceof Error ? err.message : '소셜 로그인에 실패했습니다.')
      setSocialLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-charcoal/10 p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-charcoal mb-2">로그인</h1>
          <p className="text-charcoal/70 mb-8">계정에 로그인하세요</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* 소셜 로그인 */}
          <div className="mb-6 space-y-2">
            {/* Google */}
            <Button
              variant="outline"
              className="w-full bg-white border border-charcoal/20 text-charcoal hover:bg-charcoal/5"
              onClick={() => handleSocialLogin('google')}
              disabled={!!socialLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {socialLoading === 'google' ? '연결 중...' : 'Google로 로그인'}
            </Button>

            {/* Naver */}
            <Button
              className="w-full bg-[#03C75A] text-white hover:bg-[#03C75A]/90 border-0"
              onClick={() => handleSocialLogin('naver')}
              disabled={!!socialLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16.273 12.845L7.376 0H0v24h7.726v-12.845l8.896 12.845h7.375V0h-7.726z"
                  fill="white"
                />
              </svg>
              {socialLoading === 'naver' ? '연결 중...' : 'Naver로 로그인'}
            </Button>

            {/* Kakao */}
            <Button
              className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/90 border-0"
              onClick={() => handleSocialLogin('kakao')}
              disabled={!!socialLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3C5.373 3 0 6.627 0 11.1c0 2.94 2.33 5.534 5.92 6.94-.265 1.002-1.026 3.614-1.06 3.774-.06.27.1.375.253.253.136-.108 4.286-3.036 4.986-3.565.313.045.632.068.902.068 6.628 0 12-3.627 12-8.1C24 6.627 18.627 3 12 3z"
                  fill="#000000"
                />
              </svg>
              {socialLoading === 'kakao' ? '연결 중...' : 'Kakao로 로그인'}
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-charcoal/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-charcoal/70">또는</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  className="pl-10"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="mr-2"
                  {...register('rememberMe')}
                />
                <label htmlFor="rememberMe" className="text-sm text-charcoal/70">
                  로그인 상태 유지
                </label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-forest-green hover:underline"
              >
                비밀번호 찾기
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="text-center text-sm text-charcoal/70">
              계정이 없으신가요?{' '}
              <Link href="/auth/signup" className="text-forest-green hover:underline font-medium">
                회원가입
              </Link>
            </div>
            <div className="text-center text-sm text-charcoal/70">
              <Link href="/auth/find-email" className="text-forest-green hover:underline">
                아이디 찾기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
