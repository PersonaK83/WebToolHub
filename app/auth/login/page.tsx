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
import { Mail, Lock, Github } from 'lucide-react'

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

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setSocialLoading(provider)
    setError(null)

    try {
      const { error: socialError } = await supabase.auth.signInWithOAuth({
        provider,
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
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('github')}
              disabled={!!socialLoading}
            >
              <Github className="w-4 h-4 mr-2" />
              {socialLoading === 'github' ? '연결 중...' : 'GitHub로 로그인'}
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
