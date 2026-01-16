'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Loader2 } from 'lucide-react'
// Note: Canvas API automatically removes EXIF data when redrawing images
// piexifjs is installed but we use Canvas API for more reliable EXIF removal
import ImageUploader from '@/components/image-uploader'
import { Button } from '@/components/ui/button'

export default function RemoveExifPage() {
  const [image, setImage] = useState<File | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelected = (file: File) => {
    setImage(file)
    setProcessedImage(null)
    setError(null)
  }

  const handleRemoveExif = () => {
    if (!image) return

    setLoading(true)
    setError(null)

    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imgData = e.target?.result as string
        const img = new Image()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          setError('Canvas를 초기화할 수 없습니다.')
          setLoading(false)
          return
        }
        
        img.onload = () => {
          try {
            // Canvas API를 사용하여 이미지를 다시 그리면 EXIF 메타데이터가 자동으로 제거됩니다
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            
            // JPEG 형식으로 내보내기 (EXIF 없음)
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob)
                  setProcessedImage(url)
                  setLoading(false)
                } else {
                  setError('이미지 처리 중 오류가 발생했습니다.')
                  setLoading(false)
                }
              },
              'image/jpeg',
              0.95
            )
          } catch (err) {
            setError('이미지 처리 중 오류가 발생했습니다.')
            setLoading(false)
            console.error(err)
          }
        }
        
        img.onerror = () => {
          setError('이미지를 로드하는 중 오류가 발생했습니다.')
          setLoading(false)
        }
        
        img.src = imgData
      }
      
      reader.onerror = () => {
        setError('이미지를 읽는 중 오류가 발생했습니다.')
        setLoading(false)
      }
      
      reader.readAsDataURL(image)
    } catch (err) {
      setError('EXIF 데이터 제거 중 오류가 발생했습니다.')
      setLoading(false)
      console.error(err)
    }
  }

  const handleDownload = () => {
    if (!processedImage || !image) return

    const link = document.createElement('a')
    link.href = processedImage
    link.download = `no-exif_${image.name.replace(/\.[^/.]+$/, '.jpg')}`
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
            EXIF 메타데이터 제거
          </h1>
          <p className="text-lg text-charcoal/70">
            사진에 포함된 위치 정보와 촬영 정보를 안전하게 삭제하세요.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">원본 이미지</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Original"
                        className="max-w-full h-auto rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">처리된 이미지</h3>
                    <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                      {loading ? (
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="w-8 h-8 text-forest-green animate-spin" />
                          <span className="ml-3 text-charcoal/70">처리 중...</span>
                        </div>
                      ) : processedImage ? (
                        <img
                          src={processedImage}
                          alt="Processed"
                          className="max-w-full h-auto rounded"
                        />
                      ) : (
                        <div className="flex items-center justify-center py-12 text-charcoal/50">
                          EXIF 제거 버튼을 클릭하세요
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleRemoveExif}
                    disabled={loading}
                    className="flex-1 md:flex-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        EXIF 제거 중...
                      </>
                    ) : (
                      'EXIF 제거하기'
                    )}
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
                      setProcessedImage(null)
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
