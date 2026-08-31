import React, { useState } from 'react';

export default function NowWidget() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        background: 'rgba(12, 16, 25, 0.5)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(30, 38, 56, 0.4)',
        borderRadius: 12,
        padding: '12px 14px',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(123,157,184,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(30, 38, 56, 0.4)';
      }}
    >
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        color: 'var(--os-text-dim)',
        letterSpacing: '1.5px',
        marginBottom: 10,
        textTransform: 'uppercase',
      }}>
        NOW
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: 'var(--os-accent)',
          marginTop: 4, flexShrink: 0,
          animation: 'subtlePulse 3s ease-in-out infinite',
        }} />
        <div>
          <div style={{ fontSize: 9, color: 'var(--os-text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Building
          </div>
          <div style={{ fontSize: 12, color: 'var(--os-text)', marginTop: 1 }}>
            SmithOS
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: expanded ? 8 : 0 }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          border: '1.5px solid var(--os-purple)',
          background: 'transparent',
          marginTop: 4, flexShrink: 0,
        }} />
        <div>
          <div style={{ fontSize: 9, color: 'var(--os-text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Exploring
          </div>
          <div style={{ fontSize: 12, color: 'var(--os-text)', marginTop: 1 }}>
            DevOps & Infrastructure
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--os-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%',
              border: '1.5px solid var(--os-green)',
              background: 'transparent',
              marginTop: 4, flexShrink: 0,
            }} />
            <div>
              <div style={{ fontSize: 9, color: 'var(--os-text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Next
              </div>
              <div style={{ fontSize: 12, color: 'var(--os-text)', marginTop: 1 }}>
                Cloud Architecture
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
