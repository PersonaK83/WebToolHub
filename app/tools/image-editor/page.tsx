'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, RotateCw, RotateCcw, Image as ImageIcon } from 'lucide-react'
import ImageUploader from '@/components/image-uploader'
import { Button } from '@/components/ui/button'

export default function ImageEditorPage() {
  const [image, setImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [isGrayscale, setIsGrayscale] = useState(false)
  const [editedImage, setEditedImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageSelected = (file: File) => {
    setImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setEditedImage(null)
    setRotation(0)
    setIsGrayscale(false)
  }

  const applyFilters = () => {
    if (!imageSrc || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      // Apply rotation
      ctx.save()
      if (rotation !== 0) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        ctx.translate(centerX, centerY)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.translate(-centerX, -centerY)
      }

      ctx.drawImage(img, 0, 0)

      // Apply grayscale filter
      if (isGrayscale) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
          data[i] = gray
          data[i + 1] = gray
          data[i + 2] = gray
        }

        ctx.putImageData(imageData, 0, 0)
      }

      ctx.restore()
      setEditedImage(canvas.toDataURL('image/png'))
    }
    img.src = imageSrc
  }

  const rotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360)
  }

  const handleDownload = () => {
    if (!editedImage || !image) return

    const link = document.createElement('a')
    link.href = editedImage
    link.download = `edited_${image.name}`
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
            메인 이미지 도구
          </h1>
          <p className="text-lg text-charcoal/70">
            크기 조절, 자르기, 필터 등 모든 이미지 편집 기능을 한곳에서.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {!image ? (
              <ImageUploader onImageSelected={handleImageSelected} />
            ) : (
              <>
                {/* Toolbar */}
                <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                  <h3 className="text-sm font-medium text-charcoal mb-3">도구</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() => rotate(-90)}
                      className="flex items-center"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      왼쪽 90°
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => rotate(90)}
                      className="flex items-center"
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      오른쪽 90°
                    </Button>
                    <Button
                      variant={isGrayscale ? 'primary' : 'outline'}
                      onClick={() => setIsGrayscale(!isGrayscale)}
                    >
                      그레이스케일
                    </Button>
                    <Button onClick={applyFilters} className="flex-1 md:flex-none">
                      적용하기
                    </Button>
                  </div>
                  {rotation !== 0 && (
                    <p className="text-sm text-charcoal/60 mt-2">
                      회전 각도: {rotation}°
                    </p>
                  )}
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
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">편집된 이미지</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      {editedImage ? (
                        <img
                          src={editedImage}
                          alt="Edited"
                          className="max-w-full h-auto rounded"
                        />
                      ) : (
                        <div className="flex items-center justify-center py-12 text-charcoal/50">
                          도구를 선택하고 적용 버튼을 클릭하세요
                        </div>
                      )}
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {editedImage && (
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
                      setEditedImage(null)
                      setRotation(0)
                      setIsGrayscale(false)
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
