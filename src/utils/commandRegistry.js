import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { skillCategories } from '../data/skills';
import { journey } from '../data/journey';
import { profile } from '../data/profile';
import { contactLinks } from '../data/contact';
import { incidents } from '../data/incidents';

// Virtual filesystem for cd/cat/ls
const filesystem = {
  '/': ['about', 'projects', 'experience', 'skills', 'journey', 'incidents', 'contact'],
  '/about': ['profile.md', 'about.md'],
  '/projects': projects.map((p) => p.folder.toLowerCase()),
  '/experience': experience.map((e) => e.id),
  '/skills': ['building-with.json', 'hands-on.json', 'exploring.json', 'interested-in.json'],
  '/incidents': incidents.map((inc) => inc.id + '.issue'),
  '/journey': ['timeline.md'],
  '/contact': ['links.json'],
};

function findProject(name) {
  const n = name.toLowerCase().trim();
  return projects.find(
    (p) =>
      p.title.toLowerCase().includes(n) ||
      p.id.toLowerCase().includes(n) ||
      p.folder.toLowerCase().includes(n)
  );
}

const commands = {
  help: {
    description: 'Show available commands',
    execute: () => {
      return `Available commands:

  help              Show this help message
  about             About Smith Bhattarai
  projects          List all projects
  experience        Show work experience
  skills            Show technical skills
  journey           Show career journey
  exploring         Currently exploring
  incidents         View incident reports
  contact           Show contact information
  resume            View resume information
  status            Current skill status
  find <keyword>    Search workspace
  neofetch          System info display
  man smith         Manual page
  fortune           Random dev quote
  clear             Clear the terminal
  ls                List current directory
  cd <dir>          Change directory
  cat <file>        Display file contents

  project <name>    Explore a specific project
    project <name> tech         Show technologies
    project <name> highlights   Show highlights
    project <name> challenges   Show challenges
    project <name> learn        Show learnings

  Easter eggs:
    sudo hire smith

  Keyboard shortcuts:
    Ctrl/Cmd + T    Open terminal
    Ctrl/Cmd + K    Quick navigation
    Escape          Close window
    Arrow Up/Down   Navigate command history`;
    },
  },

  about: {
    description: 'About Smith',
    execute: () => {
      return `USER PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  name:     ${profile.name}
  role:     ${profile.role}
  location: ${profile.location}
  focus:    ${profile.focus.join(', ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${profile.bio}`;
    },
  },

  projects: {
    description: 'List projects',
    execute: () => {
      return `PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${projects.map((p, i) => `  ${i + 1}. ${p.title}
     ${p.readme.overview}
     Tech: ${p.technologies.join(', ')}
     ${p.live ? `Live: ${p.live}` : ''}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use "project <name>" to explore a specific project.`;
    },
  },

  experience: {
    description: 'Show experience',
    execute: () => {
      return `EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${experience
  .map(
    (e) => `  ${e.role}
  ${e.company} | ${e.period}

  What I did:
${e.whatIDid.map((d) => `    - ${d}`).join('\n')}

  What I learned:
${e.whatILearned.map((l) => `    - ${l}`).join('\n')}`
  )
  .join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    },
  },

  skills: {
    description: 'Show skills',
    execute: () => {
      return `SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${Object.values(skillCategories)
  .map(
    (cat) =>
      `${cat.label.toUpperCase()}:
${cat.skills.map((s) => `  - ${s.name}  →  ${s.usedIn.join(', ')}`).join('\n')}`
  )
  .join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    },
  },

  journey: {
    description: 'Show journey',
    execute: () => {
      return `MY JOURNEY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${journey.map((j) => `${j.icon}  ${j.phase}

  ${j.summary}

  What I learned: ${j.whatILearned}
  ${j.id !== 'currently' ? `Next: ${j.influence}` : ''}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    },
  },

  exploring: {
    description: 'Currently exploring',
    execute: () => {
      const cat = skillCategories.exploring;
      const interested = skillCategories.interestedIn;
      return `CURRENTLY EXPLORING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${cat.label}:
${cat.skills.map((s) => `  - ${s.name}: ${s.usedIn.join(', ')}`).join('\n')}

${interested.label}:
${interested.skills.map((s) => `  - ${s.name}: ${s.usedIn.join(', ')}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    },
  },

  incidents: {
    description: 'View incident reports',
    execute: () => {
      return `INCIDENTS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${incidents.map((inc) => `${inc.icon} ${inc.title}\n  Status: ${inc.status}\n  Tags: ${inc.tags.join(', ')}`).join('\n\n')}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nOpen the Incidents folder for full reports.`;
    },
  },

  contact: {
    description: 'Show contact info',
    execute: () => {
      return `CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  GitHub:     ${contactLinks.github}
  LinkedIn:   ${contactLinks.linkedin}
  Facebook:   ${contactLinks.facebook}
  Twitter:    ${contactLinks.twitter}
  Instagram:  ${contactLinks.instagram}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Open the Contact window to send a message directly.`;
    },
  },

  resume: {
    description: 'View resume',
    execute: () => {
      return `RESUME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${profile.name}
  ${profile.role}

  EXPERIENCE:
${experience.map((e) => `  ${e.role} at ${e.company} (${e.period})`).join('\n')}

  SKILLS:
  ${Object.values(skillCategories)
    .flatMap((c) => c.skills.map((s) => s.name))
    .join(', ')}

  PROJECTS:
${projects.map((p) => `  - ${p.title}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    },
  },

  clear: {
    description: 'Clear terminal',
    execute: () => '__CLEAR__',
  },
};

// Process project-specific commands
function handleProjectCommand(args) {
  if (args.length === 0) {
    return commands.projects.execute();
  }

  const projectName = args[0];
  const subCommand = args[1];
  const proj = findProject(projectName);

  if (!proj) {
    return `Project "${projectName}" not found.\n\nAvailable projects:\n${projects.map((p) => `  - ${p.title}`).join('\n')}`;
  }

  if (!subCommand) {
    return `PROJECT: ${proj.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${proj.readme.overview}

PROBLEM:
${proj.readme.problem}

WHAT MAKES IT INTERESTING:
${proj.readme.interesting}

CONTRIBUTION:
${proj.readme.contribution}

TECHNOLOGIES: ${proj.technologies.join(', ')}

${proj.github ? `GitHub: ${proj.github}` : ''}
${proj.live ? `Live: ${proj.live}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sub-commands: tech, highlights, challenges, learn`;
  }

  switch (subCommand.toLowerCase()) {
    case 'tech':
      return `Technologies used in ${proj.title}:\n\n${proj.technologies.map((t) => `  - ${t}`).join('\n')}`;
    case 'highlights':
      return `Highlights of ${proj.title}:\n\n${proj.highlights.map((h) => `  - ${h}`).join('\n')}`;
    case 'challenges':
      return `Challenges in ${proj.title}:\n\n${proj.challenges.map((c) => `Challenge: ${c.challenge}\nApproach: ${c.approach}`).join('\n\n')}`;
    case 'learn':
    case 'learned':
      return `What I learned from ${proj.title}:\n\n${proj.learned.map((l) => `  - ${l}`).join('\n')}`;
    default:
      return `Unknown sub-command "${subCommand}".\nAvailable: tech, highlights, challenges, learn`;
  }
}

export function executeCommand(input, currentDir = '/') {
  const trimmed = input.trim();
  if (!trimmed) return { output: '', newDir: currentDir };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Easter eggs
  if (cmd === 'sudo' && args.join(' ') === 'hire smith') {
    return {
      output: `Access granted. Initiating hiring protocol...

  ✓ Resume downloaded
  ✓ Skills verified  
  ✓ Projects reviewed
  ✓ Experience confirmed

  Result: Smith is ready to contribute!

  Reach out through the Contact window or:
  ${profile.social.linkedin}`,
      newDir: currentDir,
    };
  }

  if (cmd === 'sudo' && args.join(' ') === 'hire') {
    return {
      output: 'Syntax: sudo hire smith',
      newDir: currentDir,
    };
  }

  if (cmd === 'whoami') {
    return { output: profile.name, newDir: currentDir };
  }

  if (cmd === 'date') {
    return { output: new Date().toLocaleString(), newDir: currentDir };
  }

  if (cmd === 'pwd') {
    return { output: currentDir, newDir: currentDir };
  }

  // find / search command
  if (cmd === 'find' || cmd === 'search') {
    if (args.length === 0) {
      return { output: 'Usage: find <keyword>\nExample: find docker', newDir: currentDir };
    }
    return { output: handleFind(args.join(' ')), newDir: currentDir };
  }

  // neofetch
  if (cmd === 'neofetch') {
    return { output: handleNeofetch(), newDir: currentDir };
  }

  // man smith
  if (cmd === 'man' && args[0] === 'smith') {
    return { output: handleManSmith(), newDir: currentDir };
  }

  // status
  if (cmd === 'status') {
    return { output: handleStatus(), newDir: currentDir };
  }

  // fortune
  if (cmd === 'fortune') {
    return { output: handleFortune(), newDir: currentDir };
  }

  // Project command
  if (cmd === 'project') {
    return { output: handleProjectCommand(args), newDir: currentDir };
  }

  // ls
  if (cmd === 'ls') {
    const dir = currentDir === '/' ? '/' : currentDir;
    const contents = filesystem[dir];
    if (contents) {
      return { output: contents.join('  '), newDir: currentDir };
    }
    return { output: `ls: cannot access '${dir}': No such directory`, newDir: currentDir };
  }

  // cd
  if (cmd === 'cd') {
    if (args.length === 0 || args[0] === '~') {
      return { output: '', newDir: '/' };
    }
    const target = args[0];
    let newPath;
    if (currentDir === '/') {
      newPath = `/${target}`;
    } else {
      newPath = `${currentDir}/${target}`;
    }
    if (filesystem[newPath]) {
      return { output: '', newDir: newPath };
    }
    return { output: `cd: no such directory: ${target}`, newDir: currentDir };
  }

  // cat
  if (cmd === 'cat') {
    if (args.length === 0) {
      return { output: 'cat: missing file operand', newDir: currentDir };
    }
    const filename = args[0].toLowerCase();
    return { output: handleCatFile(filename, currentDir), newDir: currentDir };
  }

  // Known commands
  if (commands[cmd]) {
    const output = commands[cmd].execute();
    return { output, newDir: currentDir };
  }

  return {
    output: `Command not recognized: ${cmd}\n\nTry:\n  help\n\nOr did you mean:\n  project ${cmd}`,
    newDir: currentDir,
  };
}

// === New command handlers ===

function handleFind(keyword) {
  const q = keyword.toLowerCase();
  let output = `Searching workspace for "${keyword}"...\n\nFOUND:\n`;
  let found = false;

  // Search projects
  projects.forEach((p) => {
    const searchable = [p.title, ...p.technologies, p.readme.overview, ...p.highlights].join(' ').toLowerCase();
    if (searchable.includes(q)) {
      output += `  \ud83d\udcc1 PROJECTS/${p.title}\n    ${p.readme.overview.slice(0, 80)}...\n\n`;
      found = true;
    }
  });

  // Search skills
  Object.entries(skillCategories).forEach(([, cat]) => {
    cat.skills.forEach((skill) => {
      const searchable = [skill.name, ...skill.usedIn].join(' ').toLowerCase();
      if (searchable.includes(q)) {
        output += `  \ud83d\udcca SKILLS/${skill.name}\n    ${cat.label} \u2022 ${skill.usedIn.join(', ')}\n\n`;
        found = true;
      }
    });
  });

  // Search experience
  experience.forEach((e) => {
    const searchable = [e.role, e.company, ...e.whatIDid, ...e.whatILearned].join(' ').toLowerCase();
    if (searchable.includes(q)) {
      output += `  \ud83d\udcbc EXPERIENCE/${e.company}\n    ${e.role} (${e.period})\n\n`;
      found = true;
    }
  });

  // Search incidents
  incidents.forEach((inc) => {
    const searchable = [inc.title, inc.problem, inc.lesson, ...inc.tags].join(' ').toLowerCase();
    if (searchable.includes(q)) {
      output += `  \u26a0\ufe0f INCIDENTS/${inc.title}\n    Status: ${inc.status}\n\n`;
      found = true;
    }
  });

  if (!found) {
    output += `  No results found for "${keyword}"`;
  }

  return output.trim();
}

function handleNeofetch() {
  const topSkills = Object.values(skillCategories)
    .flatMap((c) => c.skills.map((s) => s.name))
    .slice(0, 8)
    .join(', ');

  return `smith@portfolio\n\n  Role:           ${profile.role}\n  Location:       ${profile.location}\n  Education:      ${profile.education}\n  Projects:       ${projects.length}\n  Experience:     ${experience.length} position(s)\n  Incidents:      ${incidents.length} resolved\n\n  Focus:          ${profile.focus.join(' | ')}\n  Building With:  ${topSkills}\n\n  Shell:          SmithOS Terminal v1.0\n  Theme:          Dark / Sky Accent`;
}

function handleManSmith() {
  return `NAME\n       Smith Bhattarai \u2014 Software Engineer\n\nDESCRIPTION\n       Early-career software engineer interested in building software,
       solving problems, and exploring how systems work.\n\n       Strong interest in backend development, systems thinking,
       and DevOps practices.\n\nSYNOPSIS\n       whoami\n       about\n       projects\n       experience\n       journey\n       contact\n\nEXAMPLES\n       man smith\n           Display this manual page.\n\n       projects\n           List all projects.\n\n       project pet adopt\n           Explore a specific project.\n\n       find docker\n           Search workspace for "docker".\n\nSEE ALSO\n       projects, experience, journey, contact, status`;
}

function handleStatus() {
  const building = skillCategories.buildingWith.skills.map((s) => `  \u2022 ${s.name}`).join('\n');
  const handsOn = skillCategories.handsOn.skills.map((s) => `  \u2022 ${s.name}`).join('\n');
  const exploring = skillCategories.exploring.skills.map((s) => `  \u2022 ${s.name}`).join('\n');
  const interested = skillCategories.interestedIn.skills.map((s) => `  \u2022 ${s.name}`).join('\n');

  return `CURRENT STATUS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nBUILDING WITH\n${building}\n\nHANDS-ON EXPERIENCE\n${handsOn}\n\nEXPLORING\n${exploring}\n\nINTERESTED IN\n${interested}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function handleFortune() {
  const fortunes = [
    `\"The best error message is the one that never shows up.\"\n   \u2014 Thomas Fuchs`,
    `\"First, solve the problem. Then, write the code.\"\n   \u2014 John Johnson`,
    `\"Talk is cheap. Show me the code.\"\n   \u2014 Linus Torvalds`,
    `\"Programs must be written for people to read.\"\n   \u2014 Harold Abelson`,
    `\"Any fool can write code that a computer can understand.\"\n   \u2014 Martin Fowler`,
    `\"The only way to learn a new programming language is by writing programs in it.\"\n   \u2014 Dennis Ritchie`,
    `\"Debugging is twice as hard as writing the code.\"\n   \u2014 Brian Kernighan`,
    `\"Simplicity is the soul of efficiency.\"\n   \u2014 Austin Freeman`,
  ];
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}

function handleCatFile(filename, currentDir) {
  if (filename === 'profile.md' || filename === 'about.md') {
    return commands.about.execute();
  }
  if (filename === 'timeline.md') {
    return commands.journey.execute();
  }
  if (filename === 'links.json') {
    return commands.contact.execute();
  }
  if (filename === 'readme.md') {
    // Try to find project in current directory
    for (const proj of projects) {
      if (currentDir.includes(proj.folder.toLowerCase())) {
        return `${proj.title}\n\n${proj.readme.overview}\n\n${proj.readme.problem}`;
      }
    }
    return 'cat: README.md not found in current directory';
  }
  if (filename === 'technologies.json') {
    for (const proj of projects) {
      if (currentDir.includes(proj.folder.toLowerCase())) {
        return JSON.stringify({ technologies: proj.technologies }, null, 2);
      }
    }
    return 'cat: technologies.json not found in current directory';
  }
  if (filename === 'highlights.md') {
    for (const proj of projects) {
      if (currentDir.includes(proj.folder.toLowerCase())) {
        return `Highlights:\n\n${proj.highlights.map((h) => `- ${h}`).join('\n')}`;
      }
    }
    return 'cat: highlights.md not found in current directory';
  }
  if (filename === 'challenges.md') {
    for (const proj of projects) {
      if (currentDir.includes(proj.folder.toLowerCase())) {
        return proj.challenges.map((c) => `Challenge: ${c.challenge}\nApproach: ${c.approach}`).join('\n\n');
      }
    }
    return 'cat: challenges.md not found in current directory';
  }
  if (filename === 'what-i-learned.md') {
    for (const proj of projects) {
      if (currentDir.includes(proj.folder.toLowerCase())) {
        return `What I learned:\n\n${proj.learned.map((l) => `- ${l}`).join('\n')}`;
      }
    }
    return 'cat: what-i-learned.md not found in current directory';
  }
  if (filename.startsWith('building-with') || filename.startsWith('hands-on') || filename.startsWith('exploring') || filename.startsWith('interested-in')) {
    return commands.skills.execute();
  }
  if (filename.endsWith('.issue')) {
    const incId = filename.replace('.issue', '');
    const inc = incidents.find((i) => i.id === incId);
    if (inc) {
      return `${inc.icon} ${inc.title}\nStatus: ${inc.status}\n\nPROBLEM:\n${inc.problem}\n\nROOT CAUSE:\n${inc.rootCause}\n\nRESOLUTION:\n${inc.resolution}\n\nLESSON:\n${inc.lesson}`;
    }
    return `cat: ${filename}: No such incident found`;
  }
  return `cat: ${filename}: No such file or directory`;
}

export { commands, findProject };
