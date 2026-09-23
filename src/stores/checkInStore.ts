import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CheckIn } from '../types'

interface CheckInState {
  checkIns: CheckIn[]
  addCheckIn: (c: CheckIn) => void
  removeCheckIn: (id: string) => void
  clearAll: () => void
}

export const useCheckInStore = create<CheckInState>()(
  persist(
    (set) => ({
      checkIns: [],
      addCheckIn: (c) => set((s) => ({ checkIns: [c, ...s.checkIns] })),
      removeCheckIn: (id) =>
        set((s) => ({ checkIns: s.checkIns.filter((x) => x.id !== id) })),
      clearAll: () => set({ checkIns: [] }),
    }),
    { name: 'mindbridge-checkins' }
  )
)
