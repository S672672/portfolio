import React from 'react';
import { skillCategories } from '../../data/skills';

export default function SkillsApp() {
  const categoryColors = {
    buildingWith: { color: 'var(--os-accent)', bg: 'rgba(56,189,248,0.06)', border: 'rgba(56,189,248,0.12)' },
    handsOn: { color: 'var(--os-green)', bg: 'rgba(52,211,153,0.06)', border: 'rgba(52,211,153,0.12)' },
    exploring: { color: 'var(--os-purple)', bg: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.12)' },
    interestedIn: { color: 'var(--os-orange)', bg: 'rgba(251,146,60,0.06)', border: 'rgba(251,146,60,0.12)' },
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
        paddingBottom: 12, borderBottom: '1px solid var(--os-border)',
      }}>
        <span style={{
          color: 'var(--os-text-dim)', fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12, letterSpacing: '0.5px',
        }}>
          skills/
        </span>
      </div>

      <div style={{ display: 'grid', gap: 24 }}>
        {Object.entries(skillCategories).map(([key, category]) => {
          const colors = categoryColors[key] || categoryColors.buildingWith;
          return (
            <div key={key}>
              {/* Category header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: colors.color,
                  boxShadow: `0 0 8px ${colors.color}44`,
                }} />
                <h3 style={{
                  fontSize: 14, fontWeight: 600, color: colors.color,
                  margin: 0, fontFamily: 'Inter, sans-serif',
                }}>
                  {category.label}
                </h3>
              </div>
              <p style={{
                fontSize: 12, color: 'var(--os-text-dim)',
                margin: '0 0 12px 16px',
                fontFamily: 'Inter, sans-serif',
              }}>
                {category.description}
              </p>

              {/* Skills grid */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      padding: '10px 14px',
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      transition: 'all 0.2s',
                      cursor: 'default',
                      minWidth: 140,
                      flex: '1 1 140px',
                      maxWidth: 220,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.color;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = `0 4px 12px ${colors.color}11`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      fontWeight: 600, fontSize: 13, color: 'var(--os-text)',
                      marginBottom: 4, fontFamily: 'Inter, sans-serif',
                    }}>
                      {skill.name}
                    </div>
                    <div style={{
                      fontSize: 11, color: 'var(--os-text-dim)',
                      lineHeight: 1.4, fontFamily: 'Inter, sans-serif',
                    }}>
                      {skill.usedIn.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
