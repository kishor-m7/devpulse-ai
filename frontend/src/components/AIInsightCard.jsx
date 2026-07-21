import React from 'react';
import { Sparkles, ArrowRight, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function AIInsightCard({ title, impact, description, actionText, onAction, category = 'Optimization' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-secondary/10 border border-primary/20 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/40 text-primary flex-shrink-0">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-200 text-secondary border border-secondary/30">
              {category}
            </span>
            <span className="text-xs text-warning font-semibold font-mono">Impact: {impact}</span>
          </div>
          <h4 className="text-sm font-bold text-text">{title}</h4>
          <p className="text-xs text-muted mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>

      <button
        onClick={onAction}
        className="self-end sm:self-center flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-glow-primary transition-all flex-shrink-0"
      >
        <Zap className="w-3.5 h-3.5" />
        <span>{actionText || 'Apply AI Patch'}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
