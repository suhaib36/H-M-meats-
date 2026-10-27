import React from 'react';

export function HMLogo({ size = 'normal', variant = 'dark', className = '' }) {
  // size: 'normal' | 'compact' | 'large'
  // variant: 'dark' (charcoal text) | 'light' (white text) | 'badge'

  if (size === 'compact') {
    return (
      <div className={`hm-logo-compact flex items-center justify-center ${className}`} title="H&M Meats & Catering — Est. 1963, Nampa, ID">
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          backgroundColor: '#8F1D1D',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontFamily: "'Outfit', sans-serif",
          boxShadow: '0 2px 5px rgba(143, 29, 29, 0.35)',
          border: '1.5px solid #FEF2F2'
        }}>
          <span style={{ fontSize: 13, lineHeight: 1, letterSpacing: '-0.02em' }}>H&M</span>
          <span style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>BBQ</span>
        </div>
      </div>
    );
  }

  const isLight = variant === 'light';

  return (
    <div className={`hm-brand-header flex items-center gap-3 ${className}`}>
      {/* Brand Icon Badge */}
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#8F1D1D',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 3px 8px rgba(143, 29, 29, 0.25)',
        border: '1.5px solid #FEE2E2',
        position: 'relative'
      }}>
        {/* Cleaver / Flame icon svg */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c.5 2 1.5 3 2.5 4.5 1.5 2.2 2.5 4.5 2.5 7.5a5 5 0 0 1-10 0c0-2.5 1-4.5 2.5-6.5C10.5 6 11.5 4 12 2z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <path d="M6 19h12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: size === 'large' ? 22 : 18,
            color: isLight ? '#FFFFFF' : '#1C1917',
            letterSpacing: '-0.02em'
          }}>
            H&amp;M MEATS
          </span>
          <span style={{
            backgroundColor: '#FEF3C7',
            color: '#B45309',
            fontSize: 9.5,
            fontWeight: 700,
            padding: '1.5px 5px',
            borderRadius: 4,
            border: '1px solid #FDE68A',
            letterSpacing: '0.04em'
          }}>
            &amp; CATERING
          </span>
        </div>
        <span style={{
          fontSize: 10.5,
          fontWeight: 600,
          color: isLight ? '#A8A29E' : '#78716C',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginTop: 2
        }}>
          Est. 1963 • Nampa, Idaho
        </span>
      </div>
    </div>
  );
}
