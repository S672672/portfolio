import React from 'react';
import { skillCategories } from '../../data/skills';

export default function SkillsApp() {
  const categoryColors = {
    buildingWith: { color: 'var(--os-accent)', bg: 'rgba(56,189,248,0.08)' },
    handsOn: { color: 'var(--os-green)', bg: 'rgba(52,211,153,0.08)' },
    exploring: { color: 'var(--os-purple)', bg: 'rgba(167,139,250,0.08)' },
    interestedIn: { color: 'var(--os-orange)', bg: 'rgba(251,146,60,0.08)' },
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ color: 'var(--os-text-dim)', fontFamily: 'monospace', fontSize: 12, marginBottom: 20 }}>
        # skills/
      </div>

      <div style={{ display: 'grid', gap: 20 }}>
        {Object.entries(skillCategories).map(([key, category]) => {
          const colors = categoryColors[key] || categoryColors.buildingWith;
          return (
            <div key={key}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.color }} />
                <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.color, margin: 0 }}>
                  {category.label}
                </h3>
              </div>
              <p style={{ fontSize: 12, color: 'var(--os-text-dim)', margin: '0 0 12px 16px' }}>
                {category.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      padding: '10px 14px',
                      background: colors.bg,
                      border: `1px solid ${colors.color}22`,
                      borderRadius: 8,
                      transition: 'all 0.2s',
                      cursor: 'default',
                      minWidth: 140,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.color;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${colors.color}22`;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--os-text)', marginBottom: 4 }}>
                      {skill.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--os-text-dim)', lineHeight: 1.4 }}>
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
