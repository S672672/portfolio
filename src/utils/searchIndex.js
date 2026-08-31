import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { skillCategories } from '../data/skills';
import { journey } from '../data/journey';
import { incidents } from '../data/incidents';
import { profile } from '../data/profile';

// ─── Minimum relevance threshold ─────────────────────────────────
const MIN_SCORE = 0.15;

// ─── Section-level intent keywords ───────────────────────────────
const sectionIntents = {
  experience: { keywords: ['experience', 'work', 'job', 'jobs', 'career', 'employment', 'position', 'positions', 'worked', 'company', 'intern', 'internship'], section: 'experience' },
  projects:   { keywords: ['projects', 'project', 'portfolio', 'built', 'built', 'apps', 'application', 'applications', 'repository', 'repos'], section: 'projects' },
  skills:     { keywords: ['skills', 'skill', 'technologies', 'tech stack', 'tools', 'proficiencies', 'abilities'], section: 'skills' },
  contact:    { keywords: ['contact', 'contact me', 'reach', 'reach out', 'email', 'message', 'connect', 'linkedin', 'github link', 'social'], section: 'contact' },
  about:      { keywords: ['about', 'about me', 'who', 'who is', 'profile', 'bio', 'introduction', 'overview', 'overview'], section: 'about' },
  journey:    { keywords: ['journey', 'timeline', 'path', 'story', 'progression', 'history', 'growth'], section: 'journey' },
  incidents:  { keywords: ['incidents', 'incident', 'bugs', 'debugging', 'problems', 'resolutions', 'postmortem'], section: 'incidents' },
};

// ─── Build the search index ──────────────────────────────────────
function buildIndex() {
  const items = [];

  // Projects
  projects.forEach((p) => {
    items.push({
      id: `project-${p.id}`,
      title: p.title,
      category: 'PROJECT',
      section: 'projects',
      subtitle: p.readme.overview.slice(0, 120),
      tags: p.technologies.slice(0, 4),
      appId: 'projects',
      color: 'var(--os-accent)',
      keywords: [
        p.title.toLowerCase(),
        p.id.toLowerCase(),
        p.folder.toLowerCase(),
        ...p.technologies.map(t => t.toLowerCase()),
        ...p.highlights.map(h => h.toLowerCase()),
        p.readme.overview.toLowerCase(),
        p.readme.problem.toLowerCase(),
      ],
      content: `${p.title} ${p.readme.overview} ${p.technologies.join(' ')} ${p.highlights.join(' ')}`.toLowerCase(),
    });
  });

  // Experience
  experience.forEach((e) => {
    items.push({
      id: `exp-${e.id}`,
      title: e.role,
      category: 'EXPERIENCE',
      section: 'experience',
      subtitle: `${e.company} · ${e.period}`,
      tags: [e.period],
      appId: 'experience',
      color: 'var(--os-orange)',
      extra: e.company,
      keywords: [
        e.role.toLowerCase(),
        e.company.toLowerCase(),
        e.id.toLowerCase(),
        ...e.whatIDid.map(d => d.toLowerCase()),
        ...e.whatILearned.map(l => l.toLowerCase()),
        ...e.keyContributions.map(c => c.toLowerCase()),
      ],
      content: `${e.role} ${e.company} ${e.period} ${e.whatIDid.join(' ')} ${e.whatILearned.join(' ')}`.toLowerCase(),
    });
  });

  // Skills
  Object.entries(skillCategories).forEach(([, cat]) => {
    cat.skills.forEach((skill) => {
      items.push({
        id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: skill.name,
        category: 'SKILL',
        section: 'skills',
        subtitle: cat.label,
        tags: skill.usedIn.slice(0, 3),
        appId: 'skills',
        color: 'var(--os-success)',
        keywords: [
          skill.name.toLowerCase(),
          cat.label.toLowerCase(),
          ...skill.usedIn.map(u => u.toLowerCase()),
        ],
        content: `${skill.name} ${cat.label} ${skill.usedIn.join(' ')}`.toLowerCase(),
      });
    });
  });

  // Journey
  journey.forEach((j) => {
    items.push({
      id: `journey-${j.id}`,
      title: j.phase,
      category: 'JOURNEY',
      section: 'journey',
      subtitle: j.summary,
      tags: [],
      appId: 'journey',
      color: 'var(--os-purple)',
      keywords: [
        j.phase.toLowerCase(),
        j.id.toLowerCase(),
        j.summary.toLowerCase(),
        j.whatIdo.toLowerCase(),
        j.whatILearned.toLowerCase(),
      ],
      content: `${j.phase} ${j.summary} ${j.whatIdo} ${j.whatILearned}`.toLowerCase(),
    });
  });

  // Incidents
  incidents.forEach((inc) => {
    items.push({
      id: `incident-${inc.id}`,
      title: inc.title,
      category: 'INCIDENT',
      section: 'incidents',
      subtitle: inc.problem.slice(0, 100),
      tags: inc.tags,
      appId: 'incidents',
      color: 'var(--os-pink)',
      keywords: [
        inc.title.toLowerCase(),
        inc.id.toLowerCase(),
        inc.problem.toLowerCase(),
        inc.lesson.toLowerCase(),
        ...inc.tags.map(t => t.toLowerCase()),
      ],
      content: `${inc.title} ${inc.problem} ${inc.lesson} ${inc.tags.join(' ')}`.toLowerCase(),
    });
  });

  // Profile (about)
  items.push({
    id: 'profile-overview',
    title: profile.name,
    category: 'PROFILE',
    section: 'about',
    subtitle: `${profile.role} · ${profile.location}`,
    tags: profile.focus,
    appId: 'about',
    color: 'var(--os-text-secondary)',
    keywords: [
      profile.name.toLowerCase(),
      profile.role.toLowerCase(),
      profile.location.toLowerCase(),
      'about',
      ...profile.focus.map(f => f.toLowerCase()),
    ],
    content: `${profile.name} ${profile.role} ${profile.bio} ${profile.about}`.toLowerCase(),
  });

  return items;
}

