import React, { useState, useRef, useEffect, useCallback } from 'react';
import { projects } from '../../data/projects';
import { experience } from '../../data/experience';
import { skillCategories } from '../../data/skills';
import { journey } from '../../data/journey';
import { incidents } from '../../data/incidents';
import { profile } from '../../data/profile';
import { FiSearch, FiFolder, FiBriefcase, FiCpu, FiMap, FiAlertTriangle, FiUser } from 'react-icons/fi';

const searchCategories = [
  { id: 'projects', label: 'PROJECTS', icon: FiFolder, color: 'var(--os-accent)' },
  { id: 'experience', label: 'EXPERIENCE', icon: FiBriefcase, color: 'var(--os-orange)' },
  { id: 'skills', label: 'SKILLS', icon: FiCpu, color: 'var(--os-green)' },
  { id: 'journey', label: 'JOURNEY', icon: FiMap, color: 'var(--os-purple)' },
  { id: 'incidents', label: 'INCIDENTS', icon: FiAlertTriangle, color: 'var(--os-pink)' },
];

function searchAll(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results = [];

  // Search projects
  projects.forEach((p) => {
    const searchable = [
      p.title,
      p.readme.overview,
      p.readme.problem,
      p.readme.interesting,
      ...p.technologies,
      ...p.highlights,
    ].join(' ').toLowerCase();
    if (searchable.includes(q)) {
      results.push({
        category: 'projects',
        title: p.title,
        subtitle: p.readme.overview,
        tags: p.technologies,
        appId: 'projects',
      });
    }
  });

  // Search experience
  experience.forEach((e) => {
    const searchable = [
      e.role,
      e.company,
      ...e.whatIDid,
      ...e.whatILearned,
      ...e.keyContributions,
    ].join(' ').toLowerCase();
    if (searchable.includes(q)) {
      results.push({
        category: 'experience',
        title: `${e.role} — ${e.company}`,
        subtitle: e.whatIDid[0],
        tags: [e.period],
        appId: 'experience',
      });
    }
  });

  // Search skills
  Object.entries(skillCategories).forEach(([, cat]) => {
    cat.skills.forEach((skill) => {
      const searchable = [skill.name, ...skill.usedIn].join(' ').toLowerCase();
      if (searchable.includes(q)) {
        results.push({
          category: 'skills',
          title: skill.name,
          subtitle: `${cat.label} · ${skill.usedIn.join(', ')}`,
          tags: [cat.label],
          appId: 'skills',
        });
      }
    });
  });

  // Search journey
  journey.forEach((j) => {
    const searchable = [j.phase, j.summary, j.whatIdo, j.whatILearned].join(' ').toLowerCase();
    if (searchable.includes(q)) {
      results.push({
        category: 'journey',
        title: j.phase,
        subtitle: j.summary,
        tags: [],
        appId: 'journey',
      });
    }
  });

  // Search incidents
  incidents.forEach((inc) => {
    const searchable = [
      inc.title,
      inc.problem,
      inc.rootCause,
      inc.resolution,
      inc.lesson,
      ...inc.tags,
    ].join(' ').toLowerCase();
    if (searchable.includes(q)) {
      results.push({
        category: 'incidents',
        title: inc.title,
        subtitle: inc.problem.slice(0, 100) + '...',
        tags: inc.tags,
        appId: 'incidents',
      });
    }
  });

  // Search profile
  const profileSearchable = [profile.name, profile.role, profile.bio, ...profile.focus].join(' ').toLowerCase();
  if (profileSearchable.includes(q)) {
    results.push({
      category: 'profile',
      title: profile.name,
      subtitle: `${profile.role} · ${profile.location}`,
      tags: profile.focus,
      appId: 'about',
    });
  }

  return results;
}

export default function SearchApp({ onOpenApp }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSearch = useCallback((value) => {
    setQuery(value);
    const r = searchAll(value);
    setResults(r);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onOpenApp(results[selectedIndex].appId);
    } else if (e.key === 'Escape') {
      setQuery('');
      setResults([]);
    }
  }, [results, selectedIndex, onOpenApp]);

  const groupedResults = {};
  results.forEach((r) => {
    if (!groupedResults[r.category]) groupedResults[r.category] = [];
    groupedResults[r.category].push(r);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Search input */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--os-border)',
        background: 'var(--os-surface-raised)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FiSearch size={16} color="var(--os-text-dim)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search SmithOS..."
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--os-text)',
              fontSize: 15,
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <span style={{ fontSize: 12, color: 'var(--os-text-dim)' }}>
              {results.length} result{results.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }} className="os-scrollbar">
        {!query ? (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <FiSearch size={32} style={{ opacity: 0.2, marginBottom: 12 }} />
            <div style={{ color: 'var(--os-text-dim)', fontSize: 14 }}>
              Search across projects, skills, experience, journey, and incidents
            </div>
            <div style={{ color: 'var(--os-text-dim)', fontSize: 12, marginTop: 8 }}>
              Try: "docker", "react", "authentication", "backend"
            </div>
          </div>
        ) : results.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ color: 'var(--os-text-dim)', fontSize: 14 }}>
              No results found for "{query}"
            </div>
            <div style={{ color: 'var(--os-text-dim)', fontSize: 12, marginTop: 8 }}>
              Try different keywords or check spelling
            </div>
          </div>
        ) : (
          Object.entries(groupedResults).map(([category, items]) => {
            const cat = searchCategories.find((c) => c.id === category) ||
              { label: category.toUpperCase(), icon: FiUser, color: 'var(--os-text-muted)' };
            const CatIcon = cat.icon;
            let globalIndex = results.indexOf(items[0]);

            return (
              <div key={category} style={{ marginBottom: 8 }}>
                <div style={{
                  padding: '6px 20px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: cat.color,
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <CatIcon size={12} />
                  {cat.label}
                </div>
                {items.map((result) => {
                  const isSelected = globalIndex === selectedIndex;
                  return (
                    <div
                      key={result.title}
                      onClick={() => onOpenApp(result.appId)}
                      style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(56,189,248,0.08)' : 'transparent',
                        borderLeft: isSelected ? '2px solid var(--os-accent)' : '2px solid transparent',
                        transition: 'all 0.1s',
                      }}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--os-text)' }}>
                        {result.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--os-text-muted)', marginTop: 2 }}>
                        {result.subtitle}
                      </div>
                      {result.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                          {result.tags.slice(0, 4).map((tag) => (
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
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
