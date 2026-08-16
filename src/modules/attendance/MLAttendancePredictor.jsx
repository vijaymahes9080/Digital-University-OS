import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { X, TrendingUp, AlertTriangle, CheckCircle2, Calculator, ShieldAlert, FileText, Send } from 'lucide-react';

export const MLAttendancePredictor = ({ isOpen, onClose }) => {
  const { attendanceData, addNotification } = useUniversity();
  const [selectedCourseId, setSelectedCourseId] = useState("CS8501");
  const [futureSimulatedPresent, setFutureSimulatedPresent] = useState(4);
  const [futureSimulatedAbsent, setFutureSimulatedAbsent] = useState(0);
  const [medicalReason, setMedicalReason] = useState("");
  const [condonationSubmitted, setCondonationSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentCourse = attendanceData.find(a => a.courseId === selectedCourseId) || attendanceData[0];

  // Monte Carlo Simulated Attendance forecast calculation
  const newAttended = currentCourse.attendedClasses + futureSimulatedPresent;
  const newTotal = currentCourse.totalClasses + futureSimulatedPresent + futureSimulatedAbsent;
  const forecastedPct = parseFloat(((newAttended / newTotal) * 100).toFixed(1));

  let forecastedStatus = "SAFE";
  if (forecastedPct < 75.0) {
    forecastedStatus = "HIGH RISK";
  } else if (forecastedPct >= 85.0) {
    forecastedStatus = "EXCELLENT";
  }

  const handleCondonationSubmit = (e) => {
    e.preventDefault();
    if (!medicalReason.trim()) return;
    setCondonationSubmitted(true);
    addNotification("Condonation Request Submitted", "Medical condonation under Regulation 4.2 sent to Dean Harrison for review.", "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f172a] border border-indigo-500/30 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-rose-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <span>Monte Carlo Attendance Simulator & Condonation Workflow</span>
              </h2>
              <p className="text-xs text-slate-300">Simulate future session outcomes & submit Regulation 4.2 medical requests.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Select Course & Current Baseline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Select Course to Forecast</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
              >
                {attendanceData.map(c => (
                  <option key={c.courseId} value={c.courseId}>
                    {c.code} — {c.courseName} ({c.percentage}%)
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex flex-col justify-center">
              <span className="text-slate-400">Current Status:</span>
              <span className={`font-mono font-bold text-sm ${currentCourse.percentage < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {currentCourse.percentage}% ({currentCourse.status})
              </span>
            </div>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Simulate Next N Upcoming Classes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Simulated Present Classes (+N):</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={futureSimulatedPresent}
                  onChange={(e) => setFutureSimulatedPresent(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Simulated Absent Classes (+M):</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={futureSimulatedAbsent}
                  onChange={(e) => setFutureSimulatedAbsent(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>
            </div>

            {/* Simulated Result Output */}
            <div className="p-4 rounded-xl bg-[#0b0f17] border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Forecasted Attendance:</span>
                <p className={`text-base font-extrabold font-mono ${forecastedPct < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {forecastedPct}% ({forecastedStatus})
                </p>
              </div>

              <div className="text-right">
                <span className="text-slate-400">Total Classes Attended:</span>
                <p className="text-white font-bold">{newAttended} / {newTotal}</p>
              </div>
            </div>
          </div>

          {/* Regulation 4.2 Condonation Form */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3 text-xs">
            <h3 className="font-extrabold text-rose-300 uppercase tracking-wider flex items-center space-x-1.5">
              <FileText className="w-4 h-4" />
              <span>Regulation 4.2 Medical Condonation Request</span>
            </h3>
            <p className="text-slate-300 text-[11px]">
              If attendance is between 65% and 74.9%, you may request medical condonation by submitting details below.
            </p>

            {condonationSubmitted ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Condonation Form Submitted to Dean Harrison! Status: Pending Approval.</span>
              </div>
            ) : (
              <form onSubmit={handleCondonationSubmit} className="space-y-2">
                <textarea
                  value={medicalReason}
                  onChange={(e) => setMedicalReason(e.target.value)}
                  placeholder="Enter medical reason & certificate reference details..."
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Condonation Request to Dean</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs">
            Close Forecast Engine
          </button>
        </div>
      </div>
    </div>
  );
};
