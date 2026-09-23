/**
 * Knowledge Base — Trusted mental health resources used by the RAG Agent.
 * In a production system this would be chunked embeddings in a vector store.
 */
import type { Resource, KnowledgeArticle, SupportContact, WellnessAction } from '../types'

// ─── Support Contacts ────────────────────────────────────────────────────────
export const SUPPORT_CONTACTS: SupportContact[] = [
  {
    id: 'icall',
    name: 'iCall',
    type: 'crisis',
    description: 'Psychological counselling and mental health support by trained professionals.',
    phone: '9152987821',
    available: 'Mon–Sat, 8am–10pm IST',
    region: 'India',
  },
  {
    id: 'vandrevala',
    name: 'Vandrevala Foundation',
    type: 'crisis',
    description: '24/7 toll-free mental health helpline with trained counsellors.',
    phone: '1860-2662-345',
    available: '24/7',
    region: 'India',
  },
  {
    id: 'aasra',
    name: 'AASRA',
    type: 'crisis',
    description: 'Crisis intervention and suicide prevention helpline.',
    phone: '9820466627',
    available: '24/7',
    region: 'India',
  },
  {
    id: 'snehi',
    name: 'Snehi',
    type: 'community',
    description: 'Emotional support and suicide prevention. Non-judgmental listening.',
    phone: '044-24640050',
    available: 'Daily 8am–10pm',
    region: 'India',
  },
  {
    id: 'fortis',
    name: 'Fortis Stress Helpline',
    type: 'professional',
    description: 'Mental health support from Fortis Healthcare professionals.',
    phone: '8376804102',
    available: 'Mon–Sat, 9am–6pm',
    region: 'India',
  },
  {
    id: 'yourdost',
    name: 'YourDOST',
    type: 'online',
    description: 'Online counselling and emotional wellness platform. Chat with experts.',
    url: 'https://yourdost.com',
    available: 'Online, anytime',
    region: 'Global',
  },
  {
    id: 'wysa',
    name: 'Wysa',
    type: 'online',
    description: 'AI-powered emotional wellbeing coach with human therapist escalation.',
    url: 'https://wysa.io',
    available: 'App, anytime',
    region: 'Global',
  },
]

