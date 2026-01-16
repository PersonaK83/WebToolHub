'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, RefreshCw, Loader2, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MyIPPage() {
  const [ip, setIp] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const fetchIP = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://api64.ipify.org?format=json')
      const data = await response.json()
      setIp(data.ip)
    } catch (err) {
      setError('IP 주소를 가져오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIP()
  }, [])

  const handleCopy = async () => {
    if (ip) {
      await navigator.clipboard.writeText(ip)
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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">내 IP 확인</h1>
          <p className="text-lg text-charcoal/70">
            현재 사용 중인 IP 주소를 확인합니다.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-12 h-12 text-forest-green animate-spin mb-4" />
                <p className="text-charcoal/70">IP 주소를 가져오는 중...</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                {error}
                <Button
                  onClick={fetchIP}
                  variant="outline"
                  className="mt-4"
                  size="sm"
                >
                  다시 시도
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-10 h-10 text-forest-green" />
                </div>
                <p className="text-sm text-charcoal/60 mb-2">현재 IP 주소</p>
                <p className="text-4xl font-bold text-charcoal mb-6 font-mono">{ip}</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleCopy} variant="secondary">
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
                  <Button onClick={fetchIP} variant="outline" className="flex items-center">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    새로고침
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
