import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Check, Copy } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

export function MarkdownViewer({ content }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative text-sm text-text leading-relaxed font-sans space-y-3">
      {/* Quick Copy markdown button */}
      <div className="absolute top-0 right-0 z-10">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-200 hover:bg-surface-300 text-xs text-muted hover:text-text border border-border transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" />
              <span className="text-success font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="prose prose-invert max-w-none prose-pre:bg-surface-50 prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-code:font-mono prose-code:text-primary">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
