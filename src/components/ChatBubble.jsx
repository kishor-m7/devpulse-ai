import React from 'react';
import { Sparkles, User, Copy, RefreshCw, Check } from 'lucide-react';
import { MarkdownViewer } from './MarkdownViewer';
import { TypingAnimation } from './TypingAnimation';

export function ChatBubble({ message, isLatestAi = false }) {
  const isAi = message.sender === 'ai';

  return (
    <div className={`flex items-start gap-4 ${isAi ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
          isAi
            ? 'bg-gradient-to-tr from-primary to-secondary text-white shadow-glow-primary'
            : 'bg-surface-200 border border-border text-text'
        }`}
      >
        {isAi ? <Sparkles className="w-5 h-5 animate-pulse" /> : <User className="w-5 h-5" />}
      </div>

      {/* Message Box */}
      <div className={`flex-1 max-w-3xl ${isAi ? '' : 'flex flex-col items-end'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-text">
            {isAi ? 'DevPulse AI Engine' : 'You'}
          </span>
          <span className="text-[10px] text-muted">{message.timestamp}</span>
        </div>

        <div
          className={`p-4 rounded-2xl border text-sm leading-relaxed shadow-sm ${
            isAi
              ? 'bg-card border-border text-text glass-panel'
              : 'bg-primary text-white border-primary/30 rounded-tr-none'
          }`}
        >
          {isAi ? (
            isLatestAi && message.isTyping ? (
              <TypingAnimation text={message.text} speed={12} />
            ) : (
              <MarkdownViewer content={message.text} />
            )
          ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}
        </div>
      </div>
    </div>
  );
}
