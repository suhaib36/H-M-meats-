import React from 'react';
import { X, Bell, Clock, ArrowRight, CheckCircle2, AlertTriangle, Flame, DollarSign } from 'lucide-react';

export function NotificationDrawer({
  isOpen,
  onClose,
  notifications,
  onSelectRequest,
  onSelectOrder,
  onDismissNotification
}) {
  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'new_request':
        return <Bell size={16} color="#2563EB" />;
      case 'quote_followup':
        return <Clock size={16} color="#D97706" />;
      case 'kitchen_prep':
        return <Flame size={16} color="#DC2626" />;
      case 'payment':
        return <DollarSign size={16} color="#16A34A" />;
      default:
        return <AlertTriangle size={16} color="#D97706" />;
    }
  };

  const getBadgeStyle = (priority) => {
    switch (priority) {
      case 'high':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', label: 'Action Required' };
      case 'medium':
        return { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', label: 'Follow-up' };
      default:
        return { bg: '#F0FDF4', color: '#166534', border: '#BBF7D0', label: 'Info' };
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        className="notification-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 420,
          height: '100vh',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          animation: 'slideInRight 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 22px',
            borderBottom: '1px solid var(--hm-line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAF7F2'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: '#FEF2F2',
                border: '1px solid #FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bell size={18} color="#8F1D1D" />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917' }}>Reminders &amp; Alerts</h3>
              <p style={{ fontSize: 12, color: '#78716C' }}>{notifications.length} active follow-ups</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* List of Notifications */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#78716C' }}>
              <CheckCircle2 size={36} color="#16A34A" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontWeight: 600, fontSize: 14 }}>All caught up!</p>
              <p style={{ fontSize: 12.5, marginTop: 4 }}>No pending catering reminders at this time.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {notifications.map((notif) => {
                const badge = getBadgeStyle(notif.priority);
                return (
                  <div
                    key={notif.id}
                    style={{
                      padding: '14px 16px',
                      borderRadius: 10,
                      border: '1px solid var(--hm-line)',
                      backgroundColor: '#FFFFFF',
                      boxShadow: 'var(--shadow-xs)',
                      transition: 'border-color 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {getIcon(notif.type)}
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1C1917' }}>
                          {notif.title}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          backgroundColor: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                          padding: '2px 6px',
                          borderRadius: 4
                        }}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <p style={{ fontSize: 12.5, color: '#57534E', lineHeight: 1.45, marginBottom: 10 }}>
                      {notif.message}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--hm-line-light)' }}>
                      <span style={{ fontSize: 11, color: '#A8A29E' }}>
                        {notif.timeAgo}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {notif.requestId && (
                          <button
                            onClick={() => {
                              onSelectRequest(notif.requestId);
                              onClose();
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: 11.5, padding: '4px 10px' }}
                          >
                            <span>Open Request</span>
                            <ArrowRight size={12} />
                          </button>
                        )}
                        {notif.orderId && (
                          <button
                            onClick={() => {
                              onSelectOrder(notif.orderId);
                              onClose();
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: 11.5, padding: '4px 10px' }}
                          >
                            <span>View Order</span>
                            <ArrowRight size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => onDismissNotification(notif.id)}
                          title="Dismiss reminder"
                          className="btn-ghost"
                          style={{ padding: '4px 6px', fontSize: 11, color: '#A8A29E' }}
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--hm-line)',
            backgroundColor: '#FAF7F2',
            fontSize: 12,
            color: '#78716C',
            textAlign: 'center'
          }}
        >
          Staff reminders are automatically synced with event dates and quotation milestones.
        </div>
      </div>
    </div>
  );
}
