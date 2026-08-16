import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { X, FileCode2, Copy, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export const IEEELatexModal = ({ isOpen, onClose }) => {
  const { projectsData, users } = useUniversity();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const student = users.student;
  const proj = projectsData[0];

  const latexCode = `\\documentclass[conference]{IEEEtran}
\\usepackage{cite}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{algorithmic}
\\usepackage{graphicx}
\\usepackage{textcomp}
\\usepackage{xcolor}

\\begin{document}

\\title{${proj.title}: An Institutional Intelligence Operating System}

\\author{\\IEEEauthorblockN{${student.name}}
\\IEEEauthorblockA{\\textit{Department of Computer Applications} \\\\
\\textit{Digital University OS Campus}\\\\
Bengaluru, India \\\\
${student.email}}
\\and
\\IEEEauthorblockN{Dr. Sarah Vance}
\\IEEEauthorblockA{\\textit{Head of AI Research} \\\\
\\textit{Digital University OS Campus}\\\\
sarah.vance@univ.edu}
}

\\maketitle

\\begin{abstract}
This paper presents the architectural specification and empirical evaluation of Digital University OS, a unified institutional operating system integrating academic tracking, Retrieval-Augmented Generation (RAG) AI tutoring, predictive attendance risk forecasting, and automated placement skill alignment.
\\end{abstract}

\\begin{IEEEkeywords}
Smart University OS, Vector RAG, Attendance Predictive Analytics, Capstone Management, IEEE Publication.
\\end{IEEEkeywords}

\\section{Introduction}
Modern higher education systems frequently suffer from fragmented architectures...

\\section{System Architecture}
The system unifies all entities under a Common University Data Layer...

\\end{document}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f172a] border border-purple-500/30 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <span>IEEE LaTeX Manuscript Co-Pilot</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
                  IEEE TRANSACTIONS TEMPLATE
                </span>
              </h2>
              <p className="text-xs text-slate-300">Generates ready-to-compile LaTeX source code for academic paper submission.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300 flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Generated IEEE Conference Template (.tex)</span>
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center space-x-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Copied to Clipboard!" : "Copy LaTeX Code"}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-96 leading-relaxed">
            {latexCode}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs">
            Close LaTeX Co-Pilot
          </button>
        </div>
      </div>
    </div>
  );
};
