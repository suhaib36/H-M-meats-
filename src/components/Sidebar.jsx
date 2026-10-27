import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  ShoppingBag,
  CalendarDays,
  UtensilsCrossed,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flame,
  Phone,
  Sparkles
} from 'lucide-react';
import { HMLogo } from './HMLogo';
import { BUSINESS_INFO } from '../data/initialData';

export function Sidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  requestsCount,
  activeOrdersCount,
  onOpenNewRequest,
  onStartDemo
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'requests',
      label: 'Catering Requests',
      icon: Inbox,
      badge: requestsCount > 0 ? requestsCount : null,
      badgeColor: '#1D4ED8',
      badgeBg: '#EFF6FF'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      badge: activeOrdersCount > 0 ? activeOrdersCount : null,
      badgeColor: '#15803D',
      badgeBg: '#F0FDF4'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: CalendarDays,
      badge: null
    },
    {
      id: 'menu',
      label: 'Menu & Packages',
      icon: UtensilsCrossed,
      badge: null
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 25, 23, 0.55)',
            backdropFilter: 'blur(3px)',
            zIndex: 90,
            display: 'block'
          }}
        />
      )}

      {/* Sidebar Container */}
      <aside
        style={{
          width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid var(--hm-line)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          zIndex: 95,
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease',
          position: 'relative',
          flexShrink: 0
        }}
        className={`sidebar ${mobileOpen ? 'mobile-drawer-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            height: 'var(--header-height)',
            borderBottom: '1px solid var(--hm-line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            padding: collapsed ? '0 12px' : '0 20px',
            backgroundColor: '#FAF7F2'
          }}
        >
          {collapsed ? (
            <HMLogo size="compact" />
          ) : (
            <HMLogo size="normal" />
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="sidebar-collapse-btn"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--hm-muted)',
              border: '1px solid var(--hm-line)',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        {/* Quick New Request CTA */}
        <div style={{ padding: collapsed ? '12px 10px' : '16px 16px 8px' }}>
          {collapsed ? (
            <button
              onClick={onOpenNewRequest}
              title="New Catering Request"
              className="btn btn-primary"
              style={{ width: '100%', height: 42, padding: 0, borderRadius: 10 }}
            >
              <PlusCircle size={20} />
            </button>
          ) : (
            <button
              onClick={onOpenNewRequest}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '11px 16px',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 13.5,
                fontWeight: 700,
                letterSpacing: '0.01em'
              }}
            >
              <PlusCircle size={18} />
              <span>New Request</span>
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: collapsed ? '8px 10px' : '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={collapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'space-between',
                  gap: 12,
                  padding: collapsed ? '12px 0' : '10px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#8F1D1D' : '#44403C',
                  backgroundColor: isActive ? '#FEF2F2' : 'transparent',
                  border: isActive ? '1px solid #FEE2E2' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.4 : 2}
                    color={isActive ? '#8F1D1D' : '#57534E'}
                  />
                  {!collapsed && (
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.label}
                    </span>
                  )}
                </div>

                {!collapsed && item.badge && (
                  <span
                    style={{
                      backgroundColor: item.badgeBg,
                      color: item.badgeColor,
                      padding: '2px 8px',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      border: `1px solid ${item.badgeColor}33`
                    }}
                  >
                    {item.badge}
                  </span>
                )}

                {collapsed && item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: item.badgeColor
                    }}
                  />
                )}
              </button>
            );
          })}

          {/* Interactive Demo Shortcut Card in Sidebar */}
          {!collapsed && (
            <div
              style={{
                marginTop: 'auto',
                marginBottom: 8,
                padding: '14px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                border: '1px solid #FDE68A',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Sparkles size={15} color="#B45309" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Interactive Demo
                </span>
              </div>
              <p style={{ fontSize: 11.5, color: '#78350F', lineHeight: 1.4, marginBottom: 10 }}>
                Miller Family 100-Guest BBQ scenario ready to test.
              </p>
              <button
                onClick={onStartDemo}
                className="btn btn-sm"
                style={{
                  width: '100%',
                  backgroundColor: '#B45309',
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '6px 10px'
                }}
              >
                Launch Walkthrough
              </button>
            </div>
          )}
        </nav>

        {/* Business Contact Footer */}
        <div
          style={{
            borderTop: '1px solid var(--hm-line)',
            padding: collapsed ? '12px 10px' : '14px 18px',
            backgroundColor: '#FAF7F2',
            fontSize: 11.5,
            color: 'var(--hm-muted)'
          }}
        >
          {collapsed ? (
            <div style={{ textAlign: 'center' }} title={`${BUSINESS_INFO.fullAddress} • ${BUSINESS_INFO.phone}`}>
              <Flame size={18} color="#8F1D1D" style={{ margin: '0 auto' }} />
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#292524', fontSize: 12 }}>
                  Nampa Smokehouse
                </span>
                <a
                  href={BUSINESS_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#8F1D1D', fontWeight: 600, fontSize: 11 }}
                  title="Visit official website"
                >
                  <span>hmmeats.com</span>
                  <ExternalLink size={11} />
                </a>
              </div>
              <p style={{ color: '#78716C', lineHeight: 1.3, marginBottom: 4 }}>
                {BUSINESS_INFO.address}, Nampa, ID
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#78716C' }}>
                <Phone size={11} />
                <span>{BUSINESS_INFO.phone}</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .sidebar {
            position: fixed !important;
            top: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            width: 270px !important;
          }
          .sidebar.mobile-drawer-open {
            transform: translateX(0);
          }
          .sidebar-collapse-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
