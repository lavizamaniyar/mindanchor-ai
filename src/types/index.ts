// ─── Language & Localization ────────────────────────────────────────────────
export type Language = 'en' | 'hi' | 'kn'

// ─── Safety ─────────────────────────────────────────────────────────────────
export type SafetyLevel = 'low' | 'moderate' | 'elevated' | 'immediate'

// ─── Agent Architecture ──────────────────────────────────────────────────────
export type AgentStatus =
  | 'idle'
  | 'safety-check'
  | 'rag-retrieving'
  | 'wellness-planning'
  | 'supervisor-routing'
  | 'generating'
  | 'done'

export type ActiveAgent = 'supervisor' | 'safety' | 'rag' | 'wellness' | 'empathy'

// ─── Chat ────────────────────────────────────────────────────────────────────
export type ChatMode = 'talk' | 'calm' | 'study' | 'work' | 'understand' | 'help'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  safetyLevel?: SafetyLevel
  activeAgent?: ActiveAgent
  resources?: Resource[]
  suggestions?: string[]
  wellnessActions?: WellnessAction[]
}

export interface ChatSession {
  id: string
  mode: ChatMode
  messages: Message[]
  createdAt: string
}

// ─── Check-in ────────────────────────────────────────────────────────────────
export type MoodLevel = 1 | 2 | 3 | 4 | 5
export type StressLevel = 1 | 2 | 3 | 4 | 5
export type SleepQuality = 'poor' | 'okay' | 'good'
export type EnergyLevel = 'low' | 'medium' | 'high'

export interface CheckIn {
  id: string
  date: string
  mood: MoodLevel
  stress: StressLevel
  sleep: SleepQuality
  energy: EnergyLevel
  note?: string
}

// ─── Journal ─────────────────────────────────────────────────────────────────
export interface JournalEntry {
  id: string
  date: string
  content: string
  moodTag?: string
  analysis?: JournalAnalysis
}

export interface JournalAnalysis {
  themes: string[]
  stressors: string[]
  positiveObservations: string[]
  gentleNote: string
  suggestedNextStep: string
  resources: Resource[]
}

// ─── Resources (RAG) ─────────────────────────────────────────────────────────
export interface Resource {
  id: string
  title: string
  category: string
  summary: string
  type: 'article' | 'exercise' | 'tool' | 'contact'
  source?: string
}

// ─── Wellness ────────────────────────────────────────────────────────────────
export type WellnessActivityType =
  | 'breathing'
  | 'journaling'
  | 'movement'
  | 'social'
  | 'mindfulness'
  | 'sleep'
  | 'nutrition'
  | 'grounding'

export interface WellnessAction {
  id: string
  title: string
  description: string
  duration: string
  type: WellnessActivityType
}

export interface WellnessPlan {
  id: string
  generatedAt: string
  basedOn: { checkIns: number; journalEntries: number }
  insight: string
  actions: WellnessAction[]
}

// ─── Support Contacts ─────────────────────────────────────────────────────────
export interface SupportContact {
  id: string
  name: string
  type: 'crisis' | 'professional' | 'community' | 'online'
  description: string
  phone?: string
  url?: string
  available: string
  region: string
}

// ─── Knowledge Hub ───────────────────────────────────────────────────────────
export interface KnowledgeArticle {
  id: string
  title: string
  category: KnowledgeCategory
  excerpt: string
  content: string
  tags: string[]
  readTime: string
}

export type KnowledgeCategory =
  | 'stress'
  | 'anxiety'
  | 'sleep'
  | 'relationships'
  | 'workplace'
  | 'academic'
  | 'grief'
  | 'self-care'
  | 'crisis'

// ─── User Profile ────────────────────────────────────────────────────────────
export interface UserProfile {
  concerns: string[]
  userType: string
  language: Language
  consentGiven: boolean
  onboardingComplete: boolean
  demoMode: boolean
  name?: string
}

// ─── AI Insight ──────────────────────────────────────────────────────────────
export interface AIInsight {
  text: string
  action?: string
  actionLabel?: string
  generatedAt: string
}

// ─── Agentic Pipeline Result ─────────────────────────────────────────────────
export interface AgentPipelineResult {
  content: string
  safetyLevel: SafetyLevel
  activeAgent: ActiveAgent
  resources: Resource[]
  suggestions: string[]
  wellnessActions: WellnessAction[]
}