// ─── Knowledge Articles ───────────────────────────────────────────────────────
export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'stress-001',
    title: 'Understanding Stress: What Your Body Is Telling You',
    category: 'stress',
    excerpt: 'Stress is your body\'s natural response to pressure. Understanding it is the first step to managing it.',
    content: `Stress is a natural biological and psychological response to demands placed on us. Short-term stress can help us perform better. However, chronic stress — stress that persists over weeks or months — can affect sleep, digestion, focus, and emotional health.\n\nCommon signs of chronic stress include difficulty sleeping, irritability, trouble concentrating, frequent headaches, and feeling overwhelmed most of the time.\n\nEvidence-based strategies that help manage stress include: regular physical activity, adequate sleep (7–9 hours), mindfulness practices, social connection, and limiting caffeine and alcohol. Speaking to a counsellor or psychologist is effective for persistent stress.`,
    tags: ['stress', 'burnout', 'overwhelmed', 'coping'],
    readTime: '4 min',
  },
  {
    id: 'anxiety-001',
    title: 'Anxiety: Recognizing the Patterns and What Helps',
    category: 'anxiety',
    excerpt: 'Anxiety involves worry, fear, and physical tension. It\'s common, and there are effective approaches.',
    content: `Anxiety is one of the most common mental health experiences. It involves persistent worry, a sense of dread, and physical symptoms like racing heart, muscle tension, and difficulty breathing.\n\nNot all anxiety is unhealthy — some is protective. It becomes a concern when it interferes with daily life, sleep, or relationships.\n\nEvidence-based approaches include: Cognitive Behavioural Therapy (CBT), breathing techniques (like 4-7-8 breathing), gradual exposure to feared situations, regular exercise, and reducing caffeine. Medication may be helpful in some cases — only a qualified professional can advise on this.\n\nIf anxiety feels unmanageable, please speak to a qualified mental health professional.`,
    tags: ['anxiety', 'worry', 'panic', 'fear', 'CBT'],
    readTime: '5 min',
  },
  {
    id: 'sleep-001',
    title: 'Sleep and Mental Health: A Two-Way Street',
    category: 'sleep',
    excerpt: 'Poor sleep worsens stress and emotional health. Good sleep hygiene makes a real difference.',
    content: `Sleep and mental health are deeply connected. Poor sleep worsens anxiety, lowers mood, reduces concentration, and increases emotional reactivity. Many people with mental health challenges also struggle with sleep.\n\nEvidence-based sleep hygiene tips: keep consistent sleep and wake times; dim lights one hour before bed; avoid screens 30–60 minutes before sleep; keep your bedroom cool and dark; avoid caffeine after 2pm; avoid alcohol before bed.\n\nIf you wake frequently, have racing thoughts at night, or feel unrefreshed despite sleeping, speak to your doctor — sleep disorders like insomnia are treatable.`,
    tags: ['sleep', 'insomnia', 'fatigue', 'rest'],
    readTime: '4 min',
  },
  {
    id: 'academic-001',
    title: 'Managing Academic Pressure: Strategies That Work',
    category: 'academic',
    excerpt: 'Exam stress affects most students. Structured approaches to studying and self-care can help.',
    content: `Academic pressure is one of the most common stressors for students. Exams, assignments, performance expectations, and fear of failure can create significant anxiety.\n\nStrategies that help: break tasks into smaller steps; use a study schedule with built-in breaks (the Pomodoro technique works well); get enough sleep before exams; talk to teachers or tutors when stuck; avoid comparing yourself to peers; maintain social connections and physical activity.\n\nIf pressure feels overwhelming, speak to a student counsellor or mental health professional at your institution.`,
    tags: ['exams', 'academic', 'students', 'study', 'pressure'],
    readTime: '4 min',
  },
  {
    id: 'workplace-001',
    title: 'Workplace Stress and Burnout: Early Signs and What to Do',
    category: 'workplace',
    excerpt: 'Burnout is real and serious. Recognizing it early gives you more options.',
    content: `Burnout is a state of emotional, physical, and mental exhaustion caused by prolonged stress, usually related to work. It can feel like you have nothing left to give.\n\nEarly signs include: feeling drained every morning, increasing cynicism about work, feeling ineffective, withdrawing from colleagues, difficulty concentrating, and physical symptoms like headaches.\n\nWhat helps: set clear work-life boundaries; take real breaks; speak to your manager about workload if safe to do so; talk to HR if the environment is harmful; seek employee assistance support; consider professional counselling.\n\nBurnout does not resolve itself by pushing harder — recovery requires genuine rest and support.`,
    tags: ['burnout', 'work', 'career', 'exhaustion', 'workplace'],
    readTime: '5 min',
  },
  {
    id: 'grief-001',
    title: 'Grief and Loss: What to Expect and How to Move Through It',
    category: 'grief',
    excerpt: 'Grief is not linear. There is no correct way to grieve, and you do not have to do it alone.',
    content: `Grief is the natural response to loss — of a person, a relationship, a job, or any significant change. It can include sadness, anger, confusion, numbness, or relief — sometimes all in the same day.\n\nGrief is not linear and does not follow a set timeline. There is no correct way to grieve.\n\nWhat helps: allowing yourself to feel without judgment; talking to trusted people; maintaining some routine; being gentle with your energy levels; joining a grief support group; seeking professional support if grief feels stuck or overwhelming.\n\nIf grief involves thoughts of harming yourself, please reach out to a crisis helpline or go to your nearest hospital.`,
    tags: ['grief', 'loss', 'bereavement', 'sadness'],
    readTime: '5 min',
  },
  {
    id: 'selfcare-001',
    title: 'Self-Care Is Not Selfish: Building a Sustainable Practice',
    category: 'self-care',
    excerpt: 'Consistent, simple self-care has strong evidence for improving emotional resilience.',
    content: `Self-care refers to intentional actions that support your physical and emotional health. It is not luxury — it is maintenance.\n\nEvidence-based self-care includes: regular physical activity (even a 20-minute walk helps); consistent sleep; adequate nutrition; social connection; activities that bring meaning or joy; time in nature; limiting news and social media if these increase distress.\n\nThe most effective self-care is consistent and realistic — small daily habits are more powerful than occasional grand gestures.`,
    tags: ['self-care', 'routine', 'habits', 'resilience'],
    readTime: '3 min',
  },
  {
    id: 'relationships-001',
    title: 'Loneliness and Connection: Why Relationships Matter for Mental Health',
    category: 'relationships',
    excerpt: 'Loneliness is a health risk. Building connection — even in small ways — makes a measurable difference.',
    content: `Social connection is one of the strongest predictors of mental and physical health. Loneliness — particularly chronic loneliness — increases risk for depression, anxiety, and physical illness.\n\nYou do not need many friends — even one or two trusted relationships are protective. What matters most is the quality of connection, not the quantity.\n\nIf you feel isolated: reach out to one person this week; consider joining a group with shared interests; volunteer; use online communities mindfully; consider speaking to a therapist if loneliness feels persistent or connected to deeper distress.`,
    tags: ['loneliness', 'relationships', 'connection', 'social'],
    readTime: '4 min',
  },
  {
    id: 'crisis-001',
    title: 'When to Seek Immediate Help',
    category: 'crisis',
    excerpt: 'If you or someone else is in danger, human support is available right now.',
    content: `If you are having thoughts of harming yourself or ending your life, please reach out to a crisis helpline immediately. You do not have to be in immediate danger to call — if you are struggling, these services are for you.\n\nIn India:\n- iCall: 9152987821\n- Vandrevala Foundation: 1860-2662-345\n- AASRA: 9820466627\n\nFor an emergency, call 112 or go to your nearest hospital emergency department.\n\nYou matter. Trained support is available right now.`,
    tags: ['crisis', 'safety', 'emergency', 'suicide', 'self-harm'],
    readTime: '2 min',
  },
]

