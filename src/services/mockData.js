/**
 * Mock Data for DevPulse AI
 */

export const mockRepositories = [
  {
    id: 'repo-1',
    name: 'devpulse-core-api',
    branch: 'main',
    stars: 342,
    forks: 48,
    language: 'TypeScript / Node.js',
    lastSync: '2026-07-21T14:30:00Z',
    status: 'Healthy',
    healthScore: 94,
    size: '42.8 MB',
    filesCount: 312,
    languages: [
      { name: 'TypeScript', percentage: 68, color: '#3178C6' },
      { name: 'JavaScript', percentage: 18, color: '#F7DF1E' },
      { name: 'Python', percentage: 9, color: '#3776AB' },
      { name: 'Docker', percentage: 5, color: '#2496ED' }
    ]
  },
  {
    id: 'repo-2',
    name: 'devpulse-web-dashboard',
    branch: 'main',
    stars: 128,
    forks: 14,
    language: 'React / Tailwind',
    lastSync: '2026-07-21T18:10:00Z',
    status: 'Healthy',
    healthScore: 92,
    size: '18.4 MB',
    filesCount: 145,
    languages: [
      { name: 'React (JSX)', percentage: 82, color: '#61DAFB' },
      { name: 'CSS', percentage: 12, color: '#1572B6' },
      { name: 'HTML', percentage: 6, color: '#E34F26' }
    ]
  },
  {
    id: 'repo-3',
    name: 'payment-microservice',
    branch: 'feature/stripe-v2',
    stars: 89,
    forks: 9,
    language: 'Go',
    lastSync: '2026-07-20T09:15:00Z',
    status: 'Needs Attention',
    healthScore: 78,
    size: '12.1 MB',
    filesCount: 88,
    languages: [
      { name: 'Go', percentage: 94, color: '#00ADD8' },
      { name: 'Shell', percentage: 6, color: '#89E051' }
    ]
  }
];

export const mockHealthMetrics = {
  overall: 94,
  security: 98,
  performance: 92,
  maintainability: 88,
  documentation: 95,
  testing: 89,
  techDebtHours: 14.5,
  radarData: [
    { subject: 'Security', score: 98, fullMark: 100 },
    { subject: 'Performance', score: 92, fullMark: 100 },
    { subject: 'Testing', score: 89, fullMark: 100 },
    { subject: 'Documentation', score: 95, fullMark: 100 },
    { subject: 'Maintainability', score: 88, fullMark: 100 },
    { subject: 'Architecture', score: 96, fullMark: 100 },
  ],
  qualityTrend: [
    { month: 'Jan', health: 82, bugs: 24, coverage: 74 },
    { month: 'Feb', health: 85, bugs: 18, coverage: 78 },
    { month: 'Mar', health: 88, bugs: 14, coverage: 82 },
    { month: 'Apr', health: 89, bugs: 12, coverage: 85 },
    { month: 'May', health: 91, bugs: 8, coverage: 87 },
    { month: 'Jun', health: 94, bugs: 5, coverage: 91 },
  ],
  commitsVsAi: [
    { day: 'Mon', manualCommits: 14, aiRefactors: 28 },
    { day: 'Tue', manualCommits: 22, aiRefactors: 35 },
    { day: 'Wed', manualCommits: 18, aiRefactors: 42 },
    { day: 'Thu', manualCommits: 25, aiRefactors: 50 },
    { day: 'Fri', manualCommits: 30, aiRefactors: 65 },
    { day: 'Sat', manualCommits: 8, aiRefactors: 15 },
    { day: 'Sun', manualCommits: 4, aiRefactors: 10 },
  ]
};

export const mockRecentActivity = [
  {
    id: 'act-1',
    user: 'Kishor (Lead Architect)',
    action: 'Merged PR #142: Upgraded JWT validation & Session Caching',
    time: '12 mins ago',
    type: 'commit',
    badge: 'Security Fix'
  },
  {
    id: 'act-2',
    user: 'DevPulse AI',
    action: 'Detected memory leak in WebSocket connection pool (fixed automatically)',
    time: '45 mins ago',
    type: 'ai',
    badge: 'Auto-Fix'
  },
  {
    id: 'act-3',
    user: 'DevPulse AI',
    action: 'Generated OpenAPI 3.0 specs for /api/v2/analytics endpoints',
    time: '2 hours ago',
    type: 'doc',
    badge: 'Docs'
  },
  {
    id: 'act-4',
    user: 'Sarah Connor',
    action: 'Ran Bug Detective on production crash log #9902',
    time: '4 hours ago',
    type: 'bug',
    badge: 'Investigation'
  }
];

