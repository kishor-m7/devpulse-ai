import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { MarkdownViewer } from '../components/MarkdownViewer';
import { apiService } from '../services/api';
import { useNotification } from '../hooks/useNotification';
import {
  FileCode2,
  RefreshCw,
  Download,
  Eye,
  Sparkles,
  CheckCircle2,
  BookOpen,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Documentation() {
  const { notifySuccess } = useNotification();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [regeneratingId, setRegeneratingId] = useState(null);

  useEffect(() => {
    async function loadDocs() {
      try {
        const data = await apiService.getDocumentation();
        setDocs(data);
      } catch (err) {
        console.error('Failed to load docs', err);
      } finally {
        setLoading(false);
      }
    }
    loadDocs();
  }, []);

  const handleRegenerate = async (id) => {
    setRegeneratingId(id);
    try {
      const updated = await apiService.regenerateDoc(id);
      setDocs((prev) => prev.map((d) => (d.id === id ? updated : d)));
      if (previewDoc?.id === id) {
        setPreviewDoc(updated);
      }
      notifySuccess('Documentation synchronized with latest main branch AST.', 'Doc Regenerated');
    } catch (err) {
      console.error(err);
    } finally {
      setRegeneratingId(null);
    }
  };

  const handleDownload = (doc) => {
    const element = document.createElement('a');
    const fileBlob = new Blob([doc.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(fileBlob);
    element.download = `${doc.type.replace(/\s+/g, '_')}_${doc.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    notifySuccess(`${doc.title} file downloaded successfully.`, 'Doc Saved');
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary/20 text-secondary border border-secondary/30 font-mono">
                AUTONOMOUS DOC ENGINE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Documentation Generator
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Auto-generate up-to-date developer manuals, OpenAPI 3.0 specs, C4 architecture diagrams & READMEs.
            </p>
          </div>

          <button
            onClick={() => {
              docs.forEach((d) => handleRegenerate(d.id));
              notifySuccess('Queued background regeneration for all documentation suites.', 'Full Sync Started');
            }}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-glow-primary hover:opacity-95 transition-all flex items-center gap-2 self-start sm:self-center"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate All Documentation</span>
          </button>
        </div>

        {/* Documentation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-2xl border border-border bg-card/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-surface-200 border border-border text-secondary">
                    <FileCode2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-200 text-muted border border-border">
                    {doc.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-text mb-1">{doc.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-4">{doc.description}</p>
                <p className="text-[10px] text-muted font-mono mb-4">
                  Last synced: {doc.lastGenerated}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border/60 grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="py-2 px-2 rounded-lg bg-surface-200 hover:bg-surface-300 text-text text-xs font-medium border border-border transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(doc)}
                  className="py-2 px-2 rounded-lg bg-surface-200 hover:bg-surface-300 text-text text-xs font-medium border border-border transition-colors flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5 text-secondary" />
                  <span>Export</span>
                </button>

                <button
                  onClick={() => handleRegenerate(doc.id)}
                  disabled={regeneratingId === doc.id}
                  className="py-2 px-2 rounded-lg bg-surface-200 hover:bg-surface-300 text-text text-xs font-medium border border-border transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-success ${regeneratingId === doc.id ? 'animate-spin' : ''}`} />
                  <span>Re-gen</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Markdown Preview Modal */}
        <AnimatePresence>
          {previewDoc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewDoc(null)}
                className="fixed inset-0 bg-background/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl max-h-[85vh] bg-card border border-border rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden"
              >
                <div className="p-4 border-b border-border bg-surface-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <div>
                      <h3 className="text-sm font-bold text-text">{previewDoc.title}</h3>
                      <p className="text-[10px] font-mono text-muted">{previewDoc.type} Spec</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(previewDoc)}
                      className="py-1.5 px-3 rounded-lg bg-primary text-white text-xs font-semibold shadow-glow-primary flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download .md
                    </button>
                    <button
                      onClick={() => setPreviewDoc(null)}
                      className="p-1 rounded-lg hover:bg-surface-200 text-muted hover:text-text"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto bg-card">
                  <MarkdownViewer content={previewDoc.content} />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
