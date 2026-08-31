import React, { useState } from 'react';
import { contactConfig, contactLinks } from '../../data/contact';
import { FiGithub, FiLinkedin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  facebook: FiFacebook,
  twitter: FiTwitter,
  instagram: FiInstagram,
};

export default function ContactApp() {
  const [formState, setFormState] = useState('idle'); // idle, sending, success, error
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

    // Animate progress
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
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Form section */}
      <div style={{ flex: 1, padding: 24, overflow: 'auto' }} className="os-scrollbar">
        <div style={{ color: 'var(--os-text-dim)', fontFamily: 'monospace', fontSize: 12, marginBottom: 16 }}>
          # NEW_CONNECTION
        </div>

        {formState === 'idle' && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12, fontFamily: 'monospace', fontSize: 13, color: 'var(--os-green)' }}>
              $ establish_connection
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--os-purple)', marginBottom: 4, fontFamily: 'monospace' }}>
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

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--os-purple)', marginBottom: 4, fontFamily: 'monospace' }}>
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

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--os-purple)', marginBottom: 4, fontFamily: 'monospace' }}>
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

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--os-purple)', marginBottom: 4, fontFamily: 'monospace' }}>
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
                width: '100%',
                padding: '12px 20px',
                background: 'var(--os-accent)',
                color: 'var(--os-bg)',
                border: 'none',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'monospace',
                letterSpacing: '0.5px',
                transition: 'all 0.2s',
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
            <div style={{ fontFamily: 'monospace', fontSize: 14, color: 'var(--os-text)', marginBottom: 16 }}>
              Initializing connection...
            </div>
            <div style={{ background: 'var(--os-surface-raised)', borderRadius: 4, height: 24, overflow: 'hidden', marginBottom: 16 }}>
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--os-accent-dim), var(--os-accent))',
                  transition: 'width 0.1s linear',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: progress > 30 ? 'white' : 'var(--os-accent)',
                }}
              >
                {progress}%
              </div>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--os-text-muted)', textAlign: 'left' }}>
              {progress > 20 && <div style={{ color: 'var(--os-green)' }}>✓ Identity verified</div>}
              {progress > 50 && <div style={{ color: 'var(--os-green)' }}>✓ Message packaged</div>}
              {progress > 80 && <div style={{ color: 'var(--os-green)' }}>✓ Connection established</div>}
            </div>
          </div>
        )}

        {formState === 'success' && (
          <div style={{ padding: '30px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
            <div style={{ fontFamily: 'monospace', fontSize: 14, color: 'var(--os-success)', marginBottom: 8 }}>
              {resultMsg}
            </div>
            <div style={{ fontSize: 13, color: 'var(--os-text-muted)', marginBottom: 20 }}>
              Thank you for reaching out. I will get back to you soon.
            </div>
            <button
              onClick={resetForm}
              style={{
                padding: '8px 20px',
                background: 'transparent',
                border: '1px solid var(--os-border)',
                color: 'var(--os-text-muted)',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
                fontFamily: 'inherit',
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
            <div style={{ fontFamily: 'monospace', fontSize: 14, color: 'var(--os-error)', marginBottom: 8 }}>
              {resultMsg}
            </div>
            <button
              onClick={resetForm}
              style={{
                padding: '8px 20px',
                background: 'transparent',
                border: '1px solid var(--os-border)',
                color: 'var(--os-text-muted)',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
                fontFamily: 'inherit',
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

      {/* Social links sidebar */}
      <div
        style={{
          width: 180,
          borderLeft: '1px solid var(--os-border)',
          background: 'var(--os-surface-raised)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--os-text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
          Social Links
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
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                color: 'var(--os-text-muted)',
                textDecoration: 'none',
                fontSize: 12,
                borderRadius: 6,
                transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(56,189,248,0.08)';
                e.currentTarget.style.color = 'var(--os-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--os-text-muted)';
              }}
            >
              {Icon && <Icon size={14} />}
              {platform}
            </a>
          );
        })}
      </div>
    </div>
  );
}