export const mockBugs = [
  {
    id: 'BUG-4091',
    title: 'Unhandled Promise Rejection in Payment Webhook Retry Loop',
    severity: 'High',
    confidence: 96,
    status: 'Analyzed',
    detectedAt: '2026-07-21T16:20:00Z',
    rootCause: 'Exponential backoff fails to catch network socket timeouts when Stripe API exceeds 5000ms response threshold, causing unhandled rejection in Node event loop.',
    affectedFiles: ['src/services/stripe.ts', 'src/listeners/webhookListener.ts'],
    suggestedFix: `// File: src/services/stripe.ts
- await retryLoop(webhookPayload);
+ try {
+   await retryWithBackoff(webhookPayload, { timeoutMs: 5000, maxRetries: 3 });
+ } catch (err) {
+   logger.error('Payment webhook retry exhausted', { err, payloadId: webhookPayload.id });
+   await deadLetterQueue.push(webhookPayload);
+ }`,
    timeline: [
      { step: 'Log Ingestion', status: 'Completed', time: '16:20:02' },
      { step: 'AST Code Mapping', status: 'Completed', time: '16:20:05' },
      { step: 'AI Hypothesis Synthesis', status: 'Completed', time: '16:20:12' },
      { step: 'Patch Generation', status: 'Completed', time: '16:20:18' }
    ]
  },
  {
    id: 'BUG-3820',
    title: 'Memory Overhead during Large CSV Export Streaming',
    severity: 'Medium',
    confidence: 91,
    status: 'Patched',
    detectedAt: '2026-07-20T11:45:00Z',
    rootCause: 'CSV exporter accumulates entire database query result in V8 heap array instead of piping Node ReadableStreams directly to response buffer.',
    affectedFiles: ['src/controllers/exportController.js'],
    suggestedFix: `// Streaming response optimization
- const data = await DB.findAll();
- res.send(csvGenerator(data));
+ const cursor = DB.findCursor();
+ cursor.pipe(new CSVTransformStream()).pipe(res);`,
    timeline: [
      { step: 'Log Ingestion', status: 'Completed', time: '11:45:00' },
      { step: 'Patch Applied', status: 'Completed', time: '11:46:10' }
    ]
  }
];

export const mockDocumentation = [
  {
    id: 'doc-readme',
    title: 'README.md Generator',
    type: 'README',
    description: 'Comprehensive repo overview, badge indicators, architecture diagram & quickstart guide.',
    lastGenerated: '2 hours ago',
    content: `# DevPulse Core API

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Coverage](https://img.shields.io/badge/coverage-94%25-blue) ![License](https://img.shields.io/badge/license-MIT-purple)

**DevPulse Core API** is the underlying high-performance microservice engine powering real-time codebase ingestion, AST vectorization, and neural code search.

## Features
- **Instant AST Parsing**: Parses TypeScript, Go, Python, and Rust in under 50ms.
- **Vector Indexing**: Built-in Qdrant/Pinecone embeddings sync.
- **Autonomous Patching**: Self-correcting linting and bug diagnostic loops.

## Quickstart
\`\`\`bash
git clone https://github.com/devpulse/devpulse-core.git
cd devpulse-core
npm install
npm run dev
\`\`\`
`
  },
  {
    id: 'doc-swagger',
    title: 'Swagger / OpenAPI 3.0',
    type: 'Swagger Docs',
    description: 'Auto-synchronized REST & WebSocket API specs with schema definitions.',
    lastGenerated: '5 hours ago',
    content: `openapi: 3.0.3
info:
  title: DevPulse AI API
  version: 2.4.0
  description: Endpoints for triggering AI code reviews and bug diagnostics.
paths:
  /api/v1/analyze:
    post:
      summary: Analyze Code snippet or log dump
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                code: { type: string }
                language: { type: string }
      responses:
        '200':
          description: Analysis successfully generated
`
  },
  {
    id: 'doc-arch',
    title: 'System Architecture Document',
    type: 'Architecture',
    description: 'High-level C4 diagram models, data flow, security boundary specifications.',
    lastGenerated: '1 day ago',
    content: `# DevPulse System Architecture

## Overview
The system follows an Event-Driven Microservices Architecture built on Node.js, Redis Streams, and Python FastAPI vector worker nodes.

\`\`\`
[Frontend Client] ---> [API Gateway / NGINX]
                             |
                             v
                    [DevPulse Core Engine]
                     /         |         \\
                    v          v          v
               [PostgreSQL] [Redis Cache] [AI Vector Store]
\`\`\`
`
  },
  {
    id: 'doc-folder',
    title: 'Folder Structure Map',
    type: 'Folder Explanation',
    description: 'Annotated map explaining component purpose and dependency hierarchy.',
    lastGenerated: '3 days ago',
    content: `## Project Layout Explanation
- \`src/controllers/\`: Express route handlers with request schema validation.
- \`src/services/\`: Business logic layer isolated from HTTP context.
- \`src/ml/\`: Neural embedding vectorizers and AST parsers.
- \`src/config/\`: Environment configurations and secret management.
`
  },
  {
    id: 'doc-install',
    title: 'Installation Guide',
    type: 'Installation Guide',
    description: 'Step-by-step developer setup for Local, Docker, and Kubernetes environments.',
    lastGenerated: '4 days ago',
    content: `# Installation & Local Setup

### Prerequisites
- Node.js >= 20.x
- Docker & Docker Compose
- PostgreSQL 16+

### Setup Commands
\`\`\`bash
cp .env.example .env
docker-compose up -d postgres redis
npm run db:migrate
npm run dev
\`\`\`
`
  },
  {
    id: 'doc-deploy',
    title: 'Deployment & CI/CD Pipeline',
    type: 'Deployment Guide',
    description: 'GitHub Actions workflows, Terraform AWS ECS deployment configurations.',
    lastGenerated: '1 week ago',
    content: `# Production Deployment Guide

We utilize automated zero-downtime rolling deployments via AWS ECS and GitHub Actions.

Production environment secrets are managed through AWS Secrets Manager and synced during container bootstrap.
`
  }
];

