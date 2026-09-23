import { useState } from 'react'
import { format } from 'date-fns'
import { useCheckInStore } from '../../stores/checkInStore'
import { useAppStore } from '../../stores/appStore'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { nanoid } from '../../utils/nanoid'
import type { MoodLevel, StressLevel, EnergyLevel } from '../../types'

function SliderField({
  label,
  value,
  onChange,
  min = 1,
  max = 5,
  color,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  color: string
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className={`text-sm font-bold ${color}`}>{value}/5</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  )
}

export default function CheckInPage() {
  const { checkIns, addCheckIn } = useCheckInStore()
  const { demoMode } = useAppStore()
  const [mood, setMood] = useState<MoodLevel>(3)
  const [stress, setStress] = useState<StressLevel>(3)
  const [energy, setEnergy] = useState<EnergyLevel>(3)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    addCheckIn({
      id: nanoid(),
      date: new Date().toISOString(),
      mood,
      stress,
      energy,
      note: note.trim() || undefined,
    })
    setSaved(true)
    setNote('')
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Daily Check-in</h1>
        <p className="text-sm text-slate-500 mt-0.5">How are you feeling right now?</p>
      </div>

      {demoMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
          🎓 Demo Mode — Sample data only.
        </div>
      )}

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 animate-fade-in">
          ✓ Check-in saved!
        </div>
      )}

      <Card>
        <div className="space-y-6">
          <SliderField
            label="Mood"
            value={mood}
            onChange={(v) => setMood(v as MoodLevel)}
            color="text-blue-600"
          />
          <SliderField
            label="Stress Level"
            value={stress}
            onChange={(v) => setStress(v as StressLevel)}
            color="text-rose-500"
          />
          <SliderField
            label="Energy Level"
            value={energy}
            onChange={(v) => setEnergy(v as EnergyLevel)}
            color="text-emerald-500"
          />
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Optional note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything on your mind?"
              rows={3}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 placeholder-slate-300 resize-none outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <Button onClick={handleSave}>Save Check-in</Button>
        </div>
      </Card>

      {checkIns.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Recent check-ins</h2>
          <div className="space-y-2">
            {checkIns.slice(0, 5).map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex items-center gap-4">
                <span className="text-xs text-slate-400 w-28 shrink-0">
                  {format(new Date(c.date), 'MMM d, h:mm a')}
                </span>
                <div className="flex gap-4 text-xs">
                  <span className="text-blue-600">😊 {c.mood}/5</span>
                  <span className="text-rose-500">⚡ {c.stress}/5</span>
                  <span className="text-emerald-500">🔋 {c.energy}/5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
