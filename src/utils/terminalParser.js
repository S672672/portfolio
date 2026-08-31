import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { skillCategories } from '../data/skills';
import { journey } from '../data/journey';
import { profile } from '../data/profile';

function normalize(input) {
  return input.toLowerCase().trim().replace(/[?!.,]/g, '');
}

function findProject(name) {
  const n = name.toLowerCase().trim();
  return projects.find(
    (p) =>
      p.title.toLowerCase().includes(n) ||
      p.id.toLowerCase().includes(n) ||
      p.folder.toLowerCase().includes(n)
  );
}

export function parseNaturalLanguage(input) {
  const text = normalize(input);

  // Technology queries
  const techPatterns = [
    /what technologies?.*used.*in (.+)/,
    /what.*tech.*(.+)/,
    /technologies?.*for (.+)/,
    /tech stack.*(.+)/,
    /built with.*(.+)/,
    /what.*(.+) use/,
  ];
  for (const pat of techPatterns) {
    const m = text.match(pat);
    if (m) {
      const proj = findProject(m[1]);
      if (proj) {
        return `Technologies used in ${proj.title}:\n\n${proj.technologies.map((t) => `  - ${t}`).join('\n')}`;
      }
    }
  }

  // Tell me about
  const aboutPatterns = [/tell me about (.+)/, /what is (.+)/, /who is (.+)/, /describe (.+)/];
  for (const pat of aboutPatterns) {
    const m = text.match(pat);
    if (m) {
      const entity = m[1].trim();
      if (entity.includes('smith') || entity.includes('profile')) {
        return `Name: ${profile.name}\nRole: ${profile.role}\nLocation: ${profile.location}\n\n${profile.bio}`;
      }
      const proj = findProject(entity);
      if (proj) {
        return `${proj.title}\n\n${proj.readme.overview}\n\nTechnologies: ${proj.technologies.join(', ')}`;
      }
    }
  }

  // What makes X special/interesting
  if (text.includes('special') || text.includes('interesting') || text.includes('standout') || text.includes('highlight')) {
    for (const proj of projects) {
      if (text.includes(proj.title.toLowerCase()) || text.includes(proj.id)) {
        return `What makes ${proj.title} interesting:\n\n${proj.readme.interesting}\n\nHighlights:\n${proj.highlights.map((h) => `  - ${h}`).join('\n')}`;
      }
    }
  }

  // Projects
  const projectPatterns = [/what projects/, /show.*projects/, /list.*projects/, /which projects/];
  for (const pat of projectPatterns) {
    if (pat.test(text)) {
      return `Projects:\n\n${projects.map((p) => `  ${p.title}\n    ${p.readme.overview}\n`).join('\n')}`;
    }
  }

  // Experience
  if (text.includes('experience') || text.includes('work') || text.includes('job') || text.includes('career')) {
    if (text.includes('backend')) {
      return `Backend Experience:\n\n${experience
        .map((e) => `${e.role} at ${e.company} (${e.period})\n${e.whatIDid.map((d) => `  - ${d}`).join('\n')}`)
        .join('\n\n')}`;
    }
    return `Experience:\n\n${experience
      .map((e) => `${e.role} at ${e.company} (${e.period})\n${e.whatIDid.map((d) => `  - ${d}`).join('\n')}`)
      .join('\n\n')}`;
  }

  // Skills
  if (text.includes('skill') || text.includes('technology') || text.includes('technologies') || text.includes('know') || text.includes('learn')) {
    if (text.includes('currently') || text.includes('learning') || text.includes('exploring')) {
      const cat = skillCategories.exploring;
      return `Currently Exploring:\n\n${cat.skills.map((s) => `  - ${s.name}: ${s.usedIn.join(', ')}`).join('\n')}`;
    }
    let result = 'Skills:\n\n';
    for (const [, cat] of Object.entries(skillCategories)) {
      result += `${cat.label}:\n${cat.skills.map((s) => `  - ${s.name}`).join('\n')}\n\n`;
    }
    return result.trim();
  }

  // Journey
  if (text.includes('journey') || text.includes('path') || text.includes('story') || text.includes('progression')) {
    return `My Journey:\n\n${journey.map((j) => `${j.icon} ${j.phase}\n  ${j.summary}`).join('\n\n')}`;
  }

  // Challenges
  if (text.includes('challenge') || text.includes('difficulty') || text.includes('problem')) {
    for (const proj of projects) {
      if (text.includes(proj.title.toLowerCase()) || text.includes(proj.id)) {
        return `Challenges in ${proj.title}:\n\n${proj.challenges.map((c) => `Challenge: ${c.challenge}\nApproach: ${c.approach}`).join('\n\n')}`;
      }
    }
    return 'Which project would you like to know the challenges for? Try: challenges in pet adopt';
  }

  // What did you learn
  if (text.includes('learn') && (text.includes('from') || text.includes('about'))) {
    for (const proj of projects) {
      if (text.includes(proj.title.toLowerCase()) || text.includes(proj.id)) {
        return `What I learned from ${proj.title}:\n\n${proj.learned.map((l) => `  - ${l}`).join('\n')}`;
      }
    }
  }

  return null;
}
