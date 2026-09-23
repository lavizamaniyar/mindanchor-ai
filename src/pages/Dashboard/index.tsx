import { useNavigate } from 'react-router-dom'
import { MessageCircle, BookOpen, Activity, Heart, Users } from 'lucide-react'
import { useAppStore } from '../../stores/appStore'
import { useCheckInStore } from '../../stores/checkInStore'
import { useJournalStore } from '../../stores/journalStore'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

const quickActions = [
  { to: '/chat', icon: MessageCircle, label: 'Talk to MindBridge', color: 'bg-blue-50 text-blue-600' },
  { to: '/journal', icon: BookOpen, label: 'Write in Journal', color: 'bg-violet-50 text-violet-600' },
  { to: '/checkin', icon: Activity, label: 'Daily Check-in', color: 'bg-emerald-50 text-emerald-600' },
  { to: '/wellness', icon: Heart, label: 'Wellness Plan', color: 'bg-rose-50 text-rose-600' },
  { to: '/support', icon: Users, label: 'Find Support', color: 'bg-amber-50 text-amber-600' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { demoMode, concerns } = useAppStore()
  const { checkIns } = useCheckInStore()
  const { entries } = useJournalStore()

  const recentCheckIn = checkIns[0]

  return (
    <div className="space-y-6">
      {demoMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
          🎓 Demo Mode — Showing sample data for presentation.
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Good to see you 👋</h1>
        <p className="text-slate-500 mt-1">How are you doing today?</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {quickActions.map(({ to, icon: Icon, label, color }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="flex flex-col items-start gap-2 p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors text-left"
          >
            <div className={`p-2 rounded-xl ${color}`}>
              <Icon size={18} />
            </div>
            <span className="text-sm font-medium text-slate-700">{label}</span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-xs text-slate-400 mb-1">Check-ins</p>
          <p className="text-2xl font-bold text-slate-800">{checkIns.length}</p>
          <p className="text-xs text-slate-400 mt-1">total logged</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-400 mb-1">Journal entries</p>
          <p className="text-2xl font-bold text-slate-800">{entries.length}</p>
          <p className="text-xs text-slate-400 mt-1">total written</p>
        </Card>
      </div>

      {/* Recent check-in */}
      {recentCheckIn && (
        <Card>
          <p className="text-sm font-medium text-slate-700 mb-3">Most recent check-in</p>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-xs text-slate-400">Mood</p>
              <p className="text-xl font-bold text-blue-600">{recentCheckIn.mood}/5</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Stress</p>
              <p className="text-xl font-bold text-rose-500">{recentCheckIn.stress}/5</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Energy</p>
              <p className="text-xl font-bold text-emerald-500">{recentCheckIn.energy}/5</p>
            </div>
          </div>
        </Card>
      )}

      {/* Focus areas */}
      {concerns.length > 0 && (
        <Card>
          <p className="text-sm font-medium text-slate-700 mb-3">Your focus areas</p>
          <div className="flex flex-wrap gap-2">
            {concerns.map((c) => (
              <span key={c} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full capitalize">
                {c}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* CTA */}
      {checkIns.length === 0 && (
        <Card className="border-blue-100 bg-blue-50">
          <p className="text-sm font-semibold text-blue-800 mb-1">Start with a check-in</p>
          <p className="text-xs text-blue-600 mb-3">Log how you're feeling to start tracking your wellbeing.</p>
          <Button size="sm" onClick={() => navigate('/checkin')}>
            Log Check-in
          </Button>
        </Card>
      )}
    </div>
  )
}
