import React from 'react';
import {
  Menu,
  Bell,
  Sparkles,
  RotateCcw,
  MapPin,
  Calendar
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

export function Header({
  activeTab,
  onToggleMobileMenu,
  notifications,
  onOpenNotifications,
  onStartDemo,
  onResetData
}) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'Dashboard Overview',
          tag: 'Treasure Valley'
        };
      case 'requests':
        return {
          title: 'Catering Inquiries & Requests',
          tag: 'Pipeline'
        };
      case 'orders':
        return {
          title: 'Confirmed Event Orders',
          tag: 'Kitchen Queue'
        };
      case 'calendar':
        return {
          title: 'Event Schedule & Calendar',
          tag: 'Monthly'
        };
      case 'menu':
        return {
          title: 'Menu Catalog & Packages',
          tag: 'Published'
        };
      default:
        return {
          title: 'H&M Catering Order Manager',
          tag: 'Nampa, ID'
        };
    }
  };

  const { title, tag } = getTabTitle();
  const unreadCount = notifications.length;

  return (
    <header className="app-header">
      {/* Left side: Mobile menu toggle + Page title */}
      <div className="header-title-wrap">
        <button
          onClick={onToggleMobileMenu}
          className="btn-icon header-mobile-toggle"
          style={{ display: 'none' }}
          title="Toggle Navigation Menu"
        >
          <Menu size={22} />
        </button>

        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h1 className="header-page-title">{title}</h1>
            <span className="header-badge-tag">{tag}</span>
          </div>
          <div className="header-subtitle-row" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2, fontSize: 11.5, color: 'var(--hm-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={11} color="#8F1D1D" />
              <span>{BUSINESS_INFO.address}, Nampa ID</span>
            </span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Calendar size={11} color="#D97706" />
              <span>Today: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Demo Walkthrough CTA, Notifications, Reset Data */}
      <div className="header-actions">
        {/* Quick Demo Scenario Trigger */}
        <button
          onClick={onStartDemo}
          className="btn btn-amber btn-sm"
          title="Open guided demo of the 100-guest private BBQ catering workflow"
          style={{
            fontWeight: 700,
            boxShadow: '0 2px 4px rgba(217, 119, 6, 0.25)'
          }}
        >
          <Sparkles size={14} />
          <span className="demo-btn-label">100-Guest Demo</span>
        </button>

        {/* Reset Data Button */}
        <button
          onClick={onResetData}
          className="btn btn-secondary btn-sm"
          title="Reset sample inquiries and orders to pristine demo state"
        >
          <RotateCcw size={13} />
          <span className="reset-btn-label">Reset Data</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="btn-icon"
          title="View follow-up reminders and alerts"
          style={{ position: 'relative' }}
        >
          <Bell size={19} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                minWidth: 16,
                height: 16,
                borderRadius: 999,
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                fontSize: 9.5,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
                border: '1.5px solid #FFFFFF'
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .header-mobile-toggle {
            display: inline-flex !important;
          }
          .header-subtitle-row {
            display: none !important;
          }
          .reset-btn-label {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .demo-btn-label {
            display: none;
          }
          .header-badge-tag {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
