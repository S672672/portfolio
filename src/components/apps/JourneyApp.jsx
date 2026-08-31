import React, { useState } from 'react';
import { journey } from '../../data/journey';

const commitHashes = ['a3f7b2c', 'e91d4f8', 'c2b6a10', 'd4e5f67', 'f8a9b0c'];

export default function JourneyApp() {
  const [expandedId, setExpandedId] = useState(journey[journey.length - 1]?.id);
  const [viewMode, setViewMode] = useState('git'); // 'git' or 'timeline'

  const renderGitView = () => {
    return (
      <div>
        <div style={{
          color: 'var(--os-text-dim)',
          fontFamily: 'monospace',
          fontSize: 12,
          marginBottom: 16,
          padding: '10px 14px',
          background: 'var(--os-surface-raised)',
          borderRadius: 6,
          border: '1px solid var(--os-border)',
        }}>
          <span style={{ color: 'var(--os-green)' }}>$</span> git log --career --oneline
        </div>

        <div style={{ fontFamily: 'monospace', fontSize: 13 }}>
          {[...journey].reverse().map((stage, i) => {
            const isExpanded = expandedId === stage.id;
            const isFirst = i === 0;
            const hash = commitHashes[i % commitHashes.length];

            return (
              <div key={stage.id} style={{ marginBottom: 0 }}>
                {/* Commit line */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : stage.id)}
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    background: isExpanded ? 'rgba(56,189,248,0.05)' : 'transparent',
                    borderLeft: isExpanded ? '2px solid var(--os-accent)' : '2px solid transparent',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(56,189,248,0.03)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isExpanded) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{
                    color: 'var(--os-green)',
                    fontWeight: 600,
                    fontSize: 12,
                    minWidth: 52,
                  }}>
                    {hash}
                  </span>
                  <span style={{ color: 'var(--os-accent)', fontSize: 12 }}>
                    {isFirst ? 'HEAD' : ''}
                  </span>
                  <span style={{ color: 'var(--os-orange)', fontSize: 12 }}>
                    feat:
                  </span>
                  <span style={{ color: 'var(--os-text)' }}>
                    {stage.summary}
                  </span>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div style={{
                    padding: '0 14px 16px 76px',
                    animation: 'slideUp 0.2s ease-out',
                  }}>
                    <div style={{
                      borderLeft: '1px solid var(--os-border)',
                      paddingLeft: 14,
                    }}>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{
                          fontSize: 11,
                          color: 'var(--os-text-dim)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: 6,
                        }}>
                          Author: Smith
                        </div>
                        <div style={{
                          fontSize: 11,
                          color: 'var(--os-text-dim)',
                          marginBottom: 4,
                        }}>
                          Date: {stage.id === 'currently' ? 'Present' : `Stage ${journey.indexOf(stage) + 1}`}
                        </div>
                      </div>

                      <div style={{ marginBottom: 12 }}>
                        <div style={{
                          fontSize: 11,
                          color: 'var(--os-accent)',
                          fontWeight: 600,
                          marginBottom: 6,
                        }}>
                          {stage.icon} {stage.phase}
                        </div>
                        <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--os-text)' }}>
                          {stage.whatIdo}
                        </div>
                      </div>

                      <div style={{ marginBottom: 12 }}>
                        <div style={{
                          fontSize: 11,
                          color: 'var(--os-text-dim)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: 6,
                        }}>
                          What I learned
                        </div>
                        <div style={{
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: 'var(--os-text-muted)',
                        }}>
                          {stage.whatILearned}
                        </div>
                      </div>

                      {stage.influence && (
                        <div style={{
                          padding: '8px 12px',
                          borderLeft: '2px solid var(--os-accent)',
                          background: 'rgba(56,189,248,0.05)',
                          borderRadius: '0 6px 6px 0',
                          fontSize: 12,
                          color: 'var(--os-text-muted)',
                          marginTop: 8,
                        }}>
                          → {stage.influence}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimelineView = () => {
    return (
      <div style={{ position: 'relative', paddingLeft: 32 }}>
        {/* Timeline line */}
        <div
          style={{
            position: 'absolute',
            left: 11,
            top: 8,
            bottom: 8,
            width: 2,
            background: 'linear-gradient(to bottom, var(--os-accent), var(--os-purple), var(--os-green))',
            borderRadius: 1,
            opacity: 0.3,
          }}
        />

        {journey.map((stage, i) => {
          const isExpanded = expandedId === stage.id;
          const isLast = i === journey.length - 1;

          return (
            <div key={stage.id} style={{ marginBottom: isLast ? 0 : 16, position: 'relative' }}>
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: -27,
                  top: 14,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: isExpanded ? 'var(--os-accent)' : 'var(--os-surface-raised)',
                  border: `2px solid ${isExpanded ? 'var(--os-accent)' : 'var(--os-text-dim)'}`,
                  transition: 'all 0.2s',
                  zIndex: 1,
                }}
              />

              {/* Arrow connector */}
              {!isLast && (
                <div
                  style={{
                    position: 'absolute',
                    left: -22,
                    top: 26,
                    fontSize: 10,
                    color: 'var(--os-text-dim)',
                  }}
                >
                  ↓
                </div>
              )}

              {/* Stage card */}
              <div
                style={{
                  border: `1px solid ${isExpanded ? 'rgba(56,189,248,0.3)' : 'var(--os-border)'}`,
                  borderRadius: 8,
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  background: isExpanded ? 'rgba(56,189,248,0.03)' : 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => setExpandedId(isExpanded ? null : stage.id)}
              >
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{stage.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: isExpanded ? 'var(--os-accent)' : 'var(--os-text)' }}>
                      {stage.phase}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--os-text-muted)', marginTop: 2 }}>
                      {stage.summary}
                    </div>
                  </div>
                  <span
                    style={{
                      color: 'var(--os-text-dim)',
                      fontSize: 12,
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    ▾
                  </span>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 16px 16px 46px', animation: 'slideUp 0.2s ease-out' }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: 'var(--os-text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        What I Was Doing
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.6 }}>{stage.whatIdo}</div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: 'var(--os-text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        What I Learned
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--os-text-muted)' }}>{stage.whatILearned}</div>
                    </div>
                    {stage.influence && (
                      <div style={{ padding: '8px 12px', borderLeft: '2px solid var(--os-accent)', background: 'rgba(56,189,248,0.05)', borderRadius: '0 6px 6px 0', fontSize: 12, color: 'var(--os-text-muted)' }}>
                        → {stage.influence}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      {/* View mode toggle */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        <button
          onClick={() => setViewMode('git')}
          style={{
            padding: '6px 14px',
            background: viewMode === 'git' ? 'rgba(56,189,248,0.15)' : 'transparent',
            border: '1px solid var(--os-border)',
            borderRadius: 6,
            color: viewMode === 'git' ? 'var(--os-accent)' : 'var(--os-text-dim)',
            fontSize: 12,
            cursor: 'pointer',
            fontFamily: 'monospace',
            transition: 'all 0.15s',
          }}
        >
          git log
        </button>
        <button
          onClick={() => setViewMode('timeline')}
          style={{
            padding: '6px 14px',
            background: viewMode === 'timeline' ? 'rgba(56,189,248,0.15)' : 'transparent',
            border: '1px solid var(--os-border)',
            borderRadius: 6,
            color: viewMode === 'timeline' ? 'var(--os-accent)' : 'var(--os-text-dim)',
            fontSize: 12,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}
        >
          Timeline
        </button>
      </div>

      {viewMode === 'git' ? renderGitView() : renderTimelineView()}
    </div>
  );
}
