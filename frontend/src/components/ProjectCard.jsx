import React from 'react';
import { FolderGit2, Star, GitFork, ShieldCheck, ArrowUpRight, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProjectCard({ repo, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-panel-hover p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-xl flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text font-mono hover:text-primary transition-colors cursor-pointer" onClick={onSelect}>
                {repo.name}
              </h3>
              <p className="text-[11px] text-muted">{repo.language}</p>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-success/10 text-success border border-success/30 font-mono font-medium">
            {repo.status}
          </span>
        </div>

        <p className="text-xs text-muted mb-4 line-clamp-2">
          Indexed {repo.filesCount} codebase files with full AST dependency resolution.
        </p>

        {/* Language percentage bar */}
        {repo.languages && (
          <div className="mb-4">
            <div className="h-1.5 w-full rounded-full bg-surface-200 overflow-hidden flex gap-0.5">
              {repo.languages.map((l, idx) => (
                <div
                  key={idx}
                  style={{ width: `${l.percentage}%`, backgroundColor: l.color }}
                  className="h-full"
                  title={`${l.name}: ${l.percentage}%`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-muted flex-wrap">
              {repo.languages.map((l, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.name} ({l.percentage}%)
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-warning" /> {repo.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5 text-secondary" /> {repo.forks}
          </span>
        </div>

        <button
          onClick={onSelect}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Explore Repo <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
