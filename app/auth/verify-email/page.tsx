'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-charcoal/10 p-8 shadow-lg text-center">
          <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-forest-green" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-4">이메일 인증</h1>
          <p className="text-charcoal/70 mb-6">
            회원가입이 완료되었습니다.
            <br />
            이메일 인증이 필요한 경우 이메일을 확인해주세요.
          </p>
          <Link href="/auth/login">
            <Button>로그인하러 가기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
