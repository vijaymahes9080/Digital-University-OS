import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "indigo", onClick }) => {
  const iconColors = {
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20"
  };

  return (
    <div
      onClick={onClick}
      className={`glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 relative overflow-hidden transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          {trend && (
            <span className={`inline-flex items-center text-xs font-semibold mt-2 ${trend.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend.positive ? '↑' : '↓'} {trend.text}
            </span>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${iconColors[color] || iconColors.indigo}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};
