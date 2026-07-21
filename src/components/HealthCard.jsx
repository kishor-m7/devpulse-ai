import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function HealthCard({ title, score, change, subtitle, icon: Icon, color = 'primary' }) {
  const colorMap = {
    primary: {
      border: 'hover:border-primary/50',
      badge: 'bg-primary/10 text-primary border-primary/30',
      glow: 'shadow-glow-primary',
      icon: 'text-primary',
      stroke: '#3B82F6'
    },
    secondary: {
      border: 'hover:border-secondary/50',
      badge: 'bg-secondary/10 text-secondary border-secondary/30',
      glow: 'shadow-glow-secondary',
      icon: 'text-secondary',
      stroke: '#06B6D4'
    },
    success: {
      border: 'hover:border-success/50',
      badge: 'bg-success/10 text-success border-success/30',
      glow: 'shadow-none',
      icon: 'text-success',
      stroke: '#22C55E'
    },
    warning: {
      border: 'hover:border-warning/50',
      badge: 'bg-warning/10 text-warning border-warning/30',
      glow: 'shadow-none',
      icon: 'text-warning',
      stroke: '#F59E0B'
    },
    danger: {
      border: 'hover:border-danger/50',
      badge: 'bg-danger/10 text-danger border-danger/30',
      glow: 'shadow-glow-danger',
      icon: 'text-danger',
      stroke: '#EF4444'
    }
  };

  const style = colorMap[color] || colorMap.primary;

  // Circular gauge calculations
  const radius = 28;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glass-panel p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-xl transition-all duration-300 ${style.border}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-surface-200 border border-border ${style.icon}`}>
            {Icon ? <Icon className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">{title}</h3>
            <p className="text-[11px] text-muted">{subtitle}</p>
          </div>
        </div>

        {/* Circular Gauge */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="#1E293B"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke={style.stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-xs font-bold font-mono text-text">{score}%</span>
        </div>
      </div>

      {change && (
        <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs">
          <span className="text-muted text-[11px]">Compared to last week</span>
          <span
            className={`flex items-center font-semibold ${
              change >= 0 ? 'text-success' : 'text-danger'
            }`}
          >
            {change >= 0 ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {Math.abs(change)}%
          </span>
        </div>
      )}
    </motion.div>
  );
}
