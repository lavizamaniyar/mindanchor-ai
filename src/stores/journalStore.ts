import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { JournalEntry } from '../types'

interface JournalState {
  entries: JournalEntry[]
  addEntry: (e: JournalEntry) => void
  updateEntry: (id: string, patch: Partial<JournalEntry>) => void
  removeEntry: (id: string) => void
  clearAll: () => void
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (e) => set((s) => ({ entries: [e, ...s.entries] })),
      updateEntry: (id, patch) =>
        set((s) => ({
          entries: s.entries.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeEntry: (id) =>
        set((s) => ({ entries: s.entries.filter((x) => x.id !== id) })),
      clearAll: () => set({ entries: [] }),
    }),
    { name: 'mindbridge-journal' }
  )
)
