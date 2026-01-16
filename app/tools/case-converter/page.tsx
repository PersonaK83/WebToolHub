'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function CaseConverterPage() {
  const [text, setText] = useState('')
  const [convertedText, setConvertedText] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToUpperCase = () => {
    setConvertedText(text.toUpperCase())
  }

  const convertToLowerCase = () => {
    setConvertedText(text.toLowerCase())
  }

  const convertToTitleCase = () => {
    setConvertedText(
      text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    )
  }

  const convertToSentenceCase = () => {
    setConvertedText(
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    )
  }

  const toggleCase = () => {
    setConvertedText(
      text
        .split('')
        .map((char) => {
          if (char === char.toUpperCase()) {
            return char.toLowerCase()
          } else {
            return char.toUpperCase()
          }
        })
        .join('')
    )
  }

  const handleCopy = async () => {
    if (convertedText) {
      await navigator.clipboard.writeText(convertedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">대소문자 변환</h1>
          <p className="text-lg text-charcoal/70">
            영어 문장의 대소문자 형식을 자유자재로 변환하세요.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {/* Input */}
            <div>
              <label htmlFor="input-text" className="block text-sm font-medium text-charcoal mb-2">
                입력 텍스트
              </label>
              <Textarea
                id="input-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="변환할 텍스트를 입력하세요..."
                rows={6}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={convertToUpperCase} variant="outline">대문자 (UPPERCASE)</Button>
              <Button onClick={convertToLowerCase} variant="outline">소문자 (lowercase)</Button>
              <Button onClick={convertToTitleCase} variant="outline">제목 케이스 (Title Case)</Button>
              <Button onClick={convertToSentenceCase} variant="outline">문장 케이스 (Sentence case)</Button>
              <Button onClick={toggleCase} variant="outline">반대로 (tOGGLE cASE)</Button>
            </div>

            {/* Output */}
            {convertedText && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-charcoal">변환된 텍스트</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="flex items-center"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        복사됨
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        복사
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={convertedText}
                  readOnly
                  rows={6}
                  className="font-mono"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
