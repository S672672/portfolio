import React from 'react';
import { skillCategories } from '../../data/skills';

export default function ExploringApp() {
  const exploring = skillCategories.exploring;
  const interested = skillCategories.interestedIn;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ color: 'var(--os-text-dim)', fontFamily: 'monospace', fontSize: 12, marginBottom: 20 }}>
        # exploring/
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--os-purple)' }} />
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--os-purple)', margin: 0 }}>
            {exploring.label}
          </h3>
        </div>
        <p style={{ fontSize: 13, color: 'var(--os-text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
          {exploring.description}
        </p>
        <div style={{ display: 'grid', gap: 10 }}>
          {exploring.skills.map((skill) => (
            <div
              key={skill.name}
              style={{
                padding: 14,
                background: 'rgba(167,139,250,0.05)',
                border: '1px solid rgba(167,139,250,0.15)',
                borderRadius: 8,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(167,139,250,0.15)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--os-text)', marginBottom: 4 }}>{skill.name}</div>
              <div style={{ fontSize: 12, color: 'var(--os-text-dim)' }}>{skill.usedIn.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--os-orange)' }} />
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--os-orange)', margin: 0 }}>
            {interested.label}
          </h3>
        </div>
        <p style={{ fontSize: 13, color: 'var(--os-text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
          {interested.description}
        </p>
        <div style={{ display: 'grid', gap: 10 }}>
          {interested.skills.map((skill) => (
            <div
              key={skill.name}
              style={{
                padding: 14,
                background: 'rgba(251,146,60,0.05)',
                border: '1px solid rgba(251,146,60,0.15)',
                borderRadius: 8,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(251,146,60,0.4)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(251,146,60,0.15)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--os-text)', marginBottom: 4 }}>{skill.name}</div>
              <div style={{ fontSize: 12, color: 'var(--os-text-dim)' }}>{skill.usedIn.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 28, padding: 16, background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 8 }}>
        <div style={{ fontSize: 13, color: 'var(--os-text-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
          "I believe that curiosity and continuous learning are strengths. Every project teaches something new and opens new questions to explore."
        </div>
      </div>
    </div>
  );
}
