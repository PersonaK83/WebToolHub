'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  onImageSelected: (file: File) => void
  accept?: Record<string, string[]>
  maxSize?: number
  disabled?: boolean
  className?: string
}

export default function ImageUploader({
  onImageSelected,
  accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
  maxSize = 10 * 1024 * 1024, // 10MB
  disabled = false,
  className,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onImageSelected(acceptedFiles[0])
      }
    },
    [onImageSelected]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    disabled,
    multiple: false,
  })

  return (
    <div className={cn('w-full', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-forest-green bg-forest-green/5'
            : 'border-charcoal/20 hover:border-forest-green/50 hover:bg-charcoal/5',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center">
            {isDragActive ? (
              <Upload className="w-8 h-8 text-forest-green" />
            ) : (
              <ImageIcon className="w-8 h-8 text-forest-green" />
            )}
          </div>
          {isDragActive ? (
            <p className="text-forest-green font-medium">여기에 이미지를 놓으세요</p>
          ) : (
            <>
              <div>
                <p className="text-charcoal font-medium mb-1">
                  이미지를 드래그하거나 클릭하여 업로드
                </p>
                <p className="text-sm text-charcoal/60">
                  PNG, JPG, JPEG, GIF, WEBP (최대 {Math.round(maxSize / 1024 / 1024)}MB)
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {fileRejections.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {fileRejections[0].errors.map((error, index) => (
            <p key={index}>
              {error.code === 'file-too-large'
                ? '파일 크기가 너무 큽니다.'
                : error.code === 'file-invalid-type'
                ? '지원되지 않는 파일 형식입니다.'
                : '파일 업로드에 실패했습니다.'}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
