'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 실제 구현 시 백엔드 API로 전송
    // 여기서는 시뮬레이션
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-charcoal/70 hover:text-charcoal mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>

          <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-12 text-center">
            <div className="w-20 h-20 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-forest-green" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">문의가 접수되었습니다</h2>
            <p className="text-charcoal/70 mb-6">
              문의해주신 내용을 검토하여 빠른 시일 내에 답변드리겠습니다.
            </p>
            <Button onClick={() => setSubmitted(false)}>새 문의 작성</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center text-charcoal/70 hover:text-charcoal mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          홈으로 돌아가기
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">문의하기</h1>
          <p className="text-lg text-charcoal/70">
            문의사항이나 제안사항을 남겨주세요. 빠르게 답변드리겠습니다.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <Input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="문의 제목을 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                메시지 <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="문의 내용을 상세히 작성해주세요"
                rows={8}
              />
            </div>

            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading ? (
                '전송 중...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  전송하기
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-8 p-6 bg-charcoal/5 rounded-lg">
          <h2 className="text-xl font-semibold text-charcoal mb-4">기타 연락처</h2>
          <div className="space-y-2 text-charcoal/70">
            <p>이메일: support@webtools.example.com</p>
            <p>응답 시간: 평일 09:00 - 18:00 (KST)</p>
            <p className="text-sm text-charcoal/60 mt-4">
              * 긴급한 기술적 문제의 경우 Support 페이지의 FAQ를 먼저 확인해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