export const mockProjectMemories = [
  {
    id: 'mem-1',
    date: '2026-07-15T10:30:00Z',
    category: 'Architecture Decision',
    title: 'Adopted JWT with Short-lived Access Tokens & Redis Refresh Tokens',
    author: 'Kishor (Lead Architect)',
    queryTags: ['JWT', 'auth', 'security', 'redis'],
    summary: 'Decided to move from stateless cookie sessions to 15-minute RS256 JWT tokens with Redis-backed refresh token rotation to support multi-region API gateways.',
    details: 'Key reasons: (1) Lower DB load on every request, (2) Instant token revocation via Redis blacklist key prefixing, (3) Cross-domain OAuth SSO support for mobile app integration.'
  },
  {
    id: 'mem-2',
    date: '2026-07-12T16:15:00Z',
    category: 'Previous Bug Fix',
    title: 'Fixed Deadlock in PostgreSQL DB Migration Script',
    author: 'DevPulse AI Bot',
    queryTags: ['database', 'postgres', 'migration', 'deadlock'],
    summary: 'Resolved race condition where concurrent worker nodes attempted alter table on user_permissions table during deployment.',
    details: 'Solution added exclusive advisory locks before executing alter table migrations.'
  },
  {
    id: 'mem-3',
    date: '2026-07-08T09:00:00Z',
    category: 'Generated Doc',
    title: 'Standardized REST API Error Response Envelope v2',
    author: 'DevPulse AI',
    queryTags: ['api', 'error handling', 'standards'],
    summary: 'All API routes must return JSON with fields { success: false, error: { code, message, details } }.',
    details: 'Prevents leaked internal stack traces to end users and unifies error parsing in frontend Axios interceptors.'
  },
  {
    id: 'mem-4',
    date: '2026-06-28T14:20:00Z',
    category: 'Repository Update',
    title: 'Migrated Monorepo Build System from Lerna to Turborepo',
    author: 'DevOps Team',
    queryTags: ['turborepo', 'monorepo', 'build', 'performance'],
    summary: 'Reduced CI build times by 68% by leveraging Turborepo remote caching on Vercel.',
    details: 'Configured turborepo pipeline with strict task dependency graphs for lint, test, and build.'
  }
];

export const mockChatPrompts = [
  "Explain authentication implementation in devpulse-core",
  "Find duplicate code across services",
  "Where is login and token validation implemented?",
  "Explain the React state management pattern used here",
  "How does payment webhook retry flow work?"
];

export const mockInitialChatMessages = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'Hello Kishor! I am **DevPulse AI**, fully synced with your `devpulse-core-api` repository (312 files indexed). How can I assist with your codebase today?',
    timestamp: '10:00 AM'
  }
];

export const mockUserProfile = {
  name: 'Kishor Subedi',
  email: 'kishor@devpulse.ai',
  role: 'Senior Principal Engineer',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  plan: 'Enterprise Developer Tier',
  tokensUsedThisMonth: 1420500,
  tokenLimit: 5000000,
  activeReposCount: 8,
  aiFixesApplied: 184,
  docsGeneratedCount: 42
};
