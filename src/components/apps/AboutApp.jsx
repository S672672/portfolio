import React, { useState } from 'react';
import { profile } from '../../data/profile';
import { experience } from '../../data/experience';

export default function AboutApp() {
  const [tab, setTab] = useState('profile');

  return (
    <div style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--os-border)', background: 'var(--os-surface-raised)' }}>
        {['profile', 'about', 'experience'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 20px',
              background: tab === t ? 'var(--os-surface)' : 'transparent',
              border: 'none',
              borderBottom: tab === t ? '2px solid var(--os-accent)' : '2px solid transparent',
              color: tab === t ? 'var(--os-accent)' : 'var(--os-text-muted)',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'capitalize',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {t === 'profile' ? 'profile.config' : t === 'about' ? 'about.md' : 'experience.dir'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }} className="os-scrollbar">
        {tab === 'profile' && (
          <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ color: 'var(--os-text-dim)', marginBottom: 16 }}>
              # user-profile.config
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '4px 16px' }}>
              <span style={{ color: 'var(--os-purple)' }}>name:</span>
              <span>{profile.name}</span>
              <span style={{ color: 'var(--os-purple)' }}>role:</span>
              <span>{profile.role}</span>
              <span style={{ color: 'var(--os-purple)' }}>location:</span>
              <span>{profile.location}</span>
              <span style={{ color: 'var(--os-purple)' }}>education:</span>
              <span>{profile.education}</span>
              <span style={{ color: 'var(--os-purple)' }}>focus:</span>
              <span />
              {profile.focus.map((f, i) => (
                <React.Fragment key={i}>
                  <span style={{ color: 'var(--os-text-dim)' }}>{i === 0 ? '  -' : '  -'}</span>
                  <span>{f}</span>
                </React.Fragment>
              ))}
            </div>

            <div style={{ marginTop: 24, padding: 16, background: 'rgba(56,189,248,0.05)', borderRadius: 8, border: '1px solid var(--os-border)' }}>
              <div style={{ color: 'var(--os-accent)', fontSize: 12, marginBottom: 8, fontWeight: 600 }}>
                CONNECT
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {Object.entries(profile.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--os-accent)',
                      textDecoration: 'none',
                      fontSize: 12,
                      padding: '4px 10px',
                      border: '1px solid var(--os-border)',
                      borderRadius: 4,
                      textTransform: 'capitalize',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = 'var(--os-accent)';
                      e.target.style.background = 'rgba(56,189,248,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'var(--os-border)';
                      e.target.style.background = 'transparent';
                    }}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'about' && (
          <div style={{ lineHeight: 1.8, fontSize: 14, color: 'var(--os-text)' }}>
            <div style={{ color: 'var(--os-text-dim)', marginBottom: 12, fontFamily: 'monospace', fontSize: 12 }}>
              # about.md
            </div>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ color: 'var(--os-accent)', fontSize: 16, marginBottom: 8 }}>
                What I do?
              </h3>
              <p>{profile.bio}</p>
            </div>
            <div>
              <h3 style={{ color: 'var(--os-accent)', fontSize: 16, marginBottom: 8 }}>
                Who I am
              </h3>
              {profile.about.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: 12 }}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {tab === 'experience' && (
          <div style={{ fontSize: 14 }}>
            <div style={{ color: 'var(--os-text-dim)', marginBottom: 16, fontFamily: 'monospace', fontSize: 12 }}>
              # experience/
            </div>
            {experience.map((exp, i) => (
              <div
                key={exp.id}
                style={{
                  padding: 16,
                  border: '1px solid var(--os-border)',
                  borderRadius: 8,
                  marginBottom: 12,
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--os-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--os-border)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--os-text)' }}>{exp.role}</div>
                    <div style={{ color: 'var(--os-orange)', fontSize: 13, marginTop: 2 }}>{exp.company}</div>
                  </div>
                  <span style={{ color: 'var(--os-accent)', fontSize: 12, fontWeight: 500 }}>{exp.period}</span>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ color: 'var(--os-text-muted)', fontSize: 12, marginBottom: 6, fontWeight: 600 }}>WHAT I DID</div>
                  {exp.whatIDid.map((item, j) => (
                    <div key={j} style={{ color: 'var(--os-text)', fontSize: 13, marginBottom: 4, paddingLeft: 12, borderLeft: '2px solid var(--os-border)' }}>
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ color: 'var(--os-text-muted)', fontSize: 12, marginBottom: 6, fontWeight: 600 }}>WHAT I LEARNED</div>
                  {exp.whatILearned.map((item, j) => (
                    <div key={j} style={{ color: 'var(--os-text)', fontSize: 13, marginBottom: 4, paddingLeft: 12, borderLeft: '2px solid var(--os-green)' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
