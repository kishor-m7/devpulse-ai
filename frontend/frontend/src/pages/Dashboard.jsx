import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HealthCard } from '../components/HealthCard';
import { ChartCard } from '../components/ChartCard';
import { ActivityCard } from '../components/ActivityCard';
import { AIInsightCard } from '../components/AIInsightCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import { useRepository } from '../contexts/RepositoryContext';
import { useNotification } from '../hooks/useNotification';
import {
  ShieldCheck,
  Zap,
  FileCode2,
  Bug,
  Activity,
  ArrowRight,
  GitCommit,
  Sparkles,
  RefreshCw,
  Plus,
  MessageSquareCode
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export function Dashboard() {
  const navigate = useNavigate();
  const { activeRepo } = useRepository();
  const { notifySuccess } = useNotification();
  const [metrics, setMetrics] = useState(null);
  const [activities, setActivities] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [m, a, b] = await Promise.all([
          apiService.getHealthMetrics(),
          apiService.getRecentActivity(),
          apiService.getBugs()
        ]);
        setMetrics(m);
        setActivities(a);
        setBugs(b);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const languagePieData = activeRepo?.languages || [
    { name: 'TypeScript', percentage: 68, color: '#3178C6' },
    { name: 'JavaScript', percentage: 18, color: '#F7DF1E' },
    { name: 'Python', percentage: 9, color: '#3776AB' },
    { name: 'Docker', percentage: 5, color: '#2496ED' }
  ];

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner text="Computing real-time codebase health metrics..." size="large" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 font-mono">
                REPO: {activeRepo ? activeRepo.name : 'devpulse-core-api'}
              </span>
              <span className="text-xs text-muted">Synced 12 mins ago</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Codebase Executive Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                notifySuccess('Rescanned AST vectors for active repository.', 'Sync Complete');
              }}
              className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-surface-200 hover:bg-surface-300 text-text border border-border transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-secondary" />
              <span>Rescan AST</span>
            </button>

            <button
              onClick={() => navigate('/chat')}
              className="py-2 px-4 rounded-xl text-xs font-semibold bg-primary hover:bg-primary-hover text-white shadow-glow-primary transition-all flex items-center gap-2"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>Ask AI Agent</span>
            </button>
          </div>
        </div>

        {/* AI Action Insight Banner */}
        <AIInsightCard
          title="Potential Memory Leak in WebSocket Retry Loop"
          impact="High (+14% RAM overhead)"
          description="DevPulse AI detected unhandled event listener accumulation during connection drops in socketPool.ts."
          actionText="Apply Automated Patch"
          onAction={() => {
            notifySuccess('Patch created and queued for PR creation!', 'Fix Applied');
            navigate('/bugs');
          }}
          category="Performance Alert"
        />

        {/* Top 5 Health Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <HealthCard
            title="Overall Health"
            score={metrics.overall}
            change={3.2}
            subtitle="Combined Score"
            icon={Activity}
            color="primary"
          />
          <HealthCard
            title="Security Score"
            score={metrics.security}
            change={1.5}
            subtitle="Vulnerability Free"
            icon={ShieldCheck}
            color="success"
          />
          <HealthCard
            title="Performance"
            score={metrics.performance}
            change={-0.8}
            subtitle="Execution Latency"
            icon={Zap}
            color="secondary"
          />
          <HealthCard
            title="Documentation"
            score={metrics.documentation}
            change={4.0}
            subtitle="API Coverage"
            icon={FileCode2}
            color="warning"
          />
          <HealthCard
            title="Maintainability"
            score={metrics.maintainability}
            change={2.1}
            subtitle="Clean Code Index"
            icon={Bug}
            color="primary"
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Quality Trend */}
          <ChartCard
            title="Codebase Quality Trend"
            subtitle="Health vs Test Coverage over 6 months"
            className="lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={metrics.qualityTrend}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="health" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" name="Health Score" />
                <Area type="monotone" dataKey="coverage" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorCoverage)" name="Test Coverage %" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 2: Commits vs AI Refactors */}
          <ChartCard
            title="Manual Commits vs AI Refactors"
            subtitle="Weekly productivity comparison"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={metrics.commitsVsAi}>
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }}
                />
                <Bar dataKey="manualCommits" fill="#1E293B" radius={[4, 4, 0, 0]} name="Manual" />
                <Bar dataKey="aiRefactors" fill="#3B82F6" radius={[4, 4, 0, 0]} name="AI Assisted" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Secondary Row: Activity, Recent Bugs & Language Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text">Recent Activity</h3>
              <button
                onClick={() => navigate('/memory')}
                className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
              >
                View History <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1">
              {activities.map((act) => (
                <ActivityCard key={act.id} activity={act} />
              ))}
            </div>
          </div>

          {/* Active Bugs */}
          <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text">Active Bug Alerts</h3>
              <button
                onClick={() => navigate('/bugs')}
                className="text-xs text-danger font-medium hover:underline flex items-center gap-1"
              >
                Investigate <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {bugs.map((b) => (
                <div key={b.id} className="p-3.5 rounded-xl bg-surface-100 border border-border/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-danger">{b.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-danger/10 text-danger border border-danger/30 font-semibold">
                      {b.confidence}% Confidence
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-text line-clamp-1">{b.title}</h4>
                  <p className="text-[11px] text-muted line-clamp-2">{b.rootCause}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Language Overview */}
          <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-text mb-1">Language Distribution</h3>
              <p className="text-xs text-muted mb-4">AST Vector Index for active repository</p>

              <div className="h-[180px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languagePieData}
                      dataKey="percentage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {languagePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-xs">
              {languagePieData.map((l, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="text-muted font-medium truncate">{l.name}</span>
                  <span className="font-mono text-text font-bold ml-auto">{l.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
