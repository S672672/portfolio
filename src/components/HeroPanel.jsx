import React, { useState, useRef, useEffect, useCallback } from 'react';
import { profile } from '../data/profile';
import { search } from '../utils/searchIndex';
import { FiSearch } from 'react-icons/fi';

export default function HeroPanel({ onOpenApp }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim()) {
      setResults(search(query));
    } else {
      setResults([]);
    }
    setSelectedIndex(0);
  }, [query]);

  const handleSearchKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onOpenApp(results[selectedIndex].appId);
      setQuery('');
      setResults([]);
      setSearchFocused(false);
    } else if (e.key === 'Escape') {
      setQuery('');
      setResults([]);
      setSearchFocused(false);
      inputRef.current?.blur();
    }
  }, [results, selectedIndex, onOpenApp]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', padding: '0 20px', pointerEvents: 'none', position: 'relative', zIndex: 10,
    }}>
      <div className="hero-panel" style={{
        padding: '40px 48px', maxWidth: 540, width: '100%', textAlign: 'center',
        pointerEvents: 'auto', animation: 'heroEnter 0.6s ease-out',
      }}>
        {/* Identity */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{
            fontSize: 30, fontWeight: 700, color: 'var(--os-text)',
            margin: 0, letterSpacing: '-0.5px', lineHeight: 1.2,
            fontFamily: 'Inter, sans-serif',
          }}>
            {profile.name}
          </h1>
          <div style={{
            fontSize: 12, color: 'var(--os-accent)', fontWeight: 600,
            letterSpacing: '3px', textTransform: 'uppercase', marginTop: 8,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {profile.role}
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 14, color: 'var(--os-text-secondary)', lineHeight: 1.7,
          marginBottom: 24, maxWidth: 340, margin: '0 auto 24px',
          fontFamily: 'Inter, sans-serif',
        }}>
          Building software. Solving problems. Exploring systems.
        </div>

        {/* Focus pills */}
        <div style={{
          display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28,
        }}>
          {profile.focus.map((f, i) => (
            <span key={i} style={{
              fontSize: 11, color: 'var(--os-text-dim)',
              padding: '4px 12px', border: '1px solid var(--os-border-subtle)',
              borderRadius: 20, letterSpacing: '0.3px',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => onOpenApp('projects')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 32px', background: 'var(--os-accent)',
            color: '#080B12', border: 'none', borderRadius: 10,
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            letterSpacing: '0.8px', transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
            marginBottom: 16, textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(90,169,255,0.25)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
        >
          VIEW PROJECTS →
        </button>

        {/* Search bar */}
        <div className="os-search-bar" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 16px', position: 'relative',
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
            placeholder="Search portfolio..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--os-text)', fontSize: 13, fontFamily: 'Inter, sans-serif',
            }}
          />
          {!searchFocused && !query && (
            <span style={{ fontSize: 10, color: 'var(--os-text-faint)', fontFamily: "'JetBrains Mono', monospace" }}>
              Ctrl+K
            </span>
          )}
        </div>

        {/* Search results */}
        {searchFocused && results.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
            background: 'rgba(14, 20, 32, 0.95)', backdropFilter: 'blur(24px)',
            border: '1px solid var(--os-border)', borderRadius: 12,
            padding: '6px 0', maxHeight: 280, overflow: 'auto',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)', zIndex: 100,
          }} className="os-scrollbar">
            {results.slice(0, 8).map((r, i) => (
              <div
                key={r.id}
                onClick={() => { onOpenApp(r.appId); setQuery(''); setResults([]); }}
                style={{
                  padding: '10px 16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: i === selectedIndex ? 'rgba(90,169,255,0.08)' : 'transparent',
                  borderLeft: i === selectedIndex ? '2px solid var(--os-accent)' : '2px solid transparent',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <span style={{
                  fontSize: 10, fontWeight: 600, color: r.color,
                  letterSpacing: '0.5px', minWidth: 72,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {r.category}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--os-text)', fontFamily: 'Inter, sans-serif' }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--os-text-dim)', marginTop: 1 }}>{r.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer label */}
        <div style={{
          marginTop: 20, fontSize: 10, color: 'var(--os-text-faint)',
          letterSpacing: '2.5px', textTransform: 'uppercase',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          BUILD · LEARN · EXPLORE
        </div>
      </div>
    </div>
  );
}
