'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import ImageUploader from '@/components/image-uploader'
import { Button } from '@/components/ui/button'

export default function ImageConverterPage() {
  const [image, setImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [format, setFormat] = useState<'png' | 'jpg' | 'webp'>('jpg')
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageSelected = (file: File) => {
    setImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setConvertedImage(null)
  }

  const handleConvert = () => {
    if (!imageSrc || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`
      const quality = format === 'jpg' ? 0.95 : undefined
      
      const dataUrl = canvas.toDataURL(mimeType, quality)
      setConvertedImage(dataUrl)
    }
    img.src = imageSrc
  }

  const handleDownload = () => {
    if (!convertedImage || !image) return

    const link = document.createElement('a')
    link.href = convertedImage
    const extension = format === 'jpg' ? 'jpg' : format
    link.download = `${image.name.replace(/\.[^/.]+$/, '')}.${extension}`
    link.click()
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
            이미지 포맷 변환
          </h1>
          <p className="text-lg text-charcoal/70">
            JPG, PNG, WEBP 등 다양한 포맷을 통합 변환합니다.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {!image ? (
              <ImageUploader onImageSelected={handleImageSelected} />
            ) : (
              <>
                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    변환할 포맷 선택
                  </label>
                  <div className="flex gap-2">
                    {(['png', 'jpg', 'webp'] as const).map((fmt) => (
                      <Button
                        key={fmt}
                        variant={format === fmt ? 'primary' : 'outline'}
                        onClick={() => setFormat(fmt)}
                        className="uppercase"
                      >
                        {fmt}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">원본 이미지</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt="Original"
                          className="max-w-full h-auto rounded"
                        />
                      )}
                    </div>
                    <p className="text-sm text-charcoal/60 mt-2">
                      형식: {image?.name.split('.').pop()?.toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">변환된 이미지</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      {convertedImage ? (
                        <img
                          src={convertedImage}
                          alt="Converted"
                          className="max-w-full h-auto rounded"
                        />
                      ) : (
                        <div className="flex items-center justify-center py-12 text-charcoal/50">
                          변환 버튼을 클릭하세요
                        </div>
                      )}
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                    {convertedImage && (
                      <p className="text-sm text-charcoal/60 mt-2">
                        형식: {format.toUpperCase()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleConvert} className="flex-1 md:flex-none">
                    변환하기
                  </Button>
                  {convertedImage && (
                    <Button onClick={handleDownload} variant="secondary" className="flex-1 md:flex-none">
                      <Download className="w-4 h-4 mr-2" />
                      다운로드
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setImage(null)
                      setImageSrc(null)
                      setConvertedImage(null)
                      setFormat('jpg')
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
