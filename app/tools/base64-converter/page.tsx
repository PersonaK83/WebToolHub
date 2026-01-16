'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function Base64ConverterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
    } catch (err) {
      setOutput('인코딩 중 오류가 발생했습니다.')
    }
  }

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
    } catch (err) {
      setOutput('디코딩 중 오류가 발생했습니다. 유효한 Base64 문자열인지 확인하세요.')
    }
  }

  const swap = () => {
    const temp = input
    setInput(output)
    setOutput(temp)
  }

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">Base64 변환</h1>
          <p className="text-lg text-charcoal/70">
            텍스트를 Base64로 인코딩/디코딩합니다.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={encode} disabled={!input}>
                Base64 인코딩
              </Button>
              <Button onClick={decode} variant="outline" disabled={!input}>
                Base64 디코딩
              </Button>
              {(input || output) && (
                <Button onClick={swap} variant="outline" className="flex items-center">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  교체
                </Button>
              )}
            </div>

            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">입력</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="텍스트 또는 Base64 문자열 입력..."
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            {/* Output */}
            {output && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-charcoal">출력</label>
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
                  value={output}
                  readOnly
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
