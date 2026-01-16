'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function YouTubeThumbnailPage() {
  const [url, setUrl] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  }

  const handleGenerate = () => {
    setError(null)
    setThumbnailUrl(null)

    if (!url.trim()) {
      setError('YouTube URL을 입력해주세요.')
      return
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      setError('유효한 YouTube URL이 아닙니다.')
      return
    }

    // maxresdefault.jpg는 최고 화질 썸네일
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    setThumbnailUrl(thumbnail)
  }

  const handleDownload = () => {
    if (!thumbnailUrl) return

    const link = document.createElement('a')
    link.href = thumbnailUrl
    link.download = 'youtube-thumbnail.jpg'
    link.target = '_blank'
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
            유튜브 썸네일 다운로더
          </h1>
          <p className="text-lg text-charcoal/70">
            고화질(HD) 썸네일을 클릭 한 번으로 다운로드하세요.
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

            {/* URL Input */}
            <div>
              <label htmlFor="youtube-url" className="block text-sm font-medium text-charcoal mb-2">
                YouTube URL
              </label>
              <div className="flex gap-2">
                <Input
                  id="youtube-url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1"
                />
                <Button onClick={handleGenerate}>
                  <Search className="w-4 h-4 mr-2" />
                  생성
                </Button>
              </div>
            </div>

            {/* Thumbnail Preview */}
            {thumbnailUrl && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg border border-charcoal/10 p-4">
                  <img
                    src={thumbnailUrl}
                    alt="YouTube Thumbnail"
                    className="w-full h-auto rounded"
                    onError={() => setError('썸네일을 불러올 수 없습니다. 비디오가 존재하는지 확인해주세요.')}
                  />
                </div>
                <Button onClick={handleDownload} className="w-full md:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  다운로드
                </Button>
              </div>
            )}

            {!thumbnailUrl && !error && (
              <div className="text-center py-12 text-charcoal/50">
                YouTube URL을 입력하고 생성 버튼을 클릭하세요.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
