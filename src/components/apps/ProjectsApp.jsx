import React, { useState } from 'react';
import { projects } from '../../data/projects';
import { useIsMobile } from '../../hooks/useIsMobile';
import { FiFolder, FiFileText, FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';

export default function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewMode, setViewMode] = useState('normal');
  const [expandedLayer, setExpandedLayer] = useState(null);
  const isMobile = useIsMobile();

  const files = selectedProject
    ? [
        { id: 'readme', name: 'README.md', icon: '📄' },
        { id: 'tech', name: 'technologies.json', icon: '📄' },
        { id: 'highlights', name: 'highlights.md', icon: '📄' },
        { id: 'challenges', name: 'challenges.md', icon: '📄' },
        { id: 'learn', name: 'what-i-learned.md', icon: '📄' },
        { id: 'xray', name: 'x-ray.mode', icon: '🔬' },
      ]
    : [];

  const renderFileContent = () => {
    if (!selectedFile || !selectedProject) return null;
    const p = selectedProject;

    switch (selectedFile) {
      case 'readme':
        return (
          <div style={{ lineHeight: 1.8, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
            <h3 style={{ color: 'var(--os-accent)', marginBottom: 8, fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{p.title}</h3>
            <p style={{ marginBottom: 16, color: 'var(--os-text)' }}>{p.readme.overview}</p>
            <h4 style={{ color: 'var(--os-purple)', fontSize: 13, marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Problem</h4>
            <p style={{ marginBottom: 16, color: 'var(--os-text-secondary)' }}>{p.readme.problem}</p>
            <h4 style={{ color: 'var(--os-purple)', fontSize: 13, marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>What Makes It Interesting</h4>
            <p style={{ marginBottom: 16, color: 'var(--os-text-secondary)' }}>{p.readme.interesting}</p>
            <h4 style={{ color: 'var(--os-purple)', fontSize: 13, marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>My Contribution</h4>
            <p style={{ color: 'var(--os-text-secondary)' }}>{p.readme.contribution}</p>
          </div>
        );
      case 'tech':
        return (
          <div>
            <h4 style={{ color: 'var(--os-accent)', marginBottom: 12, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Technologies</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {p.technologies.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: '6px 14px',
                    background: 'rgba(56,189,248,0.08)',
                    border: '1px solid rgba(56,189,248,0.15)',
                    borderRadius: 6,
                    fontSize: 13,
                    color: 'var(--os-accent)',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        );
      case 'highlights':
        return (
          <div>
            <h4 style={{ color: 'var(--os-accent)', marginBottom: 12, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Highlights</h4>
            {p.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 14px',
                  borderLeft: '3px solid var(--os-accent)',
                  background: 'rgba(56,189,248,0.03)',
                  marginBottom: 8,
                  borderRadius: '0 6px 6px 0',
                  fontSize: 14,
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--os-text)',
                }}
              >
                {h}
              </div>
            ))}
          </div>
        );
      case 'challenges':
        return (
          <div>
            <h4 style={{ color: 'var(--os-accent)', marginBottom: 12, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Challenges</h4>
            {p.challenges.map((c, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, color: 'var(--os-orange)', fontSize: 13, marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
                  Challenge: {c.challenge}
                </div>
                <div style={{ paddingLeft: 12, borderLeft: '2px solid var(--os-border)', fontSize: 13, color: 'var(--os-text-muted)', fontFamily: 'Inter, sans-serif' }}>
                  Approach: {c.approach}
                </div>
              </div>
            ))}
          </div>
        );
      case 'learn':
        return (
          <div>
            <h4 style={{ color: 'var(--os-accent)', marginBottom: 12, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>What I Learned</h4>
            {p.learned.map((l, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 12px',
                  borderLeft: '3px solid var(--os-green)',
                  background: 'rgba(52,211,153,0.03)',
                  marginBottom: 8,
                  borderRadius: '0 6px 6px 0',
                  fontSize: 14,
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--os-text)',
                }}
              >
                {l}
              </div>
            ))}
          </div>
        );
      case 'xray':
        return renderXRay(p);
      default:
        return null;
    }
  };

  const renderXRay = (p) => {
    if (!p.architecture || p.architecture.length === 0) {
      return (
        <div style={{ color: 'var(--os-text-dim)', textAlign: 'center', marginTop: 40, fontFamily: 'Inter, sans-serif' }}>
          <div style={{ fontSize: 14 }}>X-Ray data not available for this project.</div>
        </div>
      );
    }

    const layerColors = [
      'var(--os-accent)',
      'var(--os-purple)',
      'var(--os-green)',
      'var(--os-orange)',
      'var(--os-pink)',
    ];

    return (
      <div>
        <h4 style={{ color: 'var(--os-purple)', marginBottom: 4, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
          PROJECT X-RAY
        </h4>
        <p style={{ color: 'var(--os-text-dim)', fontSize: 12, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Architectural breakdown of {p.title}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {p.architecture.map((layer, i) => {
            const color = layerColors[i % layerColors.length];
            const isLast = i === p.architecture.length - 1;
            const isExpanded = expandedLayer === i;

            return (
              <React.Fragment key={i}>
                <div
                  onClick={() => setExpandedLayer(isExpanded ? null : i)}
                  style={{
                    width: '100%', maxWidth: 500,
                    padding: '14px 18px',
                    background: isExpanded ? `${color}11` : 'var(--os-surface-raised)',
                    border: `1px solid ${isExpanded ? color : 'var(--os-border)'}`,
                    borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = isExpanded ? color : 'var(--os-border)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color, fontFamily: 'Inter, sans-serif' }}>{layer.layer}</div>
                      <div style={{ fontSize: 12, color: 'var(--os-text-dim)', marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{layer.tech}</div>
                    </div>
                    <span style={{ color: 'var(--os-text-dim)', fontSize: 12 }}>
                      {isExpanded ? '\u25BE' : '\u25B8'}
                    </span>
                  </div>
                  {isExpanded && (
                    <div style={{
                      marginTop: 12, paddingTop: 12,
                      borderTop: `1px solid ${color}33`,
                      fontSize: 13, lineHeight: 1.6,
                      color: 'var(--os-text-muted)',
                      animation: 'slideUp 0.2s ease-out',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {layer.description}
                    </div>
                  )}
                </div>
                {!isLast && (
                  <div style={{
                    width: 2, height: 20,
                    background: `linear-gradient(${layerColors[i % layerColors.length]}, ${layerColors[(i + 1) % layerColors.length]})`,
                    opacity: 0.4,
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const sidebarWidth = isMobile ? 140 : 220;

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar - always visible, responsive width */}
      <div
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          borderRight: '1px solid var(--os-border)',
          background: 'var(--os-surface-raised)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Breadcrumb */}
        <div style={{
          padding: '10px 14px', borderBottom: '1px solid var(--os-border)',
          fontSize: 12, color: 'var(--os-text-dim)', display: 'flex',
          alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace",
        }}>
          {selectedProject && (
            <button
              onClick={() => { setSelectedProject(null); setSelectedFile(null); }}
              style={{
                background: 'none', border: 'none', color: 'var(--os-accent)',
                cursor: 'pointer', padding: 0, display: 'flex', fontFamily: 'inherit',
              }}
            >
              <FiArrowLeft size={14} />
            </button>
          )}
          <span>Projects</span>
          {selectedProject && <span>/ {selectedProject.folder}</span>}
        </div>

        {/* File list */}
        <div style={{ flex: 1, overflow: 'auto', padding: isMobile ? 4 : 6 }} className="os-scrollbar">
          {!selectedProject
            ? projects.map((p) => (
                <div
                  key={p.id}
                  className="file-item"
                  onClick={() => setSelectedProject(p)}
                  style={{ padding: isMobile ? '8px 6px' : undefined }}
                >
                  <FiFolder size={isMobile ? 13 : 16} color="var(--os-accent)" />
                  <span style={{ fontSize: isMobile ? 11 : 13, fontFamily: 'Inter, sans-serif' }}>{p.folder}</span>
                </div>
              ))
            : files.map((f) => (
                <div
                  key={f.id}
                  className={`file-item ${selectedFile === f.id ? 'active' : ''}`}
                  onClick={() => setSelectedFile(f.id)}
                  style={{ padding: isMobile ? '8px 6px' : undefined }}
                >
                  <FiFileText size={isMobile ? 12 : 14} color="var(--os-text-muted)" />
                  <span style={{ fontSize: isMobile ? 11 : 13, fontFamily: 'Inter, sans-serif' }}>{f.name}</span>
                </div>
              ))}
        </div>

        {/* Links */}
        {selectedProject && !isMobile && (
          <div style={{ padding: 8, borderTop: '1px solid var(--os-border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 10px', color: 'var(--os-text-muted)',
                  textDecoration: 'none', fontSize: 12, borderRadius: 4,
                  transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(56,189,248,0.08)'; e.currentTarget.style.color = 'var(--os-accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--os-text-muted)'; }}
              >
                <FiGithub size={13} /> GitHub
              </a>
            )}
            {selectedProject.live && (
              <a
                href={selectedProject.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 10px', color: 'var(--os-text-muted)',
                  textDecoration: 'none', fontSize: 12, borderRadius: 4,
                  transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(56,189,248,0.08)'; e.currentTarget.style.color = 'var(--os-accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--os-text-muted)'; }}
              >
                <FiExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto', padding: isMobile ? 10 : 20, minWidth: 0 }} className="os-scrollbar">
        {!selectedProject && !selectedFile && (
          <div style={{
            color: 'var(--os-text-dim)', textAlign: 'center', marginTop: isMobile ? 20 : 60, fontSize: 14,
            fontFamily: 'Inter, sans-serif',
          }}>
            <FiFolder size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div>Select a project folder to explore</div>
            <div style={{ fontSize: 12, marginTop: 8, color: 'var(--os-text-dim)' }}>
              Each project contains README, technologies, highlights, challenges, and architectural analysis
            </div>
          </div>
        )}
        {selectedProject && !selectedFile && (
          <div>
            {/* Project header card */}
            <div style={{
              padding: 20, background: 'var(--os-surface-raised)',
              border: '1px solid var(--os-border)', borderRadius: 10,
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    color: 'var(--os-accent)', fontSize: 18, margin: 0,
                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  }}>{selectedProject.title}</h3>
                  <p style={{
                    color: 'var(--os-text-muted)', fontSize: 13,
                    margin: '6px 0 0 0', lineHeight: 1.6,
                    fontFamily: 'Inter, sans-serif',
                  }}>{selectedProject.readme.overview}</p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
                    {selectedProject.technologies.map((t) => (
                      <span key={t} style={{
                        fontSize: 10, padding: '2px 8px', borderRadius: 4,
                        background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.12)',
                        color: 'var(--os-accent)', fontFamily: "'JetBrains Mono', monospace",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* View mode toggle */}
              <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
                <button
                  onClick={() => { setViewMode('normal'); setSelectedFile('readme'); }}
                  style={{
                    padding: '6px 12px',
                    background: viewMode === 'normal' ? 'rgba(56,189,248,0.12)' : 'transparent',
                    border: '1px solid var(--os-border)',
                    borderRadius: 6,
                    color: viewMode === 'normal' ? 'var(--os-accent)' : 'var(--os-text-dim)',
                    fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.15s',
                  }}
                >
                  📄 Normal
                </button>
                <button
                  onClick={() => { setViewMode('xray'); setSelectedFile('xray'); }}
                  style={{
                    padding: '6px 12px',
                    background: viewMode === 'xray' ? 'rgba(167,139,250,0.12)' : 'transparent',
                    border: '1px solid var(--os-border)',
                    borderRadius: 6,
                    color: viewMode === 'xray' ? 'var(--os-purple)' : 'var(--os-text-dim)',
                    fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.15s',
                  }}
                >
                  🔬 X-Ray
                </button>
              </div>
            </div>

            <div style={{
              color: 'var(--os-text-dim)', fontSize: isMobile ? 12 : 13,
              fontFamily: 'Inter, sans-serif',
            }}>
              ← Select a file from the sidebar
            </div>
          </div>
        )}
        {selectedFile && renderFileContent()}
      </div>
    </div>
  );
}
