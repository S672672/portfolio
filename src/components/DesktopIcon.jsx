import React from 'react';

export default function DesktopIcon({ label, icon: Icon, onClick }) {
  return (
    <div
      className="desktop-icon"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${label}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div
        style={{
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          background: 'rgba(123, 157, 184, 0.05)',
          border: '1px solid rgba(123, 157, 184, 0.08)',
          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <Icon size={20} color="var(--os-accent)" strokeWidth={1.5} />
      </div>
      <span className="desktop-icon-label">{label}</span>
    </div>
  );
}
