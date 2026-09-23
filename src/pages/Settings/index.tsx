import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../stores/appStore'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

const languages = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिन्दी' },
  { id: 'kn', label: 'ಕನ್ನಡ' },
]

export default function SettingsPage() {
  const navigate = useNavigate()
  const { language, demoMode, setLanguage, toggleDemoMode, reset } = useAppStore()

  return (
    <div className="space-y-5 max-w-lg">
      <h1 className="text-xl font-bold text-slate-900">Settings</h1>

      <Card>
        <h2 className="font-medium text-slate-800 mb-3">Language</h2>
        <div className="flex gap-2">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id as 'en' | 'hi' | 'kn')}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                language === l.id
                  ? 'border-blue-400 bg-blue-50 text-blue-700 font-medium'
                  : 'border-slate-200 text-slate-600 hover:border-blue-200'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-medium text-slate-800 mb-3">Demo mode</h2>
        <p className="text-sm text-slate-500 mb-3">Enable demo mode to show sample data for presentations.</p>
        <button
          onClick={toggleDemoMode}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            demoMode ? 'bg-blue-600' : 'bg-slate-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              demoMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </Card>

      <Card>
        <h2 className="font-medium text-slate-800 mb-2">Reset onboarding</h2>
        <p className="text-sm text-slate-500 mb-3">Clear your profile and start the onboarding flow again.</p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            reset()
            navigate('/onboarding')
          }}
        >
          Reset & Re-onboard
        </Button>
      </Card>

      <Card>
        <h2 className="font-medium text-slate-800 mb-1">About MindBridge AI</h2>
        <p className="text-sm text-slate-500">
          Version 1.0 · Built with IBM Granite · Safety-first AI wellbeing companion.
        </p>
        <p className="text-xs text-slate-400 mt-2">
          MindBridge AI is not a medical service. Always seek qualified professional support for urgent situations.
        </p>
      </Card>
    </div>
  )
}
