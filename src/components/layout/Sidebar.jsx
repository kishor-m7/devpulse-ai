import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderGit2,
  MessageSquareCode,
  Bug,
  FileCode2,
  Activity,
  BrainCircuit,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Sparkles
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/repository', label: 'Repository', icon: FolderGit2 },
  { path: '/chat', label: 'AI Chat', icon: MessageSquareCode, badge: 'AI' },
  { path: '/bugs', label: 'Bug Detective', icon: Bug },
  { path: '/docs', label: 'Documentation', icon: FileCode2 },
  { path: '/health', label: 'Project Health', icon: Activity },
  { path: '/memory', label: 'Project Memory', icon: BrainCircuit },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/profile', label: 'Profile', icon: User },
];

export function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 bottom-0 z-40 bg-card border-r border-border flex flex-col justify-between shadow-2xl backdrop-blur-xl"
    >
      {/* Top Section */}
      <div className="flex flex-col h-full">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/60">
          <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 flex-shrink-0 shadow-glow-primary">
              <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
              </div>
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="whitespace-nowrap"
                >
                  <span className="font-bold text-lg text-text tracking-tight flex items-center gap-1.5">
                    DevPulse <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-mono">AI</span>
                  </span>
                  <p className="text-[10px] text-muted -mt-1 font-mono">v2.4 Enterprise</p>
                </motion.div>
              )}
            </AnimatePresence>
          </NavLink>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-surface-200 text-muted hover:text-text hover:bg-surface-300 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-1.5 scrollbar-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-text font-medium border border-primary/30 shadow-glow-primary'
                      : 'text-muted hover:text-text hover:bg-surface-200/60'
                  }`
                }
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted group-hover:text-text'
                }`} />

                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap"
                    >
                      <span className="text-sm tracking-wide">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-secondary/20 text-secondary border border-secondary/30">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Upgrade Banner (Visible when expanded) */}
        {!collapsed && (
          <div className="m-3 p-3.5 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-card border border-primary/20 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-primary">
              <Zap className="w-4 h-4 text-warning" />
              <span>Full Codebase Indexing</span>
            </div>
            <p className="text-[11px] text-muted mb-2.5">312 files synced with Qdrant Vector Engine.</p>
            <button
              onClick={() => navigate('/repository')}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-medium bg-primary text-white hover:bg-primary-hover shadow-glow-primary transition-all text-center"
            >
              Manage Repos
            </button>
          </div>
        )}

        {/* Logout Section */}
        <div className="p-3 border-t border-border/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:text-danger hover:bg-danger/10 transition-all group"
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
            {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
