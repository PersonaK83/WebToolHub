'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import * as Icons from 'lucide-react'
import { Tool } from '@/lib/tools'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  // 동적으로 아이콘 가져오기
  const IconComponent = (Icons[tool.icon as keyof typeof Icons] as LucideIcon) || Icons.Wrench

  return (
    <Link href={tool.href}>
      <div className="group bg-white border border-charcoal/10 rounded-lg p-6 hover:shadow-lg hover:border-forest-green/30 transition-all duration-300 cursor-pointer h-full">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-forest-green/10 rounded-lg flex items-center justify-center group-hover:bg-forest-green/20 transition-colors">
            <IconComponent className="w-6 h-6 text-forest-green" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-charcoal group-hover:text-forest-green transition-colors mb-2">
              {tool.name}
            </h3>
            <p className="text-sm text-charcoal/70 line-clamp-2">
              {tool.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
