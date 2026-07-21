import {
  mockRepositories,
  mockHealthMetrics,
  mockRecentActivity,
  mockBugs,
  mockDocumentation,
  mockProjectMemories,
  mockUserProfile
} from './mockData';

// Simulated API latency helper
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Repositories
  async getRepositories() {
    await delay(300);
    return [...mockRepositories];
  },
  
  async getRepositoryById(id) {
    await delay(200);
    return mockRepositories.find((r) => r.id === id) || mockRepositories[0];
  },

  // Health Metrics
  async getHealthMetrics() {
    await delay(350);
    return { ...mockHealthMetrics };
  },

  // Activities
  async getRecentActivity() {
    await delay(250);
    return [...mockRecentActivity];
  },

  // Bugs
  async getBugs() {
    await delay(400);
    return [...mockBugs];
  },

  async analyzeBugLog(logText, file = null) {
    await delay(1200); // realistic AI processing delay
    const newBug = {
      id: `BUG-${Math.floor(1000 + Math.random() * 9000)}`,
      title: file ? `Issue detected in uploaded file: ${file.name}` : 'Traceback: NullPointerException in Auth Middleware',
      severity: 'High',
      confidence: 94,
      status: 'Analyzed',
      detectedAt: new Date().toISOString(),
      rootCause: file 
        ? `Diagnostic scan of ${file.name} identified unhandled edge cases in buffer allocation.` 
        : `Root Cause: Target token string was evaluated before null check guard clause in request validator.\nLog trace indicates: ${logText.substring(0, 100)}...`,
      affectedFiles: ['src/middleware/authGuard.ts', 'src/utils/tokenDecoder.ts'],
      suggestedFix: `// Generated Patch
- const token = req.headers.authorization.split(' ')[1];
+ const authHeader = req.headers.authorization;
+ if (!authHeader || !authHeader.startsWith('Bearer ')) {
+   return res.status(401).json({ error: 'Missing or malformed Authorization header' });
+ }
+ const token = authHeader.split(' ')[1];`,
      timeline: [
        { step: 'Log Ingestion', status: 'Completed', time: new Date().toLocaleTimeString() },
        { step: 'AST Code Mapping', status: 'Completed', time: new Date().toLocaleTimeString() },
        { step: 'Neural Diagnostic Synthesis', status: 'Completed', time: new Date().toLocaleTimeString() }
      ]
    };
    return newBug;
  },

  // Documentation
  async getDocumentation() {
    await delay(300);
    return [...mockDocumentation];
  },

  async regenerateDoc(docId) {
    await delay(800);
    const doc = mockDocumentation.find((d) => d.id === docId);
    return {
      ...doc,
      lastGenerated: 'Just now',
      content: doc.content + `\n\n<!-- Updated by DevPulse AI engine at ${new Date().toLocaleTimeString()} -->`
    };
  },

  // Memories
  async getMemories(query = '') {
    await delay(300);
    if (!query.trim()) return [...mockProjectMemories];
    const q = query.toLowerCase();
    return mockProjectMemories.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.queryTags.some((t) => t.toLowerCase().includes(q))
    );
  },

  // AI Chat Simulation
  async sendChatMessage(userQuery) {
    await delay(700);
    let reply = `Based on your codebase index in \`devpulse-core-api\`:\n\nRegarding your question about **"${userQuery}"**:\n\nOur system maps this logic directly to \`src/services/authService.ts\` and \`src/contexts/AuthContext.jsx\`.\n\n\`\`\`typescript\n// Example snippet from authService.ts\nexport async function validateSessionToken(token: string): Promise<UserSession> {\n  const decoded = await jwt.verify(token, process.env.JWT_SECRET);\n  const isRevoked = await redis.sismember('token_blacklist', decoded.jti);\n  if (isRevoked) throw new AuthError('Token has been revoked');\n  return decoded;\n}\n\`\`\`\n\nKey Highlights:\n1. Tokens are signed with **RS256** asymmetric keys.\n2. Revocation is instantaneous via Redis set lookups.\n3. Automatic token renewal triggers 2 minutes prior to expiration.`;

    if (userQuery.toLowerCase().includes('duplicate')) {
      reply = `I scanned your 312 files and identified 2 duplicate code blocks:\n\n1. \`src/utils/formatters.ts\` and \`src/helpers/dateUtils.ts\` share identical date calculation logic.\n2. \`src/services/userApi.js\` duplicates HTTP error retry logic found in \`src/services/billingApi.js\`.\n\n**Recommendation:** Extract retry logic into a shared Axios Interceptor inside \`src/services/apiClient.ts\`.`;
    }

    return reply;
  },

  // User Profile & Settings
  async getUserProfile() {
    await delay(200);
    return { ...mockUserProfile };
  }
};
