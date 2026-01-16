'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function JSONFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const formatJSON = () => {
    setError(null)
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
    } catch (err) {
      setError('유효하지 않은 JSON 형식입니다.')
      setOutput('')
    }
  }

  const minifyJSON = () => {
    setError(null)
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err) {
      setError('유효하지 않은 JSON 형식입니다.')
      setOutput('')
    }
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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">JSON 포맷터</h1>
          <p className="text-lg text-charcoal/70">
            복잡한 JSON 데이터를 보기 좋게 정렬하고 검증합니다.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={formatJSON} disabled={!input}>
                포맷팅
              </Button>
              <Button onClick={minifyJSON} variant="outline" disabled={!input}>
                압축
              </Button>
            </div>

            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">JSON 입력</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"key": "value"}'
                rows={10}
                className="font-mono text-sm"
              />
            </div>

            {/* Output */}
            {output && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-charcoal">포맷된 JSON</label>
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
                  rows={10}
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
