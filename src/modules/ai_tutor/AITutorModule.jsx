import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { RAGInspectorModal } from '../../components/AI/RAGInspectorModal';
import { sampleQuizzes } from '../../data/ragCorpus';
import {
  Bot,
  Send,
  Sparkles,
  Database,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Lightbulb
} from 'lucide-react';

export const AITutorModule = () => {
  const { aiChatHistory, askAITutor, triggerConfetti } = useUniversity();
  const [inputQuery, setInputQuery] = useState("");
  const [showRAGInspector, setShowRAGInspector] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputQuery.trim()) return;
    askAITutor(inputQuery.trim());
    setInputQuery("");
  };

  const handleQuickPrompt = (promptText) => {
    askAITutor(promptText);
  };

  const startQuiz = () => {
    setActiveQuiz(sampleQuizzes["CS8501"].unit2);
    setQuizAnswers({});
    setQuizScore(null);
  };

  const submitQuiz = () => {
    let score = 0;
    activeQuiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    if (score === activeQuiz.length) {
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg glow-indigo">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-white">University RAG AI Tutor</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                VERIFIED SYLLABUS RAG
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Personalized learning loop indexed against CS8501, CS8502, MCA801, and University Regulations 2026.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowRAGInspector(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 hover:text-white font-bold text-xs transition-all shadow-md"
        >
          <Database className="w-4 h-4 text-indigo-400" />
          <span>Inspect RAG Vector Store</span>
        </button>
      </div>

      {/* Suggested Quick Prompts Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-bold text-[11px] whitespace-nowrap flex items-center space-x-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Prompts:</span>
        </span>
        <button
          onClick={() => handleQuickPrompt("What are the Unit 2 topics in Network Security?")}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white whitespace-nowrap transition-all"
        >
          Network Security Unit 2 Topics
        </button>
        <button
          onClick={() => handleQuickPrompt("Explain RSA key generation algorithm")}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white whitespace-nowrap transition-all"
        >
          Explain RSA Algorithm
        </button>
        <button
          onClick={() => handleQuickPrompt("What is the minimum attendance requirement for MCA?")}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white whitespace-nowrap transition-all"
        >
          Attendance Regulation 4.2
        </button>
        <button
          onClick={startQuiz}
          className="px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 font-bold hover:text-white whitespace-nowrap transition-all flex items-center space-x-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Quiz Mode</span>
        </button>
      </div>

      {/* Main Grid: AI Chat Area & Quiz Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: RAG Chat History */}
        <div className="lg:col-span-2 glass-panel rounded-3xl border border-slate-800 flex flex-col h-[560px] overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {aiChatHistory.map(msg => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-purple-600 text-white shadow-md glow-indigo'
                  }`}
                >
                  {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] space-y-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* RAG Vector Citation Badges */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.citations.map(c => (
                        <div
                          key={c.docId}
                          onClick={() => setShowRAGInspector(true)}
                          className="cursor-pointer px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono flex items-center space-x-1 hover:bg-emerald-500/20 transition-all"
                        >
                          <FileText className="w-3 h-3" />
                          <span>RAG Source: [{c.chunkId}] Match: {c.score}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 block">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-[#0b0f17]/90 flex items-center space-x-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about syllabus, regulations, RSA key exchange, or assignment rules..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:scale-105 transition-all shadow-md shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Col: Interactive Quiz / Learning Loop Widget */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Interactive Learning Quiz</span>
              </h3>
              {!activeQuiz && (
                <button
                  onClick={startQuiz}
                  className="text-xs font-bold text-purple-400 hover:underline"
                >
                  Start Quiz →
                </button>
              )}
            </div>

            {activeQuiz ? (
              <div className="mt-4 space-y-4 text-xs">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-[11px] flex justify-between">
                  <span>Unit 2: RSA Cryptography Test</span>
                  <span>{activeQuiz.length} Questions</span>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {activeQuiz.map((q, idx) => (
                    <div key={q.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <p className="font-bold text-slate-200">{idx + 1}. {q.question}</p>
                      <div className="space-y-1">
                        {q.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: i }))}
                            className={`w-full text-left p-2 rounded-lg border text-[11px] font-mono transition-all ${
                              quizAnswers[q.id] === i
                                ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold'
                                : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {quizScore !== null ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
                    <p className="font-bold text-emerald-400 text-sm">
                      Score: {quizScore} / {activeQuiz.length} ({Math.round((quizScore / activeQuiz.length) * 100)}%)
                    </p>
                    <p className="text-[10px] text-slate-300">Personalized Learning loop updated. Skill matrix refreshed!</p>
                  </div>
                ) : (
                  <button
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < activeQuiz.length}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg disabled:opacity-50 transition-all"
                  >
                    Submit Answers & Calculate Score
                  </button>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 space-y-3">
                <HelpCircle className="w-10 h-10 mx-auto text-purple-400 opacity-60" />
                <p className="text-xs font-bold text-slate-300">Ready to test your knowledge?</p>
                <p className="text-[11px] text-slate-400">
                  Click 'Start Quiz' to launch an AI-generated assessment based on your active syllabus chunk.
                </p>
                <button
                  onClick={startQuiz}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md"
                >
                  Start Unit 2 Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RAG Vector Inspector Modal */}
      <RAGInspectorModal isOpen={showRAGInspector} onClose={() => setShowRAGInspector(false)} />
    </div>
  );
};
