import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  User,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Clock,
  ShieldAlert,
  Send,
  MessageSquare,
  FileCheck2
} from 'lucide-react';

export const IssuesView = ({
  issuesList = [],
  onUpdateIssue,
  selectedIssue,
  onSelectIssue,
  onCloseDetail
}) => {
  const [filterTab, setFilterTab] = useState('All');
  const [newActionText, setNewActionText] = useState('');
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  // Counts
  const openCount = issuesList.filter((i) => i.status === 'Open').length;
  const inProgressCount = issuesList.filter((i) => i.status === 'In Progress').length;
  const resolvedCount = issuesList.filter((i) => i.status === 'Resolved').length;

  const tabs = [
    { id: 'All', label: 'All', count: issuesList.length },
    { id: 'Open', label: 'Open', count: openCount },
    { id: 'In Progress', label: 'In Progress', count: inProgressCount },
    { id: 'Resolved', label: 'Resolved', count: resolvedCount }
  ];

  // Filtered issues
  const filteredIssues = issuesList.filter((issue) => {
    if (filterTab === 'All') return true;
    return issue.status === filterTab;
  });

  // Severity badge style
  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-100 text-[#e01f1a]">
            Critical
          </span>
        );
      case 'Moderate':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800">
            Moderate
          </span>
        );
      case 'Low':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800">
            Low
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-zinc-100 text-zinc-700">
            {severity}
          </span>
        );
    }
  };

  // Status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-50 text-red-600 border border-red-200">
            Open
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-50 text-amber-700 border border-amber-200">
            In Progress
          </span>
        );
      case 'Resolved':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
            Resolved
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-zinc-100 text-zinc-700">
            {status}
          </span>
        );
    }
  };

  // Add corrective action to selected issue
  const handleAddCorrectiveAction = () => {
    if (!newActionText.trim() || !selectedIssue) return;

    const newAction = {
      id: `CA-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      author: 'Marcus Vance',
      text: newActionText.trim()
    };

    const updated = {
      ...selectedIssue,
      correctiveActions: [...(selectedIssue.correctiveActions || []), newAction]
    };

    onUpdateIssue(updated);
    setNewActionText('');
  };

  // Change issue status
  const handleChangeStatus = (newStatus) => {
    if (!selectedIssue) return;

    const actionText =
      newStatus === 'Resolved'
        ? 'Defect resolved and verified safe for commercial operation.'
        : `Status updated to ${newStatus}.`;

    const newAction = {
      id: `CA-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      author: 'Marcus Vance',
      text: actionText
    };

    const updated = {
      ...selectedIssue,
      status: newStatus,
      correctiveActions: [...(selectedIssue.correctiveActions || []), newAction]
    };

    onUpdateIssue(updated);
    setIsEditingStatus(false);
  };

  // DETAIL SCREEN FOR SELECTED ISSUE
  if (selectedIssue) {
    return (
      <div className="pb-8 space-y-4 px-4 pt-3">
        {/* Back header */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <button
            onClick={onCloseDetail}
            className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 font-semibold text-sm py-1"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Back to Defects</span>
          </button>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
            {selectedIssue.assetTag}
          </span>
        </div>

        {/* Issue Overview Card */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getSeverityBadge(selectedIssue.severity)}
              {getStatusBadge(selectedIssue.status)}
            </div>
            <span className="text-xs text-zinc-400">ID #{selectedIssue.id}</span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-zinc-900 leading-snug">
              {selectedIssue.title}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              {selectedIssue.assetName} • {selectedIssue.location}
            </p>
          </div>

          <p className="text-xs text-zinc-700 bg-zinc-50 p-3 rounded-xl border border-zinc-200/70 leading-relaxed">
            {selectedIssue.description}
          </p>

          {/* Photo evidence */}
          {selectedIssue.photoUrl && (
            <div>
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                Photo Evidence Attached
              </span>
              <div className="rounded-xl overflow-hidden border border-zinc-200 max-h-48 w-full bg-zinc-100">
                <img
                  src={selectedIssue.photoUrl}
                  alt={selectedIssue.title}
                  className="w-full h-44 object-cover"
                />
              </div>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-400 text-[10.5px] block">Assigned Tech</span>
              <span className="font-semibold text-zinc-800">{selectedIssue.assignedTo}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-400 text-[10.5px] block">Due Date</span>
              <span className="font-semibold text-[#e01f1a]">{selectedIssue.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Status Transition Controls */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
            Update Issue Status
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleChangeStatus('Open')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedIssue.status === 'Open'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => handleChangeStatus('In Progress')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedIssue.status === 'In Progress'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => handleChangeStatus('Resolved')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedIssue.status === 'Resolved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Mark Resolved
            </button>
          </div>
        </div>

        {/* Corrective Actions Audit Trail */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
            Corrective Actions Timeline
          </h3>

          <div className="space-y-2.5">
            {selectedIssue.correctiveActions && selectedIssue.correctiveActions.length > 0 ? (
              selectedIssue.correctiveActions.map((action, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="font-bold text-zinc-800">{action.author}</span>
                    <span>{action.timestamp}</span>
                  </div>
                  <p className="text-zinc-700 leading-relaxed">{action.text}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-400">No corrective actions logged yet.</p>
            )}
          </div>

          {/* Add Corrective Action Form */}
          <div className="pt-2 border-t border-zinc-100 space-y-2">
            <textarea
              value={newActionText}
              onChange={(e) => setNewActionText(e.target.value)}
              placeholder="Record repair action, replacement parts, or status note..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#e01f1a] focus:ring-1 focus:ring-[#e01f1a] bg-zinc-50/50"
            />
            <button
              onClick={handleAddCorrectiveAction}
              disabled={!newActionText.trim()}
              className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Corrective Action</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN ISSUES LIST (Matching Image 4)
  return (
    <div className="pb-8 space-y-3 px-4 pt-3">
      {/* Segmented Filter Bar matching Image 4 */}
      <div className="bg-zinc-100 p-1 rounded-xl flex items-center">
        {tabs.map((tab) => {
          const isActive = filterTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                isActive ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {/* Count & Info label matching Image 4 */}
      <div className="flex items-center justify-between px-1 text-xs text-zinc-500 font-medium">
        <span>{filteredIssues.length} Reported Defects</span>
        <span>Tap to manage</span>
      </div>

      {/* List matching Image 4 */}
      <div className="space-y-3">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            onClick={() => onSelectIssue(issue)}
            className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all cursor-pointer active:scale-[0.99]"
          >
            {/* Top Row: Severity + Status + Asset Tag */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {getSeverityBadge(issue.severity)}
                {getStatusBadge(issue.status)}
                <span className="text-xs font-bold text-zinc-700">{issue.assetTag}</span>
              </div>
            </div>

            {/* Title & Equipment with Chevron */}
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-2">
                <h3 className="font-bold text-sm text-zinc-900 leading-snug">{issue.title}</h3>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                  {issue.assetName} • {issue.location}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
            </div>

            {/* Bottom Row: Assignee & Due Date */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5 text-zinc-600">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                <span className="truncate">{issue.assignedTo}</span>
              </div>
              <span className="font-semibold text-zinc-700">Due: {issue.dueDate}</span>
            </div>
          </div>
        ))}

        {filteredIssues.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center border border-zinc-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h4 className="font-bold text-zinc-800 text-sm">No defects in this category</h4>
            <p className="text-xs text-zinc-500 mt-1">All inspection items have been resolved.</p>
          </div>
        )}
      </div>
    </div>
  );
};
