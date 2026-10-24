import React, { useState } from 'react';
import {
  Wrench,
  FileText,
  Bell,
  Settings,
  User,
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Share2,
  ShieldCheck,
  Building,
  Check,
  Smartphone,
  Wifi,
  ExternalLink
} from 'lucide-react';
import { CURRENT_USER, BRANCHES, BUILDINGS } from '../data/mockData';

export const MoreView = ({
  initialSubScreen = null,
  maintenanceList = [],
  reportsList = [],
  notificationsList = [],
  activeBranch = 'Winnipeg Branch',
  onSelectBranch,
  onNavigateToTab,
  onMarkNotificationRead,
  onMarkAllNotificationsRead
}) => {
  const [subScreen, setSubScreen] = useState(initialSubScreen);
  const [selectedReport, setSelectedReport] = useState(null);
  const [exportToast, setExportToast] = useState(null);

  // Sync initialSubScreen
  React.useEffect(() => {
    if (initialSubScreen) {
      setSubScreen(initialSubScreen);
    }
  }, [initialSubScreen]);

  // Handle Export Simulation
  const handleExport = (type) => {
    setExportToast(`Generating & downloading ${type} report...`);
    setTimeout(() => {
      setExportToast(`${type} successfully downloaded!`);
      setTimeout(() => setExportToast(null), 2500);
    }, 1200);
  };

  /* ------------------------------------------------------------------
     SUBSCREEN: MAINTENANCE SCHEDULING (Requirement 6)
  ------------------------------------------------------------------ */
  if (subScreen === 'maintenance') {
    return (
      <div className="pb-8 space-y-4 px-4 pt-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <button
            onClick={() => setSubScreen(null)}
            className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 font-semibold text-sm py-1"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Back to More</span>
          </button>
          <span className="text-xs font-bold text-zinc-500">Service Timelines</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-zinc-900">Maintenance Scheduling</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Standard Stephenson service intervals calibrated for vehicle lifts and industrial compressors.
          </p>
        </div>

        <div className="space-y-3">
          {maintenanceList.map((maint) => (
            <div
              key={maint.id}
              className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                  {maint.type}
                </span>
                <span className="text-xs font-bold text-zinc-800">
                  Due {maint.scheduledDate}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-zinc-900">{maint.title}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">{maint.assetName}</p>
              </div>

              <p className="text-xs text-zinc-600 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                {maint.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs text-zinc-500">
                <span>Frequency: {maint.frequency}</span>
                <span className="font-semibold text-emerald-700">{maint.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------
     SUBSCREEN: REPORTS & COMPLIANCE (Requirement 7)
  ------------------------------------------------------------------ */
  if (subScreen === 'reports') {
    if (selectedReport) {
      return (
        <div className="pb-8 space-y-4 px-4 pt-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <button
              onClick={() => setSelectedReport(null)}
              className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 font-semibold text-sm py-1"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              <span>Back to Reports</span>
            </button>
            <span className="text-xs font-bold text-zinc-500">{selectedReport.id}</span>
          </div>

          {exportToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold animate-fadeIn flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{exportToast}</span>
            </div>
          )}

          {/* Certificate Preview Card */}
          <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Official Compliance Document
                </span>
                <h2 className="text-base font-bold text-zinc-900">{selectedReport.title}</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {selectedReport.result}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-50">
                <span className="text-zinc-400 block text-[10.5px]">Inspector</span>
                <span className="font-semibold text-zinc-800">{selectedReport.inspector}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50">
                <span className="text-zinc-400 block text-[10.5px]">Inspection Date</span>
                <span className="font-semibold text-zinc-800">{selectedReport.date}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50">
                <span className="text-zinc-400 block text-[10.5px]">Checklist Items</span>
                <span className="font-semibold text-zinc-800">
                  {selectedReport.itemsCount} Items ({selectedReport.passCount} Pass, {selectedReport.failCount} Fail)
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50">
                <span className="text-zinc-400 block text-[10.5px]">Evidence Photos</span>
                <span className="font-semibold text-zinc-800">{selectedReport.photoCount} Attached</span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 bg-zinc-50/70 p-3 rounded-xl border border-zinc-100 leading-relaxed">
              {selectedReport.summary}
            </p>

            {/* Delivery Status Indicator (Requirement 7) */}
            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Office Delivery Status</span>
                </span>
                <span className="font-semibold text-blue-700">{selectedReport.deliveryStatus}</span>
              </div>
              <p className="text-[11px] text-blue-800">
                <strong className="text-blue-950">Recipients:</strong> {selectedReport.recipients}
              </p>
              <div className="text-[10px] text-blue-600">Timestamp: {selectedReport.deliveredAt}</div>
            </div>

            {/* Action Buttons: Export as PDF and Export as Word (Requirement 7) */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleExport('PDF')}
                className="py-2.5 px-3 bg-[#e01f1a] hover:bg-[#c41814] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export as PDF</span>
              </button>

              <button
                onClick={() => handleExport('Word (DOCX)')}
                className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export as Word</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="pb-8 space-y-4 px-4 pt-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <button
            onClick={() => setSubScreen(null)}
            className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 font-semibold text-sm py-1"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Back to More</span>
          </button>
          <span className="text-xs font-bold text-zinc-500">Compliance Archive</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-zinc-900">Inspection Reports & Audits</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Archived compliance certificates organized by facility, equipment, and hoist number.
          </p>
        </div>

        <div className="space-y-3">
          {reportsList.map((rep) => (
            <div
              key={rep.id}
              onClick={() => setSelectedReport(rep)}
              className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all cursor-pointer space-y-2 active:scale-[0.99]"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-zinc-100 text-zinc-700">
                  {rep.id}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {rep.result}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <h3 className="font-bold text-sm text-zinc-900">{rep.title}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{rep.buildingName}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[11px] text-zinc-500">
                <span>By {rep.inspector}</span>
                <span>{rep.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------
     SUBSCREEN: NOTIFICATIONS (Requirement 8)
  ------------------------------------------------------------------ */
  if (subScreen === 'notifications') {
    return (
      <div className="pb-8 space-y-4 px-4 pt-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <button
            onClick={() => setSubScreen(null)}
            className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 font-semibold text-sm py-1"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Back to More</span>
          </button>
          <button
            onClick={onMarkAllNotificationsRead}
            className="text-xs text-[#e01f1a] font-bold hover:underline"
          >
            Mark all read
          </button>
        </div>

        <div>
          <h2 className="text-lg font-bold text-zinc-900">Notifications & Alerts</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Operational reminders, defect alerts, and assigned maintenance.
          </p>
        </div>

        <div className="space-y-2.5">
          {notificationsList.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                onMarkNotificationRead(notif.id);
                if (notif.targetTab && onNavigateToTab) {
                  onNavigateToTab(notif.targetTab, notif.targetId);
                }
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-white border-zinc-200/80 text-zinc-600'
                  : 'bg-red-50/50 border-red-200/90 text-zinc-900 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-[#e01f1a]" />}
                  <h4 className="font-bold text-xs text-zinc-900">{notif.title}</h4>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">{notif.timestamp}</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">{notif.message}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------
     SUBSCREEN: SETTINGS (Requirement 10)
  ------------------------------------------------------------------ */
  if (subScreen === 'settings') {
    return (
      <div className="pb-8 space-y-4 px-4 pt-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <button
            onClick={() => setSubScreen(null)}
            className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 font-semibold text-sm py-1"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Back to More</span>
          </button>
          <span className="text-xs font-bold text-zinc-500">Preferences</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-zinc-900">App Settings</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Device preferences, offline caching, and branch options.</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-zinc-800">Primary Branch Location</div>
              <div className="text-xs text-zinc-500 mt-0.5">Current: {activeBranch}</div>
            </div>
            <select
              value={activeBranch}
              onChange={(e) => onSelectBranch(e.target.value)}
              className="bg-zinc-100 text-xs font-semibold text-zinc-800 py-1.5 px-3 rounded-xl border border-zinc-200"
            >
              <option value="Winnipeg Branch">Winnipeg Branch</option>
              <option value="Regina Branch">Regina Branch</option>
            </select>
          </div>

          <div className="border-t border-zinc-100 pt-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-zinc-800">Offline Field Cache</div>
              <div className="text-xs text-zinc-500 mt-0.5">Store checklists locally without cellular coverage</div>
            </div>
            <div className="w-10 h-6 bg-emerald-500 rounded-full flex items-center justify-end px-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-zinc-800">Photo Auto-Compression</div>
              <div className="text-xs text-zinc-500 mt-0.5">Optimize image resolution for quick field upload</div>
            </div>
            <div className="w-10 h-6 bg-emerald-500 rounded-full flex items-center justify-end px-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------
     SUBSCREEN: PROFILE (Requirement 10)
  ------------------------------------------------------------------ */
  if (subScreen === 'profile') {
    return (
      <div className="pb-8 space-y-4 px-4 pt-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <button
            onClick={() => setSubScreen(null)}
            className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 font-semibold text-sm py-1"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Back to More</span>
          </button>
          <span className="text-xs font-bold text-zinc-500">Credentials</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs flex items-center gap-3.5">
          <img
            src={CURRENT_USER.avatarUrl}
            alt={CURRENT_USER.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-zinc-200"
          />
          <div>
            <h2 className="text-base font-bold text-zinc-900">{CURRENT_USER.name}</h2>
            <p className="text-xs text-zinc-500">{CURRENT_USER.role}</p>
            <div className="text-[11px] font-semibold text-[#e01f1a] mt-0.5">
              Tech ID #{CURRENT_USER.techId}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
            Inspector Certifications
          </h3>
          <div className="space-y-2">
            {CURRENT_USER.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center gap-2 text-xs text-zinc-700"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------
     MAIN MORE OPTIONS VIEW (Matching Image 5)
  ------------------------------------------------------------------ */
  const unreadCount = notificationsList.filter((n) => !n.read).length;

  return (
    <div className="pb-8 space-y-4 px-4 pt-3">
      {/* Current Facility Card matching Image 5 */}
      <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">
            Current Facility
          </span>
          <button
            onClick={() => {
              const newBranch = activeBranch.includes('Winnipeg') ? 'Regina Branch' : 'Winnipeg Branch';
              onSelectBranch(newBranch);
            }}
            className="text-xs font-bold text-[#e01f1a] hover:underline"
          >
            Change
          </button>
        </div>
        <h3 className="text-base font-bold text-zinc-900 mt-1">{activeBranch}</h3>
        <p className="text-xs text-zinc-500 mt-0.5">Unit B 21 Murray Park Road</p>
      </div>

      {/* Grouped Menu List matching Image 5 */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs overflow-hidden divide-y divide-zinc-100">
        {/* Maintenance Scheduling */}
        <button
          onClick={() => setSubScreen('maintenance')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">Maintenance Scheduling</h4>
              <p className="text-xs text-zinc-500">Preventative service & certification timelines</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600">
              {maintenanceList.length} scheduled
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </div>
        </button>

        {/* Reports & Compliance */}
        <button
          onClick={() => setSubScreen('reports')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">Reports & Compliance</h4>
              <p className="text-xs text-zinc-500">Audit history, compliance rates, PDF export</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Notifications */}
        <button
          onClick={() => setSubScreen('notifications')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">Notifications</h4>
              <p className="text-xs text-zinc-500">Alerts, assigned defects, system updates</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#e01f1a]/10 text-[#e01f1a]">
                {unreadCount} new
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </div>
        </button>

        {/* Settings */}
        <button
          onClick={() => setSubScreen('settings')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">Settings</h4>
              <p className="text-xs text-zinc-500">Branch selector, offline sync, preferences</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Profile */}
        <button
          onClick={() => setSubScreen('profile')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">Profile</h4>
              <p className="text-xs text-zinc-500">Inspector credentials, certifications, ID</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>
      </div>

      {/* Company Footer Card matching Image 5 */}
      <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs text-center space-y-1">
        <h4 className="font-bold text-sm text-zinc-900">Stephenson Equipment Ltd.</h4>
        <p className="text-xs text-zinc-500">
          Winnipeg: 204-831-9633 • Regina: 306-757-1776
        </p>
        <p className="text-[11px] text-zinc-400">
          Automotive & Equipment Specialists Since 1984
        </p>
      </div>
    </div>
  );
};
