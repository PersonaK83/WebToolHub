'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import ReactCrop, { Crop, PixelCrop, makeAspectCrop, centerCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import ImageUploader from '@/components/image-uploader'
import { Button } from '@/components/ui/button'

export default function ImageCropperPage() {
  const [image, setImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageSelected = (file: File) => {
    setImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setCroppedImage(null)
    setCrop(undefined)
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      1,
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  const handleCrop = () => {
    if (!imgRef.current || !canvasRef.current || !completedCrop) return

    const image = imgRef.current
    const canvas = canvasRef.current
    const crop = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pixelRatio = window.devicePixelRatio
    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY

    ctx.drawImage(
      image,
      cropX,
      cropY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )

    setCroppedImage(canvas.toDataURL('image/png'))
  }

  const handleDownload = () => {
    if (!croppedImage || !image) return

    const link = document.createElement('a')
    link.href = croppedImage
    link.download = `cropped_${image.name}`
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
            이미지 비율 맞춤
          </h1>
          <p className="text-lg text-charcoal/70">
            인스타그램, 유튜브 등 플랫폼에 맞는 비율로 자르기.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {!image ? (
              <ImageUploader onImageSelected={handleImageSelected} />
            ) : (
              <>
                {imageSrc && (
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">이미지 자르기</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={undefined}
                        minWidth={50}
                        minHeight={50}
                      >
                        <img
                          ref={imgRef}
                          alt="Crop me"
                          src={imageSrc}
                          style={{ maxHeight: '400px', maxWidth: '100%' }}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                    </div>
                  </div>
                )}

                {croppedImage && (
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">자른 이미지</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      <img
                        src={croppedImage}
                        alt="Cropped"
                        className="max-w-full h-auto rounded"
                      />
                    </div>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {imageSrc && (
                    <Button onClick={handleCrop} disabled={!completedCrop} className="flex-1 md:flex-none">
                      자르기 적용
                    </Button>
                  )}
                  {croppedImage && (
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
                      setCroppedImage(null)
                      setCrop(undefined)
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
