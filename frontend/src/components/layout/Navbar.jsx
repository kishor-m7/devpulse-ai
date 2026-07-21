import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Upload,
  FolderGit2,
  User,
  Settings,
  ShieldCheck,
  Check,
  Sparkles
} from 'lucide-react';
import { useRepository } from '../../contexts/RepositoryContext';
import { TopSearch } from './TopSearch';
import { NotificationBell } from './NotificationBell';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar({ sidebarCollapsed }) {
  const { repositories, activeRepo, selectRepository } = useRepository();
  const [repoDropdownOpen, setRepoDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-card/80 border-b border-border backdrop-blur-xl transition-all duration-300 flex items-center justify-between px-6 ${
        sidebarCollapsed ? 'left-20' : 'left-65'
      }`}
      style={{ left: sidebarCollapsed ? '80px' : '260px' }}
    >
      {/* Left: Repository Switcher */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setRepoDropdownOpen(!repoDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface-100 border border-border hover:border-primary/40 text-text transition-all text-xs font-medium shadow-sm"
          >
            <FolderGit2 className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs max-w-[140px] sm:max-w-xs truncate">
              {activeRepo ? activeRepo.name : 'Select Repository'}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-success/10 text-success border border-success/30 font-sans hidden sm:inline-block">
              Synced
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-muted" />
          </button>

          {/* Repo Dropdown */}
          <AnimatePresence>
            {repoDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setRepoDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl z-40 overflow-hidden"
                >
                  <div className="p-2 border-b border-border text-[11px] font-semibold text-muted bg-surface-100">
                    Active Repositories ({repositories.length})
                  </div>
                  <div className="p-1 divide-y divide-border/40">
                    {repositories.map((repo) => (
                      <button
                        key={repo.id}
                        onClick={() => {
                          selectRepository(repo.id);
                          setRepoDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-200 text-left text-xs transition-colors"
                      >
                        <div>
                          <p className="font-mono text-text font-medium">{repo.name}</p>
                          <span className="text-[10px] text-muted">{repo.language}</span>
                        </div>
                        {activeRepo?.id === repo.id && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="p-2 border-t border-border bg-surface-100">
                    <button
                      onClick={() => {
                        navigate('/repository');
                        setRepoDropdownOpen(false);
                      }}
                      className="w-full py-1.5 px-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-medium text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Connect New Repo
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Middle: Top Search */}
      <div className="hidden md:block">
        <TopSearch />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Upload Button */}
        <button
          onClick={() => navigate('/bugs')}
          className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold shadow-glow-primary hover:opacity-95 transition-all"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Logs / ZIP</span>
        </button>

        {/* Notifications */}
        <NotificationBell />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-surface-200 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-primary/40"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-text leading-tight">admin</p>
              <p className="text-[10px] text-muted leading-tight">Lead Engineer</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted hidden lg:block" />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {profileDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setProfileDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-2xl z-40 overflow-hidden"
                >
                  <div className="p-3 border-b border-border bg-surface-100">
                    <p className="text-xs font-semibold text-text">admin</p>
                    <p className="text-[11px] text-muted font-mono">admin@devpulse.ai</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-secondary/20 text-secondary border border-secondary/30">
                      Enterprise Admin
                    </span>
                  </div>

                  <div className="p-1.5 space-y-1">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-muted hover:text-text hover:bg-surface-200 transition-colors"
                    >
                      <User className="w-4 h-4 text-primary" /> Profile Overview
                    </button>
                    <button
                      onClick={() => {
                        navigate('/settings');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-muted hover:text-text hover:bg-surface-200 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-secondary" /> Settings & API Keys
                    </button>
                    <button
                      onClick={() => {
                        navigate('/health');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-muted hover:text-text hover:bg-surface-200 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-success" /> Codebase Audit
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
