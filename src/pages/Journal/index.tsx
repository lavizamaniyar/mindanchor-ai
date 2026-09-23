import { useState } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2 } from 'lucide-react'
import clsx from 'clsx'
import { useJournalStore } from '../../stores/journalStore'
import { useAppStore } from '../../stores/appStore'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { nanoid } from '../../utils/nanoid'

const moodOptions = [
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'anxious', label: 'Anxious', emoji: '😟' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'angry', label: 'Angry', emoji: '😤' },
  { id: 'tired', label: 'Tired', emoji: '😴' },
  { id: 'grateful', label: 'Grateful', emoji: '🙏' },
  { id: 'confused', label: 'Confused', emoji: '😕' },
]

export default function JournalPage() {
  const { entries, addEntry, removeEntry } = useJournalStore()
  const { demoMode } = useAppStore()
  const [showNew, setShowNew] = useState(false)
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')

  function handleSave() {
    if (!content.trim()) return
    addEntry({
      id: nanoid(),
      date: new Date().toISOString(),
      content: content.trim(),
      mood: mood || undefined,
    })
    setContent('')
    setMood('')
    setShowNew(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Journal</h1>
          <p className="text-sm text-slate-500 mt-0.5">Your private reflection space</p>
        </div>
        <Button size="sm" icon={<Plus size={14} />} onClick={() => setShowNew(true)}>
          New Entry
        </Button>
      </div>

      {demoMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
          🎓 Demo Mode — Showing sample journal entries.
        </div>
      )}

      {showNew && (
        <Card className="animate-fade-in">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">New journal entry</h2>
          <p className="text-xs text-slate-400 mb-3">This is your private space.</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {moodOptions.map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => setMood(id)}
                className={clsx(
                  'flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs text-left transition-all',
                  mood === id
                    ? 'border-blue-400 bg-blue-50 text-blue-700 font-medium'
                    : 'border-slate-200 text-slate-500 hover:border-blue-200'
                )}
              >
                <span>{emoji}</span>
                <span className="leading-tight">{label}</span>
              </button>
            ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write whatever feels right. This is your private space…"
            rows={6}
            className="w-full border border-slate-200 rounded-xl p-4 text-sm text-slate-700 placeholder-slate-300 resize-none outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
            autoFocus
          />
          <p className="text-xs text-slate-400 mt-1">{content.length} characters</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} disabled={!content.trim()}>
              Save Entry
            </Button>
            <Button variant="ghost" onClick={() => setShowNew(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {entries.length === 0 && !showNew && (
        <Card className="text-center py-12">
          <p className="text-2xl mb-3">📓</p>
          <p className="text-slate-700 font-medium">No entries yet</p>
          <p className="text-sm text-slate-400 mt-1">Start writing to begin your journal journey.</p>
        </Card>
      )}

      <div className="space-y-3">
        {entries.map((entry) => (
          <Card key={entry.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {entry.mood && (
                    <span className="text-sm">
                      {moodOptions.find((m) => m.id === entry.mood)?.emoji}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">
                    {format(new Date(entry.date), 'MMM d, yyyy · h:mm a')}
                  </span>
                </div>
                <p className="text-sm text-slate-700 line-clamp-3 whitespace-pre-wrap">{entry.content}</p>
              </div>
              <button
                onClick={() => removeEntry(entry.id)}
                className="shrink-0 p-1.5 text-slate-300 hover:text-red-400 transition-colors rounded-lg hover:bg-red-50"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
