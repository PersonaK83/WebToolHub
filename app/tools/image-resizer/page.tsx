'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, RotateCw } from 'lucide-react'
import ImageUploader from '@/components/image-uploader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ImageResizerPage() {
  const [image, setImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [width, setWidth] = useState<number | ''>('')
  const [height, setHeight] = useState<number | ''>('')
  const [rotation, setRotation] = useState(0)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageSelected = (file: File) => {
    setImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      setImageSrc(src)
      
      // Get original dimensions
      const img = new Image()
      img.onload = () => {
        setWidth(img.width)
        setHeight(img.height)
      }
      img.src = src
    }
    reader.readAsDataURL(file)
    setProcessedImage(null)
    setRotation(0)
  }

  const handleProcess = () => {
    if (!imageSrc || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      const targetWidth = width ? Number(width) : img.width
      const targetHeight = height ? Number(height) : img.height

      // Set canvas size
      canvas.width = targetWidth
      canvas.height = targetHeight

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Apply rotation
      if (rotation !== 0) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight)
        ctx.restore()
      } else {
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
      }

      setProcessedImage(canvas.toDataURL('image/png'))
    }
    img.src = imageSrc
  }

  const handleDownload = () => {
    if (!processedImage || !image) return

    const link = document.createElement('a')
    link.href = processedImage
    link.download = `resized_${image.name}`
    link.click()
  }

  const rotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360)
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
            이미지 크기 조절 + 회전
          </h1>
          <p className="text-lg text-charcoal/70">
            원하는 픽셀로 크기를 줄이고 각도를 자유롭게 회전하세요.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {!image ? (
              <ImageUploader onImageSelected={handleImageSelected} />
            ) : (
              <>
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      너비 (px)
                    </label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value ? parseInt(e.target.value) : '')}
                      placeholder="너비"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      높이 (px)
                    </label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value ? parseInt(e.target.value) : '')}
                      placeholder="높이"
                    />
                  </div>
                </div>

                {/* Rotation Controls */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    회전 각도: {rotation}°
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => rotate(-90)}
                      className="flex items-center"
                    >
                      <RotateCw className="w-4 h-4 mr-2 rotate-180" />
                      반시계 90°
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => rotate(90)}
                      className="flex items-center"
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      시계 90°
                    </Button>
                    <Input
                      type="number"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value) || 0)}
                      placeholder="각도 입력"
                      className="flex-1"
                    />
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
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">변환된 이미지</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      {processedImage ? (
                        <img
                          src={processedImage}
                          alt="Processed"
                          className="max-w-full h-auto rounded"
                        />
                      ) : (
                        <div className="flex items-center justify-center py-12 text-charcoal/50">
                          적용 버튼을 클릭하세요
                        </div>
                      )}
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleProcess} className="flex-1 md:flex-none">
                    적용하기
                  </Button>
                  {processedImage && (
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
                      setWidth('')
                      setHeight('')
                      setRotation(0)
                      setProcessedImage(null)
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
