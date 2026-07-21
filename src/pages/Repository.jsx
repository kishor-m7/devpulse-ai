import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { RepositoryCard } from '../components/RepositoryCard';
import { UploadZone } from '../components/UploadZone';
import { useRepository } from '../contexts/RepositoryContext';
import { useNotification } from '../hooks/useNotification';
import {
  FolderGit2,
  Github,
  Upload,
  FileCode,
  Folder,
  ChevronRight,
  ChevronDown,
  GitCommit,
  Sparkles,
  CheckCircle2,
  X,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Repository() {
  const { repositories, activeRepo, selectRepository, addRepository } = useRepository();
  const { notifySuccess } = useNotification();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [repoUrlInput, setRepoUrlInput] = useState('');
  const [selectedFile, setSelectedFile] = useState('src/services/authService.ts');

  // Interactive File Tree Dummy Data
  const fileTree = [
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'controllers',
          type: 'folder',
          children: [
            { name: 'authController.ts', type: 'file' },
            { name: 'exportController.ts', type: 'file' },
          ]
        },
        {
          name: 'services',
          type: 'folder',
          children: [
            { name: 'authService.ts', type: 'file' },
            { name: 'stripe.ts', type: 'file' },
          ]
        },
        { name: 'index.ts', type: 'file' }
      ]
    },
    { name: 'package.json', type: 'file' },
    { name: 'README.md', type: 'file' }
  ];

  const handleConnectGithub = (e) => {
    e.preventDefault();
    if (!repoUrlInput.trim()) return;

    const newRepo = {
      id: `repo-${Date.now()}`,
      name: repoUrlInput.split('/').pop() || 'new-github-repo',
      branch: 'main',
      stars: 42,
      forks: 5,
      language: 'TypeScript',
      lastSync: new Date().toISOString(),
      status: 'Healthy',
      healthScore: 95,
      size: '24.5 MB',
      filesCount: 180,
      languages: [{ name: 'TypeScript', percentage: 100, color: '#3178C6' }]
    };

    addRepository(newRepo);
    setGithubModalOpen(false);
    setRepoUrlInput('');
    notifySuccess(`Successfully vectorized ${newRepo.name} from GitHub!`, 'Repo Connected');
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 font-mono">
                AST INDEXER & VECTOR ENGINE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Repository Management & AST Explorer
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Connect Git repositories or upload source ZIP archives to trigger deep neural AST vectorization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-surface-200 hover:bg-surface-300 text-text border border-border text-xs font-bold transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4 text-primary" />
              <span>Upload ZIP Archive</span>
            </button>

            <button
              onClick={() => setGithubModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-glow-primary transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Connect GitHub Repo</span>
            </button>
          </div>
        </div>

        {/* Repositories Grid */}
        <div>
          <h2 className="text-base font-bold text-text mb-4">Connected Repositories ({repositories.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <RepositoryCard
                key={repo.id}
                repo={repo}
                isActive={activeRepo?.id === repo.id}
                onSelect={() => selectRepository(repo.id)}
              />
            ))}
          </div>
        </div>

        {/* Active Repository Overview */}
        {activeRepo && (
          <div className="space-y-6">
            {/* AI Codebase Summary Banner */}
            <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-text flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-secondary animate-pulse" /> AI Codebase Neural Summary
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-200 text-success border border-success/30">
                  AST Vector State: Fully Synchronized
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                <strong className="text-text">{activeRepo.name}</strong> is an enterprise application composed of {activeRepo.filesCount} modules. The architecture follows a modular service layer pattern with strict type guards and asynchronous event listeners.
              </p>
            </div>

            {/* File Tree & Code Preview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* File Tree Navigator */}
              <div className="glass-panel p-5 rounded-2xl border border-border bg-card/80">
                <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Folder className="w-4 h-4 text-primary" /> Repository File Tree
                </h3>

                <div className="font-mono text-xs space-y-1 overflow-y-auto max-h-80">
                  <div className="p-2 rounded-lg bg-surface-100 border border-border text-text font-bold flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-primary" /> {activeRepo.name}
                  </div>
                  <div className="pl-4 space-y-1.5 pt-2">
                    <div className="flex items-center gap-2 text-muted hover:text-text cursor-pointer p-1 rounded hover:bg-surface-200">
                      <Folder className="w-3.5 h-3.5 text-secondary" /> <span>src/controllers/</span>
                    </div>
                    <div
                      onClick={() => setSelectedFile('src/services/authService.ts')}
                      className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-colors ${
                        selectedFile === 'src/services/authService.ts'
                          ? 'bg-primary/20 text-primary font-bold border border-primary/30'
                          : 'text-muted hover:text-text hover:bg-surface-200'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5" /> <span>src/services/authService.ts</span>
                    </div>
                    <div
                      onClick={() => setSelectedFile('src/services/stripe.ts')}
                      className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-colors ${
                        selectedFile === 'src/services/stripe.ts'
                          ? 'bg-primary/20 text-primary font-bold border border-primary/30'
                          : 'text-muted hover:text-text hover:bg-surface-200'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5" /> <span>src/services/stripe.ts</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted hover:text-text cursor-pointer p-1 rounded hover:bg-surface-200">
                      <FileCode className="w-3.5 h-3.5" /> <span>package.json</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted hover:text-text cursor-pointer p-1 rounded hover:bg-surface-200">
                      <FileCode className="w-3.5 h-3.5" /> <span>README.md</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Viewer Panel */}
              <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-border bg-card/80 font-mono text-xs overflow-hidden">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                  <span className="text-text font-bold flex items-center gap-2">
                    <Code className="w-4 h-4 text-secondary" /> {selectedFile}
                  </span>
                  <span className="text-[10px] text-muted">TypeScript • 142 lines</span>
                </div>

                <div className="p-4 rounded-xl bg-surface-50 border border-border text-text leading-relaxed overflow-x-auto space-y-1">
                  <p className="text-muted">// Auto-synced source view</p>
                  <p className="text-secondary">import &#123; redis &#125; from '../config/redis';</p>
                  <p className="text-secondary">import &#123; UserSession &#125; from '../types/auth';</p>
                  <br />
                  <p className="text-primary font-semibold">export async function validateSessionToken(token: string): Promise&lt;UserSession&gt; &#123;</p>
                  <p className="pl-4">const decoded = await jwt.verify(token, process.env.JWT_SECRET);</p>
                  <p className="pl-4">const isRevoked = await redis.sismember('token_blacklist', decoded.jti);</p>
                  <p className="pl-4 text-warning">if (isRevoked) throw new AuthError('Token has been revoked');</p>
                  <p className="pl-4 text-success">return decoded as UserSession;</p>
                  <p className="text-primary font-semibold">&#125;</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GitHub Connection Modal */}
        <AnimatePresence>
          {githubModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setGithubModalOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-text" />
                    <h3 className="text-base font-bold text-text">Connect GitHub Repository</h3>
                  </div>
                  <button onClick={() => setGithubModalOpen(false)} className="text-muted hover:text-text">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleConnectGithub} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">
                      Repository URL or Owner/Repo Name
                    </label>
                    <input
                      type="text"
                      placeholder="https://github.com/org/my-service or org/my-service"
                      value={repoUrlInput}
                      onChange={(e) => setRepoUrlInput(e.target.value)}
                      className="w-full bg-surface-100 border border-border rounded-xl px-4 py-3 text-xs font-mono text-text outline-none focus:border-primary/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-glow-primary transition-all"
                  >
                    Start Neural AST Indexing
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Upload ZIP Modal */}
        <AnimatePresence>
          {uploadModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setUploadModalOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-bold text-text">Upload Codebase ZIP Archive</h3>
                  </div>
                  <button onClick={() => setUploadModalOpen(false)} className="text-muted hover:text-text">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <UploadZone
                  onFileUpload={(file) => {
                    const newRepo = {
                      id: `repo-${Date.now()}`,
                      name: file.name.replace('.zip', ''),
                      branch: 'main',
                      stars: 0,
                      forks: 0,
                      language: 'Archive',
                      lastSync: new Date().toISOString(),
                      status: 'Healthy',
                      healthScore: 92,
                      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                      filesCount: 120,
                      languages: [{ name: 'Custom Codebase', percentage: 100, color: '#3B82F6' }]
                    };
                    addRepository(newRepo);
                    setUploadModalOpen(false);
                    notifySuccess(`Uploaded and indexed ${file.name}!`, 'ZIP Ingested');
                  }}
                  acceptedTypes=".zip"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
