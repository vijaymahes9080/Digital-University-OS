import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { MCQGeneratorModal } from './MCQGeneratorModal';
import {
  Users,
  FolderGit2,
  BookOpen,
  Award,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Search,
  ExternalLink,
  Brain
} from 'lucide-react';

export const FacultyDashboard = () => {
  const { users, projectsData, attendanceData, updateProjectMilestone } = useUniversity();
  const faculty = users.faculty;
  const [showMCQModal, setShowMCQModal] = useState(false);
  const [filterLowAttendance, setFilterLowAttendance] = useState(true);
  const [reviewScore, setReviewScore] = useState(96);
  const [reviewFeedback, setReviewFeedback] = useState("Outstanding cross-module integration and predictive risk analytics!");

  // At-risk students filter
  const lowAttendanceStudents = attendanceData.filter(a => a.status === 'HIGH RISK');

  // Pending project milestone
  const pendingProject = projectsData.find(p => p.milestones.some(m => m.status === 'Submitted'));
  const pendingMilestone = pendingProject?.milestones.find(m => m.status === 'Submitted');

  const handleApprove = () => {
    if (pendingProject && pendingMilestone) {
      updateProjectMilestone(pendingProject.id, pendingMilestone.id, 'Approved', reviewScore, reviewFeedback);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={faculty.avatar}
              alt={faculty.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/40"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-white">{faculty.name}</h1>
                <Badge variant="purple">Faculty Mode</Badge>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{faculty.title} • {faculty.department}</p>
            </div>
          </div>

          <button
            onClick={() => setShowMCQModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:scale-105 transition-all"
          >
            <Brain className="w-4 h-4 text-purple-200" />
            <span>AI MCQ Generator</span>
          </button>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Courses Taught"
          value={faculty.coursesTaught}
          subtitle="CS8501, CS8503, MCA801"
          icon={BookOpen}
          color="purple"
        />
        <StatCard
          title="Assigned Advisees"
          value={faculty.advisees}
          subtitle="MCA Capstone Scholars"
          icon={Users}
          color="indigo"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingMilestone ? "1 Pending" : "0 Pending"}
          subtitle={pendingMilestone ? "Milestone 3 Submitted" : "All clear"}
          icon={FolderGit2}
          color="amber"
        />
        <StatCard
          title="Research H-Index"
          value={faculty.hIndex}
          subtitle="18 Citations / Paper"
          icon={Award}
          color="emerald"
        />
      </div>

      {/* Main Grid: At-Risk Attendance Query & Pending Milestone Reviewer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Attendance Risk Monitor */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Attendance Query & Risk Monitor</span>
              </h3>
              <p className="text-[11px] text-slate-400">Querying university database for students with attendance &lt; 75%</p>
            </div>
            <button
              onClick={() => setFilterLowAttendance(!filterLowAttendance)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30"
            >
              {filterLowAttendance ? "Showing < 75% Only" : "Show All Roster"}
            </button>
          </div>

          <div className="space-y-3">
            {lowAttendanceStudents.map(item => (
              <div key={item.courseId} className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="Alex Rivers"
                      className="w-8 h-8 rounded-xl object-cover ring-1 ring-rose-500/40"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Alex Rivers (STU2026042)</p>
                      <p className="text-[10px] text-slate-400">{item.code} — {item.courseName}</p>
                    </div>
                  </div>
                  <Badge variant="rose">{item.percentage}% (HIGH RISK)</Badge>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0b0f17] border border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>Recommendation:</span>
                  <span className="font-mono text-amber-400 font-bold">{item.recommendedAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pending Project Milestone Reviewer */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <FolderGit2 className="w-4 h-4 text-amber-400" />
              <span>Capstone Milestone Reviewer</span>
            </h3>
            {pendingMilestone && <Badge variant="amber">1 Submission Waiting</Badge>}
          </div>

          {pendingMilestone ? (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm">{pendingProject.title}</p>
                  <p className="text-[11px] text-slate-400">Student: {pendingProject.studentName} ({pendingProject.studentId})</p>
                </div>
                <a
                  href={pendingProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-[11px] font-bold text-indigo-400 hover:underline"
                >
                  <span>GitHub Code</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 space-y-1">
                <span className="font-bold text-amber-300">Submitted Milestone:</span>
                <p className="text-slate-200 font-semibold">{pendingMilestone.title}</p>
                <p className="text-[10px] text-slate-400">Due: {pendingMilestone.dueDate}</p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-300">Assign Grade / Score (out of 100):</label>
                  <input
                    type="number"
                    value={reviewScore}
                    onChange={(e) => setReviewScore(Number(e.target.value))}
                    className="w-20 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-right text-xs font-bold text-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Faculty Feedback:</label>
                  <textarea
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  onClick={handleApprove}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Milestone & Update Student Placement Score</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400 opacity-60" />
              <p className="text-xs font-bold text-slate-300">All Capstone Milestones Reviewed!</p>
              <p className="text-[11px] text-slate-500">Student placement readiness scores updated in realtime.</p>
            </div>
          )}
        </div>
      </div>

      {/* AI MCQ Generator Modal */}
      <MCQGeneratorModal isOpen={showMCQModal} onClose={() => setShowMCQModal(false)} />
    </div>
  );
};
