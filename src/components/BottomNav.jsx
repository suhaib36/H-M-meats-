import React from 'react';
import { Home, Truck, ClipboardCheck, AlertTriangle, Menu } from 'lucide-react';

export const BottomNav = ({ activeTab, onSelectTab, openIssuesCount = 3 }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'equipment', label: 'Equipment', icon: Truck },
    { id: 'inspect', label: 'Inspect', icon: ClipboardCheck },
    { id: 'issues', label: 'Issues', icon: AlertTriangle, badge: openIssuesCount },
    { id: 'more', label: 'More', icon: Menu }
  ];

  return (
    <nav
      className="w-full shrink-0 bg-white border-t border-zinc-200/90 px-1 flex items-center justify-around select-none shadow-[0_-2px_10px_rgba(0,0,0,0.03)] z-30"
      style={{
        height: '60px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
      aria-label="Bottom Navigation"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex-1 h-full flex flex-col items-center justify-center transition-colors relative py-1 ${
              isActive ? 'text-[#e01f1a]' : 'text-zinc-400 hover:text-zinc-600'
            }`}
            aria-label={tab.label}
          >
            <div className="relative flex items-center justify-center">
              <Icon
                className={`w-[22px] h-[22px] transition-transform ${
                  isActive ? 'stroke-[#e01f1a] stroke-[2.2] scale-105' : 'stroke-zinc-400 stroke-[1.8]'
                }`}
              />
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute -top-1 -right-2.5 min-w-[15px] h-[15px] bg-[#e01f1a] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center px-1 shadow-xs border border-white">
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span
              className={`text-[10px] mt-1 tracking-tight ${
                isActive ? 'text-[#e01f1a] font-bold' : 'text-zinc-500 font-medium'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
