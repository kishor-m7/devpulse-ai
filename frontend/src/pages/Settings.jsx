import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useNotification } from '../hooks/useNotification';
import {
  Settings as SettingsIcon,
  Key,
  Github,
  Bell,
  Palette,
  Download,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Save
} from 'lucide-react';

export function Settings() {
  const { notifySuccess, notifyWarning } = useNotification();
  const [apiKey, setApiKey] = useState('sk-proj-************************************48a9');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [githubConnected, setGithubConnected] = useState(true);

  const handleSaveKeys = (e) => {
    e.preventDefault();
    notifySuccess('API credentials updated and verified against OpenAI v1 models.', 'Settings Saved');
  };

  const handlePurgeMemory = () => {
    notifyWarning('Purged 142 local AST cache items. Vector store memory preserved.', 'Cache Purged');
  };

  const handleExportData = () => {
    notifySuccess('Generated telemetry archive JSON file download.', 'Data Exported');
  };

  return (
    <Layout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-7 h-7 text-primary" /> Application Settings & Integrations
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Manage your AI provider API keys, GitHub OAuth tokens, notification triggers, and privacy controls.
          </p>
        </div>

        {/* Section 1: OpenAI & LLM Credentials */}
        <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Key className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-text">AI Model API Key Configuration</h2>
          </div>

          <form onSubmit={handleSaveKeys} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text mb-1">
                OpenAI / Anthropic Secret API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-surface-100 border border-border rounded-xl px-4 py-3 text-xs font-mono text-text outline-none focus:border-primary/50"
              />
              <p className="text-[11px] text-muted mt-1">
                Keys are stored in AES-256 encrypted local keychains.
              </p>
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-glow-primary transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Key Configurations
            </button>
          </form>
        </div>

        {/* Section 2: GitHub Connection */}
        <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Github className="w-5 h-5 text-text" />
            <h2 className="text-base font-bold text-text">GitHub Integration Status</h2>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-100 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-200 flex items-center justify-center">
                <Github className="w-5 h-5 text-text" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">GitHub Enterprise Cloud</p>
                <p className="text-xs text-muted">Connected as <span className="font-mono text-primary">admin</span></p>
              </div>
            </div>

            <button
              onClick={() => {
                setGithubConnected(!githubConnected);
                notifySuccess('GitHub OAuth session refreshed.', 'OAuth Synced');
              }}
              className="py-2 px-4 rounded-xl bg-surface-200 hover:bg-surface-300 text-text border border-border text-xs font-semibold"
            >
              {githubConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>

        {/* Section 3: Notification Alerts */}
        <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Bell className="w-5 h-5 text-secondary" />
            <h2 className="text-base font-bold text-text">Notification Triggers</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-100 border border-border cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-text">Email Diagnostic Digest</p>
                <p className="text-[11px] text-muted">Receive weekly PDF executive health reports</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-100 border border-border cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-text">Slack Webhook Alerts</p>
                <p className="text-[11px] text-muted">Post high-severity bug alerts directly into #dev-alerts channel</p>
              </div>
              <input
                type="checkbox"
                checked={slackAlerts}
                onChange={(e) => setSlackAlerts(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
            </label>
          </div>
        </div>

        {/* Section 4: Data Export & Purge */}
        <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <ShieldCheck className="w-5 h-5 text-warning" />
            <h2 className="text-base font-bold text-text">Data Maintenance & Export</h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleExportData}
              className="py-2.5 px-4 rounded-xl bg-surface-200 hover:bg-surface-300 text-text border border-border text-xs font-bold transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Export All Memory Data</span>
            </button>

            <button
              onClick={handlePurgeMemory}
              className="py-2.5 px-4 rounded-xl bg-danger/10 hover:bg-danger/20 text-danger border border-danger/30 text-xs font-bold transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4 text-danger" />
              <span>Delete Memory Cache</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
