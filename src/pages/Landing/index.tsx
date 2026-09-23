import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="font-semibold text-slate-800">MindBridge AI</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          Notice • Understand • Support • Connect
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
          Understand your emotions.<br />
          <span className="text-blue-600">Know what to do next.</span>
        </h1>
        <p className="text-lg text-slate-500 mb-10 max-w-xl">
          An AI-powered wellbeing companion that helps you explore your emotions, learn from trusted resources, build healthy routines, and connect with human support when you need it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={() => navigate('/onboarding')}>
            Start My Journey
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')}>
            Explore Features
          </Button>
        </div>

        {/* How it works */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
          {[
            { title: 'Notice', desc: 'Identify patterns in your mood, energy, and journal.' },
            { title: 'Understand', desc: 'Learn from trusted, evidence-based resources.' },
            { title: 'Support', desc: 'Receive personalized wellness plans and next steps.' },
            { title: 'Connect', desc: 'Connect with professionals or crisis support.' },
          ].map((item) => (
            <div key={item.title} className="text-left">
              <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-xs text-slate-400 max-w-md">
          MindBridge AI is not a medical diagnosis or emergency service. Always seek qualified human support for urgent situations.
        </p>
      </main>
    </div>
  )
}
