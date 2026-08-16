import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { StatCard } from '../../components/common/StatCard';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from 'recharts';
import {
  Briefcase,
  Target,
  Sparkles,
  TrendingUp,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const PlacementModule = () => {
  const { placementData, setActiveTab, triggerConfetti, addNotification } = useUniversity();
  const [selectedRole, setSelectedRole] = useState(placementData.targetRole || "Data Scientist & AI Engineer");
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (jobId, company) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId]);
      triggerConfetti();
      addNotification("Application Submitted", `Resume & Skill Radar submitted to ${company}.`, "success");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-white">Placement & Career Intelligence OS</h1>
            <Badge variant="emerald">{placementData.overallReadinessPct}% READINESS</Badge>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Automated Skill Gap Radar matrix, job offer match forecasting, and targeted AI curriculum recommendations.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
          <Target className="w-4 h-4 text-indigo-400 ml-2" />
          <span className="text-xs font-bold text-slate-400">Target Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="Data Scientist & AI Engineer">Data Scientist & AI Engineer</option>
            <option value="Full-Stack Cloud Architect">Full-Stack Cloud Architect</option>
            <option value="DevOps & Systems Engineer">DevOps & Systems Engineer</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
          </select>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Career Readiness Index"
          value={`${placementData.overallReadinessPct}%`}
          subtitle="Top Tier Placement Track"
          icon={Briefcase}
          color="indigo"
        />
        <StatCard
          title="Skills Matched"
          value={`${placementData.skillRadar.filter(s => s.status === 'MET').length} / ${placementData.skillRadar.length}`}
          subtitle="Core Industry Competencies"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Top Company Match"
          value="88% Match"
          subtitle="Google Cloud AI Engineer"
          icon={Building2}
          color="purple"
        />
      </div>

      {/* Main Section: Skill Gap Radar Matrix & Action Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Skill Gap Radar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Skill Gap Radar Matrix</span>
              </h3>
              <p className="text-[11px] text-slate-400">Comparing student proficiency vs target role benchmarks</p>
            </div>
            <Badge variant="indigo">{selectedRole}</Badge>
          </div>

          {/* Recharts Radar Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={placementData.skillRadar}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fontSize: 11, fill: '#cbd5e1' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Current Student Level" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Radar name="Industry Required Level" dataKey="required" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Status Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {placementData.skillRadar.map(item => (
              <div
                key={item.skill}
                className={`p-2.5 rounded-xl border text-xs flex flex-col justify-between space-y-1 ${
                  item.status === 'MET'
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}
              >
                <span className="font-bold text-slate-200 text-[11px] truncate">{item.skill}</span>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{item.current}% / {item.required}%</span>
                  <span className={`text-[10px] font-extrabold ${item.status === 'MET' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Automated Recommendations */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Recommendation Engine (Bridge Skill Gaps)</span>
            </h3>
            <span className="text-xs text-purple-400 font-bold">2 Actions Suggested</span>
          </div>

          <div className="space-y-4">
            {placementData.recommendations.map(rec => (
              <div key={rec.id} className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-extrabold text-white flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>{rec.title}</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    +{rec.boostPct}% Readiness
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rec.description}</p>
                <button
                  onClick={() => setActiveTab(rec.moduleTarget)}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>{rec.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Campus Job Postings */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span>Active Campus Placement Drives & Role Matching</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {placementData.jobPostings.map(job => {
            const isApplied = appliedJobs.includes(job.id);

            return (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400">{job.company}</span>
                    <Badge variant="emerald">{job.package}</Badge>
                  </div>

                  <h4 className="text-sm font-extrabold text-white mt-1">{job.role}</h4>

                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{job.location}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Match Forecast:</span>
                    <span className="font-extrabold text-emerald-400">{job.matchPct}%</span>
                  </div>
                  <ProgressBar value={job.matchPct} color="emerald" height="h-2" />

                  {job.missingSkills.length > 0 && (
                    <div className="text-[10px] text-slate-400 pt-1">
                      <span>Missing: </span>
                      {job.missingSkills.map(s => (
                        <span key={s} className="text-amber-400 font-medium mr-1">#{s}</span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleApply(job.id, job.company)}
                  disabled={isApplied}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isApplied
                      ? 'bg-slate-800 text-slate-400 cursor-default'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20'
                  }`}
                >
                  {isApplied ? "Applied ✓" : "Apply via Campus Portal"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
