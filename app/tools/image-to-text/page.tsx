'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Loader2 } from 'lucide-react'
import { createWorker, OEM } from 'tesseract.js'
import ImageUploader from '@/components/image-uploader'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function ImageToTextPage() {
  const [image, setImage] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleImageSelected = (file: File) => {
    setImage(file)
    setExtractedText('')
    setError(null)
    setProgress(0)
  }

  const handleExtract = async () => {
    if (!image) return
  
    setLoading(true)
    setError(null)
    setProgress(0)
    setExtractedText('')
  
    try {
      const worker = await createWorker(
        'kor+eng',
        OEM.DEFAULT, // ⭐ 2번째 인자 반드시 OEM
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round((m.progress ?? 0) * 100))
            }
          },
        }
      )
  
      const {
        data: { text },
      } = await worker.recognize(image)
  
      setExtractedText(text)
  
      await worker.terminate()
    } catch (err) {
      console.error(err)
      setError('텍스트 추출 중 오류가 발생했습니다. 이미지를 다시 확인해주세요.')
    } finally {
      setLoading(false)
    }
  }


  const handleCopy = async () => {
    if (extractedText) {
      await navigator.clipboard.writeText(extractedText)
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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            이미지 → 텍스트 (OCR)
          </h1>
          <p className="text-lg text-charcoal/70">
            이미지 속 글자를 인식하여 텍스트로 추출합니다.
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

            {!image ? (
              <ImageUploader onImageSelected={handleImageSelected} />
            ) : (
              <>
                {/* Image Preview */}
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">업로드된 이미지</h3>
                  <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      className="max-w-full h-auto rounded max-h-64 mx-auto"
                    />
                  </div>
                </div>

                {/* Progress Bar */}
                {loading && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-charcoal/70">스캔 중...</span>
                      <span className="text-sm text-charcoal/70">{progress}%</span>
                    </div>
                    <div className="w-full bg-charcoal/10 rounded-full h-2">
                      <div
                        className="bg-forest-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Extracted Text */}
                {extractedText && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-charcoal">추출된 텍스트</h3>
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
                      value={extractedText}
                      readOnly
                      className="min-h-[200px] font-mono text-sm"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleExtract}
                    disabled={loading}
                    className="flex-1 md:flex-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        텍스트 추출 중...
                      </>
                    ) : (
                      '텍스트 추출하기'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setImage(null)
                      setExtractedText('')
                      setError(null)
                      setProgress(0)
                    }}
                    className="flex-1 md:flex-none"
                  >
                    새 이미지 선택
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
