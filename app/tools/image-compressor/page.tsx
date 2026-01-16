'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Loader2 } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import ImageUploader from '@/components/image-uploader'
import { Button } from '@/components/ui/button'

export default function ImageCompressorPage() {
  const [originalImage, setOriginalImage] = useState<File | null>(null)
  const [originalSize, setOriginalSize] = useState<number | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [compressedSize, setCompressedSize] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelected = (file: File) => {
    setOriginalImage(file)
    setOriginalSize(file.size)
    setCompressedImage(null)
    setCompressedSize(null)
    setError(null)

    // Preview original image
    const reader = new FileReader()
    reader.onload = (e) => {
      // Just for preview, actual compression happens on button click
    }
    reader.readAsDataURL(file)
  }

  const handleCompress = async () => {
    if (!originalImage) return

    setLoading(true)
    setError(null)

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }

      const compressedFile = await imageCompression(originalImage, options)
      setCompressedSize(compressedFile.size)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setCompressedImage(e.target?.result as string)
      }
      reader.readAsDataURL(compressedFile)
    } catch (err) {
      setError('이미지 압축 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!compressedImage || !originalImage) return

    const link = document.createElement('a')
    link.href = compressedImage
    link.download = `compressed_${originalImage.name}`
    link.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
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
            이미지 압축
          </h1>
          <p className="text-lg text-charcoal/70">
            화질은 유지하면서 용량만 획기적으로 줄여줍니다.
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

            {!originalImage ? (
              <ImageUploader onImageSelected={handleImageSelected} />
            ) : (
              <>
                {/* Original Image Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">원본 이미지</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      <img
                        src={URL.createObjectURL(originalImage)}
                        alt="Original"
                        className="max-w-full h-auto rounded mb-2"
                      />
                      <p className="text-sm text-charcoal/70">
                        크기: {originalSize ? formatFileSize(originalSize) : '-'}
                      </p>
                    </div>
                  </div>

                  {/* Compressed Image */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">압축된 이미지</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      {loading ? (
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="w-8 h-8 text-forest-green animate-spin" />
                          <span className="ml-3 text-charcoal/70">압축 중...</span>
                        </div>
                      ) : compressedImage ? (
                        <>
                          <img
                            src={compressedImage}
                            alt="Compressed"
                            className="max-w-full h-auto rounded mb-2"
                          />
                          <p className="text-sm text-charcoal/70">
                            크기: {compressedSize ? formatFileSize(compressedSize) : '-'}
                          </p>
                          {compressedSize && originalSize && (
                            <p className="text-sm text-forest-green mt-1">
                              {Math.round((1 - compressedSize / originalSize) * 100)}% 감소
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center justify-center py-12 text-charcoal/50">
                          압축 버튼을 클릭하세요
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleCompress}
                    disabled={loading}
                    className="flex-1 md:flex-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        압축 중...
                      </>
                    ) : (
                      '압축하기'
                    )}
                  </Button>
                  {compressedImage && (
                    <Button onClick={handleDownload} variant="secondary" className="flex-1 md:flex-none">
                      <Download className="w-4 h-4 mr-2" />
                      다운로드
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOriginalImage(null)
                      setOriginalSize(null)
                      setCompressedImage(null)
                      setCompressedSize(null)
                      setError(null)
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
