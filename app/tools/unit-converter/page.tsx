'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'

type UnitType = 'length' | 'weight'
type LengthUnit = 'mm' | 'cm' | 'm' | 'km' | 'inch' | 'ft' | 'yd' | 'mile'
type WeightUnit = 'mg' | 'g' | 'kg' | 't' | 'oz' | 'lb'

const lengthConversions: Record<LengthUnit, number> = {
  mm: 1,
  cm: 10,
  m: 1000,
  km: 1000000,
  inch: 25.4,
  ft: 304.8,
  yd: 914.4,
  mile: 1609344,
}

const weightConversions: Record<WeightUnit, number> = {
  mg: 1,
  g: 1000,
  kg: 1000000,
  t: 1000000000,
  oz: 28349.5,
  lb: 453592,
}

export default function UnitConverterPage() {
  const [unitType, setUnitType] = useState<UnitType>('length')
  const [fromValue, setFromValue] = useState('')
  const [fromUnit, setFromUnit] = useState<LengthUnit | WeightUnit>('cm')
  const [toUnit, setToUnit] = useState<LengthUnit | WeightUnit>('m')

  const convert = (): number | null => {
    if (!fromValue || isNaN(Number(fromValue))) return null

    if (unitType === 'length') {
      const from = fromUnit as LengthUnit
      const to = toUnit as LengthUnit
      const baseValue = Number(fromValue) * lengthConversions[from]
      return baseValue / lengthConversions[to]
    } else {
      const from = fromUnit as WeightUnit
      const to = toUnit as WeightUnit
      const baseValue = Number(fromValue) * weightConversions[from]
      return baseValue / weightConversions[to]
    }
  }

  const convertedValue = convert()

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
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">단위 변환기</h1>
          <p className="text-lg text-charcoal/70">
            길이, 무게, 넓이 등 다양한 단위를 손쉽게 변환하세요.
          </p>
        </div>

        {/* Main Functionality Area */}
        <div className="bg-white/80 border-2 border-charcoal/10 rounded-lg p-8">
          <div className="space-y-6">
            {/* Unit Type Selection */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">단위 유형</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setUnitType('length')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    unitType === 'length'
                      ? 'bg-forest-green text-white border-forest-green'
                      : 'bg-white text-charcoal border-charcoal/20 hover:border-forest-green/50'
                  }`}
                >
                  길이
                </button>
                <button
                  onClick={() => setUnitType('weight')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    unitType === 'weight'
                      ? 'bg-forest-green text-white border-forest-green'
                      : 'bg-white text-charcoal border-charcoal/20 hover:border-forest-green/50'
                  }`}
                >
                  무게
                </button>
              </div>
            </div>

            {/* Converter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">변환할 값</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                    placeholder="0"
                    className="flex-1"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value as LengthUnit | WeightUnit)}
                    className="px-3 py-2 border border-charcoal/20 rounded-lg bg-white"
                  >
                    {unitType === 'length'
                      ? (Object.keys(lengthConversions) as LengthUnit[]).map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))
                      : (Object.keys(weightConversions) as WeightUnit[]).map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
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
                    value={convertedValue !== null ? convertedValue.toFixed(6).replace(/\.?0+$/, '') : ''}
                    readOnly
                    className="flex-1 bg-charcoal/5"
                  />
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value as LengthUnit | WeightUnit)}
                    className="px-3 py-2 border border-charcoal/20 rounded-lg bg-white"
                  >
                    {unitType === 'length'
                      ? (Object.keys(lengthConversions) as LengthUnit[]).map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))
                      : (Object.keys(weightConversions) as WeightUnit[]).map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
