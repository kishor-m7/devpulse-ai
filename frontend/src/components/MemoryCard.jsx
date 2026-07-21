import React, { useState } from 'react';
import { BrainCircuit, Calendar, Tag, ChevronDown, ChevronUp, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../utils/helpers';

export function MemoryCard({ memory }) {
  const [expanded, setExpanded] = useState(false);

  const categoryColors = {
    'Architecture Decision': 'bg-primary/10 text-primary border-primary/30',
    'Previous Bug Fix': 'bg-danger/10 text-danger border-danger/30',
    'Generated Doc': 'bg-secondary/10 text-secondary border-secondary/30',
    'Repository Update': 'bg-warning/10 text-warning border-warning/30',
  };

  const badgeStyle = categoryColors[memory.category] || 'bg-surface-200 text-muted border-border';

  return (
    <motion.div
      layout
      className="glass-panel p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-xl relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-surface-200 border border-border text-secondary flex-shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badgeStyle}`}>
                {memory.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted">
                <Calendar className="w-3 h-3" /> {formatDate(memory.date)}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-text">{memory.title}</h3>
            <p className="text-xs text-muted mt-1 leading-relaxed">{memory.summary}</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="self-end sm:self-start flex items-center gap-1 text-xs font-medium text-primary hover:underline flex-shrink-0"
        >
          {expanded ? 'Hide Rationale' : 'Read Rationale'}{' '}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-border/60 text-xs space-y-3"
          >
            <div>
              <h4 className="font-semibold text-text mb-1">Deep Context & Reasoning:</h4>
              <p className="text-muted leading-relaxed font-mono bg-surface-100 p-3 rounded-xl border border-border">
                {memory.details}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted pt-1">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Logged by {memory.author}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-secondary" />
                {memory.queryTags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded bg-surface-200 text-muted font-mono text-[10px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
