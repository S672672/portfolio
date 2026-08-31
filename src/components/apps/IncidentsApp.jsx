import React, { useState } from 'react';
import { incidents } from '../../data/incidents';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

export default function IncidentsApp() {
  const [selectedIncident, setSelectedIncident] = useState(null);

  const statusColors = {
    resolved: { color: 'var(--os-success)', bg: 'rgba(52,211,153,0.1)' },
    investigating: { color: 'var(--os-warning)', bg: 'rgba(251,191,36,0.1)' },
    open: { color: 'var(--os-error)', bg: 'rgba(248,113,113,0.1)' },
  };

  const renderIncidentDetail = (incident) => {
    const sections = [
      { label: 'PROBLEM', content: incident.problem, color: 'var(--os-error)' },
      { label: 'INITIAL HYPOTHESIS', content: incident.initialHypothesis, color: 'var(--os-warning)' },
      { label: 'INVESTIGATION', content: incident.investigation, color: 'var(--os-accent)' },
      { label: 'ROOT CAUSE', content: incident.rootCause, color: 'var(--os-purple)' },
      { label: 'RESOLUTION', content: incident.resolution, color: 'var(--os-success)' },
      { label: 'LESSON LEARNED', content: incident.lesson, color: 'var(--os-green)' },
    ];

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 24 }}>{incident.icon}</span>
          <div>
            <h3 style={{ color: 'var(--os-accent)', fontSize: 16, margin: 0 }}>{incident.title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: 4,
                  background: statusColors[incident.status]?.bg || 'rgba(52,211,153,0.1)',
                  color: statusColors[incident.status]?.color || 'var(--os-success)',
                }}
              >
                {incident.status === 'resolved' ? '✓ ' : ''}{incident.status}
              </span>
              {incident.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    padding: '2px 6px',
                    borderRadius: 3,
                    background: 'var(--os-surface-raised)',
                    color: 'var(--os-text-dim)',
                    border: '1px solid var(--os-border)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.label} style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: 11,
              color: section.color,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: section.color }} />
              {section.label}
            </div>
            <div style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: 'var(--os-text)',
              paddingLeft: 16,
              borderLeft: `2px solid ${section.color}33`,
            }}>
              {section.content}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar - incident list */}
      <div
        style={{
          width: 260,
          borderRight: '1px solid var(--os-border)',
          background: 'var(--os-surface-raised)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{
          padding: '12px 14px',
          borderBottom: '1px solid var(--os-border)',
          fontSize: 12,
          color: 'var(--os-text-dim)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{ fontWeight: 600 }}>INCIDENTS</span>
          <span style={{ color: 'var(--os-text-dim)' }}>·</span>
          <span>{incidents.length} reports</span>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: 6 }} className="os-scrollbar">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className={`file-item ${selectedIncident?.id === incident.id ? 'active' : ''}`}
              onClick={() => setSelectedIncident(incident)}
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                <span style={{ fontSize: 16 }}>{incident.icon}</span>
                <span style={{ fontSize: 13, flex: 1, fontWeight: 500 }}>{incident.title}</span>
                {incident.status === 'resolved' && (
                  <FiCheckCircle size={12} color="var(--os-success)" />
                )}
              </div>
              <div style={{ fontSize: 11, color: 'var(--os-text-dim)', paddingLeft: 24 }}>
                {incident.tags.slice(0, 3).join(' · ')}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: '10px 14px',
          borderTop: '1px solid var(--os-border)',
          fontSize: 11,
          color: 'var(--os-text-dim)',
        }}>
          Real engineering problems and how they were resolved.
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }} className="os-scrollbar">
        {!selectedIncident ? (
          <div style={{
            color: 'var(--os-text-dim)',
            textAlign: 'center',
            marginTop: 60,
            fontSize: 14,
          }}>
            <FiAlertTriangle size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div>Select an incident report to view details</div>
            <div style={{ fontSize: 12, marginTop: 8 }}>
              Each report shows the full debugging journey from problem to resolution
            </div>
          </div>
        ) : (
          renderIncidentDetail(selectedIncident)
        )}
      </div>
    </div>
  );
}
