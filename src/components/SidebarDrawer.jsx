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

      {/* Drawer content */}
      <div className="relative w-[310px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 transform transition-transform duration-300 ease-out border-r border-zinc-200">
        {/* Header */}
        <div className="p-4 border-b border-zinc-100 bg-zinc-50/70">
          <div className="flex items-center justify-between mb-3">
            <StephensonLogo className="h-7 w-auto" />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          <div className="text-[11px] text-zinc-500 font-medium">
            Automotive & Commercial Equipment Specialists Since 1984
          </div>
        </div>

        {/* User profile snippet */}
        <div className="p-4 bg-zinc-900 text-white flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={CURRENT_USER.avatarUrl}
              alt={CURRENT_USER.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm truncate">{CURRENT_USER.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-xs text-zinc-400 truncate">{CURRENT_USER.role}</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Tech ID #{CURRENT_USER.techId}</div>
          </div>
        </div>

        {/* Branch pill selector */}
        <div className="px-4 py-2.5 bg-zinc-100 border-b border-zinc-200/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-600">
            <MapPin className="w-3.5 h-3.5 text-[#e01f1a]" />
            <span className="font-semibold text-zinc-800">{activeBranch}</span>
          </div>
          <button
            onClick={() => {
              const newBranch = activeBranch.includes('Winnipeg') ? 'Regina Branch' : 'Winnipeg Branch';
              if (onSelectBranch) onSelectBranch(newBranch);
            }}
            className="text-[11px] text-[#e01f1a] font-bold hover:underline"
          >
            Switch
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeDestination === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-red-50 text-[#e01f1a] font-semibold'
                    : 'text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? 'text-[#e01f1a] stroke-[2.2]' : 'text-zinc-500 stroke-[1.8]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && item.badge > 0 ? (
                    <span className="min-w-[18px] h-[18px] bg-[#e01f1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                      {item.badge}
                    </span>
                  ) : null}
                  <ChevronRight className="w-4 h-4 text-zinc-300" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-zinc-200 bg-zinc-50 text-xs text-zinc-500 flex items-center justify-between">
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
