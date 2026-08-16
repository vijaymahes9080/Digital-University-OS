import React from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { StatCard } from '../../components/common/StatCard';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { CalendarCheck, AlertTriangle, CheckCircle2, TrendingUp, PlusCircle, MinusCircle } from 'lucide-react';

export const AttendanceModule = () => {
  const { attendanceData, markAttendance, users } = useUniversity();
  const student = users.student;

  const totalClassesAttended = attendanceData.reduce((sum, item) => sum + item.attendedClasses, 0);
  const totalClassesHeld = attendanceData.reduce((sum, item) => sum + item.totalClasses, 0);
  const overallPct = parseFloat(((totalClassesAttended / totalClassesHeld) * 100).toFixed(1));

  const atRiskCourses = attendanceData.filter(a => a.status === 'HIGH RISK');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-white">Attendance Intelligence Engine</h1>
            <Badge variant={overallPct < 75 ? "rose" : "emerald"}>
              Overall: {overallPct}%
            </Badge>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time attendance tracking with predictive risk analysis and condonation threshold calculations.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-right">
          <p className="text-slate-400">Regulation 4.2 Status:</p>
          <p className="font-bold text-emerald-400">{overallPct >= 75 ? "ELIGIBLE FOR END-SEM EXAMS" : "ACTION REQUIRED"}</p>
        </div>
      </div>

      {/* High Risk Alert Banner */}
      {atRiskCourses.length > 0 && (
        <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 space-y-3">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0 animate-bounce" />
            <div>
              <h3 className="text-sm font-extrabold text-rose-300 uppercase tracking-wide">
                PREDICTIVE ATTENDANCE RISK ALERT — {atRiskCourses.length} COURSE AT RISK
              </h3>
              <p className="text-xs text-slate-300">
                Course attendance falls below the mandatory 75% threshold mandated by University Regulation Section 4.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-rose-500/20">
            {atRiskCourses.map(item => (
              <div key={item.courseId} className="p-3 rounded-2xl bg-[#0b0f17] border border-rose-500/30 text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-white">{item.courseName}</span>
                  <span className="text-rose-400">{item.percentage}%</span>
                </div>
                <p className="text-slate-300 text-[11px] font-mono">{item.recommendedAction}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Overall Attendance"
          value={`${overallPct}%`}
          subtitle={`${totalClassesAttended} of ${totalClassesHeld} Total Sessions`}
          icon={CalendarCheck}
          color={overallPct < 75 ? "rose" : "emerald"}
        />
        <StatCard
          title="Courses Safe"
          value={attendanceData.filter(a => a.status !== 'HIGH RISK').length}
          subtitle="Meets 75% threshold"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Courses At Risk"
          value={atRiskCourses.length}
          subtitle="Action required before End-Sem"
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* Course Attendance List & Interactive Logger */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span>Course-wise Attendance & Interactive Session Logger</span>
        </h3>

        <div className="space-y-4">
          {attendanceData.map(item => (
            <div
              key={item.courseId}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-sm text-indigo-400">{item.code}</span>
                    <span className="font-bold text-sm text-white">{item.courseName}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Classes Attended: {item.attendedClasses} / {item.totalClasses}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant={item.status === 'HIGH RISK' ? 'rose' : 'emerald'}>
                    {item.percentage}% ({item.status})
                  </Badge>

                  {/* Interactive Buttons to mark present / absent */}
                  <div className="flex items-center space-x-1 pl-2 border-l border-slate-800">
                    <button
                      onClick={() => markAttendance(item.courseId, 'Present')}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition-all"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Present</span>
                    </button>
                    <button
                      onClick={() => markAttendance(item.courseId, 'Absent')}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-bold transition-all"
                    >
                      <MinusCircle className="w-3.5 h-3.5" />
                      <span>Absent</span>
                    </button>
                  </div>
                </div>
              </div>

              <ProgressBar
                value={item.percentage}
                color={item.percentage < 75 ? 'rose' : item.percentage > 85 ? 'emerald' : 'indigo'}
                height="h-2.5"
              />

              <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <span className="text-slate-400">Predictive Recommendation:</span>
                <span className="font-mono text-indigo-300 font-bold">{item.recommendedAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
