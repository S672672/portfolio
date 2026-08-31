import React from 'react';
import { profile } from '../../data/profile';
import { experience } from '../../data/experience';
import { skillCategories } from '../../data/skills';
import { projects } from '../../data/projects';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function ResumeApp() {
  const allSkills = Object.values(skillCategories).flatMap((c) => c.skills.map((s) => s.name));

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      {/* Header */}
      <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--os-border)' }}>
        <h2 style={{ color: 'var(--os-accent)', fontSize: 22, margin: 0 }}>{profile.name}</h2>
        <div style={{ color: 'var(--os-text-muted)', fontSize: 14, marginTop: 4 }}>{profile.role}</div>
        <div style={{ color: 'var(--os-text-dim)', fontSize: 12, marginTop: 4 }}>{profile.location}</div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, color: 'var(--os-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>
          Experience
        </h3>
        {experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{exp.role}</div>
            <div style={{ color: 'var(--os-orange)', fontSize: 13 }}>{exp.company} · {exp.period}</div>
            <div style={{ marginTop: 6 }}>
              {exp.whatIDid.map((item, j) => (
                <div key={j} style={{ fontSize: 12, color: 'var(--os-text-muted)', marginBottom: 2, paddingLeft: 12, borderLeft: '2px solid var(--os-border)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, color: 'var(--os-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>
          Projects
        </h3>
        {projects.map((p) => (
          <div key={p.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={p.image} alt={p.title} style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{p.title}</div>
              <div style={{ fontSize: 11, color: 'var(--os-text-dim)' }}>{p.technologies.slice(0, 4).join(', ')}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--os-text-dim)' }}>
                  <FiGithub size={13} />
                </a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--os-text-dim)' }}>
                  <FiExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, color: 'var(--os-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>
          Technologies
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {allSkills.map((skill) => (
            <span
              key={skill}
              style={{
                padding: '4px 10px',
                background: 'rgba(56,189,248,0.08)',
                border: '1px solid var(--os-border)',
                borderRadius: 4,
                fontSize: 12,
                color: 'var(--os-text-muted)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 12 }}>
        {Object.entries(profile.social).slice(0, 3).map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--os-accent)',
              textDecoration: 'none',
              fontSize: 12,
              padding: '6px 12px',
              border: '1px solid var(--os-border)',
              borderRadius: 4,
              textTransform: 'capitalize',
              transition: 'all 0.15s',
            }}
          >
            {platform}
          </a>
        ))}
      </div>
    </div>
  );
}
