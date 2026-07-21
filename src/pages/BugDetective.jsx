import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { UploadZone } from '../components/UploadZone';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MarkdownViewer } from '../components/MarkdownViewer';
import { apiService } from '../services/api';
import { mockBugs } from '../services/mockData';
import { useNotification } from '../hooks/useNotification';
import { getSeverityColor } from '../utils/helpers';
import {
  Bug,
  Sparkles,
  ShieldAlert,
  FileCode,
  Download,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BugDetective() {
  const { notifySuccess } = useNotification();
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorText, setErrorText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(mockBugs[0]);

  const handleAnalyze = async () => {
    if (!selectedFile && !errorText.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await apiService.analyzeBugLog(errorText, selectedFile);
      setAnalysisResult(result);
      notifySuccess(`Diagnostic scan complete with ${result.confidence}% confidence!`, 'Bug Analyzed');
    } catch (err) {
      console.error('Analysis failed', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadReport = () => {
    const reportText = `DEVPULSE AI BUG DIAGNOSTIC REPORT
ID: ${analysisResult.id}
Severity: ${analysisResult.severity}
Confidence: ${analysisResult.confidence}%
Title: ${analysisResult.title}
Date: ${analysisResult.detectedAt}

ROOT CAUSE:
${analysisResult.rootCause}

AFFECTED FILES:
${analysisResult.affectedFiles.join('\n')}

SUGGESTED FIX:
${analysisResult.suggestedFix}
`;
    const element = document.createElement('a');
    const fileBlob = new Blob([reportText], { type: 'text/plain' });
    element.href = URL.createObjectURL(fileBlob);
    element.download = `${analysisResult.id}_Diagnostic_Report.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    notifySuccess('Diagnostic report downloaded to your device.', 'Report Exported');
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-danger/10 text-danger border border-danger/30 font-mono">
              AI FORENSIC ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
            Bug Detective Suite
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Upload raw crash dumps, stack traces, or server logs to isolate root causes and apply automated fixes.
          </p>
        </div>

        {/* Input & Upload Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Zone */}
          <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-text mb-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Drag & Drop File Ingestion
              </h3>
              <p className="text-xs text-muted mb-4">Accepts ZIP, LOG, TXT, PNG, JPG, PDF</p>
              <UploadZone onFileUpload={(file) => setSelectedFile(file)} />
            </div>
          </div>

          {/* Raw Error Log Paste Box */}
          <div className="glass-panel p-6 rounded-2xl border border-border bg-card/80 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-text mb-1 flex items-center gap-2">
                <Bug className="w-4 h-4 text-secondary" /> Paste Raw Stack Trace / Log Text
              </h3>
              <p className="text-xs text-muted mb-4">Paste exception messages or terminal outputs</p>
              <textarea
                rows={7}
                placeholder="Paste stack trace log here... (e.g. UnhandledPromiseRejectionWarning: Error: Socket connection timeout at Stripe.retry...)"
                value={errorText}
                onChange={(e) => setErrorText(e.target.value)}
                className="w-full bg-surface-100 border border-border rounded-xl p-3 text-xs font-mono text-text placeholder:text-muted outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!selectedFile && !errorText.trim())}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-glow-primary hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Code AST Vectors...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run Bug Detective Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Diagnostic Results Section */}
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <div className="glass-panel p-12 rounded-2xl border border-border bg-card/80 text-center">
              <LoadingSpinner text="Ingesting logs and evaluating AST dependency graph..." size="large" />
            </div>
          ) : (
            analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-border bg-card/80 space-y-6"
              >
                {/* Header Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-base font-bold text-primary">{analysisResult.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getSeverityColor(
                          analysisResult.severity
                        )}`}
                      >
                        {analysisResult.severity} Severity
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/30 font-mono">
                        {analysisResult.confidence}% AI Confidence Score
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-text">{analysisResult.title}</h2>
                  </div>

                  <button
                    onClick={handleDownloadReport}
                    className="py-2.5 px-4 rounded-xl bg-surface-200 hover:bg-surface-300 text-text border border-border text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-center"
                  >
                    <Download className="w-4 h-4 text-primary" />
                    <span>Download Report</span>
                  </button>
                </div>

                {/* Root Cause Card */}
                <div>
                  <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-warning" /> Root Cause Breakdown
                  </h3>
                  <div className="p-4 rounded-xl bg-surface-100 border border-border text-xs sm:text-sm text-text leading-relaxed font-sans">
                    {analysisResult.rootCause}
                  </div>
                </div>

                {/* Suggested Fix Diff */}
                <div>
                  <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-success" /> Suggested Automated Patch
                  </h3>
                  <div className="p-4 rounded-xl bg-surface-50 border border-border font-mono text-xs text-text overflow-x-auto">
                    <MarkdownViewer content={`\`\`\`diff\n${analysisResult.suggestedFix}\n\`\`\``} />
                  </div>
                </div>

                {/* Related Files & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
                      Affected Repositories & Files
                    </h3>
                    <div className="space-y-1.5">
                      {analysisResult.affectedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-surface-100 border border-border font-mono text-xs text-text flex items-center justify-between"
                        >
                          <span>{file}</span>
                          <span className="text-[10px] text-primary">Line 14-48</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
                      Diagnostic Execution Timeline
                    </h3>
                    <div className="space-y-2">
                      {analysisResult.timeline.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-surface-100/50">
                          <span className="flex items-center gap-2 text-text">
                            <CheckCircle2 className="w-3.5 h-3.5 text-success" /> {item.step}
                          </span>
                          <span className="text-[10px] font-mono text-muted">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
