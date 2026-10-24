import React from 'react';
import { Menu, Bell } from 'lucide-react';

export const TopBar = ({ title, onOpenSidebar, unreadNotificationsCount = 2, onNotificationClick }) => {
  return (
    <header className="w-full shrink-0 h-[52px] bg-white border-b border-zinc-200/90 px-4 flex items-center justify-between select-none z-30">
      {/* Left: Hamburger menu */}
      <div className="w-10 flex items-center justify-start">
        <button
          onClick={onOpenSidebar}
          className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-zinc-800 hover:text-zinc-950 active:bg-zinc-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-[22px] h-[22px] stroke-[2.2]" />
        </button>
      </div>

      {/* Center: Title */}
      <div className="flex-1 flex items-center justify-center text-center px-1">
        <h1 className="font-bold text-[17px] tracking-tight text-zinc-900 truncate">
          {title}
        </h1>
      </div>

      {/* Right: Notifications */}
      <div className="w-10 flex items-center justify-end">
        <button
          onClick={onNotificationClick}
          className="relative w-10 h-10 -mr-1 rounded-full flex items-center justify-center text-zinc-800 hover:text-zinc-950 active:bg-zinc-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-[21px] h-[21px] stroke-[2]" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 bg-[#e01f1a] text-white text-[9.5px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
              {unreadNotificationsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
