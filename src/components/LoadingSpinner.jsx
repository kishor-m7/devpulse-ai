import React from 'react';
import { Sparkles } from 'lucide-react';

export function LoadingSpinner({ size = 'medium', text = 'Processing codebase AI model...' }) {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className={`rounded-full border-2 border-primary/20 border-t-primary animate-spin ${sizeClasses[size]}`} />
        <Sparkles className="w-4 h-4 text-secondary absolute inset-0 m-auto animate-pulse" />
      </div>
      {text && <p className="text-xs font-medium text-muted font-mono animate-pulse">{text}</p>}
    </div>
  );
}
