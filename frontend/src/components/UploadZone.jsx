import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function UploadZone({ onFileUpload, acceptedTypes = '.zip,.log,.txt,.png,.jpg,.jpeg,.pdf' }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (onFileUpload) onFileUpload(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (onFileUpload) onFileUpload(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-primary bg-primary/10 scale-[1.01] shadow-glow-primary'
            : 'border-border hover:border-primary/50 bg-surface-100/60 hover:bg-surface-200/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-3"
            >
              <div className="p-4 rounded-2xl bg-surface-200 border border-border text-primary group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">
                  Drag & Drop your Codebase ZIP or Log files here
                </p>
                <p className="text-xs text-muted mt-1">
                  Supports <span className="font-mono text-primary font-medium">ZIP, LOG, TXT, PNG, JPG, PDF</span> up to 500MB
                </p>
              </div>
              <button
                type="button"
                className="py-2 px-4 rounded-xl text-xs font-semibold bg-surface-200 hover:bg-surface-300 text-text border border-border transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-secondary" /> Browse Computer Files
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-between p-4 rounded-xl bg-card border border-primary/40 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10 text-primary border border-primary/30">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text font-mono">{file.name}</h4>
                  <p className="text-xs text-muted">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI Ingestion
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-1.5 rounded-lg bg-surface-200 text-muted hover:text-danger hover:bg-danger/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
