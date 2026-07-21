import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { MemoryCard } from '../components/MemoryCard';
import { apiService } from '../services/api';
import {
  BrainCircuit,
  Search,
  Plus,
  Tag,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export function Memory() {
  const [query, setQuery] = useState('');
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function searchMemories() {
      setLoading(true);
      try {
        const data = await apiService.getMemories(query);
        setMemories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      searchMemories();
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const exampleQueries = [
    'Why did we use JWT?',
    'Deadlock migration fix',
    'REST Error standards',
    'Turborepo migration'
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary/20 text-secondary border border-secondary/30 font-mono">
                LONG-TERM COGNITIVE GRAPH
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Project Memory & ADR Timeline
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              DevPulse AI remembers historical architecture decisions, bug post-mortems, and commit rationale.
            </p>
          </div>
        </div>

        {/* Semantic Search Box */}
        <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-primary absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search project memory (e.g. 'Why did we use JWT?' or 'Postgres migration deadlock')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-surface-100 border border-border rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-text placeholder:text-muted outline-none focus:border-primary/50 transition-colors font-sans"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-muted font-semibold flex items-center gap-1 flex-shrink-0">
              <HelpCircle className="w-3.5 h-3.5 text-secondary" /> Sample Queries:
            </span>
            {exampleQueries.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(ex)}
                className="py-1 px-3 rounded-full bg-surface-200 hover:bg-surface-300 text-muted hover:text-text border border-border transition-colors whitespace-nowrap flex-shrink-0"
              >
                "{ex}"
              </button>
            ))}
          </div>
        </div>

        {/* Memory Timeline List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-text flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Memory Log Timeline ({memories.length})
            </h2>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-primary hover:underline"
              >
                Clear Search Filter
              </button>
            )}
          </div>

          {memories.length > 0 ? (
            memories.map((mem) => <MemoryCard key={mem.id} memory={mem} />)
          ) : (
            <div className="glass-panel p-12 rounded-2xl border border-border bg-card/80 text-center text-muted text-sm space-y-3">
              <BrainCircuit className="w-10 h-10 text-muted mx-auto" />
              <p>No historical memory records matched your query "{query}"</p>
              <button
                onClick={() => setQuery('')}
                className="py-2 px-4 rounded-xl bg-surface-200 text-text text-xs font-semibold"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
