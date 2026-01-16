import Link from 'next/link'
import { ArrowLeft, Layers } from 'lucide-react'

export default function BulkImageProcessorPage() {
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
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-12 md:p-16 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Layers className="w-10 h-10 text-forest-green" />
            </div>
            <p className="text-xl text-charcoal/70 font-medium">
              기능 준비 중입니다...
            </p>
            <p className="text-sm text-charcoal/50 mt-2">
              Functionality coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
