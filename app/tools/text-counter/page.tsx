'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

export default function TextCounterPage() {
  const [text, setText] = useState('')

  const countWithSpaces = text.length
  const countWithoutSpaces = text.replace(/\s/g, '').length
  const byteCount = new Blob([text]).size
  const lineCount = text.split('\n').length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">글자수 세기</h1>
          <p className="text-lg text-charcoal/70">
            자소서, 블로그 포스팅을 위한 공백 포함/제외 글자수 확인.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {/* Text Input */}
            <div>
              <label htmlFor="text-input" className="block text-sm font-medium text-charcoal mb-2">
                텍스트 입력
              </label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="글자수를 확인할 텍스트를 입력하세요..."
                rows={12}
                className="font-mono"
              />
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                <div className="text-sm text-charcoal/60 mb-1">공백 포함</div>
                <div className="text-2xl font-bold text-charcoal">{countWithSpaces.toLocaleString()}</div>
                <div className="text-xs text-charcoal/50 mt-1">자</div>
              </div>

              <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                <div className="text-sm text-charcoal/60 mb-1">공백 제외</div>
                <div className="text-2xl font-bold text-charcoal">{countWithoutSpaces.toLocaleString()}</div>
                <div className="text-xs text-charcoal/50 mt-1">자</div>
              </div>

              <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                <div className="text-sm text-charcoal/60 mb-1">바이트</div>
                <div className="text-2xl font-bold text-charcoal">{byteCount.toLocaleString()}</div>
                <div className="text-xs text-charcoal/50 mt-1">byte</div>
              </div>

              <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                <div className="text-sm text-charcoal/60 mb-1">단어 수</div>
                <div className="text-2xl font-bold text-charcoal">{wordCount.toLocaleString()}</div>
                <div className="text-xs text-charcoal/50 mt-1">개</div>
              </div>

              <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                <div className="text-sm text-charcoal/60 mb-1">줄 수</div>
                <div className="text-2xl font-bold text-charcoal">{lineCount.toLocaleString()}</div>
                <div className="text-xs text-charcoal/50 mt-1">줄</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
