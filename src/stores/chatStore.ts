import { create } from 'zustand'
import { nanoid } from '../utils/nanoid'
import type {
  ChatSession,
  Message,
  AgentStatus,
  ActiveAgent,
  SafetyLevel,
  ChatMode,
} from '../types'

interface ChatState {
  sessions: Record<string, ChatSession>
  activeSessionId: string | null
  agentStatus: AgentStatus
  activeAgent: ActiveAgent
  safetyLevel: SafetyLevel
  isTyping: boolean
  createSession: (mode: ChatMode) => string
  addMessage: (sessionId: string, msg: Message) => void
  setAgentStatus: (s: AgentStatus) => void
  setActiveAgent: (a: ActiveAgent) => void
  setSafetyLevel: (l: SafetyLevel) => void
  setIsTyping: (v: boolean) => void
  clearSession: (sessionId: string) => void
}

export const useChatStore = create<ChatState>()((set) => ({
  sessions: {},
  activeSessionId: null,
  agentStatus: 'idle',
  activeAgent: 'supervisor',
  safetyLevel: 'low',
  isTyping: false,

  createSession: (mode) => {
    const id = nanoid()
    const session: ChatSession = {
      id,
      mode,
      messages: [],
      createdAt: new Date().toISOString(),
    }
    set((s) => ({
      sessions: { ...s.sessions, [id]: session },
      activeSessionId: id,
    }))
    return id
  },

  addMessage: (sessionId, msg) =>
    set((s) => ({
      sessions: {
        ...s.sessions,
        [sessionId]: {
          ...s.sessions[sessionId],
          messages: [...(s.sessions[sessionId]?.messages ?? []), msg],
        },
      },
    })),

  setAgentStatus: (agentStatus) => set({ agentStatus }),
  setActiveAgent: (activeAgent) => set({ activeAgent }),
  setSafetyLevel: (safetyLevel) => set({ safetyLevel }),
  setIsTyping: (isTyping) => set({ isTyping }),

  clearSession: (sessionId) =>
    set((s) => {
      const sessions = { ...s.sessions }
      delete sessions[sessionId]
      return { sessions }
    }),
}))
