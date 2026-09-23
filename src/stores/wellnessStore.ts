import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WellnessPlan } from '../types'

interface WellnessState {
  plan: WellnessPlan | null
  completedActionIds: string[]
  setPlan: (plan: WellnessPlan) => void
  toggleAction: (id: string) => void
  clearPlan: () => void
}

export const useWellnessStore = create<WellnessState>()(
  persist(
    (set) => ({
      plan: null,
      completedActionIds: [],
      setPlan: (plan) => set({ plan, completedActionIds: [] }),
      toggleAction: (id) =>
        set((s) => ({
          completedActionIds: s.completedActionIds.includes(id)
            ? s.completedActionIds.filter((x) => x !== id)
            : [...s.completedActionIds, id],
        })),
      clearPlan: () => set({ plan: null, completedActionIds: [] }),
    }),
    { name: 'mindbridge-wellness' }
  )
)
