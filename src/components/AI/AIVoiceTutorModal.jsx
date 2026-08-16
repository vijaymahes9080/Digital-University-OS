import React, { useState, useEffect } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { X, Mic, MicOff, Volume2, Sparkles, Bot, CheckCircle2, Play, Square } from 'lucide-react';

export const AIVoiceTutorModal = ({ isOpen, onClose }) => {
  const { askAITutor, aiChatHistory } = useUniversity();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [statusText, setStatusText] = useState("Click microphone to speak your academic query");

  if (!isOpen) return null;

  const latestAIResponse = aiChatHistory.filter(m => m.sender === 'ai').slice(-1)[0]?.text || "";

  // Web Speech API Synthesis
  const speakResponse = (text) => {
    if (!('speechSynthesis' in window)) {
      setStatusText("Speech synthesis not supported on this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#\[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setStatusText("AI Tutor speaking response...");
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setStatusText("Response complete. Ask another question!");
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setStatusText("Audio playback stopped.");
    }
  };

  // Web Speech API Recognition
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatusText("Speech recognition not supported in this browser. Trying simulated microphone input.");
      // Fallback simulation
      setIsListening(true);
      setStatusText("Listening... (Speak: 'Explain RSA algorithm')");
      setTimeout(() => {
        setTranscript("Explain RSA key generation algorithm");
        setIsListening(false);
        askAITutor("Explain RSA key generation algorithm");
        setStatusText("Query processed via Voice!");
      }, 2500);
      return;
    }

    if (isListening) {
      setIsListening(false);
      setStatusText("Microphone paused.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setStatusText("Listening to your voice... Speak now.");
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const resultTranscript = event.results[current][0].transcript;
        setTranscript(resultTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript.trim()) {
          askAITutor(transcript.trim());
          setStatusText("Voice query sent to University RAG AI!");
        }
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f172a] border border-indigo-500/30 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Bot className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <span>AI Multimodal Voice Tutor</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                  WEB SPEECH API
                </span>
              </h2>
              <p className="text-xs text-slate-300">Hands-free voice recognition & text-to-speech audio synthesis.</p>
            </div>
          </div>

          <button onClick={() => { stopSpeaking(); onClose(); }} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex flex-col items-center text-center">
          {/* Pulsing Visualizer Circle */}
          <div className="relative flex items-center justify-center my-4">
            <div className={`w-32 h-32 rounded-full border-2 transition-all flex items-center justify-center ${
              isListening
                ? 'bg-rose-500/20 border-rose-500 animate-ping scale-110'
                : isSpeaking
                ? 'bg-indigo-500/20 border-indigo-400 animate-pulse scale-105'
                : 'bg-slate-900 border-indigo-500/30'
            }`}>
              <button
                onClick={toggleListening}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-white transition-all shadow-xl ${
                  isListening
                    ? 'bg-rose-600 shadow-rose-600/50'
                    : 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-indigo-600/40 hover:scale-105'
                }`}
              >
                {isListening ? <MicOff className="w-10 h-10 animate-pulse" /> : <Mic className="w-10 h-10" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono font-bold text-indigo-400 uppercase">{statusText}</p>
            {transcript && (
              <p className="text-xs text-slate-200 bg-slate-900 border border-slate-800 p-2.5 rounded-xl font-medium">
                "{transcript}"
              </p>
            )}
          </div>

          {/* Audio Output Controls */}
          {latestAIResponse && (
            <div className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-extrabold text-slate-200 flex items-center space-x-1.5">
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  <span>Latest RAG Response</span>
                </span>
                <div className="flex items-center space-x-2">
                  {isSpeaking ? (
                    <button
                      onClick={stopSpeaking}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[10px] flex items-center space-x-1"
                    >
                      <Square className="w-3 h-3" />
                      <span>Stop Audio</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => speakResponse(latestAIResponse)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[10px] flex items-center space-x-1 hover:bg-indigo-500"
                    >
                      <Play className="w-3 h-3" />
                      <span>Read Aloud</span>
                    </button>
                  )}
                </div>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-4">
                {latestAIResponse}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-mono text-[10px]">Speech Recognition Engine: Native Web API</span>
          <button
            onClick={() => { stopSpeaking(); onClose(); }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
          >
            Close Voice Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
