import React from 'react';
import { useUniversity } from '../../context/UniversityContext';
import {
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Award,
  Network,
  RotateCcw,
  ChevronRight
} from 'lucide-react';

export const DemoFlowBar = () => {
  const { demoStep, setDemoStep, runDemoStep, resetDemoData, isDemoActive, setIsDemoActive } = useUniversity();

  if (!isDemoActive) {
    return (
      <div className="bg-indigo-950/40 border-b border-indigo-500/20 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 text-indigo-300">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="font-extrabold">MCA Evaluator Mode:</span>
          <span className="text-slate-400">Launch the step-by-step Digital University OS lifecycle walkthrough.</span>
        </div>
        <button
          onClick={() => setIsDemoActive(true)}
          className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span>Start Guided Demo Flow</span>
        </button>
      </div>
    );
  }

  const steps = [
    { num: 1, label: "Attendance Risk (68%)", action: () => runDemoStep(1) },
    { num: 2, label: "Faculty Log Attendance", action: () => runDemoStep(2) },
    { num: 3, label: "AI Tutor RAG Search", action: () => runDemoStep(3) },
    { num: 4, label: "Faculty Milestone Approval", action: () => runDemoStep(4) },
    { num: 5, label: "Placement Skill Sync", action: () => runDemoStep(5) },
    { num: 6, label: "Intelligence Graph", action: () => runDemoStep(6) }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-500/30 px-4 py-2.5 text-xs shadow-lg animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-extrabold font-mono border border-indigo-500/40 text-[11px]">
            <PlayCircle className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>MCA DEMO FLOW</span>
          </span>
          <span className="text-slate-300 font-semibold hidden lg:inline">
            Step {demoStep > 0 ? demoStep : 'Ready'} of 6
          </span>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center space-x-1 overflow-x-auto py-1 max-w-full">
          {steps.map((s) => {
            const isActive = demoStep === s.num;
            const isDone = demoStep > s.num;

            return (
              <button
                key={s.num}
                onClick={s.action}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex-shrink-0 border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/30'
                    : isDone
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-slate-700/80 text-slate-300 flex items-center justify-center text-[10px]">
                    {s.num}
                  </span>
                )}
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={resetDemoData}
            title="Reset Data to Initial State"
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-[11px] transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsDemoActive(false)}
            className="text-slate-500 hover:text-slate-300 text-[11px] font-bold px-1"
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  );
};
