import { useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Send, RefreshCw, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'
import { useChatStore } from '../../stores/chatStore'
import { useAppStore } from '../../stores/appStore'
import { sendMessage } from '../../services/aiService'
import { nanoid } from '../../utils/nanoid'
import type { ChatMode, Message } from '../../types'

const modeOptions: { id: ChatMode; label: string; desc: string }[] = [
  { id: 'talk', label: '💬 Talk', desc: 'General conversation' },
  { id: 'calm', label: '🌿 Calm', desc: 'Feeling overwhelmed' },
  { id: 'study', label: '📚 Study', desc: 'Academic stress' },
  { id: 'work', label: '💼 Work', desc: 'Work pressure' },
  { id: 'understand', label: '🔍 Understand', desc: "I'm not sure" },
  { id: 'help', label: '🆘 Help', desc: 'I need support' },
]

const openingMessages: Record<ChatMode, string> = {
  talk: "Hi, I'm MindBridge.\n\nI'm here to listen, support, and help you explore what's on your mind.\n\nWhat's on your mind today? You can share as much or as little as you'd like.",
  calm: "Let's take this slowly together. You don't need to explain everything right now.\n\nTell me a little about what's happening, and we'll find a way to help you feel more settled.",
  study: "Academic pressure can feel really heavy — especially when you're carrying it alone.\n\nWhat's been the hardest part of things lately? Exams coming up? Trouble concentrating? Something else?",
  work: "Work stress can be relentless when it builds up over time.\n\nI'm here to help you think through what's happening and find some practical next steps. What's been weighing on you?",
  understand: "That's okay. You don't need to know what you're feeling before we start talking.\n\nSometimes just describing what's happening — even vaguely — is enough to start making sense of it. What's going on?",
  help: "I'm really glad you reached out.\n\nI'm here. Whatever you're going through right now, you don't have to face it alone. Tell me what's happening.",
}

export default function ChatPage() {
  const [searchParams] = useSearchParams()
  const initialMode = (searchParams.get('mode') as ChatMode) ?? 'talk'
  const [mode, setMode] = useState<ChatMode>(initialMode)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [showModeSelect, setShowModeSelect] = useState(false)
  const { sessions, agentStatus, safetyLevel, isTyping, createSession, addMessage, setAgentStatus, setSafetyLevel, setIsTyping } = useChatStore()
  const { demoMode } = useAppStore()
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const messages: Message[] = sessionId ? (sessions[sessionId]?.messages ?? []) : []

  // Create session on mount / mode change
  useEffect(() => {
    const id = createSession(mode)
    setSessionId(id)
    setSafetyLevel('low')
    setAgentStatus('idle')
    const welcomeMsg: Message = {
      id: nanoid(),
      role: 'assistant',
      content: openingMessages[mode],
      timestamp: new Date().toISOString(),
      safetyLevel: 'low',
    }
    setTimeout(() => addMessage(id, welcomeMsg), 300)
  }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = useCallback(async () => {
    if (!input.trim() || !sessionId || isTyping) return
    const userMsg: Message = {
      id: nanoid(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }
    addMessage(sessionId, userMsg)
    setInput('')
    setIsTyping(true)
    try {
      const { content, safetyLevel: sl, resources, suggestions } = await sendMessage(
        userMsg.content,
        mode,
        messages,
        setAgentStatus
      )
      setSafetyLevel(sl)
      const aiMsg: Message = {
        id: nanoid(),
        role: 'assistant',
        content,
        timestamp: new Date().toISOString(),
        safetyLevel: sl,
        resources,
        suggestions,
      }
      addMessage(sessionId, aiMsg)
    } catch {
      addMessage(sessionId, {
        id: nanoid(),
        role: 'assistant',
        content: 'MindBridge AI is temporarily unavailable. You can still use your journal, check-in, and the support directory.',
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsTyping(false)
      setAgentStatus('idle')
      inputRef.current?.focus()
    }
  }, [input, sessionId, isTyping, mode, messages, addMessage, setAgentStatus, setSafetyLevel, setIsTyping])

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] lg:h-[calc(100vh-4rem)] -mx-4 -mt-6 lg:-mx-8 lg:-mt-8">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 lg:px-6 py-3 flex items-center gap-3 shrink-0">
        <div className="flex-1">
          <h1 className="font-semibold text-slate-800 text-sm">Talk to MindBridge</h1>
          <p className="text-xs text-slate-400">Safety-first AI wellbeing companion</p>
        </div>
        {safetyLevel === 'immediate' && (
          <div className="flex items-center gap-1.5 bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-full">
            <AlertTriangle size={12} />
            Crisis support available
          </div>
        )}
        <button
          onClick={() => setShowModeSelect((v) => !v)}
          className="text-xs text-slate-500 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
        >
          Mode: {modeOptions.find((m) => m.id === mode)?.label}
        </button>
      </div>

      {/* Mode selector */}
      {showModeSelect && (
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex gap-2 overflow-x-auto shrink-0">
          {modeOptions.map((m) => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setShowModeSelect(false) }}
              className={clsx(
                'flex flex-col items-start px-3 py-2 rounded-xl border text-xs whitespace-nowrap transition-all',
                mode === m.id
                  ? 'border-blue-400 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200'
              )}
            >
              <span className="font-medium">{m.label}</span>
              <span className="text-slate-400">{m.desc}</span>
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={clsx(
                'max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap',
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : msg.safetyLevel === 'immediate'
                  ? 'bg-red-50 border border-red-200 text-slate-700 rounded-bl-sm'
                  : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm'
              )}
            >
              {msg.content}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {msg.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setInput(s); inputRef.current?.focus() }}
                      className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              {agentStatus !== 'idle' ? agentStatus : 'typing'}…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-slate-100 px-4 lg:px-6 py-3 shrink-0">
        {demoMode && (
          <p className="text-xs text-amber-600 mb-2">🎓 Demo Mode — AI responses use simulated data.</p>
        )}
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Share what's on your mind…"
            rows={1}
            className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 resize-none outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-blue-600 text-white rounded-xl disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            <Send size={16} />
          </button>
          <button
            onClick={() => setMode(mode)}
            className="p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            title="New session"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
