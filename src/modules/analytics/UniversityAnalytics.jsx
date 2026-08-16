import React from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  LineChart as LineChartIcon,
  Users,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Building2,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

export const UniversityAnalytics = () => {
  const { analyticsData, users } = useUniversity();
  const admin = users.admin;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-white">University Intelligence Analytics Graph</h1>
            <Badge variant="emerald">100% COMMON DATA LAYER</Badge>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Realtime institutional monitoring, cross-department attendance correlation, and placement success forecasting.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-right">
          <p className="text-slate-400">Total Enrolled Scholars:</p>
          <p className="font-extrabold text-indigo-400 text-sm">{admin.totalStudents.toLocaleString()} Students</p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Campus Attendance"
          value={`${admin.overallCampusAttendance}%`}
          subtitle="Target: 85.0%"
          icon={TrendingUp}
          color="indigo"
        />
        <StatCard
          title="Total Faculty Members"
          value={admin.totalFaculty}
          subtitle="Across 12 Departments"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Active Departments"
          value={admin.activeDepartments}
          subtitle="MCA, CSE, AI, Cyber, ECE"
          icon={Building2}
          color="emerald"
        />
        <StatCard
          title="Average Placement Rate"
          value="87.7%"
          subtitle="Cohort 2026 Drive"
          icon={Briefcase}
          color="amber"
        />
      </div>

      {/* Main Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Attendance Trends Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <LineChartIcon className="w-4 h-4 text-indigo-400" />
              <span>Department Attendance Trends (Weeks 1 - 5)</span>
            </h3>
            <Badge variant="indigo">Time Series</Badge>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.attendanceTrends}>
                <defs>
                  <linearGradient id="colorMCA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis domain={[75, 100]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="MCA" stroke="#6366f1" fillOpacity={1} fill="url(#colorMCA)" />
                <Area type="monotone" dataKey="AI" stroke="#10b981" fillOpacity={1} fill="url(#colorAI)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cohort Skill Distribution Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Cohort Skill Distribution & Competency Graph</span>
            </h3>
            <Badge variant="purple">Students Count</Badge>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.skillDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department Performance Matrix Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span>Department Performance Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="pb-3 px-3">Department Name</th>
                <th className="pb-3 px-3">Students</th>
                <th className="pb-3 px-3">Avg Attendance</th>
                <th className="pb-3 px-3">Pass Percentage</th>
                <th className="pb-3 px-3">Placement Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-200">
              {analyticsData.departmentMetrics.map((dept, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-all">
                  <td className="py-3.5 px-3 font-bold text-white flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>{dept.name}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-300">{dept.students}</td>
                  <td className="py-3.5 px-3 font-mono text-emerald-400 font-bold">{dept.avgAttendance}%</td>
                  <td className="py-3.5 px-3 font-mono text-indigo-300 font-bold">{dept.passPct}%</td>
                  <td className="py-3.5 px-3 font-mono text-purple-300 font-bold">{dept.placementRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
