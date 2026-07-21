import React, { useState, useEffect } from 'react';
import { Search, Command, ArrowRight, FileText, Bug, Code, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function TopSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchItems = [
    { label: 'Explain JWT Auth flow', category: 'AI Chat', path: '/chat', icon: Sparkles },
    { label: 'Analyze webhook retry bug', category: 'Bug Detective', path: '/bugs', icon: Bug },
    { label: 'View OpenAPI 3.0 specs', category: 'Docs', path: '/docs', icon: FileText },
    { label: 'Check technical debt score', category: 'Health', path: '/health', icon: Code },
  ];

  const filtered = searchItems.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-surface-100 border border-border text-muted hover:text-text hover:border-primary/40 transition-all text-xs w-64 shadow-inner"
      >
        <Search className="w-4 h-4 text-primary" />
        <span className="flex-1 text-left truncate">Search codebase, bugs, docs...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] bg-surface-200 text-muted px-1.5 py-0.5 rounded border border-border font-mono">
          <Command className="w-3 h-3" /> K
        </kbd>
      </button>

      {/* Modal Backdrop & Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex items-center px-4 py-3 border-b border-border bg-surface-100">
                <Search className="w-5 h-5 text-primary mr-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or search codebase..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-text text-sm outline-none placeholder:text-muted font-sans"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-surface-200 text-muted hover:text-text"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filtered.length > 0 ? (
                  filtered.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(item.path)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-200 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-surface-100 border border-border group-hover:border-primary/40 text-primary">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                              {item.label}
                            </p>
                            <span className="text-[10px] text-muted">{item.category}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-muted text-sm">
                    No matching results found for "{query}"
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-border bg-surface-100 flex items-center justify-between text-[11px] text-muted">
                <span>Use arrow keys to navigate</span>
                <span className="font-mono">DevPulse AI Search</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
