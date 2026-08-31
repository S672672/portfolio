import React, { useState, useRef, useEffect, useCallback } from 'react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { skillCategories } from '../data/skills';
import { incidents } from '../data/incidents';
import { FiSearch, FiTerminal, FiFileText, FiMail } from 'react-icons/fi';

function searchAll(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results = [];
  projects.forEach((p) => {
    const s = [p.title, ...p.technologies, p.readme.overview, ...p.highlights].join(' ').toLowerCase();
    if (s.includes(q)) results.push({ category: 'PROJECTS', title: p.title, subtitle: p.technologies.slice(0, 3).join(', '), appId: 'projects', color: 'var(--os-accent)' });
  });
  experience.forEach((e) => {
    const s = [e.role, e.company, ...e.whatIDid].join(' ').toLowerCase();
    if (s.includes(q)) results.push({ category: 'EXPERIENCE', title: `${e.role} — ${e.company}`, subtitle: e.period, appId: 'experience', color: 'var(--os-orange)' });
  });
  Object.values(skillCategories).forEach((cat) => {
    cat.skills.forEach((skill) => {
      const s = [skill.name, ...skill.usedIn].join(' ').toLowerCase();
      if (s.includes(q)) results.push({ category: 'SKILLS', title: skill.name, subtitle: cat.label, appId: 'skills', color: 'var(--os-success)' });
    });
  });
  incidents.forEach((inc) => {
    const s = [inc.title, inc.problem, ...inc.tags].join(' ').toLowerCase();
    if (s.includes(q)) results.push({ category: 'INCIDENTS', title: inc.title, subtitle: inc.tags.join(', '), appId: 'incidents', color: 'var(--os-violet)' });
  });
  return results;
}

export default function HeroPanel({ onOpenApp }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchAll(query));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearchKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && results.length > 0) {
      onOpenApp(results[0].appId);
      setQuery('');
      setResults([]);
      setSearchFocused(false);
    }
    if (e.key === 'Escape') {
      setQuery('');
      setResults([]);
      setSearchFocused(false);
      inputRef.current?.blur();
    }
  }, [results, onOpenApp]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '0 20px',
      pointerEvents: 'none',
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Atmospheric light behind hero */}
      <div style={{
        position: 'absolute',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,169,255,0.03) 0%, rgba(139,124,255,0.01) 40%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'ambientGlow 10s ease-in-out infinite',
      }} />

      <div className="hero-panel" style={{
        padding: '40px 48px',
        maxWidth: 540,
        width: '100%',
        textAlign: 'center',
        pointerEvents: 'auto',
        animation: 'heroEnter 0.6s ease-out',
      }}>
        {/* Identity */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{
            fontSize: 30,
            fontWeight: 700,
            color: 'var(--os-text)',
            margin: 0,
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
          }}>
            {profile.name}
          </h1>
          <div style={{
            fontSize: 12,
            color: 'var(--os-accent)',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginTop: 8,
          }}>
            {profile.role}
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 14,
          color: 'var(--os-text-secondary)',
          lineHeight: 1.7,
          marginBottom: 24,
          maxWidth: 340,
          margin: '0 auto 24px',
        }}>
          Building software. Solving problems. Exploring systems.
        </div>

        {/* Focus pills */}
        <div style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 28,
        }}>
          {profile.focus.map((f, i) => (
            <span key={i} style={{
              fontSize: 11,
              color: 'var(--os-text-dim)',
              padding: '4px 12px',
              border: '1px solid var(--os-border-subtle)',
              borderRadius: 20,
              letterSpacing: '0.3px',
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => onOpenApp('projects')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 32px',
            background: 'var(--os-accent)',
            color: '#080B12',
            border: 'none',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.8px',
            transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(90,169,255,0.25)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
        >
          VIEW PROJECTS →
        </button>

        {/* Secondary actions */}
        <div style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 28,
        }}>
          {[
            { id: 'terminal', label: 'Terminal', icon: FiTerminal },
            { id: 'resume', label: 'Resume', icon: FiFileText },
            { id: 'contact', label: 'Contact', icon: FiMail },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenApp(item.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                background: 'transparent',
                border: '1px solid var(--os-border)',
                borderRadius: 8,
                color: 'var(--os-text-dim)',
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--os-accent-dim)';
                e.currentTarget.style.color = 'var(--os-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--os-border)';
                e.currentTarget.style.color = 'var(--os-text-dim)';
              }}
            >
              <item.icon size={13} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="os-search-bar" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 16px',
          position: 'relative',
        }}>
          <FiSearch size={15} color="var(--os-text-dim)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Explore SmithOS..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--os-text)',
              fontSize: 13,
              fontFamily: 'inherit',
            }}
          />
          {!searchFocused && !query && (
            <span style={{ fontSize: 10, color: 'var(--os-text-faint)', fontFamily: 'monospace' }}>
              Ctrl+K
            </span>
          )}
        </div>

        {/* Search results */}
        {searchFocused && results.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            background: 'rgba(14, 20, 32, 0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid var(--os-border)',
            borderRadius: 12,
            padding: '6px 0',
            maxHeight: 280,
            overflow: 'auto',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            zIndex: 100,
          }} className="os-scrollbar">
            {results.map((r, i) => (
              <div
                key={i}
                onClick={() => { onOpenApp(r.appId); setQuery(''); setResults([]); }}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(90,169,255,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: r.color,
                  letterSpacing: '0.5px',
                  minWidth: 72,
                }}>
                  {r.category}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--os-text)' }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--os-text-dim)', marginTop: 1 }}>{r.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer label */}
        <div style={{
          marginTop: 20,
          fontSize: 10,
          color: 'var(--os-text-faint)',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
        }}>
          BUILD · LEARN · EXPLORE
        </div>
      </div>
    </div>
  );
}
