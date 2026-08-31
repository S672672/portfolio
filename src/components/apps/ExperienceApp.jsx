import React, { useState } from 'react';
import { experience } from '../../data/experience';
import { FiFolder, FiChevronDown } from 'react-icons/fi';

export default function ExperienceApp() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div style={{ padding: 20, fontSize: 14 }}>
      <div style={{ color: 'var(--os-text-dim)', fontFamily: 'monospace', fontSize: 12, marginBottom: 16 }}>
        # experience/
      </div>

      {experience.map((exp) => (
        <div
          key={exp.id}
          style={{
            border: '1px solid var(--os-border)',
            borderRadius: 8,
            marginBottom: 12,
            overflow: 'hidden',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--os-border)')}
        >
          <div
            style={{
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              background: expandedId === exp.id ? 'rgba(56,189,248,0.05)' : 'transparent',
              transition: 'background 0.15s',
            }}
            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
          >
            {expandedId === exp.id ? (
              <FiFolder size={16} color="var(--os-accent)" />
            ) : (
              <FiFolder size={16} color="var(--os-accent)" />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: 'var(--os-text)' }}>{exp.role}</div>
              <div style={{ fontSize: 12, color: 'var(--os-orange)', marginTop: 2 }}>{exp.company} · {exp.period}</div>
            </div>
          </div>

          {expandedId === exp.id && (
            <div style={{ padding: '0 16px 16px 42px', animation: 'slideUp 0.2s ease-out' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--os-text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                  What I Worked On
                </div>
                {exp.whatIDid.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      padding: '8px 12px',
                      borderLeft: '2px solid var(--os-accent)',
                      background: 'rgba(56,189,248,0.03)',
                      marginBottom: 6,
                      borderRadius: '0 6px 6px 0',
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--os-text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                  What I Learned
                </div>
                {exp.whatILearned.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      padding: '8px 12px',
                      borderLeft: '2px solid var(--os-green)',
                      background: 'rgba(52,211,153,0.03)',
                      marginBottom: 6,
                      borderRadius: '0 6px 6px 0',
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: 11, color: 'var(--os-text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                  Key Contributions
                </div>
                {exp.keyContributions.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      padding: '8px 12px',
                      borderLeft: '2px solid var(--os-purple)',
                      background: 'rgba(167,139,250,0.03)',
                      marginBottom: 6,
                      borderRadius: '0 6px 6px 0',
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