let _index = null;
function getIndex() {
  if (!_index) _index = buildIndex();
  return _index;
}

// ─── Scoring algorithm ───────────────────────────────────────────
function scoreItem(item, queryLower, queryTokens, sectionBoost) {
  let score = 0;
  const titleLower = item.title.toLowerCase();

  // 1. Exact title match — highest priority
  if (titleLower === queryLower) {
    score += 10;
  }
  // Title starts with query
  else if (titleLower.startsWith(queryLower)) {
    score += 7;
  }
  // Title contains query as whole word
  else if (titleLower.includes(queryLower)) {
    score += 5;
  }

  // 2. Section/intent boost
  if (sectionBoost && item.section === sectionBoost) {
    score += 6;
  }

  // 3. Exact keyword match
  for (const kw of item.keywords) {
    if (kw === queryLower) {
      score += 4;
      break;
    }
    if (kw.startsWith(queryLower)) {
      score += 3;
      break;
    }
    if (kw.includes(queryLower)) {
      score += 2;
      break;
    }
  }

  // 4. Token-based matching (for multi-word queries)
  if (queryTokens.length > 1) {
    let tokenHits = 0;
    for (const token of queryTokens) {
      if (token.length < 2) continue;
      for (const kw of item.keywords) {
        if (kw.includes(token)) {
          tokenHits++;
          break;
        }
      }
    }
    score += (tokenHits / queryTokens.length) * 2;
  }

  // 5. Content match (weaker)
  if (item.content.includes(queryLower)) {
    score += 1;
  }

  // 6. Extra field match (company names etc.)
  if (item.extra && item.extra.toLowerCase().includes(queryLower)) {
    score += 2;
  }

  // Penalty if query has no significant overlap
  if (score === 0) return 0;

  return score;
}

// ─── Main search function ────────────────────────────────────────
export function search(query) {
  if (!query || !query.trim()) return [];

  const queryLower = query.toLowerCase().trim();
  const queryTokens = queryLower.split(/\s+/).filter(t => t.length >= 2);
  const index = getIndex();

  // Detect section-level intent
  let sectionBoost = null;
  for (const [, intent] of Object.entries(sectionIntents)) {
    if (intent.keywords.includes(queryLower)) {
      sectionBoost = intent.section;
      break;
    }
  }

  // Score all items
  const scored = [];
  for (const item of index) {
    const score = scoreItem(item, queryLower, queryTokens, sectionBoost);
    if (score >= MIN_SCORE) {
      scored.push({ ...item, score });
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  return scored;
}

// ─── Group results by category ───────────────────────────────────
export function searchGrouped(query) {
  const results = search(query);
  const groups = {};
  const categoryOrder = ['PROFILE', 'EXPERIENCE', 'PROJECT', 'SKILL', 'JOURNEY', 'INCIDENT'];

  for (const r of results) {
    if (!groups[r.category]) groups[r.category] = [];
    groups[r.category].push(r);
  }

  // Return in priority order
  const ordered = [];
  for (const cat of categoryOrder) {
    if (groups[cat]) {
      ordered.push({ category: cat, items: groups[cat] });
    }
  }

  return ordered;
}

// ─── Category metadata ───────────────────────────────────────────
export const searchCategories = {
  PROFILE:   { label: 'PROFILE', color: 'var(--os-text-secondary)' },
  EXPERIENCE:{ label: 'EXPERIENCE', color: 'var(--os-orange)' },
  PROJECT:   { label: 'PROJECT', color: 'var(--os-accent)' },
  SKILL:     { label: 'SKILL', color: 'var(--os-success)' },
  JOURNEY:   { label: 'JOURNEY', color: 'var(--os-purple)' },
  INCIDENT:  { label: 'INCIDENT', color: 'var(--os-pink)' },
};

// ─── Highlight matching text ─────────────────────────────────────
// Returns { before, match, after } for React rendering in .jsx files
export function getHighlightParts(text, query) {
  if (!query) return { before: text, match: '', after: '' };
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return { before: text, match: '', after: '' };
  return {
    before: text.slice(0, idx),
    match: text.slice(idx, idx + query.length),
    after: text.slice(idx + query.length),
  };
}
