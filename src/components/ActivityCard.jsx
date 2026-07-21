import React from 'react';
import { GitCommit, Sparkles, FileText, Bug, Clock } from 'lucide-react';

export function ActivityCard({ activity }) {
  const getIcon = (type) => {
    switch (type) {
      case 'commit':
        return <GitCommit className="w-4 h-4 text-primary" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-secondary" />;
      case 'doc':
        return <FileText className="w-4 h-4 text-success" />;
      case 'bug':
        return <Bug className="w-4 h-4 text-danger" />;
      default:
        return <Clock className="w-4 h-4 text-muted" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-surface-200/50 transition-colors border border-transparent hover:border-border">
      <div className="p-2 rounded-lg bg-surface-200 border border-border flex-shrink-0">
        {getIcon(activity.type)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-text truncate">{activity.user}</p>
          <span className="text-[10px] text-muted whitespace-nowrap">{activity.time}</span>
        </div>
        <p className="text-xs text-muted mt-0.5 leading-relaxed break-words">{activity.action}</p>
      </div>

      {activity.badge && (
        <span className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-surface-200 text-muted border border-border hidden sm:inline-block flex-shrink-0">
          {activity.badge}
        </span>
      )}
    </div>
  );
}
