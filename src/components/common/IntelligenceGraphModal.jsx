import React from 'react';
import { X, Cpu, Database, BookOpen, Layers, Award, Sparkles, Network, ArrowRight } from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';

export const IntelligenceGraphModal = ({ isOpen, onClose }) => {
  const { users, attendanceData, projectsData, placementData } = useUniversity();

  if (!isOpen) return null;

  const student = users.student;
  const riskCourse = attendanceData.find(a => a.status === 'HIGH RISK');
  const activeProj = projectsData[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f172a] border border-indigo-500/30 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-900/60 via-slate-900 to-purple-900/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Network className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
                <span>University Intelligence Graph</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                  LIVE DATA MAPPING
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Connected Knowledge Graph unifying Student Profile, Courses, Attendance, Capstones, Research & Placement Skills.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Graph Visualization */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Live Graph Node Network */}
          <div className="relative p-6 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Central Node: Student Alex Rivers */}
            <div className="flex flex-col items-center justify-center space-y-2 mb-8 relative z-10">
              <div className="p-4 rounded-2xl bg-indigo-600/20 border-2 border-indigo-500 text-indigo-300 shadow-xl shadow-indigo-500/20 flex flex-col items-center">
                <span className="text-xs font-mono font-bold text-indigo-400">CENTRAL ENTITY</span>
                <span className="text-base font-extrabold text-white">{student.name}</span>
                <span className="text-xs text-slate-300">MCA Final-Year Scholar • CGPA {student.cgpa}</span>
              </div>
            </div>

            {/* Connected Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              {/* Node 1: Academic & Attendance */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-indigo-400">
                  <BookOpen className="w-4 h-4" />
                  <h4 className="text-xs font-extrabold uppercase tracking-wide">Academic & Attendance</h4>
                </div>
                <p className="text-xs text-slate-200 font-semibold">CS8501 Network Security</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>Attendance:</span>
                  <span className={`font-mono font-bold ${riskCourse ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {riskCourse ? `${riskCourse.percentage}% (HIGH RISK)` : '76.0% (SAFE)'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  ⚡ Feeds predictive risk alert to Student & Faculty dashboards.
                </div>
              </div>

              {/* Node 2: Capstones & Research */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-purple-400">
                  <Layers className="w-4 h-4" />
                  <h4 className="text-xs font-extrabold uppercase tracking-wide">Capstone & Research</h4>
                </div>
                <p className="text-xs text-slate-200 font-semibold truncate">{activeProj.title}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>Progress:</span>
                  <span className="font-mono font-bold text-purple-400">{activeProj.progress}%</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  ⚡ Approved milestones dynamically upgrade Placement Skill Graph.
                </div>
              </div>

              {/* Node 3: Skill Gap & Placement */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Award className="w-4 h-4" />
                  <h4 className="text-xs font-extrabold uppercase tracking-wide">Career Intelligence</h4>
                </div>
                <p className="text-xs text-slate-200 font-semibold">{placementData.targetRole}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>Readiness:</span>
                  <span className="font-mono font-bold text-amber-400">{placementData.overallReadinessPct}%</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  ⚡ Skill Gap Analysis matches target job roles automatically.
                </div>
              </div>
            </div>

            {/* AI Vector Gateway Connector Bar */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-950 border border-indigo-500/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-spin" />
                <div>
                  <span className="font-extrabold text-white">University RAG AI Gateway</span>
                  <p className="text-[11px] text-slate-300">
                    Indexes syllabus, regulations, and project documentation into Qdrant Vector DB embeddings.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold border border-indigo-500/40 text-[11px] flex-shrink-0">
                5 Vector Corpus Chunks Active
              </span>
            </div>
          </div>

          {/* Connected Data Flow Architecture Diagram */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Cross-Module Data Flow Loop
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold">1</span>
                <div>
                  <p className="font-bold text-slate-200">Attendance Log</p>
                  <p className="text-[10px] text-slate-400">Faculty marks present ➔ Risk drops</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 font-bold">2</span>
                <div>
                  <p className="font-bold text-slate-200">AI Tutor RAG</p>
                  <p className="text-[10px] text-slate-400">Student reviews syllabus ➔ Takes MCQ</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">3</span>
                <div>
                  <p className="font-bold text-slate-200">Capstone Review</p>
                  <p className="text-[10px] text-slate-400">Faculty approves ➔ Skill upgrade</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 font-bold">4</span>
                <div>
                  <p className="font-bold text-slate-200">Placement Engine</p>
                  <p className="text-[10px] text-slate-400">Matches job requirement ➔ Readiness 84%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30"
          >
            Close Intelligence Graph
          </button>
        </div>
      </div>
    </div>
  );
};
