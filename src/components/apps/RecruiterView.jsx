import React from 'react';
import { profile } from '../../data/profile';
import { experience } from '../../data/experience';
import { skillCategories } from '../../data/skills';
import { projects } from '../../data/projects';
import { FiX, FiGithub, FiExternalLink, FiMail } from 'react-icons/fi';

export default function RecruiterView({ onClose }) {
  const allSkills = Object.values(skillCategories).flatMap((c) => c.skills.map((s) => s.name));

  return (
    <div className="recruiter-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ background: 'rgba(8, 11, 18, 0.5)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
    >
      <div className="recruiter-card os-scrollbar">
        {/* Close button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: -8 }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--os-border)',
              color: 'var(--os-text-dim)',
              padding: 6,
              borderRadius: 6,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--os-accent)'; e.currentTarget.style.color = 'var(--os-accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--os-border)'; e.currentTarget.style.color = 'var(--os-text-dim)'; }}
          >
            <FiX size={14} /> Close
          </button>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32, marginTop: 8 }}>
          <img
            src="/smithimg.jpg"
            alt={profile.name}
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--os-accent)', marginBottom: 12, display: 'block', margin: '0 auto' }}
          />
          <h2 style={{ fontSize: 24, margin: 0, color: 'var(--os-text)' }}>{profile.name}</h2>
          <div style={{ color: 'var(--os-accent)', fontSize: 16, marginTop: 4 }}>{profile.role}</div>
          <div style={{ color: 'var(--os-text-dim)', fontSize: 13, marginTop: 4 }}>{profile.location}</div>
        </div>

        {/* Bio */}
        <div style={{ padding: 16, background: 'rgba(56,189,248,0.05)', borderRadius: 8, border: '1px solid var(--os-border)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--os-text-muted)', margin: 0 }}>
            {profile.tagline} I am an early-career software engineer who enjoys building things, solving problems, exploring systems, and continuously learning.
          </p>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, color: 'var(--os-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--os-border)' }}>
            Experience
          </h3>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{exp.role}</span>
                  <span style={{ color: 'var(--os-orange)', fontSize: 13, marginLeft: 8 }}>{exp.company}</span>
                </div>
                <span style={{ color: 'var(--os-text-dim)', fontSize: 12 }}>{exp.period}</span>
              </div>
              <div style={{ marginTop: 4 }}>
                {exp.whatIDid.map((item, j) => (
                  <div key={j} style={{ fontSize: 12, color: 'var(--os-text-muted)', paddingLeft: 12, borderLeft: '2px solid var(--os-border)', marginBottom: 2 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Projects */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, color: 'var(--os-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--os-border)' }}>
            Key Projects
          </h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: '1px solid var(--os-border)', borderRadius: 8 }}>
                <img src={p.image} alt={p.title} style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--os-text-dim)' }}>{p.readme.overview.slice(0, 80)}...</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--os-text-dim)' }}><FiGithub size={13} /></a>}
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--os-text-dim)' }}><FiExternalLink size={13} /></a>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, color: 'var(--os-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--os-border)' }}>
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

        {/* Contact */}
        <div style={{ textAlign: 'center', paddingTop: 16, borderTop: '1px solid var(--os-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                background: 'var(--os-accent)',
                color: 'var(--os-bg)',
                border: 'none',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'opacity 0.2s',
              }}
            >
              <FiMail size={14} /> Contact via LinkedIn
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                background: 'transparent',
                color: 'var(--os-text-muted)',
                border: '1px solid var(--os-border)',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 13,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--os-accent)'; e.currentTarget.style.color = 'var(--os-accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--os-border)'; e.currentTarget.style.color = 'var(--os-text-muted)'; }}
            >
              <FiGithub size={14} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
