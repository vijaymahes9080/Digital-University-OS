import React from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { Badge } from '../../components/common/Badge';
import { User, Shield, GraduationCap, Mail, Award, CheckCircle2, Code, Terminal, GitBranch } from 'lucide-react';

export const ProfileView = () => {
  const { currentUser, activeRole, switchRole } = useUniversity();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/40 glow-indigo"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold text-white">{currentUser.name}</h1>
                <Badge variant="indigo" className="capitalize">{activeRole} Role</Badge>
              </div>
              <p className="text-sm font-medium text-slate-300 mt-0.5">{currentUser.title}</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{currentUser.email}</span>
                <span>•</span>
                <span>ID: {currentUser.id}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => switchRole('student')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'student' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Switch Student
            </button>
            <button
              onClick={() => switchRole('faculty')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'faculty' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Switch Faculty
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'admin' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Switch Admin
            </button>
          </div>
        </div>
      </div>

      {/* Developer & Repository Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Developer Configuration</h3>
              <p className="text-xs text-slate-400">Configured Git Author & Environment Info</p>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Git User Name:</span>
              <span className="text-indigo-300 font-bold">Vijay Mahes</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Git Email:</span>
              <span className="text-indigo-300 font-bold">Vijaypradhap2004@gmail.com</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Composer Author:</span>
              <span className="text-emerald-400 font-bold">vijaymahes9080</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">GitHub Repository Details</h3>
              <p className="text-xs text-slate-400">Remote origin & MCA capstone project link</p>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Repository Remote:</span>
              <span className="text-emerald-400 font-bold truncate max-w-[200px]">vijaymahes9080/Digital-University-OS</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Active Branch:</span>
              <span className="text-indigo-400 font-bold">main</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Push Status:</span>
              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>UP TO DATE</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
