import React, { useState, useEffect } from 'react';

const bootLines = [
  { text: 'SMITH.OS v1.0', delay: 0, style: 'logo' },
  { text: '────────────────────────────────', delay: 200, style: 'dim' },
  { text: 'Initializing environment...', delay: 400, style: 'normal' },
  { text: 'Loading profile.............. ✓', delay: 650, style: 'success' },
  { text: 'Loading projects............. ✓', delay: 850, style: 'success' },
  { text: 'Loading experience........... ✓', delay: 1000, style: 'success' },
  { text: 'Loading terminal............. ✓', delay: 1150, style: 'success' },
  { text: 'Loading workspace............ ✓', delay: 1300, style: 'success' },
  { text: '', delay: 1400, style: 'normal' },
  { text: 'SYSTEM READY', delay: 1500, style: 'ready' },
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay)
    );

    const completeTimer = setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 400);
    }, 2000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setFading(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      className="boot-container"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease-out',
      }}
    >
      <div style={{ maxWidth: 420, width: '100%', padding: '0 20px' }}>
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className="boot-line"
            style={{
              animationDelay: '0ms',
              color:
                line.style === 'logo'
                  ? 'var(--os-accent)'
                  : line.style === 'success'
                  ? 'var(--os-green)'
                  : line.style === 'ready'
                  ? 'var(--os-accent)'
                  : line.style === 'dim'
                  ? 'var(--os-text-dim)'
                  : 'var(--os-text-muted)',
              fontSize: line.style === 'logo' ? '20px' : line.style === 'ready' ? '16px' : '13px',
              fontWeight: line.style === 'logo' || line.style === 'ready' ? '700' : '400',
              marginBottom: line.text ? '4px' : '8px',
              letterSpacing: line.style === 'logo' ? '3px' : line.style === 'ready' ? '4px' : '0',
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      <button
        onClick={handleSkip}
        style={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          background: 'transparent',
          border: '1px solid var(--os-border)',
          color: 'var(--os-text-dim)',
          padding: '8px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'all 0.2s',
          fontFamily: 'inherit',
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = 'var(--os-accent)';
          e.target.style.color = 'var(--os-accent)';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'var(--os-border)';
          e.target.style.color = 'var(--os-text-dim)';
        }}
      >
        Skip →
      </button>
    </div>
  );
}
