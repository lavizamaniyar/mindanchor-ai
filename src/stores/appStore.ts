import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, Language, AIInsight } from '../types'

interface AppState extends UserProfile {
  insight: AIInsight | null
  setLanguage: (lang: Language) => void
  setConcerns: (concerns: string[]) => void
  setUserType: (type: string) => void
  setName: (name: string) => void
  completeOnboarding: () => void
  giveConsent: () => void
  toggleDemoMode: () => void
  setInsight: (insight: AIInsight | null) => void
  reset: () => void
}

const defaultState: UserProfile & { insight: AIInsight | null } = {
  concerns: [],
  userType: '',
  language: 'en',
  consentGiven: false,
  onboardingComplete: false,
  demoMode: false,
  name: '',
  insight: null,
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...defaultState,
      setLanguage: (language) => set({ language }),
      setConcerns: (concerns) => set({ concerns }),
      setUserType: (userType) => set({ userType }),
      setName: (name) => set({ name }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      giveConsent: () => set({ consentGiven: true }),
      toggleDemoMode: () => set((s) => ({ demoMode: !s.demoMode })),
      setInsight: (insight) => set({ insight }),
      reset: () => set(defaultState),
    }),
    { name: 'mindbridge-app' }
  )
)
