'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DDayCalculatorPage() {
  const [targetDate, setTargetDate] = useState('')
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null)

  const calculateDays = () => {
    if (!targetDate) return

    const target = new Date(targetDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    target.setHours(0, 0, 0, 0)

    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    setDaysRemaining(diffDays)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">D-Day 계산기</h1>
          <p className="text-lg text-charcoal/70">
            중요한 일정까지 남은 날짜를 간편하게 계산하세요.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {/* Date Input */}
            <div>
              <label htmlFor="target-date" className="block text-sm font-medium text-charcoal mb-2">
                목표 날짜 선택
              </label>
              <div className="flex gap-3">
                <Input
                  id="target-date"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={calculateDays} disabled={!targetDate}>
                  계산하기
                </Button>
              </div>
            </div>

            {/* Result */}
            {daysRemaining !== null && (
              <div className="bg-white rounded-lg border border-charcoal/10 p-8 text-center">
                <div className="w-20 h-20 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-forest-green" />
                </div>
                {targetDate && (
                  <div className="mb-4">
                    <p className="text-sm text-charcoal/60 mb-1">목표 날짜</p>
                    <p className="text-lg font-semibold text-charcoal">
                      {formatDate(new Date(targetDate))}
                    </p>
                  </div>
                )}
                <div>
                  {daysRemaining === 0 ? (
                    <p className="text-3xl font-bold text-forest-green">오늘입니다! 🎉</p>
                  ) : daysRemaining > 0 ? (
                    <>
                      <p className="text-2xl text-charcoal/70 mb-2">D-{daysRemaining}</p>
                      <p className="text-xl font-bold text-charcoal">
                        {daysRemaining}일 남았습니다
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl text-charcoal/70 mb-2">D+{Math.abs(daysRemaining)}</p>
                      <p className="text-xl font-bold text-charcoal">
                        {Math.abs(daysRemaining)}일 지났습니다
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {daysRemaining === null && (
              <div className="text-center py-12 text-charcoal/50">
                날짜를 선택하고 계산 버튼을 클릭하세요.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
