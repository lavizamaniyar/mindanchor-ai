import { type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { MessageCircle, BookOpen, Activity, Heart, Users, Home, Settings } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/journal', icon: BookOpen, label: 'Journal' },
  { to: '/checkin', icon: Activity, label: 'Check-in' },
  { to: '/wellness', icon: Heart, label: 'Wellness' },
  { to: '/support', icon: Users, label: 'Support' },
]

interface Props {
  children: ReactNode
}

export function AppLayout({ children }: Props) {
  const location = useLocation()
  const isSettings = location.pathname === '/settings'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-100 px-4 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="font-semibold text-slate-800 hidden sm:block">MindBridge AI</span>
        </div>
        <NavLink to="/settings" className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <Settings size={18} />
        </NavLink>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <nav className="hidden lg:flex flex-col w-56 bg-white border-r border-slate-100 px-3 py-6 gap-1 sticky top-16 h-[calc(100vh-4rem)]">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 pb-24 lg:pb-8 max-w-4xl">
          {children}
        </main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-2 flex justify-around z-50">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs transition-colors',
                isActive ? 'text-blue-600' : 'text-slate-400'
              )
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
