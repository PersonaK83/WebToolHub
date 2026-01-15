import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-forest-green focus:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-forest-green text-white hover:bg-forest-green/90': variant === 'primary',
            'bg-muted-orange text-white hover:bg-muted-orange/90': variant === 'secondary',
            'border border-charcoal/20 bg-white text-charcoal hover:bg-charcoal/5': variant === 'outline',
            'text-charcoal hover:bg-charcoal/5': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
