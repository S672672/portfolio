import React, { useState } from 'react';
import { experience } from '../../data/experience';
import { FiFolder, FiChevronDown, FiCalendar, FiBriefcase } from 'react-icons/fi';

export default function ExperienceApp() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div style={{ padding: 20, fontSize: 14 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
        paddingBottom: 12, borderBottom: '1px solid var(--os-border)',
      }}>
        <FiBriefcase size={14} color="var(--os-accent)" />
        <span style={{
          color: 'var(--os-text-dim)', fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12, letterSpacing: '0.5px',
        }}>
          experience/
        </span>
        <span style={{
          fontSize: 11, color: 'var(--os-text-dim)',
          fontFamily: 'Inter, sans-serif',
        }}>
          {experience.length} position{experience.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: 24 }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: 7, top: 8, bottom: 8,
          width: 2, background: 'linear-gradient(to bottom, var(--os-accent), var(--os-orange))',
          borderRadius: 1, opacity: 0.2,
        }} />

        {experience.map((exp, idx) => (
          <div key={exp.id} style={{
            marginBottom: idx < experience.length - 1 ? 16 : 0,
            position: 'relative',
          }}>
            {/* Timeline dot */}
            <div style={{
              position: 'absolute', left: -21, top: 14,
              width: 10, height: 10, borderRadius: '50%',
              background: expandedId === exp.id ? 'var(--os-accent)' : 'var(--os-surface-raised)',
              border: `2px solid ${expandedId === exp.id ? 'var(--os-accent)' : 'var(--os-text-dim)'}`,
              transition: 'all 0.2s', zIndex: 1,
            }} />

            {/* Experience card */}
            <div
              style={{
                border: `1px solid ${expandedId === exp.id ? 'rgba(56,189,248,0.3)' : 'var(--os-border)'}`,
                borderRadius: 8, overflow: 'hidden', transition: 'all 0.2s',
                background: expandedId === exp.id ? 'rgba(56,189,248,0.03)' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              onMouseEnter={(e) => { if (expandedId !== exp.id) e.currentTarget.style.borderColor = 'rgba(56,189,248,0.15)'; }}
              onMouseLeave={(e) => { if (expandedId !== exp.id) e.currentTarget.style.borderColor = 'var(--os-border)'; }}
            >
              {/* Card header */}
              <div style={{
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: 600, color: 'var(--os-text)', fontSize: 14,
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {exp.role}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginTop: 3,
                  }}>
                    <span style={{
                      fontSize: 12, color: 'var(--os-orange)',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {exp.company}
                    </span>
                    <span style={{
                      fontSize: 10, color: 'var(--os-text-dim)',
                      fontFamily: "'JetBrains Mono', monospace",
                      display: 'flex', alignItems: 'center', gap: 3,
                    }}>
                      <FiCalendar size={10} /> {exp.period}
                    </span>
                  </div>
                </div>
                <FiChevronDown
                  size={14}
                  color="var(--os-text-dim)"
                  style={{
                    transform: expandedId === exp.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}
                />
              </div>

              {/* Expanded content */}
              {expandedId === exp.id && (
                <div style={{
                  padding: '0 16px 16px 36px',
                  animation: 'slideUp 0.2s ease-out',
                }}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{
                      fontSize: 10, color: 'var(--os-text-dim)', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
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
                          fontSize: 13, lineHeight: 1.6,
                          fontFamily: 'Inter, sans-serif',
                          color: 'var(--os-text)',
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{
                      fontSize: 10, color: 'var(--os-text-dim)', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
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
                          fontSize: 13, lineHeight: 1.6,
                          fontFamily: 'Inter, sans-serif',
                          color: 'var(--os-text-secondary)',
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{
                      fontSize: 10, color: 'var(--os-text-dim)', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
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
                          fontSize: 13, lineHeight: 1.6,
                          fontFamily: 'Inter, sans-serif',
                          color: 'var(--os-text-secondary)',
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
