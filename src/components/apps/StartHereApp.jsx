import React from 'react';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { experience } from '../../data/experience';
import { skillCategories } from '../../data/skills';

export default function StartHereApp({ onOpenApp }) {
  const quickLinks = [
    {
      time: '30 seconds',
      action: 'Open PROFILE',
      description: 'See who I am and what I do',
      appId: 'about',
      icon: '👤',
    },
    {
      time: '2 minutes',
      action: 'Open PROJECTS',
      description: 'See what I have built',
      appId: 'projects',
      icon: '📁',
    },
    {
      time: '1 minute',
      action: 'Open EXPERIENCE',
      description: 'Understand my work experience',
      appId: 'experience',
      icon: '💼',
    },
    {
      time: '1 minute',
      action: 'Open JOURNEY',
      description: 'See how my career developed',
      appId: 'journey',
      icon: '🗺️',
    },
    {
      time: 'Any time',
      action: 'Open TERMINAL',
      description: 'Explore interactively with commands',
      appId: 'terminal',
      icon: '🖥️',
    },
    {
      time: 'Any time',
      action: 'Open CONNECT',
      description: 'Get in touch with me',
      appId: 'contact',
      icon: '✉️',
    },
  ];

  return (
    <div style={{ padding: 24, height: '100%', overflow: 'auto' }} className="os-scrollbar">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          color: 'var(--os-accent)',
          fontSize: 28,
          margin: 0,
          fontWeight: 700,
          letterSpacing: '-0.5px',
        }}>
          WELCOME TO SMITH.OS
        </h1>
        <div style={{
          color: 'var(--os-text-dim)',
          fontSize: 14,
          marginTop: 8,
          lineHeight: 1.6,
        }}>
          This is an interactive portfolio environment. Instead of scrolling through a traditional page,
          you explore my work through folders, windows, and a terminal.
        </div>
      </div>

      {/* Quick Navigation */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{
          color: 'var(--os-text)',
          fontSize: 16,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ color: 'var(--os-accent)', fontSize: 14 }}>→</span>
          Where would you like to start?
        </h2>

        <div style={{ display: 'grid', gap: 8 }}>
          {quickLinks.map((link) => (
            <div
              key={link.appId}
              onClick={() => onOpenApp(link.appId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                border: '1px solid var(--os-border)',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--os-accent)';
                e.currentTarget.style.background = 'rgba(56,189,248,0.05)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--os-border)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{ fontSize: 22, flexShrink: 0 }}>{link.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--os-accent)' }}>
                  {link.action}
                </div>
                <div style={{ fontSize: 12, color: 'var(--os-text-muted)', marginTop: 2 }}>
                  {link.description}
                </div>
              </div>
              <span style={{
                fontSize: 11,
                color: 'var(--os-text-dim)',
                background: 'var(--os-surface-raised)',
                padding: '3px 8px',
                borderRadius: 4,
                flexShrink: 0,
              }}>
                ~{link.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        padding: 16,
        background: 'var(--os-surface-raised)',
        borderRadius: 8,
        border: '1px solid var(--os-border)',
      }}>
        <div style={{
          fontSize: 12,
          color: 'var(--os-text-dim)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: 12,
        }}>
          Quick Overview
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--os-text-dim)', marginBottom: 4 }}>Role</div>
            <div style={{ fontSize: 13, color: 'var(--os-text)' }}>{profile.role}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--os-text-dim)', marginBottom: 4 }}>Location</div>
            <div style={{ fontSize: 13, color: 'var(--os-text)' }}>{profile.location}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--os-text-dim)', marginBottom: 4 }}>Projects</div>
            <div style={{ fontSize: 13, color: 'var(--os-text)' }}>{projects.length} completed</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--os-text-dim)', marginBottom: 4 }}>Experience</div>
            <div style={{ fontSize: 13, color: 'var(--os-text)' }}>{experience.length} position{experience.length !== 1 ? 's' : ''}</div>
          </div>
        </div>

        <div style={{
          marginTop: 16,
          padding: '10px 14px',
          background: 'rgba(56,189,248,0.05)',
          border: '1px solid rgba(56,189,248,0.15)',
          borderRadius: 6,
          fontSize: 13,
          color: 'var(--os-text-muted)',
          lineHeight: 1.6,
        }}>
          I am an early-career software engineer who enjoys building things, solving problems, exploring systems, and continuously learning.
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div style={{
        marginTop: 20,
        padding: 16,
        background: 'var(--os-surface-raised)',
        borderRadius: 8,
        border: '1px solid var(--os-border)',
      }}>
        <div style={{
          fontSize: 12,
          color: 'var(--os-text-dim)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: 10,
        }}>
          Keyboard Shortcuts
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12 }}>
          <div><kbd style={kbdStyle}>Ctrl/Cmd + K</kbd> <span style={{ color: 'var(--os-text-muted)' }}>Search</span></div>
          <div><kbd style={kbdStyle}>Ctrl/Cmd + T</kbd> <span style={{ color: 'var(--os-text-muted)' }}>Terminal</span></div>
          <div><kbd style={kbdStyle}>Escape</kbd> <span style={{ color: 'var(--os-text-muted)' }}>Close window</span></div>
        </div>
      </div>
    </div>
  );
}

const kbdStyle = {
  display: 'inline-block',
  padding: '2px 6px',
  background: 'var(--os-surface)',
  border: '1px solid var(--os-border)',
  borderRadius: 4,
  fontSize: 11,
  fontFamily: 'monospace',
  color: 'var(--os-accent)',
  marginRight: 4,
};
