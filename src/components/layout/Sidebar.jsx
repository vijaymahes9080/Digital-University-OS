import React from 'react';
import { useUniversity } from '../../context/UniversityContext';
import {
  LayoutDashboard,
  Bot,
  CalendarCheck,
  FolderGit2,
  BookOpenCheck,
  Briefcase,
  LineChart,
  UserCheck,
  Cpu,
  Layers
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, attendanceData } = useUniversity();

  // Check if any attendance is High Risk
  const hasRisk = attendanceData.some(a => a.status === 'HIGH RISK');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'ai_tutor', label: 'AI Tutor + RAG', icon: Bot, badge: 'Flagship' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: hasRisk ? 'RISK' : null, badgeColor: 'rose' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, badge: 'Lifecycle' },
    { id: 'research', label: 'Research', icon: BookOpenCheck, badge: null },
    { id: 'placement', label: 'Placement OS', icon: Briefcase, badge: '76%' },
    { id: 'analytics', label: 'Analytics', icon: LineChart, badge: 'Graph' },
    { id: 'profile', label: 'Identity & RBAC', icon: UserCheck, badge: null }
  ];

  return (
    <aside className="w-64 bg-[#0d1322]/80 border-r border-slate-800/80 flex flex-col justify-between flex-shrink-0 min-h-[calc(100vh-4rem)] p-3">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          University Navigation
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badgeColor === 'rose'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Common Layer Info */}
      <div className="pt-4 border-t border-slate-800/80 px-2 space-y-3">
        <div className="glass-panel p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center space-x-2 mb-1.5">
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">University Data Layer</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            All 8 modules interconnected via common event bus.
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 font-mono">
          <span className="flex items-center space-x-1">
            <Layers className="w-3 h-3 text-slate-400" />
            <span>v2.6 OS Monolith</span>
          </span>
          <span className="text-emerald-400 font-bold">100% ONLINE</span>
        </div>
      </div>
    </aside>
  );
};
