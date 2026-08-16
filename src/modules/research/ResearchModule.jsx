import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import {
  BookOpenCheck,
  Award,
  FileText,
  Database,
  ExternalLink,
  PlusCircle,
  TrendingUp,
  Layers,
  Sparkles
} from 'lucide-react';

export const ResearchModule = () => {
  const { researchData, users, addNotification, triggerConfetti } = useUniversity();
  const [showAddPublicationModal, setShowAddPublicationModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newVenue, setNewVenue] = useState("");

  const totalCitations = researchData.publications.reduce((sum, p) => sum + (p.citations || 0), 0);

  const handleAddPub = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    researchData.publications.unshift({
      id: `PUB-0${researchData.publications.length + 1}`,
      title: newTitle,
      authors: "Alex Rivers, Dr. Sarah Vance",
      venue: newVenue || "IEEE Transactions on Neural Networks & Learning Systems 2026",
      type: "Journal Article",
      status: "Accepted",
      doi: "10.1109/TNNLS.2026.31902",
      citations: 0,
      link: "#"
    });

    triggerConfetti();
    addNotification("Research Publication Added", `Paper "${newTitle.slice(0, 30)}..." added to university RAG index.`, "success");
    setNewTitle("");
    setNewVenue("");
    setShowAddPublicationModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-white">Research & Innovation Operating System</h1>
            <Badge variant="indigo">IEEE & Springer Indexed</Badge>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Tracking university research papers, IPO patent filings, dataset repositories, and academic citations.
          </p>
        </div>

        <button
          onClick={() => setShowAddPublicationModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Research Paper</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Publications"
          value={researchData.publications.length}
          subtitle="IEEE & Springer Journals"
          icon={BookOpenCheck}
          color="indigo"
        />
        <StatCard
          title="Patents Filed"
          value={researchData.patents.length}
          subtitle="Indian Patent Office (IPO)"
          icon={Award}
          color="purple"
        />
        <StatCard
          title="Total Citations"
          value={totalCitations}
          subtitle="H-Index Impact Score"
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          title="Research Datasets"
          value={researchData.datasets.length}
          subtitle="Open-Source Benchmarks"
          icon={Database}
          color="amber"
        />
      </div>

      {/* Main Grid: Publications & Patents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Publications List */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Peer-Reviewed Publications</span>
            </h3>
            <span className="text-xs font-mono text-indigo-400 font-bold">{researchData.publications.length} Indexed</span>
          </div>

          <div className="space-y-4">
            {researchData.publications.map(pub => (
              <div key={pub.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-indigo-500/30 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={pub.status === 'Published' ? 'emerald' : 'indigo'}>{pub.type}</Badge>
                      <span className="text-xs font-mono text-slate-400">{pub.id}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-white mt-1 leading-snug">{pub.title}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold whitespace-nowrap">
                    {pub.citations} Citations
                  </span>
                </div>

                <p className="text-xs text-slate-300">Authors: <span className="text-slate-100 font-semibold">{pub.authors}</span></p>

                <div className="p-3 rounded-xl bg-[#0b0f17] border border-slate-800/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-slate-400 font-medium">{pub.venue}</span>
                  <span className="font-mono text-indigo-400 font-bold">DOI: {pub.doi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Patents & Open Datasets */}
        <div className="space-y-6">
          {/* Patents Card */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Patents & Intellectual Property</span>
            </h3>

            {researchData.patents.map(pat => (
              <div key={pat.id} className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="purple">{pat.status}</Badge>
                  <span className="text-[10px] font-mono text-slate-400">{pat.filingDate}</span>
                </div>
                <h5 className="text-xs font-extrabold text-white">{pat.title}</h5>
                <p className="text-[11px] text-slate-400">App No: <span className="font-mono text-indigo-300 font-bold">{pat.applicationNo}</span></p>
                <p className="text-[11px] text-slate-400">{pat.jurisdiction}</p>
              </div>
            ))}
          </div>

          {/* Datasets Card */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Open Academic Datasets</span>
            </h3>

            {researchData.datasets.map(ds => (
              <div key={ds.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-400">{ds.title}</span>
                  <Badge variant="emerald">{ds.downloads} Downloads</Badge>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{ds.description}</p>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Format: {ds.format}</span>
                  <span className="text-indigo-400 font-bold">Public License</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Publication Modal */}
      {showAddPublicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-3xl border border-indigo-500/30 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Add Research Paper to University RAG</span>
              </h3>
              <button onClick={() => setShowAddPublicationModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddPub} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Paper Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deep Neural Architectures for Real-Time Campus Intelligence"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Conference / Journal Venue</label>
                <input
                  type="text"
                  placeholder="e.g. IEEE International Conference on AI in Education (ICAI 2026)"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddPublicationModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Index & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
