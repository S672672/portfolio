import React, { useState, useEffect } from 'react';
import { FiUser, FiMenu } from 'react-icons/fi';

export default function TopBar({ onOpenRecruiter, entryReady = true, onToggleFolders, foldersOpen, isMobile, isTablet }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  const formatShortDate = (d) =>
    d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  const showCompact = isMobile || isTablet;

  return (
    <div className="os-topbar" style={{ opacity: entryReady ? 1 : 0, transition: 'opacity 0.4s ease-out' }}>
      {/* Left: Hamburger (mobile/tablet) + Brand + Quick View */}
      <div style={{ display: 'flex', alignItems: 'center', gap: showCompact ? 6 : 10 }}>
        {/* Hamburger menu — mobile/tablet only */}
        {showCompact && (
          <button
            onClick={onToggleFolders}
            aria-label={foldersOpen ? 'Close navigation' : 'Open navigation'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: 6, cursor: 'pointer',
              background: foldersOpen ? 'rgba(90,169,255,0.1)' : 'transparent',
              border: `1px solid ${foldersOpen ? 'rgba(90,169,255,0.2)' : 'rgba(36,48,68,0.3)'}`,
              color: foldersOpen ? 'var(--os-accent)' : 'var(--os-text-secondary)',
              transition: 'all 0.2s', padding: 0,
            }}
          >
            <FiMenu size={14} strokeWidth={1.5} />
          </button>
        )}

        <span style={{
          fontWeight: 700,
          color: 'var(--os-accent)',
          letterSpacing: '1.5px',
          fontSize: showCompact ? 10 : 11,
          fontFamily: "'SF Mono', monospace",
        }}>
          SMITH.BHATTARAI
        </span>

        {/* Quick View — always visible */}
        <span style={{ color: 'var(--os-text-faint)', fontSize: 11, opacity: 0.3 }}>│</span>
        <button
          onClick={onOpenRecruiter}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(90,169,255,0.06)',
            border: '1px solid rgba(90,169,255,0.1)',
            color: 'var(--os-text-secondary)',
            cursor: 'pointer',
            fontSize: 10,
            padding: showCompact ? '3px 7px' : '3px 10px',
            borderRadius: 6,
            transition: 'all 0.2s',
            fontFamily: 'inherit',
            letterSpacing: '0.5px',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--os-accent)';
            e.currentTarget.style.background = 'rgba(90,169,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(90,169,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--os-text-secondary)';
            e.currentTarget.style.background = 'rgba(90,169,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(90,169,255,0.1)';
          }}
        >
          <FiUser size={11} strokeWidth={1.5} />
          {showCompact ? 'VIEW' : 'QUICK VIEW'}
        </button>
      </div>

      {/* Right: Clock + date (compact on mobile/tablet) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: showCompact ? 8 : 14 }}>
        {showCompact && (
          <span style={{
            fontSize: 9, color: 'var(--os-text-dim)',
            fontFamily: "'SF Mono', monospace",
            letterSpacing: '0.5px', fontWeight: 500,
          }}>
            {formatShortDate(time)}
          </span>
        )}
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: showCompact ? 10 : 11,
          color: 'var(--os-text-dim)',
          fontWeight: 500,
          letterSpacing: '0.5px',
        }}>
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
}
