import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { searchGrouped, searchCategories, getHighlightParts } from '../../utils/searchIndex';
import { FiSearch, FiFolder, FiBriefcase, FiCpu, FiMap, FiAlertTriangle, FiUser, FiX } from 'react-icons/fi';

const categoryIcons = {
  PROFILE: FiUser,
  EXPERIENCE: FiBriefcase,
  PROJECT: FiFolder,
  SKILL: FiCpu,
  JOURNEY: FiMap,
  INCIDENT: FiAlertTriangle,
};

export default function SearchApp({ onOpenApp }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const groupedResults = useMemo(() => searchGrouped(query), [query]);
  const flatResults = useMemo(() => groupedResults.flatMap(g => g.items), [groupedResults]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (scrollRef.current) {
      const selected = scrollRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selected) {
        selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
      onOpenApp(flatResults[selectedIndex].appId);
    } else if (e.key === 'Escape') {
      setQuery('');
    }
  }, [flatResults, selectedIndex, onOpenApp]);

  const handleResultClick = useCallback((appId) => {
    onOpenApp(appId);
  }, [onOpenApp]);

  // Build flat index for keyboard navigation
  let globalIndex = 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Search input area */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--os-border)',
        background: 'var(--os-surface-raised)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FiSearch size={16} color="var(--os-text-dim)" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, skills, experience..."
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--os-text)',
              fontSize: 15,
              fontFamily: 'Inter, sans-serif',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, borderRadius: 4, cursor: 'pointer',
                background: 'rgba(148,163,184,0.08)', border: 'none',
                color: 'var(--os-text-dim)', transition: 'all 0.15s', padding: 0,
              }}
            >
              <FiX size={12} />
            </button>
          )}
          {query && flatResults.length > 0 && (
            <span style={{ fontSize: 12, color: 'var(--os-text-dim)', whiteSpace: 'nowrap' }}>
              {flatResults.length} result{flatResults.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Results area */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '6px 0' }} className="os-scrollbar">
        {!query ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <FiSearch size={28} style={{ opacity: 0.15, marginBottom: 16 }} />
            <div style={{
              color: 'var(--os-text-secondary)',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.6,
            }}>
              Search across your entire portfolio
            </div>
            <div style={{
              color: 'var(--os-text-dim)',
              fontSize: 12,
              marginTop: 8,
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.5,
            }}>
              Try: "docker", "react", "network", "experience"
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              marginTop: 20,
              flexWrap: 'wrap',
            }}>
              {['experience', 'projects', 'skills', 'contact'].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  style={{
                    padding: '5px 12px',
                    background: 'rgba(90,169,255,0.05)',
                    border: '1px solid var(--os-border)',
                    borderRadius: 6,
                    color: 'var(--os-text-dim)',
                    fontSize: 12,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.15s',
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
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : flatResults.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div style={{
              color: 'var(--os-text-secondary)',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
            }}>
              No relevant results for "{query}"
            </div>
            <div style={{
              color: 'var(--os-text-dim)',
              fontSize: 12,
              marginTop: 8,
              lineHeight: 1.5,
              fontFamily: 'Inter, sans-serif',
            }}>
              Try searching for projects, skills, experience, or networking topics
            </div>
          </div>
        ) : (
          groupedResults.map((group) => {
            const catMeta = searchCategories[group.category] || { label: group.category, color: 'var(--os-text-dim)' };
            const CatIcon = categoryIcons[group.category] || FiUser;

            return (
              <div key={group.category} style={{ marginBottom: 4 }}>
                {/* Category header */}
                <div style={{
                  padding: '8px 20px 4px',
                  fontSize: 10,
                  fontWeight: 700,
                  color: catMeta.color,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  <CatIcon size={11} strokeWidth={1.5} />
                  {catMeta.label}
                </div>

                {/* Items */}
                {group.items.map((result) => {
                  const currentIndex = globalIndex++;
                  const isSelected = currentIndex === selectedIndex;

                  return (
                    <div
                      key={result.id}
                      data-index={currentIndex}
                      onClick={() => handleResultClick(result.appId)}
                      style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(56,189,248,0.07)' : 'transparent',
                        borderLeft: isSelected ? '2px solid var(--os-accent)' : '2px solid transparent',
                        transition: 'all 0.1s',
                      }}
                      onMouseEnter={() => setSelectedIndex(currentIndex)}
                    >
                      <div style={{
                        fontWeight: 500,
                        fontSize: 13,
                        color: 'var(--os-text)',
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        {(() => { const h = getHighlightParts(result.title, query); return h.match ? (<>{h.before}<span style={{ color: 'var(--os-accent)', fontWeight: 600 }}>{h.match}</span>{h.after}</>) : result.title; })()}
                      </div>
                      <div style={{
                        fontSize: 12,
                        color: 'var(--os-text-muted)',
                        marginTop: 2,
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        {result.subtitle}
                      </div>
                      {result.tags && result.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                          {result.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: 10,
                                padding: '2px 7px',
                                borderRadius: 4,
                                background: 'var(--os-surface-raised)',
                                color: 'var(--os-text-dim)',
                                border: '1px solid var(--os-border)',
                                fontFamily: "'JetBrains Mono', monospace",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>

      {/* Footer with keyboard hints */}
      {flatResults.length > 0 && (
        <div style={{
          padding: '8px 20px',
          borderTop: '1px solid var(--os-border)',
          background: 'var(--os-surface-raised)',
          display: 'flex',
          gap: 16,
          fontSize: 11,
          color: 'var(--os-text-dim)',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <span><kbd style={kbdStyle}>↑↓</kbd> navigate</span>
          <span><kbd style={kbdStyle}>↵</kbd> open</span>
          <span><kbd style={kbdStyle}>esc</kbd> clear</span>
        </div>
      )}
    </div>
  );
}

const kbdStyle = {
  display: 'inline-block',
  padding: '1px 5px',
  background: 'var(--os-surface)',
  border: '1px solid var(--os-border)',
  borderRadius: 3,
  fontSize: 10,
  fontFamily: "'JetBrains Mono', monospace",
  color: 'var(--os-accent)',
  marginRight: 3,
};
