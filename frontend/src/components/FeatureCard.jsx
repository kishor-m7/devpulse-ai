import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function FeatureCard({ title, description, icon: Icon, badge, onClick, glowColor = 'primary' }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={onClick}
      className="glass-panel-hover p-6 rounded-2xl border border-border bg-card/70 backdrop-blur-xl flex flex-col justify-between cursor-pointer group relative overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-surface-200 border border-border text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all shadow-sm">
            {Icon ? <Icon className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
          </div>
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-secondary/15 text-secondary border border-secondary/30 font-mono">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted leading-relaxed">{description}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
        <span>Explore Capability</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </div>
    </motion.div>
  );
}
