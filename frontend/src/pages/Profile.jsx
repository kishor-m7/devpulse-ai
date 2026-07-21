import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { ActivityCard } from '../components/ActivityCard';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import {
  User,
  Zap,
  FolderGit2,
  BrainCircuit,
  FileCode2,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';

export function Profile() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        const [p, r, a] = await Promise.all([
          apiService.getUserProfile(),
          apiService.getRepositories(),
          apiService.getRecentActivity()
        ]);
        setProfile(p);
        setRepos(r);
        setActivities(a);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfileData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner text="Fetching user tokens and activity telemetry..." size="large" />
      </Layout>
    );
  }

  const tokenUsagePercentage = Math.round(
    (profile.tokensUsedThisMonth / profile.tokenLimit) * 100
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Profile User Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-border bg-card/80 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="relative">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary/40 shadow-glow-primary"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="text-center md:text-left flex-1 space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-text tracking-tight">{profile.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary/20 text-secondary border border-secondary/30">
                {profile.plan}
              </span>
            </div>
            <p className="text-xs text-muted font-mono">{profile.email} • {profile.role}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3 text-xs">
              <span className="flex items-center gap-1 text-text font-semibold">
                <FolderGit2 className="w-4 h-4 text-primary" /> {profile.activeReposCount} Repositories
              </span>
              <span className="flex items-center gap-1 text-text font-semibold">
                <Zap className="w-4 h-4 text-warning" /> {profile.aiFixesApplied} AI Fixes Applied
              </span>
              <span className="flex items-center gap-1 text-text font-semibold">
                <FileCode2 className="w-4 h-4 text-secondary" /> {profile.docsGeneratedCount} Docs Generated
              </span>
            </div>
          </div>
        </div>

        {/* Token Usage Card */}
        <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-text flex items-center gap-2">
                <Zap className="w-4 h-4 text-warning" /> Monthly AI Tokens Consumption
              </h3>
              <p className="text-xs text-muted">GPT-4o AST Neural Vector Engine</p>
            </div>
            <span className="font-mono text-xs font-bold text-primary">
              {profile.tokensUsedThisMonth.toLocaleString()} / {profile.tokenLimit.toLocaleString()} Tokens
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-surface-200 overflow-hidden p-0.5 border border-border">
            <div
              style={{ width: `${tokenUsagePercentage}%` }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
            />
          </div>
          <p className="text-[11px] text-muted text-right">
            {tokenUsagePercentage}% consumed • Renews in 10 days
          </p>
        </div>

        {/* User Repositories & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Repositories */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-text">Assigned Repositories</h2>
            <div className="space-y-3">
              {repos.map((r) => (
                <ProjectCard key={r.id} repo={r} onSelect={() => {}} />
              ))}
            </div>
          </div>

          {/* User Activity Timeline */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-text">Recent Developer Activity</h2>
            <div className="glass-panel p-4 rounded-2xl border border-border bg-card/80 space-y-1">
              {activities.map((act) => (
                <ActivityCard key={act.id} activity={act} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
