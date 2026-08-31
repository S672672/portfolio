import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiMonitor, FiFolder, FiTerminal, FiFileText, FiMail, FiSearch } from 'react-icons/fi';
import { searchGrouped, searchCategories } from '../utils/searchIndex';
import { isMobileDevice } from '../utils/device';

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => isMobileDevice());

  useEffect(() => {
    const handle = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchGrouped(query));
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  // Flatten for keyboard navigation
  const flatResults = results.flatMap(g => g.items);

  const onKey = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
      onOpenApp(flatResults[selectedIndex].appId);
      setQuery(''); setResults([]); setFocused(false);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setQuery(''); setResults([]); setFocused(false);
      inputRef.current?.blur();
    }
  }, [flatResults, selectedIndex, onOpenApp]);

  let globalIndex = 0;

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
        minWidth: isMobile ? 100 : 200, flex: isMobile ? 1 : undefined,
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
            color: 'var(--os-text)', fontSize: isMobile ? 11 : 12,
            fontFamily: 'Inter, sans-serif',
            width: isMobile ? '100%' : 140, caretColor: 'var(--os-accent)',
            minWidth: 0,
          }}
        />
        {!isMobile && (
          <span style={{
            fontSize: 8, color: 'var(--os-text-faint)',
            fontFamily: "'JetBrains Mono', monospace",
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

      {/* Search results dropdown — grouped by category */}
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
          {results.map((group) => {
            const catMeta = searchCategories[group.category] || { color: 'var(--os-text-dim)' };
            return (
              <div key={group.category}>
                <div style={{
                  padding: '5px 12px', fontSize: 8, color: catMeta.color,
                  fontWeight: 700, letterSpacing: '1px',
                  borderBottom: '1px solid var(--os-border-subtle)',
                  position: 'sticky', top: 0, background: 'rgba(12,16,25,0.98)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {group.category}
                </div>
                {group.items.map((r) => {
                  const currentIndex = globalIndex++;
                  const isSelected = currentIndex === selectedIndex;
                  return (
                    <div key={r.id}
                      onClick={() => { onOpenApp(r.appId); setQuery(''); setResults([]); setFocused(false); }}
                      style={{
                        padding: isMobile ? '10px 12px' : '7px 12px',
                        cursor: 'pointer', transition: 'background 0.1s',
                        borderBottom: '1px solid var(--os-border-subtle)',
                        background: isSelected ? 'rgba(90,169,255,0.06)' : 'transparent',
                        borderLeft: isSelected ? '2px solid var(--os-accent)' : '2px solid transparent',
                      }}
                      onMouseEnter={() => setSelectedIndex(currentIndex)}>
                      <div style={{ fontSize: isMobile ? 12 : 11, color: 'var(--os-text)', fontFamily: 'Inter, sans-serif' }}>{r.title}</div>
                      <div style={{ fontSize: isMobile ? 10 : 9, color: 'var(--os-text-dim)', marginTop: 1 }}>{r.subtitle}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
