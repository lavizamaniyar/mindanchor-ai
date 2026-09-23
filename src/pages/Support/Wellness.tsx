import { Heart, Wind, Moon, Dumbbell, Users, BookOpen } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useAppStore } from '../../stores/appStore'

const activities = [
  {
    id: 'breathing',
    icon: Wind,
    title: '4-7-8 Breathing',
    description: 'Inhale for 4 counts, hold for 7, exhale for 8. Repeat 4 times to calm your nervous system.',
    duration: '5 min',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'journaling',
    icon: BookOpen,
    title: 'Gratitude Journal',
    description: 'Write three things you are grateful for today. Small things count too.',
    duration: '10 min',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    id: 'movement',
    icon: Dumbbell,
    title: 'Gentle Movement',
    description: 'A short walk or gentle stretching can shift your mood and restore energy.',
    duration: '15 min',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'social',
    icon: Users,
    title: 'Reach Out',
    description: 'Send a message to someone you trust. Even a simple "thinking of you" matters.',
    duration: '5 min',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    id: 'mindfulness',
    icon: Heart,
    title: 'Body Scan',
    description: 'Close your eyes and slowly bring awareness to each part of your body, from feet to head.',
    duration: '10 min',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    id: 'sleep',
    icon: Moon,
    title: 'Wind-down Routine',
    description: 'Dim lights an hour before bed, avoid screens, and try a short relaxation practice.',
    duration: '30 min',
    color: 'bg-indigo-50 text-indigo-600',
  },
]

export default function WellnessPage() {
  const { demoMode } = useAppStore()

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Wellness Plan</h1>
        <p className="text-sm text-slate-500 mt-0.5">Evidence-based activities to support your wellbeing</p>
      </div>

      {demoMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
          🎓 Demo Mode — Sample wellness activities.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {activities.map(({ id, icon: Icon, title, description, duration, color }) => (
          <Card key={id}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${color}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-slate-800 text-sm">{title}</h3>
                  <span className="text-xs text-slate-400 shrink-0 ml-2">{duration}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
                <Button size="sm" variant="secondary" className="mt-3">
                  Try it
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-blue-100 bg-blue-50">
        <p className="text-sm font-medium text-blue-800 mb-1">Powered by trusted resources</p>
        <p className="text-xs text-blue-600">
          All activities are based on evidence-based wellbeing research. MindBridge AI is not a substitute for professional mental health care.
        </p>
      </Card>
    </div>
  )
}
