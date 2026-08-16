import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { StatCard } from '../../components/common/StatCard';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Award,
  PlusCircle,
  GitBranch,
  Github,
  Check
} from 'lucide-react';

export const ProjectsModule = () => {
  const { projectsData, updateProjectMilestone, setActiveTab } = useUniversity();
  const [githubInput, setGithubInput] = useState("https://github.com/vijaymahes9080/Digital-University-OS");

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-white">Academic Project Lifecycle OS</h1>
            <Badge variant="purple">Capstone & MCA Projects</Badge>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            End-to-end lifecycle tracking: Proposals ➔ Guide Assignment ➔ Milestone Defense ➔ GitHub Repo ➔ Evaluation.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('placement')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:scale-105 transition-all"
        >
          View Placement Impact →
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projectsData.map(project => (
          <div
            key={project.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5 relative overflow-hidden"
          >
            {/* Top Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs text-indigo-400 font-bold">{project.id}</span>
                  <h2 className="text-base font-extrabold text-white">{project.title}</h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Domain: <span className="text-slate-200 font-semibold">{project.domain}</span> • Guide: <span className="text-purple-300 font-semibold">{project.guide}</span>
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Badge variant={project.status === 'Completed' ? 'emerald' : 'indigo'}>
                  {project.status} ({project.progress}%)
                </Badge>
                {project.evaluationMarks && (
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Grade: {project.evaluationMarks}/100</span>
                  </span>
                )}
              </div>
            </div>

            {/* Description & GitHub */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
              <p className="text-slate-300 leading-relaxed">{project.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 flex items-center space-x-1 font-mono">
                  <Github className="w-4 h-4 text-white" />
                  <span>GitHub Repository:</span>
                </span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline font-mono font-bold flex items-center space-x-1"
                >
                  <span>{project.githubUrl}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Milestones Stepper */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Project Lifecycle Milestones</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {project.milestones.map(m => (
                  <div
                    key={m.id}
                    className={`p-4 rounded-2xl border text-xs space-y-2 transition-all ${
                      m.status === 'Approved'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200'
                        : m.status === 'Submitted'
                        ? 'bg-amber-500/10 border-amber-500/30 text-slate-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-indigo-300">Milestone #{m.id}</span>
                      <Badge
                        variant={m.status === 'Approved' ? 'emerald' : m.status === 'Submitted' ? 'amber' : 'indigo'}
                      >
                        {m.status}
                      </Badge>
                    </div>

                    <p className="font-bold text-slate-100">{m.title}</p>

                    {m.score && (
                      <p className="text-[11px] text-emerald-400 font-bold">Score: {m.score}/100</p>
                    )}

                    {m.feedback && (
                      <p className="text-[10px] text-slate-400 italic">Feedback: "{m.feedback}"</p>
                    )}

                    {/* Submit Button if Pending */}
                    {m.status === 'Pending' && (
                      <button
                        onClick={() => updateProjectMilestone(project.id, m.id, 'Submitted')}
                        className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-all"
                      >
                        Submit Milestone Artifact
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
