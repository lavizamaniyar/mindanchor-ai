import { Shield, Trash2, Download } from 'lucide-react'
import { useCheckInStore } from '../../stores/checkInStore'
import { useJournalStore } from '../../stores/journalStore'
import { useAppStore } from '../../stores/appStore'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export default function PrivacyPage() {
  const { checkIns, clearAll: clearCheckIns } = useCheckInStore()
  const { entries, clearAll: clearJournal } = useJournalStore()
  const { reset } = useAppStore()

  function handleDeleteAll() {
    if (confirm('Are you sure? This will permanently delete all your data.')) {
      clearCheckIns()
      clearJournal()
      reset()
    }
  }

  function handleExport() {
    const data = {
      exportDate: new Date().toISOString(),
      checkIns,
      journalEntries: entries,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mindbridge-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-2">
        <Shield size={20} className="text-blue-600" />
        <h1 className="text-xl font-bold text-slate-900">Privacy Centre</h1>
      </div>

      <Card>
        <h2 className="font-medium text-slate-800 mb-2">Your data</h2>
        <div className="space-y-1 text-sm text-slate-600 mb-4">
          <p>📊 {checkIns.length} check-ins stored locally</p>
          <p>📓 {entries.length} journal entries stored locally</p>
        </div>
        <p className="text-xs text-slate-400">
          All data is stored only in your browser's local storage. Nothing is sent to any server.
        </p>
      </Card>

      <Card>
        <h2 className="font-medium text-slate-800 mb-3">Manage your data</h2>
        <div className="space-y-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Download size={14} />}
            onClick={handleExport}
          >
            Export my data
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 size={14} />}
            onClick={handleDeleteAll}
          >
            Delete all data
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-medium text-slate-800 mb-2">Our commitments</h2>
        <ul className="space-y-2">
          {[
            'Your data is stored only on your device — never on our servers.',
            'We do not sell or share your data with third parties.',
            'MindBridge AI is not a medical professional.',
            'You can delete your data at any time.',
            'For emergencies, always contact qualified human support.',
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-600">
              <span className="text-green-500 mt-0.5 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
