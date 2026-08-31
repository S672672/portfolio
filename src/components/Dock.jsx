import React, { useState, useRef, useEffect } from 'react';
import { FiMonitor, FiFolder, FiTerminal, FiFileText, FiMail, FiSearch } from 'react-icons/fi';
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { skillCategories } from '../data/skills';
import { incidents } from '../data/incidents';

function searchAll(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results = [];
  projects.forEach((p) => {
    const s = [p.title, ...p.technologies, p.readme.overview, ...p.highlights].join(' ').toLowerCase();
    if (s.includes(q)) results.push({ cat: 'PROJECTS', title: p.title, sub: p.technologies.slice(0, 3).join(', '), appId: 'projects', color: 'var(--os-accent)' });
  });
  experience.forEach((e) => {
    const s = [e.role, e.company, ...e.whatIDid].join(' ').toLowerCase();
    if (s.includes(q)) results.push({ cat: 'EXPERIENCE', title: `${e.role} — ${e.company}`, sub: e.period, appId: 'experience', color: 'var(--os-orange)' });
  });
  Object.values(skillCategories).forEach((cat) => {
    cat.skills.forEach((skill) => {
      const s = [skill.name, ...skill.usedIn].join(' ').toLowerCase();
      if (s.includes(q)) results.push({ cat: 'SKILLS', title: skill.name, sub: cat.label, appId: 'skills', color: 'var(--os-success)' });
    });
  });
  incidents.forEach((inc) => {
    const s = [inc.title, inc.problem, ...inc.tags].join(' ').toLowerCase();
    if (s.includes(q)) results.push({ cat: 'INCIDENTS', title: inc.title, sub: inc.tags.join(', '), appId: 'incidents', color: 'var(--os-violet)' });
  });
  return results;
}

const dockItems = [
  { id: 'projects', label: 'Projects', icon: FiFolder },
  { id: 'terminal', label: 'Terminal', icon: FiTerminal },
  { id: 'resume', label: 'Resume', icon: FiFileText },
  { id: 'contact', label: 'Contact', icon: FiMail },
];

export default function Dock({ windows, onOpenApp, entryReady = true }) {
  const activeAppIds = windows.filter((w) => !w.minimized).map((w) => w.appId);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  useEffect(() => {
    if (query.trim()) setResults(searchAll(query));
    else setResults([]);
  }, [query]);

  const onKey = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      onOpenApp(results[0].appId);
      setQuery(''); setResults([]); setFocused(false);
      inputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setQuery(''); setResults([]); setFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="os-dock" style={{
      gap: isMobile ? 2 : 6,
      padding: isMobile ? '5px 10px' : '7px 14px',
      width: isMobile ? 'calc(100% - 16px)' : undefined,
      opacity: entryReady ? 1 : 0,
      transition: 'opacity 0.4s ease-out 0.1s',
    }}>
      {/* Dock icons */}
      {dockItems.map((item) => (
        <button
          key={item.id}
          className={`dock-item ${activeAppIds.includes(item.id) ? 'active' : ''}`}
          onClick={() => onOpenApp(item.id)}
          title={item.label}
          aria-label={`Open ${item.label}`}
          style={isMobile ? { width: 36, height: 36 } : undefined}
        >
          <item.icon size={isMobile ? 15 : 17} strokeWidth={1.5} />
        </button>
      ))}

      {/* Divider */}
      <div className="dock-divider" />

      {/* Inline search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: isMobile ? 4 : 6,
        padding: isMobile ? '0 6px' : '0 10px', height: isMobile ? 32 : 36,
        minWidth: isMobile ? 100 : 200,
        flex: isMobile ? 1 : undefined,
      }}>
        <FiSearch size={isMobile ? 12 : 14} color="var(--os-text-dim)" strokeWidth={1.5} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={onKey}
          placeholder="Search..."
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--os-text)', fontSize: isMobile ? 11 : 12, fontFamily: 'inherit',
            width: isMobile ? '100%' : 140, caretColor: 'var(--os-accent)',
            minWidth: 0,
          }}
        />
        {!isMobile && (
          <span style={{
            fontSize: 8, color: 'var(--os-text-faint)', fontFamily: 'monospace',
            letterSpacing: '0.5px', whiteSpace: 'nowrap',
          }}>
            {navigator.platform?.includes('Mac') ? '⌘K' : 'Ctrl+K'}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="dock-divider" />

      {/* Active windows */}
      {windows.length > 0 && (
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {windows.map((w) => (
            <button
              key={w.id}
              className={`dock-item ${w.focused && !w.minimized ? 'active' : ''}`}
              onClick={() => onOpenApp(w.appId, w.id)}
              title={w.title}
              style={{ width: isMobile ? 28 : 32, height: isMobile ? 28 : 32, fontSize: 12 }}
            >
              <FiMonitor size={isMobile ? 10 : 12} strokeWidth={1.5} />
            </button>
          ))}
        </div>
      )}

      {/* Search results dropdown */}
      {focused && results.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? 'calc(var(--taskbar-height) + 56px)' : 'calc(var(--taskbar-height) + 10px)',
          left: '50%', transform: 'translateX(-50%)',
          width: isMobile ? 'calc(100% - 32px)' : 340,
          maxWidth: 380,
          background: 'rgba(12,16,25,0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--os-border)', borderRadius: 10,
          overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          maxHeight: isMobile ? 200 : 260, overflowY: 'auto', zIndex: 9999,
        }}>
          {Object.entries(results.reduce((acc, r) => { (acc[r.cat] = acc[r.cat] || []).push(r); return acc; }, {})).map(([cat, items]) => (
            <div key={cat}>
              <div style={{
                padding: '5px 12px', fontSize: 8, color: items[0].color,
                fontWeight: 700, letterSpacing: '1px',
                borderBottom: '1px solid var(--os-border-subtle)',
                position: 'sticky', top: 0, background: 'rgba(12,16,25,0.98)',
              }}>{cat}</div>
              {items.map((r, i) => (
                <div key={i}
                  onClick={() => { onOpenApp(r.appId); setQuery(''); setResults([]); setFocused(false); }}
                  style={{
                    padding: isMobile ? '10px 12px' : '7px 12px',
                    cursor: 'pointer', transition: 'background 0.1s',
                    borderBottom: '1px solid var(--os-border-subtle)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(90,169,255,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                  <div style={{ fontSize: isMobile ? 12 : 11, color: 'var(--os-text)' }}>{r.title}</div>
                  <div style={{ fontSize: isMobile ? 10 : 9, color: 'var(--os-text-dim)', marginTop: 1 }}>{r.sub}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
