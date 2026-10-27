import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 440 }}
      >
        <div style={{ padding: '24px 24px 18px', display: 'flex', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: isDestructive ? '#FEF2F2' : '#EFF6FF',
              border: `1px solid ${isDestructive ? '#FECACA' : '#BFDBFE'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <AlertTriangle size={22} color={isDestructive ? '#DC2626' : '#2563EB'} />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917', marginBottom: 6 }}>
              {title}
            </h3>
            <p style={{ fontSize: 13, color: '#57534E', lineHeight: 1.5 }}>
              {message}
            </p>
          </div>
        </div>

        <div className="modal-footer" style={{ padding: '14px 20px' }}>
          <button onClick={onCancel} className="btn btn-secondary btn-sm">
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`btn btn-sm ${isDestructive ? 'btn-primary' : 'btn-success'}`}
            style={{
              backgroundColor: isDestructive ? '#DC2626' : undefined
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
