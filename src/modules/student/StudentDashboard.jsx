import React from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { StatCard } from '../../components/common/StatCard';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import {
  GraduationCap,
  CalendarCheck,
  Briefcase,
  FolderGit2,
  BookOpenCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const StudentDashboard = () => {
  const { users, attendanceData, courses, projectsData, placementData, setActiveTab } = useUniversity();
  const student = users.student;

  // Find attendance risk item
  const riskCourse = attendanceData.find(a => a.status === 'HIGH RISK');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white">Welcome back, {student.name}!</h1>
              <Badge variant="indigo">{student.program}</Badge>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {student.department} • {student.semester} • Student ID: <span className="font-mono text-indigo-400 font-bold">{student.id}</span>
            </p>
          </div>

          <button
            onClick={() => setActiveTab('ai_tutor')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Launch AI Tutor RAG</span>
          </button>
        </div>
      </div>

      {/* High Attendance Risk Alert Banner */}
      {riskCourse && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-rose-300 uppercase tracking-wide">
                ATTENDANCE RISK DETECTED — {riskCourse.courseName} ({riskCourse.percentage}%)
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                {riskCourse.recommendedAction}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('attendance')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex-shrink-0"
          >
            <span>View Attendance Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Academic CGPA"
          value={student.cgpa}
          subtitle="Top 5% of MCA Cohort"
          icon={GraduationCap}
          color="indigo"
        />
        <StatCard
          title="Overall Attendance"
          value={`${student.attendancePct}%`}
          subtitle={riskCourse ? "1 Course At Risk" : "100% Eligible"}
          icon={CalendarCheck}
          color={student.attendancePct < 75 ? "rose" : "emerald"}
          onClick={() => setActiveTab('attendance')}
        />
        <StatCard
          title="Placement Readiness"
          value={`${placementData.overallReadinessPct}%`}
          subtitle={`Target: ${placementData.targetRole}`}
          icon={Briefcase}
          color="amber"
          onClick={() => setActiveTab('placement')}
        />
        <StatCard
          title="Capstones & Research"
          value={`${projectsData.length} Projects`}
          subtitle="2 Papers Published"
          icon={FolderGit2}
          color="purple"
          onClick={() => setActiveTab('projects')}
        />
      </div>

      {/* Main Grid: Enrolled Courses & Upcoming Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Course Roster & Attendance */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <BookOpenCheck className="w-4 h-4 text-indigo-400" />
              <span>Enrolled Courses & Attendance Status</span>
            </h3>
            <button
              onClick={() => setActiveTab('attendance')}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
            >
              View Full Log →
            </button>
          </div>

          <div className="space-y-3">
            {attendanceData.map(item => (
              <div
                key={item.courseId}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/30 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-xs text-indigo-400">{item.code}</span>
                      <span className="font-bold text-xs text-slate-100">{item.courseName}</span>
                    </div>
                  </div>
                  <Badge
                    variant={item.status === 'HIGH RISK' ? 'rose' : item.status === 'EXCELLENT' ? 'emerald' : 'indigo'}
                  >
                    {item.percentage}% ({item.status})
                  </Badge>
                </div>

                <ProgressBar
                  value={item.percentage}
                  color={item.percentage < 75 ? 'rose' : item.percentage > 85 ? 'emerald' : 'indigo'}
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Classes Attended: {item.attendedClasses} / {item.totalClasses}</span>
                  <span className="font-mono">{item.recommendedAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Upcoming Schedule & Action Tasks */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Upcoming Academic Schedule</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-300">CS8501 Lab Review</span>
                <span className="text-[10px] text-slate-500">Today, 02:00 PM</span>
              </div>
              <p className="text-slate-300">RSA Key Pair Generation & Modular Exponentiation</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-300">Capstone Milestone 3</span>
                <span className="text-[10px] text-amber-400 font-bold">Due Aug 25</span>
              </div>
              <p className="text-slate-300">Placement Skill Integration & Model Evaluation</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300">Placement Drive</span>
                <span className="text-[10px] text-slate-500">Sept 15</span>
              </div>
              <p className="text-slate-300">Google Cloud AI Associate Systems Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
