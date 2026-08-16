import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { X, Bot, Sparkles, Award, CheckCircle2, Mic, Play, ArrowRight, ShieldCheck } from 'lucide-react';

export const AIMockInterviewModal = ({ isOpen, onClose }) => {
  const { triggerConfetti, addNotification } = useUniversity();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [scoreAcc, setScoreAcc] = useState(0);

  if (!isOpen) return null;

  const interviewQuestions = [
    {
      id: 1,
      role: "Associate AI Systems Engineer (Google Cloud AI)",
      question: "Explain how Retrieval-Augmented Generation (RAG) reduces hallucination in Large Language Models compared to pure fine-tuning.",
      keywords: ["embeddings", "vector store", "retrieval", "context", "grounding", "citations"]
    },
    {
      id: 2,
      role: "Associate AI Systems Engineer (Google Cloud AI)",
      question: "In the RSA algorithm, how does Euler's totient function φ(n) ensure mathematical trapdoor one-way security?",
      keywords: ["primes", "euler", "modular inverse", "e", "d", "coprime"]
    }
  ];

  const activeQ = interviewQuestions[currentQuestionIndex];

  const handleEvaluate = () => {
    if (!userResponse.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      let matchedCount = 0;
      activeQ.keywords.forEach(kw => {
        if (userResponse.toLowerCase().includes(kw)) matchedCount += 1;
      });

      const score = Math.min(65 + matchedCount * 7, 98);
      const passed = score >= 80;

      setEvaluation({
        score,
        passed,
        feedback: passed
          ? `Exceptional technical articulation! Your response correctly addressed key concepts like ${activeQ.keywords.slice(0, 3).join(', ')}.`
          : `Good attempt. Try incorporating specific terminology such as ${activeQ.keywords.join(', ')} for higher alignment scores.`
      });

      setScoreAcc(prev => prev + score);
      setIsEvaluating(false);

      if (passed) {
        triggerConfetti();
        addNotification("Mock Interview Passed!", `Scored ${score}% in ${activeQ.role} technical round.`, "success");
      }
    }, 800);
  };

  const handleNext = () => {
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserResponse("");
      setEvaluation(null);
    } else {
      addNotification("Interview Session Complete", `Overall Average Interview Rating: ${Math.round(scoreAcc / interviewQuestions.length)}%.`, "success");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f172a] border border-amber-500/30 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <span>AI Technical Mock Recruiter</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                  LIVE TECHNICAL SCREEN
                </span>
              </h2>
              <p className="text-xs text-slate-300">Target Role: {activeQ.role}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Question Prompt */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-400">Technical Question {currentQuestionIndex + 1} of {interviewQuestions.length}:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">AI Recruiter Panel</span>
            </div>
            <p className="text-slate-100 font-bold text-sm leading-relaxed">{activeQ.question}</p>
          </div>

          {/* User Answer Textarea */}
          <div className="space-y-2 text-xs">
            <label className="block font-bold text-slate-300">Your Technical Explanation / Response:</label>
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Type your technical response incorporating vector store embeddings, context grounding, and citations..."
              rows={4}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {!evaluation ? (
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating || !userResponse.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {isEvaluating ? (
                <span>Evaluating Response via Semantic NLP...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Evaluate Response & Award Skill Badge</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                evaluation.passed ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              }`}>
                <div className="flex items-center justify-between font-bold text-sm">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Technical Score: {evaluation.score}%</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">
                    {evaluation.passed ? 'SKILL BADGE AWARDED' : 'REVIEW SUGGESTED'}
                  </span>
                </div>
                <p className="text-slate-200 text-[11px] leading-relaxed">{evaluation.feedback}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2"
              >
                <span>{currentQuestionIndex < interviewQuestions.length - 1 ? 'Proceed to Next Technical Question' : 'Finish Mock Interview'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
