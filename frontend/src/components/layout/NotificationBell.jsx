import React, { useState } from 'react';
import { Bell, Check, Bug, ShieldAlert, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'High Severity Bug Detected',
      message: 'Uncaught Promise Rejection in Payment retry loop.',
      time: '10m ago',
      unread: true,
      icon: ShieldAlert,
      color: 'text-danger'
    },
    {
      id: 2,
      title: 'OpenAPI Docs Regenerated',
      message: 'Swagger 3.0 specs updated for /api/v2 endpoints.',
      time: '1h ago',
      unread: true,
      icon: Sparkles,
      color: 'text-secondary'
    },
    {
      id: 3,
      title: 'Repository Sync Complete',
      message: '312 files indexed into Qdrant vector store.',
      time: '3h ago',
      unread: false,
      icon: Bug,
      color: 'text-primary'
    }
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-surface-100 border border-border text-muted hover:text-text hover:bg-surface-200 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-card animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl z-40 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-surface-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-text">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary/20 text-primary border border-primary/30 font-mono">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-primary hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-border/50">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className={`p-3.5 flex items-start gap-3 hover:bg-surface-200/50 transition-colors ${
                        n.unread ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-surface-200 border border-border ${n.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-semibold text-text">{n.title}</h4>
                          <span className="text-[10px] text-muted">{n.time}</span>
                        </div>
                        <p className="text-xs text-muted mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-2.5 border-t border-border bg-surface-100 text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-muted hover:text-text"
                >
                  Close panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
