import React, { useState, useEffect } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { Search, Command, BookOpen, User, FolderGit2, Sparkles, Award, CalendarCheck, X } from 'lucide-react';

export const CommandPaletteModal = ({ isOpen, onClose }) => {
  const { setActiveTab, switchRole, setIsGraphModalOpen, askAITutor } = useUniversity();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('open-command-palette'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 1, title: "Launch RAG AI Tutor", category: "AI", icon: Sparkles, action: () => { setActiveTab('ai_tutor'); onClose(); } },
    { id: 2, title: "View Attendance Risk Intelligence", category: "Academic", icon: CalendarCheck, action: () => { setActiveTab('attendance'); onClose(); } },
    { id: 3, title: "Inspect Capstone Projects & Milestones", category: "Projects", icon: FolderGit2, action: () => { setActiveTab('projects'); onClose(); } },
    { id: 4, title: "Check Placement Skill Gap Radar", category: "Placement", icon: Award, action: () => { setActiveTab('placement'); onClose(); } },
    { id: 5, title: "Open University Intelligence Graph", category: "System", icon: Command, action: () => { setIsGraphModalOpen(true); onClose(); } },
    { id: 6, title: "Switch to Faculty View Mode", category: "Role", icon: User, action: () => { switchRole('faculty'); onClose(); } },
    { id: 7, title: "Switch to Student View Mode", category: "Role", icon: User, action: () => { switchRole('student'); onClose(); } },
    { id: 8, title: "Ask RAG AI: 'Explain RSA algorithm'", category: "AI Quick Search", icon: Sparkles, action: () => { setActiveTab('ai_tutor'); askAITutor("Explain RSA key generation algorithm"); onClose(); } }
  ];

  const filteredCommands = commands.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f172a] border border-indigo-500/30 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center space-x-3 bg-slate-900">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type a command, course, or shortcut (e.g. RAG, Attendance, Faculty)..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono border border-slate-700">
            ESC
          </span>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map(cmd => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full p-3 rounded-xl hover:bg-indigo-600/20 text-left flex items-center justify-between text-xs transition-all border border-transparent hover:border-indigo-500/30"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-200">{cmd.title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-between text-[11px] text-slate-400 font-mono">
          <span>Press <strong>Ctrl+K</strong> anytime to toggle</span>
          <span>Digital University OS v2.0</span>
        </div>
      </div>
    </div>
  );
};
