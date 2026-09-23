import { Phone, ExternalLink, AlertCircle } from 'lucide-react'
import { Card } from '../../components/ui/Card'

const contacts = [
  {
    name: 'iCall',
    type: 'crisis' as const,
    description: 'Psychological counselling and mental health support. India.',
    phone: '9152987821',
    available: 'Mon–Sat, 8am–10pm IST',
  },
  {
    name: 'Vandrevala Foundation',
    type: 'crisis' as const,
    description: '24/7 mental health helpline. India.',
    phone: '1860-2662-345',
    available: '24/7',
  },
  {
    name: 'AASRA',
    type: 'crisis' as const,
    description: 'Crisis intervention and suicide prevention. India.',
    phone: '9820466627',
    available: '24/7',
  },
  {
    name: 'Snehi',
    type: 'community' as const,
    description: 'Emotional support and suicide prevention helpline.',
    phone: '044-24640050',
    available: 'Daily, 8am–10pm',
  },
  {
    name: 'Fortis Stress Helpline',
    type: 'professional' as const,
    description: 'Mental health support from Fortis Healthcare.',
    phone: '8376804102',
    available: 'Mon–Sat, 9am–6pm',
  },
  {
    name: 'YourDOST',
    type: 'professional' as const,
    description: 'Online counselling and emotional wellness platform.',
    url: 'https://yourdost.com',
    available: 'Online, anytime',
  },
]

const typeBadge = {
  crisis: 'bg-red-50 text-red-600',
  professional: 'bg-blue-50 text-blue-600',
  community: 'bg-emerald-50 text-emerald-600',
}

export default function SupportPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Find Support</h1>
        <p className="text-sm text-slate-500 mt-0.5">Human support resources — you are not alone</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-2 items-start">
        <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
        <p className="text-sm text-red-700">
          <strong>In an emergency</strong>, please call <strong>112</strong> (India emergency) or go to your nearest hospital immediately.
        </p>
      </div>

      <div className="space-y-3">
        {contacts.map((c) => (
          <Card key={c.name}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-800 text-sm">{c.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge[c.type]}`}>
                    {c.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-1">{c.description}</p>
                <p className="text-xs text-slate-400">{c.available}</p>
              </div>
              <div className="shrink-0">
                {c.phone && (
                  <a
                    href={`tel:${c.phone}`}
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Phone size={13} />
                    {c.phone}
                  </a>
                )}
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <ExternalLink size={13} />
                    Visit
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center">
        MindBridge AI is not a medical service. These contacts are provided for informational purposes only.
      </p>
    </div>
  )
}
