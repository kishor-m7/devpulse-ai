import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { ChatBubble } from '../components/ChatBubble';
import { apiService } from '../services/api';
import { mockChatPrompts, mockInitialChatMessages } from '../services/mockData';
import {
  Send,
  Square,
  Sparkles,
  Plus,
  Trash2,
  HelpCircle,
  Code2,
  BrainCircuit,
  Terminal,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AIChat() {
  const [messages, setMessages] = useState(mockInitialChatMessages);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [historyThreads, setHistoryThreads] = useState([
    { id: 't-1', title: 'JWT Authentication Flow', date: 'Today' },
    { id: 't-2', title: 'Stripe Webhook Retries', date: 'Yesterday' },
    { id: 't-3', title: 'Redis Cache Invalidation', date: '3 days ago' },
  ]);
  const [activeThreadId, setActiveThreadId] = useState('t-1');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim() || isGenerating) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);

    try {
      const aiReplyText = await apiService.sendChatMessage(textToSend);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTyping: true
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI chat failed', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStop = () => {
    setIsGenerating(false);
  };

  const startNewChat = () => {
    const newId = `t-${Date.now()}`;
    const newThread = { id: newId, title: 'New Conversation', date: 'Just now' };
    setHistoryThreads([newThread, ...historyThreads]);
    setActiveThreadId(newId);
    setMessages([
      {
        id: 'msg-1',
        sender: 'ai',
        text: 'New session initialized. How can I assist with your codebase AST today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
        {/* Left Chat History Panel */}
        <div className="w-full md:w-64 glass-panel p-4 rounded-2xl border border-border bg-card/80 flex flex-col justify-between hidden md:flex">
          <div>
            <button
              onClick={startNewChat}
              className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-glow-primary transition-all flex items-center justify-center gap-2 mb-4"
            >
              <Plus className="w-4 h-4" />
              <span>New AI Session</span>
            </button>

            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-2">
              Recent Threads
            </h3>

            <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-320px)]">
              {historyThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs transition-colors ${
                    activeThreadId === thread.id
                      ? 'bg-surface-200 text-text font-semibold border border-border'
                      : 'text-muted hover:text-text hover:bg-surface-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="truncate flex-1">{thread.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-100 border border-border text-[11px] text-muted space-y-1">
            <div className="flex items-center gap-1 text-secondary font-semibold">
              <BrainCircuit className="w-3.5 h-3.5" /> Context Window
            </div>
            <p>Indexed 312 files • Qdrant RAG Engine connected</p>
          </div>
        </div>

        {/* Right Chat Main Interface */}
        <div className="flex-1 glass-panel rounded-2xl border border-border bg-card/80 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border bg-surface-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-glow-primary">
                <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-text">Codebase Neural Agent</h2>
                <p className="text-[10px] text-muted font-mono">AST Vector Model: DevPulse-DeepRAG-v4</p>
              </div>
            </div>

            <button
              onClick={() => setMessages([])}
              className="p-2 rounded-xl bg-surface-200 text-muted hover:text-danger transition-colors"
              title="Clear Messages"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, index) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                isLatestAi={index === messages.length - 1 && msg.sender === 'ai'}
              />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Suggestions */}
          <div className="p-3 border-t border-border/60 bg-surface-50/50 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-muted font-semibold flex items-center gap-1 whitespace-nowrap px-2">
              <HelpCircle className="w-3.5 h-3.5 text-secondary" /> Suggestions:
            </span>
            {mockChatPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="py-1 px-3 rounded-full bg-surface-100 hover:bg-surface-200 border border-border text-xs text-muted hover:text-text whitespace-nowrap transition-colors flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Box */}
          <div className="p-4 border-t border-border bg-surface-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                placeholder="Ask about authentication, duplicate code, component logic, payment flows..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-xs sm:text-sm text-text placeholder:text-muted outline-none focus:border-primary/50 transition-colors font-sans"
              />

              {isGenerating ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="py-3 px-5 rounded-xl bg-danger text-white text-xs font-bold hover:bg-danger/90 shadow-glow-danger transition-all flex items-center gap-2"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="py-3 px-5 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-xs font-bold shadow-glow-primary transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send Prompt</span>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
