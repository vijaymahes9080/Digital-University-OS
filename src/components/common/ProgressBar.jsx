import React from 'react';

export const ProgressBar = ({ value, max = 100, color = "indigo", showLabel = false, height = "h-2" }) => {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    indigo: "bg-indigo-500 shadow-indigo-500/50",
    emerald: "bg-emerald-500 shadow-emerald-500/50",
    rose: "bg-rose-500 shadow-rose-500/50",
    amber: "bg-amber-500 shadow-amber-500/50",
    purple: "bg-purple-500 shadow-purple-500/50",
    cyan: "bg-cyan-500 shadow-cyan-500/50"
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-slate-300">
          <span>Progress</span>
          <span>{pct.toFixed(0)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${colors[color] || colors.indigo} ${height} rounded-full transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
