import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer({ toasts, onCloseToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`toast ${isSuccess ? 'toast-success' : isError ? 'toast-error' : ''}`}
          >
            <div style={{ flexShrink: 0 }}>
              {isSuccess && <CheckCircle2 size={18} color="#22C55E" />}
              {isError && <AlertCircle size={18} color="#EF4444" />}
              {!isSuccess && !isError && <Info size={18} color="#F59E0B" />}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {toast.title && (
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                  {toast.title}
                </div>
              )}
              <div style={{ fontSize: 12.5, opacity: 0.92, lineHeight: 1.35 }}>
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => onCloseToast(toast.id)}
              style={{ color: '#A8A29E', padding: 2, display: 'flex' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
