import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { X, ShieldCheck, Lock, CheckCircle2, Copy, ExternalLink, Award, FileCode2 } from 'lucide-react';

export const CertificateLedgerModal = ({ isOpen, onClose }) => {
  const { users } = useUniversity();
  const [copied, setCopied] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [inputHash, setInputHash] = useState("");

  if (!isOpen) return null;

  const student = users.student;
  const certificateHash = "0x8f4b92a1e3c750d491829e2fa83190b4e23190f84a1d82001c900e47291a53b2";

  const handleCopy = () => {
    navigator.clipboard.writeText(certificateHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    if (inputHash.trim() === certificateHash || inputHash.trim() === "0x8f4b92a1e3c750d491829e2fa83190b4e23190f84a1d82001c900e47291a53b2") {
      setVerificationResult({
        valid: true,
        degree: "Master of Computer Applications (MCA)",
        issuedTo: student.name,
        issuedBy: "Digital University OS Registrar",
        timestamp: "2026-08-16 10:00:00 UTC",
        blockNumber: 19482012
      });
    } else {
      setVerificationResult({
        valid: false,
        message: "Invalid or tampered cryptographic hash. Certificate record not found on university ledger."
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f172a] border border-emerald-500/30 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <span>Blockchain Verified Academic Ledger</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                  SHA-256 PROOF
                </span>
              </h2>
              <p className="text-xs text-slate-300">Decentralized tamper-proof academic credentials & degree verification.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Certificate Card Preview */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-sm text-white">{student.program}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                VERIFIED ON-CHAIN
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Scholar: <strong className="text-white">{student.name}</strong> ({student.id}) • CGPA: <strong className="text-emerald-400">{student.cgpa}</strong>
            </p>

            <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800 space-y-1 font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-400">
                <span>Cryptographic SHA-256 Proof Hash:</span>
                <button onClick={handleCopy} className="text-indigo-400 hover:underline flex items-center space-x-1">
                  <Copy className="w-3 h-3" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <p className="text-emerald-300 font-bold break-all">{certificateHash}</p>
            </div>
          </div>

          {/* Employer Verification Portal */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Public Employer Verification Portal</span>
            </h3>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputHash}
                onChange={(e) => setInputHash(e.target.value)}
                placeholder="Paste certificate SHA-256 hash or click Paste Sample..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => setInputHash(certificateHash)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Paste Sample
              </button>
              <button
                onClick={handleVerify}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
              >
                Verify Hash
              </button>
            </div>

            {/* Verification Result output */}
            {verificationResult && (
              <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-fadeIn ${
                verificationResult.valid ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
              }`}>
                <div className="flex items-center space-x-2 font-bold text-sm">
                  {verificationResult.valid ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <X className="w-5 h-5 text-rose-400" />}
                  <span>{verificationResult.valid ? "AUTHENTIC CREDENTIAL CONFIRMED" : "VERIFICATION FAILED"}</span>
                </div>

                {verificationResult.valid ? (
                  <div className="space-y-1 font-mono text-[11px] pt-1 text-slate-200">
                    <p>Degree: {verificationResult.degree}</p>
                    <p>Issued To: {verificationResult.issuedTo}</p>
                    <p>Authority: {verificationResult.issuedBy}</p>
                    <p>Block #: {verificationResult.blockNumber}</p>
                    <p>Timestamp: {verificationResult.timestamp}</p>
                  </div>
                ) : (
                  <p>{verificationResult.message}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs">
            Close Ledger Portal
          </button>
        </div>
      </div>
    </div>
  );
};
