import React, { useState } from 'react';
import { sampleQuizzes } from '../../data/ragCorpus';
import { X, Sparkles, CheckCircle2, HelpCircle, Download } from 'lucide-react';

export const MCQGeneratorModal = ({ isOpen, onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState("CS8501");
  const [selectedUnit, setSelectedUnit] = useState("Unit 2: Public Key Cryptography");
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedQuestions(sampleQuizzes["CS8501"].unit2);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-purple-500/30 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI MCQ Question Generator</h2>
              <p className="text-xs text-slate-400">Generates curriculum-aligned quiz questions directly from uploaded syllabus materials.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Select Course Material</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-purple-500"
            >
              <option value="CS8501">CS8501 - Network Security & Cryptography</option>
              <option value="CS8502">CS8502 - Advanced Data Science</option>
              <option value="CS8503">CS8503 - Cloud Computing & DevOps</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Syllabus Unit</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Unit 2">Unit 2: Public Key Cryptography & RSA</option>
              <option value="Unit 1">Unit 1: Symmetric Encryption & Block Ciphers</option>
              <option value="Unit 3">Unit 3: Hash Functions & Signatures</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all"
        >
          {isGenerating ? (
            <span>Parsing Syllabus & Generating Questions...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate 3 High-Order MCQs</span>
            </>
          )}
        </button>

        {/* Question Output */}
        {generatedQuestions && (
          <div className="mt-6 space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Generated Questions (Aligned with Bloom's Taxonomy Level 4)</span>
              </span>
              <button className="text-xs font-bold text-purple-400 flex items-center space-x-1 hover:underline">
                <Download className="w-3.5 h-3.5" />
                <span>Export QTI / PDF</span>
              </button>
            </div>

            {generatedQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                <p className="font-bold text-slate-100">{idx + 1}. {q.question}</p>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {q.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg border font-mono ${
                        i === q.correctIndex
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold'
                          : 'bg-slate-800/50 border-slate-700/50 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {opt} {i === q.correctIndex && '✓'}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/60">
                  Explanation: {q.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
