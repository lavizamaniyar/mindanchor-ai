import { type ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-2xl border border-slate-100 p-5',
        onClick && 'cursor-pointer hover:border-blue-200 transition-colors',
        className
      )}
    >
      {children}
    </div>
  )
}
