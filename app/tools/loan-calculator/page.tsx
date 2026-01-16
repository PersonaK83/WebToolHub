'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [term, setTerm] = useState('')
  const [result, setResult] = useState<{
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
  } | null>(null)

  const calculate = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100 / 12 // 월 이자율
    const n = parseFloat(term) * 12 // 총 개월 수

    if (p <= 0 || r < 0 || n <= 0) {
      return
    }

    // 원리금 균등 상환 방식
    const monthlyPayment = r === 0
      ? p / n
      : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - p

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">대출 이자 계산기</h1>
          <p className="text-lg text-charcoal/70">
            원리금 균등, 만기 일시 상환 등 대출 이자를 미리 계산해보세요.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="principal" className="block text-sm font-medium text-charcoal mb-2">
                  대출 원금 (원)
                </label>
                <Input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="10000000"
                />
              </div>

              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-charcoal mb-2">
                  연 이자율 (%)
                </label>
                <Input
                  id="rate"
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="3.5"
                />
              </div>

              <div>
                <label htmlFor="term" className="block text-sm font-medium text-charcoal mb-2">
                  대출 기간 (년)
                </label>
                <Input
                  id="term"
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="5"
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full md:w-auto">
              <Calculator className="w-4 h-4 mr-2" />
              계산하기
            </Button>

            {/* Result */}
            {result && (
              <div className="bg-white rounded-lg border border-charcoal/10 p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-4">계산 결과</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-charcoal/60 mb-1">월 상환액</div>
                    <div className="text-2xl font-bold text-charcoal">
                      {result.monthlyPayment.toLocaleString('ko-KR')}원
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-charcoal/60 mb-1">총 상환액</div>
                    <div className="text-2xl font-bold text-charcoal">
                      {result.totalPayment.toLocaleString('ko-KR')}원
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-charcoal/60 mb-1">총 이자</div>
                    <div className="text-2xl font-bold text-charcoal">
                      {result.totalInterest.toLocaleString('ko-KR')}원
                    </div>
                  </div>
                </div>
                <p className="text-sm text-charcoal/60 mt-4">
                  * 원리금 균등 상환 방식으로 계산되었습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
