import React from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { MarkdownViewer } from './MarkdownViewer';

export function TypingAnimation({ text, speed = 15, onComplete }) {
  const { displayedText, isTyping } = useTypingEffect(text, speed, onComplete);

  return (
    <div className="relative">
      <MarkdownViewer content={displayedText} />
      {isTyping && (
        <span className="inline-block w-2 h-4 ml-1 bg-secondary animate-pulse align-middle" />
      )}
    </div>
  );
}
