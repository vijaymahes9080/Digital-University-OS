import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import {
  Sparkles,
  Bell,
  User,
  Shield,
  GraduationCap,
  Briefcase,
  ChevronDown,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const Navbar = () => {
  const { activeRole, switchRole, currentUser, notifications, setIsGraphModalOpen } = useUniversity();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0d1322]/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      {/* Brand & Status */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-emerald-500 p-0.5 glow-indigo flex items-center justify-center">
          <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg text-white tracking-tight">
              DIGITAL UNIVERSITY <span className="text-indigo-400">OS</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping" />
              AI ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">Unified Intelligence & Academic Operating System</p>
        </div>
      </div>

      {/* Center: Role Switcher Control */}
      <div className="hidden lg:flex items-center p-1 bg-slate-900/80 border border-slate-800 rounded-xl space-x-1">
        <button
          onClick={() => switchRole('student')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeRole === 'student'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student View</span>
        </button>

        <button
          onClick={() => switchRole('faculty')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeRole === 'faculty'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Faculty View</span>
        </button>

        <button
          onClick={() => switchRole('admin')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeRole === 'admin'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Admin View</span>
        </button>
      </div>

      {/* Right Controls: Notifications & User Profile */}
      <div className="flex items-center space-x-3">
        {/* Intelligence Graph Modal Trigger */}
        <button
          onClick={() => setIsGraphModalOpen(true)}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white font-bold text-xs transition-all hover:scale-105 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Intelligence Graph</span>
        </button>
        {/* Mobile Role Badge */}
        <button
          onClick={() => {
            const next = activeRole === 'student' ? 'faculty' : activeRole === 'faculty' ? 'admin' : 'student';
            switchRole(next);
          }}
          className="lg:hidden px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
        >
          {activeRole.toUpperCase()}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all relative"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-[#0b0f17]">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-2xl p-4 shadow-2xl border border-slate-800 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="font-bold text-sm text-white flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>University OS Stream</span>
                </span>
                <span className="text-[11px] text-indigo-400 font-semibold">{notifications.length} alerts</span>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {notifications.map(n => (
                  <div key={n.id} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-start space-x-3">
                    {n.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-200">{n.title}</p>
                        <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Card */}
        <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/40"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-white leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-indigo-400 font-medium capitalize">{currentUser.role} Mode</p>
          </div>
        </div>
      </div>
    </header>
  );
};
