'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function QRGeneratorPage() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')

  const handleDownload = () => {
    const svg = document.getElementById('qr-code')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'qrcode.png'
          a.click()
          URL.revokeObjectURL(url)
        }
      })
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  const handleGenerate = () => {
    if (text.trim()) {
      setQrValue(text.trim())
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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            QR 코드 생성기
          </h1>
          <p className="text-lg text-charcoal/70">
            URL, 텍스트를 담은 QR 코드를 즉시 생성합니다.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {/* Input Section */}
            <div>
              <label htmlFor="qr-input" className="block text-sm font-medium text-charcoal mb-2">
                텍스트 또는 URL 입력
              </label>
              <div className="flex gap-2">
                <Input
                  id="qr-input"
                  type="text"
                  placeholder="https://example.com 또는 텍스트 입력"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                  className="flex-1"
                />
                <Button onClick={handleGenerate} disabled={!text.trim()}>
                  생성
                </Button>
              </div>
            </div>

            {/* QR Code Preview */}
            {qrValue && (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-white rounded-lg border border-charcoal/10">
                  <QRCodeSVG
                    id="qr-code"
                    value={qrValue}
                    size={256}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <Button onClick={handleDownload} className="w-full md:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  PNG 다운로드
                </Button>
              </div>
            )}

            {!qrValue && (
              <div className="text-center py-12 text-charcoal/50">
                위에 텍스트 또는 URL을 입력하고 생성 버튼을 클릭하세요.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
