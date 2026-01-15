'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function FindEmailPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setLoading(true)
    setError(null)

    try {
      // 이메일로 사용자 찾기
      const { data: profiles, error: findError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', data.email)
        .single()

      if (findError || !profiles) {
        throw new Error('해당 이메일로 가입된 계정을 찾을 수 없습니다.')
      }

      setEmail(profiles.email)
    } catch (err) {
      setError(err instanceof Error ? err.message : '아이디 찾기에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (email) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-charcoal/10 p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-forest-green" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal mb-4">아이디 찾기 완료</h1>
            <p className="text-charcoal/70 mb-2">가입하신 이메일 주소는</p>
            <p className="text-lg font-semibold text-forest-green mb-6">{email}</p>
            <p className="text-charcoal/70 mb-6">입니다.</p>
            <div className="space-y-2">
              <Link href="/auth/login">
                <Button className="w-full">로그인</Button>
              </Link>
              <Link href="/auth/forgot-password">
                <Button variant="outline" className="w-full">비밀번호 찾기</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-charcoal/10 p-8 shadow-lg">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm text-charcoal/70 hover:text-charcoal mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            로그인으로 돌아가기
          </Link>

          <h1 className="text-3xl font-bold text-charcoal mb-2">아이디 찾기</h1>
          <p className="text-charcoal/70 mb-8">
            가입하신 이메일 주소를 입력하세요.
          </p>

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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '찾는 중...' : '아이디 찾기'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
