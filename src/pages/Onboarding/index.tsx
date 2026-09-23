import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../stores/appStore'
import { Button } from '../../components/ui/Button'

const concerns = [
  { id: 'stress', label: 'Stress', emoji: '😰' },
  { id: 'anxiety', label: 'Anxiety / Worry', emoji: '😟' },
  { id: 'academic', label: 'Academic pressure', emoji: '📚' },
  { id: 'work', label: 'Work pressure', emoji: '💼' },
  { id: 'sleep', label: 'Sleep', emoji: '😴' },
  { id: 'loneliness', label: 'Loneliness', emoji: '🤍' },
  { id: 'relationships', label: 'Relationships', emoji: '💛' },
  { id: 'grief', label: 'Grief / Loss', emoji: '🕊️' },
  { id: 'general', label: 'General wellbeing', emoji: '🌱' },
  { id: 'unknown', label: "I don't know", emoji: '🤷' },
]

const userTypes = [
  { id: 'myself', label: 'Myself' },
  { id: 'student', label: 'A student' },
  { id: 'professional', label: 'A working professional' },
  { id: 'family', label: 'A family member' },
  { id: 'friend', label: 'A friend' },
]

const languages = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिन्दी' },
  { id: 'kn', label: 'ಕನ್ನಡ' },
]

const consentItems = [
  'We store your check-ins, journal entries, and conversation history only with your explicit consent.',
  'Your data is used solely to personalise your experience — never sold or shared.',
  'MindBridge AI is not a medical professional and cannot diagnose mental health conditions.',
  'You can delete your data at any time from the Privacy Centre.',
  'For emergencies, please contact emergency services or a crisis helpline.',
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { setConcerns, setUserType, setLanguage, giveConsent, completeOnboarding } = useAppStore()
  const [step, setStep] = useState(1)
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([])
  const [selectedUserType, setSelectedUserType] = useState('')
  const [selectedLang, setSelectedLang] = useState('en')
  const [consentChecked, setConsentChecked] = useState(false)

  function toggleConcern(id: string) {
    setSelectedConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  function handleFinish() {
    setConcerns(selectedConcerns)
    setUserType(selectedUserType)
    setLanguage(selectedLang as 'en' | 'hi' | 'kn')
    giveConsent()
    completeOnboarding()
    navigate('/dashboard')
  }

  const stepTitles = [
    'What would you like help with?',
    'Who are you looking for support for?',
    'What language do you prefer?',
    'Your Privacy & Consent',
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-100 p-8">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-blue-500' : 'bg-slate-200'}`}
            />
          ))}
        </div>

        <h1 className="text-xl font-semibold text-slate-800 mb-6">{stepTitles[step - 1]}</h1>

        {step === 1 && (
          <div className="grid grid-cols-2 gap-2">
            {concerns.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleConcern(c.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm text-left transition-all ${
                  selectedConcerns.includes(c.id)
                    ? 'border-blue-400 bg-blue-50 text-blue-700 font-medium'
                    : 'border-slate-200 text-slate-600 hover:border-blue-200'
                }`}
              >
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-2">
            {userTypes.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedUserType(u.id)}
                className={`px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                  selectedUserType === u.id
                    ? 'border-blue-400 bg-blue-50 text-blue-700 font-medium'
                    : 'border-slate-200 text-slate-600 hover:border-blue-200'
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-2">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLang(l.id)}
                className={`px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                  selectedLang === l.id
                    ? 'border-blue-400 bg-blue-50 text-blue-700 font-medium'
                    : 'border-slate-200 text-slate-600 hover:border-blue-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="text-sm font-medium text-slate-700 mb-3">How MindBridge uses your information</p>
            <ul className="space-y-2 mb-6">
              {consentItems.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600"
              />
              <span className="text-sm text-slate-700">I understand and consent</span>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-2 mt-8">
          {step > 1 && (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
          ) : (
            <Button onClick={handleFinish} disabled={!consentChecked}>
              Get Started
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
