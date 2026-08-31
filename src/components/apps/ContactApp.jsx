import React, { useState } from 'react';
import { contactConfig, contactLinks } from '../../data/contact';
import { useIsMobile } from '../../hooks/useIsMobile';
import { FiGithub, FiLinkedin, FiFacebook, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  facebook: FiFacebook,
  twitter: FiTwitter,
  instagram: FiInstagram,
};

export default function ContactApp() {
  const isMobile = useIsMobile();
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [progress, setProgress] = useState(0);
  const [resultMsg, setResultMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('subject', formData.subject || 'Contact from SmithOS');
      fd.append('message', formData.message);
      fd.append('access_key', contactConfig.accessKey);

      const response = await fetch(contactConfig.endpoint, {
        method: 'POST',
        body: fd,
      });

      const data = await response.json();
      clearInterval(progressInterval);
      setProgress(100);

      if (data.success) {
        setTimeout(() => {
          setFormState('success');
          setResultMsg('Message successfully transmitted.');
        }, 300);
      } else {
        setFormState('error');
        setResultMsg('Transmission failed. Please try again.');
      }
    } catch (error) {
      clearInterval(progressInterval);
      setFormState('error');
      setResultMsg('Connection error. Please try again later.');
    }
  };

  const resetForm = () => {
    setFormState('idle');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setProgress(0);
    setResultMsg('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100%' }}>
      {/* Form section */}
      <div style={{ flex: 1, padding: 24, overflow: 'auto' }} className="os-scrollbar">
        {/* CTA Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
          }}>
            <FiMail size={14} color="var(--os-accent)" />
            <span style={{
              color: 'var(--os-text-dim)', fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, letterSpacing: '0.5px',
            }}>
              NEW_CONNECTION
            </span>
          </div>
          <div style={{
            fontSize: 18, fontWeight: 700, color: 'var(--os-text)',
            fontFamily: 'Inter, sans-serif', marginBottom: 4,
          }}>
            Have a system worth building?
          </div>
          <div style={{
            fontSize: 13, color: 'var(--os-text-secondary)',
            fontFamily: 'Inter, sans-serif', lineHeight: 1.5,
          }}>
            Let's discuss architecture, infrastructure, or engineering challenges.
          </div>
        </div>

        {formState === 'idle' && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block', fontSize: 11, color: 'var(--os-purple)',
                marginBottom: 6, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.3px',
              }}>
                identity.name
              </label>
              <input
                type="text"
                name="name"
                className="connection-input"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-label="Your name"
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block', fontSize: 11, color: 'var(--os-purple)',
                marginBottom: 6, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.3px',
              }}>
                identity.email
              </label>
              <input
                type="email"
                name="email"
                className="connection-input"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                aria-label="Your email"
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block', fontSize: 11, color: 'var(--os-purple)',
                marginBottom: 6, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.3px',
              }}>
                connection.subject
              </label>
              <input
                type="text"
                name="subject"
                className="connection-input"
                placeholder="Subject (optional)"
                value={formData.subject}
                onChange={handleChange}
                aria-label="Subject"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block', fontSize: 11, color: 'var(--os-purple)',
                marginBottom: 6, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.3px',
              }}>
                message.payload
              </label>
              <textarea
                name="message"
                className="connection-input"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={{ resize: 'vertical', minHeight: 100 }}
                aria-label="Your message"
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%', padding: '12px 20px',
                background: 'var(--os-accent)', color: 'var(--os-bg)',
                border: 'none', borderRadius: 6,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.5px', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              ESTABLISH CONNECTION
            </button>
          </form>
        )}

        {formState === 'sending' && (
          <div style={{ padding: '30px 0', textAlign: 'center' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
              color: 'var(--os-text)', marginBottom: 16,
            }}>
              Initializing connection...
            </div>
            <div style={{
              background: 'var(--os-surface-raised)', borderRadius: 4,
              height: 24, overflow: 'hidden', marginBottom: 16,
            }}>
              <div
                style={{
                  height: '100%', width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--os-accent-dim), var(--os-accent))',
                  transition: 'width 0.1s linear',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600,
                  color: progress > 30 ? 'white' : 'var(--os-accent)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {progress}%
              </div>
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: 'var(--os-text-muted)', textAlign: 'left',
            }}>
              {progress > 20 && <div style={{ color: 'var(--os-green)' }}>✓ Identity verified</div>}
              {progress > 50 && <div style={{ color: 'var(--os-green)' }}>✓ Message packaged</div>}
              {progress > 80 && <div style={{ color: 'var(--os-green)' }}>✓ Connection established</div>}
            </div>
          </div>
        )}

        {formState === 'success' && (
          <div style={{ padding: '30px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
              color: 'var(--os-success)', marginBottom: 8,
            }}>
              {resultMsg}
            </div>
            <div style={{
              fontSize: 13, color: 'var(--os-text-muted)', marginBottom: 20,
              fontFamily: 'Inter, sans-serif',
            }}>
              Thank you for reaching out. I will get back to you soon.
            </div>
            <button
              onClick={resetForm}
              style={{
                padding: '8px 20px', background: 'transparent',
                border: '1px solid var(--os-border)',
                color: 'var(--os-text-muted)', borderRadius: 6,
                cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = 'var(--os-accent)'; e.target.style.color = 'var(--os-accent)'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'var(--os-border)'; e.target.style.color = 'var(--os-text-muted)'; }}
            >
              Send Another
            </button>
          </div>
        )}

        {formState === 'error' && (
          <div style={{ padding: '30px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✕</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
              color: 'var(--os-error)', marginBottom: 8,
            }}>
              {resultMsg}
            </div>
            <button
              onClick={resetForm}
              style={{
                padding: '8px 20px', background: 'transparent',
                border: '1px solid var(--os-border)',
                color: 'var(--os-text-muted)', borderRadius: 6,
                cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = 'var(--os-accent)'; e.target.style.color = 'var(--os-accent)'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'var(--os-border)'; e.target.style.color = 'var(--os-text-muted)'; }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Social links */}
      <div
        style={{
          width: isMobile ? '100%' : 180,
          borderLeft: isMobile ? 'none' : '1px solid var(--os-border)',
          borderTop: isMobile ? '1px solid var(--os-border)' : 'none',
          background: 'var(--os-surface-raised)',
          padding: isMobile ? '16px 20px' : 20,
          display: 'flex', flexDirection: isMobile ? 'row' : 'column',
          gap: isMobile ? 12 : 8,
          flexWrap: 'wrap',
          alignItems: isMobile ? 'center' : 'flex-start',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}
      >
        <div style={{
          fontSize: 10, color: 'var(--os-text-dim)',
          textTransform: 'uppercase', letterSpacing: '1px',
          marginBottom: 8,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {isMobile ? 'CONNECT' : 'Connect'}
        </div>
        {Object.entries(contactLinks).map(([platform, url]) => {
          const Icon = socialIcons[platform];
          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: isMobile ? 0 : 8,
                padding: isMobile ? '10px' : '8px 10px',
                color: 'var(--os-text-muted)',
                textDecoration: 'none', fontSize: 12, borderRadius: 6,
                transition: 'all 0.15s',
                textTransform: isMobile ? 'none' : 'capitalize',
                fontFamily: 'Inter, sans-serif',
                background: isMobile ? 'rgba(56,189,248,0.05)' : 'transparent',
                border: isMobile ? '1px solid var(--os-border)' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(56,189,248,0.08)';
                e.currentTarget.style.color = 'var(--os-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isMobile ? 'rgba(56,189,248,0.05)' : 'transparent';
                e.currentTarget.style.color = 'var(--os-text-muted)';
              }}
              title={platform}
            >
              {Icon && <Icon size={16} />}
              {!isMobile && platform}
            </a>
          );
        })}
      </div>
    </div>
  );
}