// ─── Wellness Actions Library ─────────────────────────────────────────────────
export const WELLNESS_ACTIONS: WellnessAction[] = [
  {
    id: 'breathing-478',
    title: '4-7-8 Breathing',
    description: 'Inhale for 4 counts, hold for 7, exhale for 8. Repeat 4 times. This activates your parasympathetic nervous system and reduces acute anxiety.',
    duration: '5 min',
    type: 'breathing',
  },
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    description: 'Inhale 4 counts, hold 4, exhale 4, hold 4. Used by military and athletes to manage acute stress. Repeat 4–8 cycles.',
    duration: '5 min',
    type: 'breathing',
  },
  {
    id: 'grounding-54321',
    title: '5-4-3-2-1 Grounding',
    description: 'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. Brings you back to the present moment.',
    duration: '5 min',
    type: 'grounding',
  },
  {
    id: 'body-scan',
    title: 'Body Scan',
    description: 'Close your eyes and slowly move your awareness from feet to head, noticing sensations without judgment. Releases physical tension held by stress.',
    duration: '10 min',
    type: 'mindfulness',
  },
  {
    id: 'gratitude-journal',
    title: 'Gratitude Journal',
    description: 'Write three things you are grateful for today — specific and small is fine. Research shows this consistently improves mood over time.',
    duration: '10 min',
    type: 'journaling',
  },
  {
    id: 'walk-outside',
    title: 'Walk Outside',
    description: 'A 15-minute walk in daylight reduces cortisol, improves mood, and restores focus. Leave your phone in your pocket if possible.',
    duration: '15 min',
    type: 'movement',
  },
  {
    id: 'reach-out',
    title: 'Reach Out to Someone',
    description: 'Send a message to one person you trust. It can be simple: "Thinking of you" or "How are you doing?" Connection is one of the most protective mental health habits.',
    duration: '5 min',
    type: 'social',
  },
  {
    id: 'wind-down',
    title: 'Wind-Down Routine',
    description: 'Dim lights 1 hour before bed. Stop screens 30 minutes before sleep. Try light stretching or reading. Consistent wind-down significantly improves sleep quality.',
    duration: '30 min',
    type: 'sleep',
  },
  {
    id: 'study-pomodoro',
    title: 'Pomodoro Study Session',
    description: 'Study for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15–30 minute break. This improves focus and prevents burnout.',
    duration: '30 min',
    type: 'mindfulness',
  },
  {
    id: 'progressive-relaxation',
    title: 'Progressive Muscle Relaxation',
    description: 'Tense and release each muscle group from feet to head. Hold each for 5 seconds, then release for 30. Very effective for physical stress symptoms.',
    duration: '10 min',
    type: 'mindfulness',
  },
]

