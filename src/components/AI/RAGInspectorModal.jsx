import React, { useState } from 'react';
import { ragCorpusDocuments } from '../../data/ragCorpus';
import { X, FileText, Database, Sparkles, Cpu, Layers, ArrowRight } from 'lucide-react';

export const RAGInspectorModal = ({ isOpen, onClose }) => {
  const [selectedDoc, setSelectedDoc] = useState(ragCorpusDocuments[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-indigo-500/30 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>University RAG Engine Inspector</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                  LIVE VECTOR STORE
                </span>
              </h2>
              <p className="text-xs text-slate-400">Visualizing raw document parsing, chunking, embeddings, and context retrieval pipeline.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* RAG Pipeline Flowchart Diagram */}
        <div className="my-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <p className="text-xs font-bold text-slate-300 mb-3 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>End-to-End RAG Architecture Pipeline</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <FileText className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <p className="font-bold text-white">1. Univ Docs</p>
              <p className="text-[10px] text-slate-400">Syllabus / Regs</p>
            </div>
            <div className="hidden md:flex items-center justify-center text-slate-600">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <Layers className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <p className="font-bold text-white">2. Chunking</p>
              <p className="text-[10px] text-slate-400">512 Token Chunks</p>
            </div>
            <div className="hidden md:flex items-center justify-center text-slate-600">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <Sparkles className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <p className="font-bold text-white">3. Vector Search</p>
              <p className="text-[10px] text-slate-400">Cosine Similarity</p>
            </div>
          </div>
        </div>

        {/* Documents Selector & Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Document list */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Indexed Corpus Documents</p>
            {ragCorpusDocuments.map(doc => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                  selectedDoc.id === doc.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300">{doc.courseCode}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{doc.chunkId}</span>
                </div>
                <p className="truncate text-xs font-medium text-slate-200 mt-1">{doc.title}</p>
              </button>
            ))}
          </div>

          {/* Document Chunk Inspector Details */}
          <div className="md:col-span-2 glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{selectedDoc.title}</h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Vector Dimension: 1536
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 mb-1">Parsed Text Chunk Content:</p>
              <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {selectedDoc.content}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 mb-1">Extracted Keyword Tokens:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedDoc.keywords.map(kw => (
                  <span key={kw} className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30"
          >
            Close RAG Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
