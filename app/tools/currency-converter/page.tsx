'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const currencies = ['KRW', 'USD', 'EUR', 'JPY', 'GBP', 'CNY'] as const
type Currency = typeof currencies[number]

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState<Currency>('KRW')
  const [toCurrency, setToCurrency] = useState<Currency>('USD')
  const [rates, setRates] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // 간단한 고정 환율 (실제로는 API 사용 권장)
  const defaultRates: Record<string, number> = {
    KRW: 1,
    USD: 1300,
    EUR: 1420,
    JPY: 9.5,
    GBP: 1650,
    CNY: 180,
  }

  useEffect(() => {
    setRates(defaultRates)
    setLastUpdated(new Date())
  }, [])

  const convert = (): number | null => {
    if (!amount || isNaN(Number(amount))) return null
    const fromRate = rates[fromCurrency] || defaultRates[fromCurrency]
    const toRate = rates[toCurrency] || defaultRates[toCurrency]
    const krwAmount = Number(amount) * fromRate
    return krwAmount / toRate
  }

  const convertedAmount = convert()

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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">환율 계산기</h1>
          <p className="text-lg text-charcoal/70">
            다양한 통화의 환율을 계산합니다.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {/* Converter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">금액</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="flex-1"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value as Currency)}
                    className="px-3 py-2 border border-charcoal/20 rounded-lg bg-white"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">변환 결과</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={convertedAmount !== null ? convertedAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                    readOnly
                    className="flex-1 bg-charcoal/5"
                  />
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value as Currency)}
                    className="px-3 py-2 border border-charcoal/20 rounded-lg bg-white"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Info */}
            {lastUpdated && (
              <div className="text-sm text-charcoal/60 text-center">
                * 환율은 참고용이며, 실제 환율과 다를 수 있습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
