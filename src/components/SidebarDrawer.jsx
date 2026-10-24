import React from 'react';
import {
  X,
  Home,
  Truck,
  ClipboardCheck,
  AlertTriangle,
  Wrench,
  FileText,
  Bell,
  Settings,
  User,
  ExternalLink,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { StephensonLogo } from './StephensonLogo';
import { CURRENT_USER } from '../data/mockData';

export const SidebarDrawer = ({
  isOpen,
  onClose,
  activeDestination,
  onNavigate,
  activeBranch = 'Winnipeg Branch',
  onSelectBranch,
  unreadNotificationsCount = 2,
  openIssuesCount = 3
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'home', label: 'Home Dashboard', icon: Home },
    { id: 'equipment', label: 'Equipment & Hoists', icon: Truck },
    { id: 'inspect', label: 'Inspections & Drafts', icon: ClipboardCheck },
    { id: 'issues', label: 'Issues & Corrective Actions', icon: AlertTriangle, badge: openIssuesCount },
    { id: 'maintenance', label: 'Maintenance Scheduling', icon: Wrench, isMoreSub: true },
    { id: 'reports', label: 'Reports & Compliance', icon: FileText, isMoreSub: true },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount, isMoreSub: true },
    { id: 'settings', label: 'Settings & Preferences', icon: Settings, isMoreSub: true },
    { id: 'profile', label: 'Inspector Profile', icon: User, isMoreSub: true }
  ];

  const handleItemClick = (item) => {
    if (item.isMoreSub) {
      onNavigate('more', item.id);
    } else {
      onNavigate(item.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content: structured, white-based, clean layout */}
      <div className="relative w-[300px] max-w-[85vw] bg-white h-[100dvh] shadow-2xl flex flex-col z-10 border-r border-zinc-200 overflow-hidden">
        {/* Pinned Header: Logo & Close [X] */}
        <div className="shrink-0 px-4 py-3 border-b border-zinc-100 bg-white">
          <div className="flex items-center justify-between">
            <StephensonLogo className="h-6 w-auto" />
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-800 active:bg-zinc-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
          <div className="text-[10.5px] text-zinc-400 font-medium mt-1">
            Inspection & Lifting Safety Management
          </div>
        </div>

        {/* Compact, Structured User Profile Snippet */}
        <div className="shrink-0 px-4 py-2 bg-zinc-50/80 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={CURRENT_USER.avatarUrl}
                alt={CURRENT_USER.name}
                className="w-8 h-8 rounded-full object-cover border border-zinc-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-zinc-900 truncate">{CURRENT_USER.name}</span>
                <span className="text-[10px] text-zinc-400 font-medium">#{CURRENT_USER.techId}</span>
              </div>
              <div className="text-[10.5px] text-zinc-500 truncate leading-tight">
                {CURRENT_USER.role}
              </div>
            </div>
          </div>

          <div className="shrink-0 pl-1.5">
            <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active
            </span>
          </div>
        </div>

        {/* Compact Branch Selector Strip */}
        <div className="shrink-0 px-4 py-1.5 bg-white border-b border-zinc-100 flex items-center justify-between text-xs text-zinc-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#e01f1a]" />
            <span className="font-semibold text-zinc-800 text-[11px]">{activeBranch}</span>
          </div>
          <button
            onClick={() => {
              const newBranch = activeBranch.includes('Winnipeg') ? 'Regina Branch' : 'Winnipeg Branch';
              if (onSelectBranch) onSelectBranch(newBranch);
            }}
            className="text-[10.5px] text-[#e01f1a] font-bold hover:underline"
          >
            Switch
          </button>
        </div>

        {/* Navigation list */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-2 px-2 space-y-0.5"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeDestination === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-red-50 text-[#e01f1a] font-semibold'
                    : 'text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-[#e01f1a] stroke-[2.2]' : 'text-zinc-500 stroke-[1.8]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && item.badge > 0 ? (
                    <span className="min-w-[17px] h-[17px] bg-[#e01f1a] text-white text-[9.5px] font-bold rounded-full flex items-center justify-center px-1">
                      {item.badge}
                    </span>
                  ) : null}
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info at the bottom */}
        <div
          className="shrink-0 p-3 border-t border-zinc-100 bg-zinc-50/70 text-[11px] text-zinc-500 flex items-center justify-between"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 12px))' }}
        >
          <span>Stephenson App v2.4.0</span>
          <a
            href="https://stephensonequipment.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-600 hover:text-[#e01f1a]"
          >
            <span>stephensonequipment.ca</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
