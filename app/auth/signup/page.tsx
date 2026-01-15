'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpInput } from '@/lib/validations/auth'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, User, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpInput) => {
    setLoading(true)
    setError(null)

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username || data.email.split('@')[0],
            full_name: data.fullName || '',
          },
        },
      })

      if (signUpError) throw signUpError

      if (authData.user) {
        // 프로필 업데이트 (username, full_name)
        if (data.username || data.fullName) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              username: data.username || data.email.split('@')[0],
              full_name: data.fullName || '',
            })
            .eq('id', authData.user.id)

          if (profileError) throw profileError
        }

        router.push('/auth/verify-email')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-charcoal/10 p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-charcoal mb-2">회원가입</h1>
          <p className="text-charcoal/70 mb-8">새 계정을 만들어 시작하세요</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

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
              <label htmlFor="username" className="block text-sm font-medium text-charcoal mb-2">
                사용자명 (선택사항)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  placeholder="사용자명"
                  className="pl-10"
                  {...register('username')}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-charcoal mb-2">
                이름 (선택사항)
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="이름"
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
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
                  placeholder="비밀번호 (최소 8자, 영문+숫자+특수문자)"
                  className="pl-10"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-2">
                비밀번호 확인
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="비밀번호 확인"
                  className="pl-10"
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="agreeToTerms"
                type="checkbox"
                className="mt-1 mr-2"
                {...register('agreeToTerms')}
              />
              <label htmlFor="agreeToTerms" className="text-sm text-charcoal/70">
                <Link href="/terms" className="text-forest-green hover:underline">
                  이용약관
                </Link>
                에 동의합니다
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '처리 중...' : '회원가입'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-charcoal/70">
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" className="text-forest-green hover:underline font-medium">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