// ─── RAG Retrieval ────────────────────────────────────────────────────────────
export function retrieveResources(text: string, concerns: string[]): Resource[] {
  const lower = text.toLowerCase()
  const combined = lower + ' ' + concerns.join(' ').toLowerCase()
  const results: Resource[] = []

  const matches: Array<{ pattern: RegExp; article: KnowledgeArticle }> = [
    { pattern: /exam|study|academ|assignment|college|university|test|grade/, article: KNOWLEDGE_ARTICLES[3] },
    { pattern: /work|job|boss|career|burnout|office|colleague/, article: KNOWLEDGE_ARTICLES[4] },
    { pattern: /sleep|tired|exhausted|insomnia|wake up|fatigue/, article: KNOWLEDGE_ARTICLES[2] },
    { pattern: /anxi|worry|nervous|panic|fear|dread/, article: KNOWLEDGE_ARTICLES[1] },
    { pattern: /stress|overwhelm|pressure|too much/, article: KNOWLEDGE_ARTICLES[0] },
    { pattern: /grief|loss|bereav|died|death|mourn/, article: KNOWLEDGE_ARTICLES[5] },
    { pattern: /lonely|alone|isolated|no friends|disconnected/, article: KNOWLEDGE_ARTICLES[7] },
    { pattern: /self.care|habit|routine|wellbeing/, article: KNOWLEDGE_ARTICLES[6] },
    { pattern: /suicide|self.harm|end.my.life|hurt.myself|crisis/, article: KNOWLEDGE_ARTICLES[8] },
  ]

  const seen = new Set<string>()
  for (const { pattern, article } of matches) {
    if (pattern.test(combined) && !seen.has(article.id)) {
      seen.add(article.id)
      results.push({
        id: article.id,
        title: article.title,
        category: article.category,
        summary: article.excerpt,
        type: 'article',
        source: 'MindBridge Knowledge Base',
      })
    }
    if (results.length >= 3) break
  }

  return results
}

export function retrieveWellnessActions(
  text: string,
  stress: number,
  mood: number
): WellnessAction[] {
  const lower = text.toLowerCase()
  const actions: WellnessAction[] = []
  const seen = new Set<string>()

  const push = (id: string) => {
    if (!seen.has(id)) {
      const a = WELLNESS_ACTIONS.find((x) => x.id === id)
      if (a) { seen.add(id); actions.push(a) }
    }
  }

  if (/anxi|panic|overwhelm|racing/.test(lower) || stress >= 4) push('breathing-478')
  if (/sleep|tired|exhausted/.test(lower)) push('wind-down')
  if (/study|exam|focus|concentrate/.test(lower)) push('study-pomodoro')
  if (/lonely|alone|isolated/.test(lower)) push('reach-out')
  if (/sad|low|empty|down/.test(lower) || mood <= 2) push('gratitude-journal')
  if (/stress|tense|tight|headache/.test(lower)) push('progressive-relaxation')
  if (actions.length < 2) push('walk-outside')
  if (actions.length < 2) push('grounding-54321')

  return actions.slice(0, 3)
}
