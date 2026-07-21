import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { ChartCard } from '../components/ChartCard';
import { HealthCard } from '../components/HealthCard';
import { AIInsightCard } from '../components/AIInsightCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import { useNotification } from '../hooks/useNotification';
import {
  Activity,
  ShieldCheck,
  Zap,
  FileCode2,
  Bug,
  Clock,
  Layers,
  FileX,
  Copy,
  FileText,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';

export function ProjectHealth() {
  const { notifySuccess } = useNotification();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await apiService.getHealthMetrics();
        setMetrics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  const suggestions = [
    {
      title: 'Remove 14 Unused Utility Files',
      type: 'Unused Files',
      impact: 'High',
      description: 'Found legacy test helpers in /src/utils/legacy/ that are unreferenced in AST graph.',
      icon: FileX,
      action: 'Purge Unused Files'
    },
    {
      title: 'Refactor Duplicate JWT Decoding Block',
      type: 'Duplicate Code',
      impact: 'Medium',
      description: 'Identified 92% token validation similarity between authController.js & adminGuard.js.',
      icon: Copy,
      action: 'Consolidate to Middleware'
    },
    {
      title: 'Generate Missing API Endpoints Spec',
      type: 'Missing API Docs',
      impact: 'Low',
      description: '4 microservice routes in /api/v2/analytics lack OpenAPI parameter schemas.',
      icon: FileText,
      action: 'Generate OpenAPI Spec'
    },
    {
      title: 'Decompose Large Component (Dashboard.jsx)',
      type: 'Large Components',
      impact: 'Medium',
      description: 'File exceeds 600 lines of code. Split into sub-components for better reactivity performance.',
      icon: Maximize2,
      action: 'Extract Sub-Components'
    }
  ];

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner text="Performing deep AST audit and computing Radar telemetry..." size="large" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Top Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 font-mono">
              CONTINUOUS HEALTH AUDIT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
            Codebase Health & Debt Center
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Radar diagnostics measuring security compliance, maintainability index, and technical debt.
          </p>
        </div>

        {/* 6 Circular Progress Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <HealthCard
            title="Performance"
            score={metrics.performance}
            change={1.2}
            subtitle="Runtime Speed"
            icon={Zap}
            color="secondary"
          />
          <HealthCard
            title="Security"
            score={metrics.security}
            change={0.5}
            subtitle="Zero Vulnerabilities"
            icon={ShieldCheck}
            color="success"
          />
          <HealthCard
            title="Testing"
            score={metrics.testing}
            change={3.4}
            subtitle="Unit & Integration"
            icon={Activity}
            color="primary"
          />
          <HealthCard
            title="Documentation"
            score={metrics.documentation}
            change={2.0}
            subtitle="API Coverage"
            icon={FileCode2}
            color="warning"
          />
          <HealthCard
            title="Maintainability"
            score={metrics.maintainability}
            change={1.8}
            subtitle="Clean Architecture"
            icon={Bug}
            color="primary"
          />
          <HealthCard
            title="Technical Debt"
            score={82}
            change={-4.5}
            subtitle="14.5 Hours Est."
            icon={Clock}
            color="danger"
          />
        </div>

        {/* Radar & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Health Chart */}
          <ChartCard
            title="Health Vector Radar Analysis"
            subtitle="Multi-dimensional codebase strength benchmarking"
          >
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metrics.radarData}>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#1E293B" />
                <Radar
                  name="DevPulse Benchmark"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.4}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Tech Debt Overview Box */}
          <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-text">Technical Debt Summary</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-warning/10 text-warning border border-warning/30 font-semibold">
                  14.5 Hours Needed
                </span>
              </div>
              <p className="text-xs text-muted mb-4 leading-relaxed">
                DevPulse AI continuously evaluates AST code complexity, cyclomatic metrics, and duplication to estimate hours required to achieve 98% maintainability.
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-surface-100 border border-border flex items-center justify-between text-xs">
                  <span className="text-muted font-medium">Unused Code Bloat</span>
                  <span className="font-mono font-bold text-text">2.4 MB</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-100 border border-border flex items-center justify-between text-xs">
                  <span className="text-muted font-medium">Duplicate Code Blocks</span>
                  <span className="font-mono font-bold text-text">12 Instances</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-100 border border-border flex items-center justify-between text-xs">
                  <span className="text-muted font-medium">Outdated Dependencies</span>
                  <span className="font-mono font-bold text-success">0 Vulnerabilities</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => notifySuccess('Auto-refactoring workflow started in background.', 'Clean Up Enqueued')}
              className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-glow-primary transition-all text-center"
            >
              Autonomously Clean Technical Debt
            </button>
          </div>
        </div>

        {/* Code Debt AI Recommendations List */}
        <div>
          <h2 className="text-lg font-bold text-text mb-4">Actionable Codebase Optimization Recommendations</h2>
          <div className="space-y-4">
            {suggestions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <AIInsightCard
                  key={idx}
                  title={item.title}
                  impact={item.impact}
                  description={item.description}
                  actionText={item.action}
                  onAction={() => notifySuccess(`Action "${item.action}" executed successfully!`, 'Patch Applied')}
                  category={item.type}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
