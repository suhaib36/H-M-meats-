import React from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ClipboardList,
  ChevronRight,
  Wrench,
  Calendar,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const HomeView = ({
  onStartInspection,
  onNavigateToIssues,
  onNavigateToEquipment,
  onNavigateToMaintenance,
  onSelectIssue,
  issuesList = [],
  maintenanceList = [],
  activeBranch = 'Winnipeg Branch'
}) => {
  // Urgent issues (Critical)
  const urgentIssues = issuesList.filter((iss) => iss.severity === 'Critical' || iss.status === 'Open').slice(0, 2);
  const upcomingMaintenance = maintenanceList.slice(0, 2);

  return (
    <div className="pb-8 space-y-4 px-4 pt-4">
      {/* Top Welcome Card */}
      <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-500">
            {activeBranch.toUpperCase()} • DEPOT FLEET
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Shift Active</span>
          </div>
        </div>

        <div className="mt-1 flex items-baseline justify-between">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">Good morning, Marcus</h2>
          <span className="text-xs text-zinc-400 font-medium">Tech ID #SE-8842</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
          <span>Monday, October 12, 2026</span>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-4 gap-2.5 mt-4">
          {/* Pending */}
          <div
            onClick={onNavigateToEquipment}
            className="bg-zinc-50/90 hover:bg-zinc-100/90 rounded-xl p-2.5 flex flex-col items-center justify-center border border-zinc-200/70 text-center cursor-pointer transition-colors"
          >
            <Clock className="w-4 h-4 text-amber-500 mb-1" />
            <span className="text-lg font-bold text-zinc-900 leading-none">2</span>
            <span className="text-[11px] text-zinc-500 font-medium mt-1">Pending</span>
          </div>

          {/* Completed */}
          <div
            onClick={onNavigateToEquipment}
            className="bg-zinc-50/90 hover:bg-zinc-100/90 rounded-xl p-2.5 flex flex-col items-center justify-center border border-zinc-200/70 text-center cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
            <span className="text-lg font-bold text-zinc-900 leading-none">17</span>
            <span className="text-[11px] text-zinc-500 font-medium mt-1">Completed</span>
          </div>

          {/* Failed */}
          <div
            onClick={onNavigateToIssues}
            className="bg-zinc-50/90 hover:bg-zinc-100/90 rounded-xl p-2.5 flex flex-col items-center justify-center border border-zinc-200/70 text-center cursor-pointer transition-colors"
          >
            <XCircle className="w-4 h-4 text-[#e01f1a] mb-1" />
            <span className="text-lg font-bold text-zinc-900 leading-none">2</span>
            <span className="text-[11px] text-zinc-500 font-medium mt-1">Failed</span>
          </div>

          {/* Issues */}
          <div
            onClick={onNavigateToIssues}
            className="bg-zinc-50/90 hover:bg-zinc-100/90 rounded-xl p-2.5 flex flex-col items-center justify-center border border-zinc-200/70 text-center cursor-pointer transition-colors"
          >
            <AlertTriangle className="w-4 h-4 text-[#e01f1a] mb-1" />
            <span className="text-lg font-bold text-[#e01f1a] leading-none">3</span>
            <span className="text-[11px] text-zinc-500 font-medium mt-1">Issues</span>
          </div>
        </div>
      </div>

      {/* Start New Inspection Banner */}
      <button
        onClick={onStartInspection}
        className="w-full bg-[#e01f1a] hover:bg-[#c41814] active:bg-[#a51410] text-white rounded-2xl p-4 flex items-center justify-between shadow-md transition-all group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <ClipboardList className="w-6 h-6 text-white stroke-[2]" />
          </div>
          <div className="text-left">
            <div className="font-bold text-base leading-snug">Start New Inspection</div>
            <div className="text-xs text-white/80 font-normal">Equipment • Safety • Vehicle</div>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
          <ArrowRight className="w-5 h-5 text-white stroke-[2.2]" />
        </div>
      </button>

      {/* Urgent Defects Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#e01f1a]" />
            <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-700">
              Urgent Defects & Corrective Actions
            </h3>
          </div>
          <button
            onClick={onNavigateToIssues}
            className="text-xs text-[#e01f1a] font-bold hover:underline flex items-center"
          >
            <span>View All ({issuesList.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {urgentIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onSelectIssue(issue)}
              className="bg-white rounded-2xl p-3.5 border border-red-100 shadow-xs hover:border-red-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-red-100 text-[#e01f1a]">
                    {issue.severity}
                  </span>
                  <span className="text-xs font-bold text-zinc-800">{issue.assetTag}</span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs text-zinc-500 truncate">{issue.location}</span>
                </div>
                <span className="text-[11px] font-semibold text-[#e01f1a]">
                  Due {issue.dueDate.substring(5)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <h4 className="font-bold text-sm text-zinc-900 leading-tight">{issue.title}</h4>
                  <p className="text-xs text-zinc-500 line-clamp-1 mt-1">{issue.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Maintenance Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-zinc-700" />
            <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-700">
              Upcoming Maintenance
            </h3>
          </div>
          <button
            onClick={onNavigateToMaintenance}
            className="text-xs text-zinc-600 font-bold hover:underline flex items-center"
          >
            <span>Schedule</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {upcomingMaintenance.map((maint) => (
            <div
              key={maint.id}
              onClick={onNavigateToMaintenance}
              className="bg-white rounded-2xl p-3.5 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-colors cursor-pointer flex items-center justify-between"
            >
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200">
                    {maint.type}
                  </span>
                  <span className="text-xs text-zinc-500">{maint.assetTag}</span>
                </div>
                <h4 className="font-bold text-sm text-zinc-900">{maint.title}</h4>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">{maint.assetName}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-sm text-zinc-800">
                  {maint.scheduledDate.substring(5)}
                </div>
                <div className="text-[10px] text-zinc-400">Scheduled</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
