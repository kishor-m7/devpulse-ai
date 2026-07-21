import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Upload,
  Github,
  Play,
  MessageSquareCode,
  Bug,
  FileCode2,
  BrainCircuit,
  Activity,
  ShieldCheck,
  Zap,
  CheckCircle2,
  X,
  Star
} from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';

export function Landing() {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const features = [
    {
      title: 'AI Code Chat',
      description: 'Ask deep architectural questions. DevPulse searches AST vectors to explain any component, flow, or dependency.',
      icon: MessageSquareCode,
      badge: 'Neural RAG',
      path: '/chat'
    },
    {
      title: 'Bug Detective',
      description: 'Drop raw crash logs, ZIPs, or trace dumps. Instant diagnostic analysis with root cause analysis & code diff patches.',
      icon: Bug,
      badge: '96% Accuracy',
      path: '/bugs'
    },
    {
      title: 'Automated Documentation',
      description: 'Auto-generate OpenAPI specs, READMEs, installation workflows, and architecture diagrams synchronized with main branch.',
      icon: FileCode2,
      badge: 'Zero Maintenance',
      path: '/docs'
    },
    {
      title: 'Project Memory',
      description: 'Autonomous long-term memory tracking why architectural decisions were made, previous bug patches, and API evolutions.',
      icon: BrainCircuit,
      badge: 'Semantic Graph',
      path: '/memory'
    },
    {
      title: 'Project Health Audit',
      description: 'Real-time telemetry measuring technical debt, unused modules, duplicate logic, security vulnerability scores.',
      icon: Activity,
      badge: 'Continuous CI',
      path: '/health'
    },
    {
      title: 'Repository Sync',
      description: 'Direct GitHub & GitLab integration. Automatic AST vectorization triggers on every Pull Request merge.',
      icon: ShieldCheck,
      badge: 'Enterprise Security',
      path: '/repository'
    }
  ];

  const pricingTiers = [
    {
      name: 'Developer',
      price: billingCycle === 'monthly' ? '$29' : '$24',
      description: 'Perfect for solo developers & open-source maintainers.',
      features: [
        '5 Repositories indexed',
        '100 Bug Detective scans / mo',
        'Standard GPT-4o RAG Search',
        'Community Support'
      ],
      cta: 'Start Free Trial',
      highlight: false
    },
    {
      name: 'Pro Team',
      price: billingCycle === 'monthly' ? '$79' : '$65',
      description: 'For growing startup teams seeking rapid velocity.',
      features: [
        'Unlimited Repositories',
        'Unlimited Bug Detective scans',
        'Deep AST Context Memory',
        'Automated OpenAPI Generator',
        '24/7 Priority Support'
      ],
      cta: 'Upgrade to Pro',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Dedicated VPC deployment & custom LLM fine-tuning.',
      features: [
        'On-Premises / VPC Deployment',
        'SOC2 & HIPAA Compliance',
        'Custom Fine-Tuned Code Models',
        'Dedicated Solutions Architect',
        '99.99% Uptime SLA'
      ],
      cta: 'Contact Enterprise',
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text overflow-x-hidden relative">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-primary/20 via-secondary/15 to-transparent blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-gradient-to-l from-secondary/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-glow-primary">
              <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-text">
                DevPulse <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
            <a href="#features" className="hover:text-text transition-colors">Features</a>
            <a href="#demo" className="hover:text-text transition-colors">Live Demo</a>
            <a href="#pricing" className="hover:text-text transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-text transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="py-2.5 px-5 rounded-xl text-xs font-bold bg-gradient-to-r from-primary to-secondary text-white shadow-glow-primary hover:opacity-95 transition-all flex items-center gap-2"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-200/80 border border-primary/30 text-xs font-semibold text-primary mb-6 shadow-glow-primary"
        >
          <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
          <span>DevPulse AI 2.4 Engine Release</span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          <span className="text-muted">Multi-Repo RAG Supported</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1]"
        >
          The AI teammate that understands your{' '}
          <span className="glow-gradient-text">entire codebase.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed"
        >
          DevPulse AI indexes your repositories, diagnoses complex bugs, generates synchronized documentation, and maintains long-term architectural memory.
        </motion.p>

        {/* Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/bugs')}
            className="py-3.5 px-6 rounded-2xl text-sm font-bold bg-primary hover:bg-primary-hover text-white shadow-glow-primary transition-all flex items-center gap-2.5"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Repository</span>
          </button>

          <button
            onClick={() => navigate('/repository')}
            className="py-3.5 px-6 rounded-2xl text-sm font-bold bg-surface-200 hover:bg-surface-300 text-text border border-border transition-all flex items-center gap-2.5"
          >
            <Github className="w-4 h-4 text-text" />
            <span>Connect GitHub</span>
          </button>

          <button
            onClick={() => setDemoModalOpen(true)}
            className="py-3.5 px-6 rounded-2xl text-sm font-bold bg-surface-100 hover:bg-surface-200 text-secondary border border-secondary/30 transition-all flex items-center gap-2.5"
          >
            <Play className="w-4 h-4 fill-secondary" />
            <span>Watch Demo</span>
          </button>
        </motion.div>

        {/* Floating Code Preview Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 glass-panel p-4 sm:p-6 rounded-3xl border border-border/80 bg-card/90 max-w-4xl mx-auto shadow-2xl text-left relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-danger/80" />
              <span className="w-3 h-3 rounded-full bg-warning/80" />
              <span className="w-3 h-3 rounded-full bg-success/80" />
              <span className="ml-2 font-mono text-xs text-muted">devpulse-live-agent.ts</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-success/10 text-success border border-success/30 font-mono">
              Live Neural RAG Active
            </span>
          </div>

          <div className="font-mono text-xs sm:text-sm text-text space-y-2 leading-relaxed">
            <p className="text-muted">// Asking DevPulse AI about auth retry deadlock...</p>
            <p className="text-secondary">&gt; DevPulse AI: Analyzing 312 files across 4 microservices...</p>
            <div className="p-3.5 rounded-xl bg-surface-100 border border-border text-xs text-text space-y-1">
              <p className="text-success font-semibold">✓ Found issue in src/services/authService.ts (Line 142)</p>
              <p className="text-muted">Uncaught Redis lock expiration during Postgres transaction retry loop.</p>
              <p className="text-primary font-mono font-medium">+ Patch generated: Replaced block with Redis Lock KeepAlive Renewal</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Built for modern engineering teams demanding <span className="glow-gradient-text">extreme velocity.</span>
          </h2>
          <p className="text-muted text-sm sm:text-base mt-4">
            Stop losing hours hunting trace errors and manually writing API docs. DevPulse AI operates as your 24/7 senior architect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <FeatureCard
              key={idx}
              title={feat.title}
              description={feat.description}
              icon={feat.icon}
              badge={feat.badge}
              onClick={() => navigate(feat.path)}
            />
          ))}
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto bg-surface-50/50 border-y border-border">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Transparent pricing for teams of any scale.
          </h2>
          <p className="text-muted text-sm mt-3">Start free, upgrade when your codebase expands.</p>

          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-surface-200 border border-border mt-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                billingCycle === 'monthly' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-text'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                billingCycle === 'annual' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-text'
              }`}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`glass-panel p-8 rounded-3xl border flex flex-col justify-between relative ${
                tier.highlight
                  ? 'border-primary bg-primary/10 shadow-glow-primary scale-105 z-10'
                  : 'border-border bg-card/80'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold bg-primary text-white uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-xl font-bold text-text">{tier.name}</h3>
                <p className="text-xs text-muted mt-1">{tier.description}</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-text">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-xs text-muted"> / month</span>}
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-text">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate('/dashboard')}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                  tier.highlight
                    ? 'bg-primary hover:bg-primary-hover text-white shadow-glow-primary'
                    : 'bg-surface-200 hover:bg-surface-300 text-text border border-border'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Loved by senior architects & engineering leaders.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'DevPulse AI diagnosed a 3-week payment gateway race condition in less than 45 seconds. Absolutely indispensable.',
              author: 'Alex Rivera',
              role: 'VP of Engineering at FinScale'
            },
            {
              quote: 'The automated OpenAPI spec generation saved our backend team over 80 hours of repetitive documentation work.',
              author: 'Elena Rostova',
              role: 'Lead Architect at CloudPulse'
            },
            {
              quote: 'Project Memory is pure magic. New engineers can ask why design decisions were made 6 months ago.',
              author: 'Marcus Chen',
              role: 'CTO at NextLayer'
            }
          ].map((t, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-border bg-card/70">
              <div className="flex gap-1 text-warning mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning" />
                ))}
              </div>
              <p className="text-xs text-text italic leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <p className="text-xs font-bold text-text">{t.author}</p>
                <p className="text-[11px] text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-card">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold text-text">DevPulse AI</span>
            <span>© 2026 DevPulse Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-text">Privacy Policy</a>
            <a href="#" className="hover:text-text">Terms of Service</a>
            <a href="#" className="hover:text-text">Security Standard</a>
            <a href="#" className="hover:text-text">Status Page</a>
          </div>
        </div>
      </footer>

      {/* Video Demo Modal */}
      <AnimatePresence>
        {demoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDemoModalOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="p-4 border-b border-border flex items-center justify-between bg-surface-100">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-text">DevPulse AI Product Walkthrough</span>
                </div>
                <button
                  onClick={() => setDemoModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-surface-200 text-muted hover:text-text"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video bg-black flex items-center justify-center relative p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center mx-auto animate-pulse">
                    <Play className="w-8 h-8 fill-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text">Interactive Sandbox Demo Ready</h3>
                  <p className="text-xs text-muted max-w-md mx-auto">
                    Click Launch Platform to test live AI chat, bug detective, and automated doc generation directly in your browser.
                  </p>
                  <button
                    onClick={() => {
                      setDemoModalOpen(false);
                      navigate('/dashboard');
                    }}
                    className="py-2.5 px-6 rounded-xl text-xs font-bold bg-primary text-white shadow-glow-primary"
                  >
                    Launch Interactive App
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
