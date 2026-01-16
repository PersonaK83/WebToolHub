'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react'
import { Input } from '@/components/ui/input'

const faqs = [
  {
    id: 1,
    question: '웹툴 모음은 무료인가요?',
    answer: '네, 모든 도구는 완전히 무료로 사용할 수 있습니다. 회원가입 없이도 사용 가능하며, 추가 비용이 발생하지 않습니다.',
  },
  {
    id: 2,
    question: '회원가입이 필수인가요?',
    answer: '대부분의 도구는 회원가입 없이 사용할 수 있습니다. 다만, 작업 내역을 저장하거나 고급 기능을 사용하려면 회원가입이 필요할 수 있습니다.',
  },
  {
    id:3,
    question: '이미지나 파일은 서버에 저장되나요?',
    answer: '아니요. 모든 파일 처리 작업은 클라이언트 측(브라우저)에서 이루어지며, 서버로 전송되지 않습니다. 완벽한 개인정보 보호가 보장됩니다.',
  },
  {
    id: 4,
    question: '어떤 브라우저를 지원하나요?',
    answer: 'Chrome, Firefox, Safari, Edge 등 최신 브라우저를 모두 지원합니다. 모바일 브라우저에서도 사용 가능합니다.',
  },
  {
    id: 5,
    question: '오류가 발생했을 때는 어떻게 하나요?',
    answer: 'Contact 페이지를 통해 문의해주시거나, 이메일로 연락 주시면 신속히 처리하겠습니다. 오류 메시지와 함께 스크린샷을 보내주시면 더 빠른 해결이 가능합니다.',
  },
  {
    id: 6,
    question: '신규 도구 추가 요청은 어떻게 하나요?',
    answer: 'Contact 페이지의 제안 사항에 신규 도구 아이디어를 적어주시면 검토 후 추가할 수 있습니다. 많은 요청을 받은 도구는 우선적으로 개발됩니다.',
  },
  {
    id: 7,
    question: '사용량 제한이 있나요?',
    answer: '일반 사용자에게는 사용량 제한이 없습니다. 다만, 과도한 트래픽을 유발하는 자동화 스크립트 사용은 제한될 수 있습니다.',
  },
  {
    id: 8,
    question: 'API를 제공하나요?',
    answer: '현재는 API를 제공하지 않지만, 향후 엔터프라이즈 사용자를 위한 API 서비스를 계획하고 있습니다.',
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">고객 지원</h1>
          <p className="text-lg text-charcoal/70">
            자주 묻는 질문을 확인하거나 문의사항을 남겨주세요.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
            <Input
              type="text"
              placeholder="질문 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-6">
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-charcoal/10 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-charcoal/5 transition-colors"
                  >
                    <span className="font-semibold text-charcoal pr-4">{faq.question}</span>
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-charcoal/60 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-charcoal/60 flex-shrink-0" />
                    )}
                  </button>
                  {openItems.includes(faq.id) && (
                    <div className="px-4 pb-4 text-charcoal/70">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-charcoal/50">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-6 bg-forest-green/5 rounded-lg border border-forest-green/20">
          <h2 className="text-xl font-semibold text-charcoal mb-2">추가 도움이 필요하신가요?</h2>
          <p className="text-charcoal/70 mb-4">
            위에서 찾지 못한 질문이 있거나 기술적 문제가 발생했다면, Contact 페이지를 통해 문의해주세요.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center text-forest-green hover:underline font-medium"
          >
            문의하기 →
          </Link>
        </div>
      </div>
    </div>
  )
}
