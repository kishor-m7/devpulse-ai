import React from 'react';
import { FolderGit2, Star, GitBranch, ShieldCheck, Database, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function RepositoryCard({ repo, isActive, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onSelect}
      className={`glass-panel-hover p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
        isActive
          ? 'border-primary bg-primary/10 shadow-glow-primary'
          : 'border-border bg-card/80 hover:border-primary/40'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-surface-200 border border-border text-primary">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text font-mono">{repo.name}</h3>
            <p className="text-[11px] text-muted flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-secondary" /> {repo.branch}
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 text-[10px] rounded-full font-mono bg-success/10 text-success border border-success/30">
          Score: {repo.healthScore}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 my-4 text-xs">
        <div className="p-2 rounded-xl bg-surface-100 border border-border/60">
          <span className="text-[10px] text-muted block">Files Indexed</span>
          <span className="font-bold text-text font-mono">{repo.filesCount} files</span>
        </div>
        <div className="p-2 rounded-xl bg-surface-100 border border-border/60">
          <span className="text-[10px] text-muted block">Repo Size</span>
          <span className="font-bold text-text font-mono">{repo.size}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border/50">
        <span className="flex items-center gap-1 text-[11px]">
          <Database className="w-3.5 h-3.5 text-secondary" /> Vectors Synced
        </span>
        <span className="text-primary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Manage Repo <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
}
