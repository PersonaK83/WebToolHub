'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Loader2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

interface ProcessedImage {
  original: File
  processed: string
  name: string
}

export default function BulkImageProcessorPage() {
  const [files, setFiles] = useState<File[]>([])
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles])
      setProcessedImages([])
    },
    multiple: true,
  })

  const processImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          if (!canvasRef.current) {
            reject(new Error('Canvas not available'))
            return
          }

          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Canvas context not available'))
            return
          }

          // Resize to 50%
          const newWidth = Math.floor(img.width * 0.5)
          const newHeight = Math.floor(img.height * 0.5)

          canvas.width = newWidth
          canvas.height = newHeight
          ctx.drawImage(img, 0, 0, newWidth, newHeight)

          // Convert to JPG
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
          resolve(dataUrl)
        }
        img.onerror = reject
        img.src = e.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleProcessAll = async () => {
    if (files.length === 0) return

    setProcessing(true)
    setProgress(0)
    const processed: ProcessedImage[] = []

    for (let i = 0; i < files.length; i++) {
      try {
        const processedDataUrl = await processImage(files[i])
        processed.push({
          original: files[i],
          processed: processedDataUrl,
          name: `processed_${files[i].name.replace(/\.[^/.]+$/, '.jpg')}`,
        })
        setProgress(Math.round(((i + 1) / files.length) * 100))
      } catch (err) {
        console.error(`Failed to process ${files[i].name}:`, err)
      }
    }

    setProcessedImages(processed)
    setProcessing(false)
  }

  const handleDownload = (image: ProcessedImage) => {
    const link = document.createElement('a')
    link.href = image.processed
    link.download = image.name
    link.click()
  }

  const handleDownloadAll = () => {
    processedImages.forEach((img) => {
      setTimeout(() => handleDownload(img), 0)
    })
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
            이미지 일괄 처리
          </h1>
          <p className="text-lg text-charcoal/70">
            여러 장의 이미지를 한 번에 편집하고 변환하세요.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {/* Upload Area */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-forest-green bg-forest-green/5'
                  : 'border-charcoal/20 hover:border-forest-green/50 hover:bg-charcoal/5'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-forest-green mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-forest-green font-medium">여기에 이미지를 놓으세요</p>
              ) : (
                <div>
                  <p className="text-charcoal font-medium mb-1">
                    이미지를 드래그하거나 클릭하여 업로드
                  </p>
                  <p className="text-sm text-charcoal/60">여러 파일 선택 가능</p>
                </div>
              )}
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  선택된 파일 ({files.length}개)
                </h3>
                <div className="bg-white rounded-lg border border-charcoal/10 p-4 max-h-48 overflow-y-auto">
                  <ul className="space-y-1 text-sm text-charcoal/70">
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Progress */}
            {processing && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-charcoal/70">처리 중...</span>
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

            {/* Processed Images */}
            {processedImages.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-charcoal">
                    처리된 이미지 ({processedImages.length}개)
                  </h3>
                  <Button variant="outline" size="sm" onClick={handleDownloadAll}>
                    <Download className="w-4 h-4 mr-2" />
                    모두 다운로드
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {processedImages.map((img, index) => (
                    <div key={index} className="bg-white rounded-lg border border-charcoal/10 p-3">
                      <img
                        src={img.processed}
                        alt={img.name}
                        className="w-full h-auto rounded mb-2"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(img)}
                        className="w-full"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        다운로드
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            {/* Actions */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleProcessAll}
                  disabled={processing}
                  className="flex-1 md:flex-none"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    '모두 처리하기 (크기 50% + JPG 변환)'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFiles([])
                    setProcessedImages([])
                    setProgress(0)
                  }}
                  className="flex-1 md:flex-none"
                >
                  파일 초기화
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
