import React, { useState } from 'react';
import { profile } from '../../data/profile';

export default function WelcomeApp({ onOpenApp }) {
  const [selectedPath, setSelectedPath] = useState(null);

  const paths = [
    {
      id: 'recruiter',
      label: 'RECRUITER',
      description: 'Quickly understand my profile and experience',
      color: 'var(--os-accent)',
      apps: ['about', 'experience', 'projects', 'skills', 'resume', 'contact'],
    },
    {
      id: 'developer',
      label: 'DEVELOPER',
      description: 'Explore technical work and problem-solving',
      color: 'var(--os-purple)',
      apps: ['projects', 'incidents', 'terminal', 'skills'],
    },
    {
      id: 'explore',
      label: 'EXPLORE',
      description: 'Open the full interactive workspace',
      color: 'var(--os-green)',
      apps: [],
    },
  ];

  const handlePathSelect = (path) => {
    setSelectedPath(path.id);
    if (path.id === 'explore') {
      // Just close welcome, leave full desktop
      return;
    }
    // Open first 2-3 apps for the path
    path.apps.slice(0, 2).forEach((appId, i) => {
      setTimeout(() => onOpenApp(appId), i * 200);
    });
  };

  return (
    <div style={{ padding: '28px 24px', height: '100%', overflow: 'auto' }} className="os-scrollbar">
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          color: 'var(--os-text)',
          fontSize: 26,
          margin: 0,
          fontWeight: 700,
          lineHeight: 1.2,
        }}>
          Hey, I'm <span style={{ color: 'var(--os-accent)' }}>Smith</span>.
        </h1>
        <p style={{
          color: 'var(--os-text-muted)',
          fontSize: 14,
          marginTop: 10,
          lineHeight: 1.6,
          maxWidth: 380,
        }}>
          {profile.role} who enjoys building things, solving problems, and exploring how systems work.
        </p>
      </div>

      {/* Journey arrow */}
      <div style={{
        padding: '14px 16px',
        background: 'var(--os-surface-raised)',
        borderRadius: 8,
        border: '1px solid var(--os-border)',
        marginBottom: 28,
      }}>
        <div style={{ fontSize: 11, color: 'var(--os-text-dim)', marginBottom: 8, fontWeight: 600, letterSpacing: '0.5px' }}>
          CURRENTLY EXPLORING THE SPACE BETWEEN
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8 }}>
          <div style={{ color: 'var(--os-accent)' }}>Software Engineering</div>
          <div style={{ color: 'var(--os-text-dim)', paddingLeft: 4 }}>↓</div>
          <div style={{ color: 'var(--os-purple)' }}>Infrastructure</div>
          <div style={{ color: 'var(--os-text-dim)', paddingLeft: 4 }}>↓</div>
          <div style={{ color: 'var(--os-green)' }}>DevOps</div>
        </div>
      </div>

      {/* Choose Your Path */}
      <div>
        <h2 style={{
          fontSize: 14,
          color: 'var(--os-text)',
          marginBottom: 14,
          fontWeight: 600,
        }}>
          How would you like to explore?
        </h2>

        <div style={{ display: 'grid', gap: 8 }}>
          {paths.map((path) => (
            <div
              key={path.id}
              onClick={() => handlePathSelect(path)}
              style={{
                padding: '14px 16px',
                border: `1px solid ${selectedPath === path.id ? path.color : 'var(--os-border)'}`,
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: selectedPath === path.id ? `${path.color}11` : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (selectedPath !== path.id) {
                  e.currentTarget.style.borderColor = path.color;
                  e.currentTarget.style.background = `${path.color}08`;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPath !== path.id) {
                  e.currentTarget.style.borderColor = 'var(--os-border)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: path.color, letterSpacing: '0.5px' }}>
                    {path.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--os-text-muted)', marginTop: 3 }}>
                    {path.description}
                  </div>
                </div>
                <span style={{ color: 'var(--os-text-dim)', fontSize: 14 }}>
                  {selectedPath === path.id ? '✓' : '→'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick action buttons */}
      <div style={{
        marginTop: 20,
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        <button
          onClick={() => onOpenApp('terminal')}
          style={quickBtnStyle}
          onMouseEnter={(e) => { e.target.style.borderColor = 'var(--os-accent)'; e.target.style.color = 'var(--os-accent)'; }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'var(--os-border)'; e.target.style.color = 'var(--os-text-dim)'; }}
        >
          🖥 Open Terminal
        </button>
        <button
          onClick={() => onOpenApp('starthere')}
          style={quickBtnStyle}
          onMouseEnter={(e) => { e.target.style.borderColor = 'var(--os-accent)'; e.target.style.color = 'var(--os-accent)'; }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'var(--os-border)'; e.target.style.color = 'var(--os-text-dim)'; }}
        >
          ⭐ Quick Guide
        </button>
      </div>
    </div>
  );
}

const quickBtnStyle = {
  padding: '6px 14px',
  background: 'transparent',
  border: '1px solid var(--os-border)',
  borderRadius: 6,
  color: 'var(--os-text-dim)',
  fontSize: 12,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.15s',
};
