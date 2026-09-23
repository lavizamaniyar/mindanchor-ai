import type { Resource, SafetyLevel } from '../types'

function detectSafetyLevel(text: string): SafetyLevel {
  const lower = text.toLowerCase()
  if (/suicide|kill myself|end my life|want to die/.test(lower)) return 'immediate'
  if (/self.harm|hurt myself|can't go on|hopeless/.test(lower)) return 'elevated'
  if (/struggling|overwhelmed|can't cope/.test(lower)) return 'moderate'
  return 'low'
}

function getResources(text: string, _mode: string): Resource[] {
  const lower = text.toLowerCase()
  const resources: Resource[] = []
  if (/exam|study|academic|assignment/.test(lower)) {
    resources.push({
      title: 'Managing Academic Stress',
      category: 'academic',
      summary: 'Evidence-based strategies for exam anxiety and academic pressure.',
      type: 'article',
    })
  }
  if (/sleep|tired|exhausted/.test(lower)) {
    resources.push({
      title: 'Sleep Hygiene Guide',
      category: 'sleep',
      summary: 'Practical steps to improve your sleep quality tonight.',
      type: 'article',
    })
  }
  if (/anxious|anxiety|worry/.test(lower)) {
    resources.push({
      title: '4-7-8 Breathing Exercise',
      category: 'anxiety',
      summary: 'A simple breathing technique to calm your nervous system.',
      type: 'exercise',
    })
  }
  return resources
}

function buildGreeting(): string {
  const greetings = [
    "I'm here with you.",
    "I hear you.",
    "Thank you for sharing that.",
    "I'm glad you reached out.",
  ]
  return greetings[Math.floor(Math.random() * greetings.length)]
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sendMessage(
  text: string,
  mode: string,
  _history: unknown[],
  setStatus: (s: string) => void
): Promise<{ content: string; safetyLevel: SafetyLevel; resources: Resource[]; suggestions: string[] }> {
  const safetyLevel = detectSafetyLevel(text)

  if (safetyLevel === 'immediate') {
    return {
      content:
        `${buildGreeting()}\n\nWhat you're describing sounds serious, and you deserve immediate human support — not just a chat with an AI.\n\nPlease reach out to a real person right now. There are trained crisis support counsellors available 24/7 who are ready to listen without judgment.\n\n**iCall (India):** 9152987821\n**Vandrevala Foundation:** 1860-2662-345`,
      safetyLevel: 'immediate',
      resources: [],
      suggestions: ['Find Crisis Support', 'Call a Helpline'],
    }
  }

  setStatus('understanding')
  await delay(500)
  setStatus('retrieving')
  await delay(600)

  const resources = getResources(text, mode)

  setStatus('personalizing')
  await delay(500)
  setStatus('responding')
  await delay(400)

  let content = ''
  let suggestions: string[] = []

  const lower = text.toLowerCase()

  if (safetyLevel === 'elevated') {
    content = `${buildGreeting()} What you're describing sounds really hard to carry on your own.\n\nYour message suggests you may be going through a particularly difficult period right now. That's completely valid — and it's okay to need support.\n\nI'd gently encourage you to consider reaching out to someone you trust, or to a qualified professional.`
    suggestions = ['Find Human Support', 'Talk More', 'Learn About This']
  } else if (mode === 'calm') {
    content = `${buildGreeting()}\n\nLet's slow things down together for a moment.\n\nWhen your mind feels overwhelmed, it can help to focus just on your breathing for a minute or two. Your nervous system responds to slow, controlled breathing — even a few deep breaths can begin to shift how you feel physically.\n\nYou don't need to resolve everything right now. Right now, you just need to be here.`
    suggestions = ['Try a Breathing Exercise', 'Write in Journal', 'Talk More']
  } else if (mode === 'study') {
    content = `${buildGreeting()}\n\nAcademic pressure can feel really heavy — especially when you're carrying it alone.\n\nWhat's been the hardest part of things lately? Exams coming up? Trouble concentrating? Something else?\n\n${/concentrate|focus|distract/.test(lower) ? 'When focus feels impossible, it can help to work in short bursts — even 20–25 minutes with a break can restore concentration.' : 'Breaking big tasks into smaller steps can make even the most overwhelming workload feel manageable.'}`
    suggestions = ['Create Study Plan', 'Learn About Exam Stress', 'Try a Short Activity']
  } else if (mode === 'work') {
    content = `${buildGreeting()}\n\nWork stress can be relentless when it builds up over time.\n\nI'm here to help you think through what's happening and find some practical next steps. What's been weighing on you?`
    suggestions = ['Learn About Burnout', 'Find Support', 'Talk More']
  } else if (/lonely|alone|isolated/.test(lower)) {
    content = `${buildGreeting()}\n\nFeeling lonely or disconnected is more common than many people realise — and it's something that genuinely affects how we feel day to day.\n\nYou reached out here, which matters. Connection, even small moments of it, can make a real difference.`
    suggestions = ['Talk More', 'Find Support', 'Try an Activity']
  } else if (/anxious|anxiety|worry|nervous/.test(lower)) {
    content = `${buildGreeting()}\n\nWhat you're describing sounds like it may involve some anxiety-related patterns. Worry, restlessness, and a sense that something might go wrong are common experiences — and there are practical approaches that can help.\n\n*Based on trusted resources on anxiety and stress.*`
    suggestions = ['Try Breathing', 'Learn About Anxiety', 'Write in Journal']
  } else if (/sad|unhappy|depressed|low|empty/.test(lower)) {
    content = `${buildGreeting()}\n\nI hear you. Feeling low or empty is difficult to sit with, and I want you to know it's okay to acknowledge that.\n\nThis kind of pattern is worth paying attention to — not to alarm you, but because you deserve support.\n\nConsider speaking with a qualified professional if these feelings persist for more than a couple of weeks.`
    suggestions = ['Find Human Support', 'Write in Journal', 'Learn About This']
  } else {
    content = `${buildGreeting()}\n\nWhat you're sharing sounds like it's been weighing on you. It's good that you're taking a moment to acknowledge it.\n\nI can't tell you exactly what's happening — but I can help you explore it, point you toward helpful information, or just be here while you figure out what you need.`
    if (resources.length > 0) {
      content += `\n\n*Based on trusted resources on ${resources[0].category} wellbeing.*`
    }
    suggestions = ['Talk More', 'Learn About This', 'Try a Short Activity', 'Find Human Support']
  }

  return { content, safetyLevel, resources, suggestions }
}
