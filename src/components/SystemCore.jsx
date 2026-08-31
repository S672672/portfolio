import React, { useState, useEffect, useRef, useCallback } from 'react';
import { profile } from '../data/profile';
import smithImg from '../assets/pictures/smithimg.jpg';
import AnalogClock from './AnalogClock';
import { FiGithub, FiLinkedin, FiArrowRight } from 'react-icons/fi';

// ─── Architectural SVG Layer ──────────────────────────────────────
function ArchLayer({ w, h, mouse, hoverActive }) {
  const cx = w / 2;
  const cy = h / 2;
  const mx = mouse.x * 3;
  const my = mouse.y * 3;
  const reveal = hoverActive ? 1 : 0;

  // Concentric arcs — engineering construction lines
  const arcs = [
    { r: 160, start: -30, end: 30, color: 'rgba(90,169,255,0.04)', width: 0.3 },
    { r: 160, start: 150, end: 210, color: 'rgba(90,169,255,0.04)', width: 0.3 },
    { r: 200, start: -60, end: -20, color: 'rgba(90,169,255,0.03)', width: 0.25 },
    { r: 200, start: 200, end: 240, color: 'rgba(90,169,255,0.03)', width: 0.25 },
    { r: 240, start: -15, end: 15, color: 'rgba(90,169,255,0.025)', width: 0.2 },
    { r: 240, start: 165, end: 195, color: 'rgba(90,169,255,0.025)', width: 0.2 },
    { r: 120, start: 0, end: 360, color: 'rgba(90,169,255,0.015)', width: 0.3, dash: '1 8' },
    { r: 280, start: 45, end: 135, color: 'rgba(90,169,255,0.018)', width: 0.2 },
  ];

  // Construction lines — horizontal and vertical through center
  const constructLines = [
    { x1: cx - 350, y1: cy, x2: cx - 60, y2: cy, color: 'rgba(90,169,255,0.025)' },
    { x1: cx + 60, y1: cy, x2: cx + 350, y2: cy, color: 'rgba(90,169,255,0.025)' },
    { x1: cx, y1: cy - 300, x2: cx, y2: cy - 50, color: 'rgba(90,169,255,0.02)' },
    { x1: cx, y1: cy + 50, x2: cx, y2: cy + 300, color: 'rgba(90,169,255,0.02)' },
    // Diagonal construction lines
    { x1: cx - 250, y1: cy - 200, x2: cx - 40, y2: cy - 30, color: 'rgba(90,169,255,0.012)' },
    { x1: cx + 40, y1: cy + 30, x2: cx + 250, y2: cy + 200, color: 'rgba(90,169,255,0.012)' },
  ];

  // Alignment markers — small crosses at key points
  const markers = [
    { x: cx - 180, y: cy - 140, size: 4 },
    { x: cx + 180, y: cy - 140, size: 4 },
    { x: cx - 180, y: cy + 140, size: 4 },
    { x: cx + 180, y: cy + 140, size: 4 },
    { x: cx - 260, y: cy, size: 3 },
    { x: cx + 260, y: cy, size: 3 },
    { x: cx, y: cy - 220, size: 3 },
    { x: cx, y: cy + 220, size: 3 },
  ];

  // Coordinate labels — tiny metadata
  const coords = [
    { x: cx - 300, y: cy - 8, text: '0,0', opacity: 0.15 },
    { x: cx + 280, y: cy - 8, text: `${w},0`, opacity: 0.15 },
    { x: cx - 8, y: cy - 250, text: 'Y', opacity: 0.1 },
    { x: cx - 8, y: cy + 245, text: `${h}`, opacity: 0.1 },
  ];

  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <filter id="archGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Grid — very faint */}
      <g opacity={0.15 + reveal * 0.1} style={{ transition: 'opacity 0.8s ease' }}>
        {Array.from({ length: Math.floor(w / 80) + 1 }).map((_, i) => (
          <line key={`gv${i}`} x1={i * 80} y1={0} x2={i * 80} y2={h}
            stroke="rgba(90,169,255,0.015)" strokeWidth="0.3" />
        ))}
        {Array.from({ length: Math.floor(h / 80) + 1 }).map((_, i) => (
          <line key={`gh${i}`} x1={0} y1={i * 80} x2={w} y2={i * 80}
            stroke="rgba(90,169,255,0.015)" strokeWidth="0.3" />
        ))}
      </g>

      {/* Construction lines */}
      {constructLines.map((l, i) => (
        <line key={`cl${i}`}
          x1={l.x1 + mx * 0.3} y1={l.y1 + my * 0.3}
          x2={l.x2 + mx * 0.3} y2={l.y2 + my * 0.3}
          stroke={l.color} strokeWidth="0.4"
          opacity={0.4 + reveal * 0.6}
          style={{ transition: 'opacity 1s ease' }} />
      ))}

      {/* Concentric arcs */}
      {arcs.map((a, i) => {
        const startRad = (a.start - 90) * (Math.PI / 180);
        const endRad = (a.end - 90) * (Math.PI / 180);
        const x1 = cx + mx * 0.4 + a.r * Math.cos(startRad);
        const y1 = cy + my * 0.4 + a.r * Math.sin(startRad);
        const x2 = cx + mx * 0.4 + a.r * Math.cos(endRad);
        const y2 = cy + my * 0.4 + a.r * Math.sin(endRad);
        const largeArc = (a.end - a.start) > 180 ? 1 : 0;
        return (
          <path key={`arc${i}`}
            d={`M ${x1} ${y1} A ${a.r} ${a.r} 0 ${largeArc} 1 ${x2} ${y2}`}
            fill="none" stroke={a.color} strokeWidth={a.width}
            strokeDasharray={a.dash || 'none'}
            opacity={0.5 + reveal * 0.5}
            style={{ transition: 'opacity 1.2s ease' }} />
        );
      })}

      {/* Alignment markers */}
      {markers.map((m, i) => (
        <g key={`mk${i}`} opacity={0.2 + reveal * 0.5} style={{ transition: 'opacity 1s ease' }}>
          <line x1={m.x + mx * 0.5 - m.size} y1={m.y + my * 0.5}
            x2={m.x + mx * 0.5 + m.size} y2={m.y + my * 0.5}
            stroke="rgba(90,169,255,0.2)" strokeWidth="0.4" />
          <line x1={m.x + mx * 0.5} y1={m.y + my * 0.5 - m.size}
            x2={m.x + mx * 0.5} y2={m.y + my * 0.5 + m.size}
            stroke="rgba(90,169,255,0.2)" strokeWidth="0.4" />
        </g>
      ))}

      {/* Coordinate labels */}
      {coords.map((c, i) => (
        <text key={`cr${i}`}
          x={c.x + mx * 0.2} y={c.y + my * 0.2}
          fill="rgba(90,169,255,1)" fontSize="6"
          fontFamily="'SF Mono', monospace" opacity={c.opacity + reveal * 0.15}
          style={{ transition: 'opacity 1s ease' }}>
          {c.text}
        </text>
      ))}

      {/* Ambient light — subtle radial glow around center */}
      <circle cx={cx + mx * 0.2} cy={cy + my * 0.2} r={180}
        fill="url(#centerLight)" opacity={0.3 + reveal * 0.15}
        style={{ transition: 'opacity 1s ease' }} />
      <defs>
        <radialGradient id="centerLight" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(90,169,255,0.04)" />
          <stop offset="100%" stopColor="rgba(90,169,255,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ─── Portrait Frame ───────────────────────────────────────────────
function PortraitFrame({ src, alt, size, mx, my }) {
  const pad = 8;
  return (
    <div style={{
      width: size, height: size + pad * 2, position: 'relative',
      transform: `translate(${mx * 0.8}px, ${my * 0.8}px)`,
      transition: 'transform 0.3s ease-out',
    }}>
      {/* Architectural corner marks */}
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        width={size + pad * 2} height={size + pad * 2}>
        {/* Top-left */}
        <line x1={pad} y1={pad} x2={pad + 14} y2={pad} stroke="rgba(90,169,255,0.2)" strokeWidth="0.5" />
        <line x1={pad} y1={pad} x2={pad} y2={pad + 14} stroke="rgba(90,169,255,0.2)" strokeWidth="0.5" />
        {/* Top-right */}
        <line x1={size + pad - 14} y1={pad} x2={size + pad} y2={pad} stroke="rgba(90,169,255,0.2)" strokeWidth="0.5" />
        <line x1={size + pad} y1={pad} x2={size + pad} y2={pad + 14} stroke="rgba(90,169,255,0.2)" strokeWidth="0.5" />
        {/* Bottom-left */}
        <line x1={pad} y1={size + pad - 14} x2={pad} y2={size + pad} stroke="rgba(90,169,255,0.2)" strokeWidth="0.5" />
        <line x1={pad} y1={size + pad} x2={pad + 14} y2={size + pad} stroke="rgba(90,169,255,0.2)" strokeWidth="0.5" />
        {/* Bottom-right */}
        <line x1={size + pad} y1={size + pad - 14} x2={size + pad} y2={size + pad} stroke="rgba(90,169,255,0.2)" strokeWidth="0.5" />
        <line x1={size + pad - 14} y1={size + pad} x2={size + pad} y2={size + pad} stroke="rgba(90,169,255,0.2)" strokeWidth="0.5" />
        {/* Crosshair marks */}
        <line x1={size / 2 + pad - 6} y1={pad - 3} x2={size / 2 + pad + 6} y2={pad - 3}
          stroke="rgba(90,169,255,0.12)" strokeWidth="0.3" />
        <line x1={size / 2 + pad - 6} y1={size + pad + 3} x2={size / 2 + pad + 6} y2={size + pad + 3}
          stroke="rgba(90,169,255,0.12)" strokeWidth="0.3" />
        <line x1={pad - 3} y1={size / 2 + pad - 6} x2={pad - 3} y2={size / 2 + pad + 6}
          stroke="rgba(90,169,255,0.12)" strokeWidth="0.3" />
        <line x1={size + pad + 3} y1={size / 2 + pad - 6} x2={size + pad + 3} y2={size / 2 + pad + 6}
          stroke="rgba(90,169,255,0.12)" strokeWidth="0.3" />
      </svg>

      {/* Photo */}
      <div style={{
        width: size, height: size, borderRadius: 50, overflow: 'hidden',
        position: 'relative', margin: pad,
        border: '1px solid rgba(90,169,255,0.08)',
      }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Tiny metadata below photo */}
      <div style={{
        position: 'absolute', bottom: 0, left: pad, right: pad,
        display: 'flex', justifyContent: 'space-between',
        fontSize: 5, color: 'rgba(90,169,255,0.15)',
        fontFamily: "'SF Mono', monospace", letterSpacing: '0.5px',
      }}>
        <span>IDENTITY</span>
        <span>SYS_AUTH</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function SystemCore({ onOpenApp }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hoverActive, setHoverActive] = useState(false);
  const [breath, setBreath] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(() => window.innerWidth <= 1024 && window.innerWidth > 768);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const handle = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  // Measure
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        setSize({ w: r.width, h: r.height });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Breath
  useEffect(() => {
    if (reducedMotion.current) return;
    let f;
    const go = () => { setBreath(Date.now() / 6000); f = requestAnimationFrame(go); };
    f = requestAnimationFrame(go);
    return () => { if (f) cancelAnimationFrame(f); };
  }, []);

  // Mouse
  useEffect(() => {
    if (isMobile) return;
    const move = (e) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
      });
    };
    const enter = () => setHoverActive(true);
    const leave = () => { setHoverActive(false); setMouse({ x: 0, y: 0 }); };
    window.addEventListener('mousemove', move, { passive: true });
    containerRef.current?.addEventListener('mouseenter', enter);
    containerRef.current?.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      containerRef.current?.removeEventListener('mouseenter', enter);
      containerRef.current?.removeEventListener('mouseleave', leave);
    };
  }, [isMobile]);

  const b = Math.sin(breath * Math.PI * 2) * 0.5 + 0.5;

  // ─── Mobile ─────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div ref={containerRef} style={{
        width: '100%', height: '100%', position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        overflow: 'hidden', padding: '16px 20px',
      }}>
        {/* Simplified arch background */}
        <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} viewBox="0 0 400 800">
          <circle cx={200} cy={280} r={120} fill="none" stroke="rgba(90,169,255,0.02)" strokeWidth="0.3" />
          <circle cx={200} cy={280} r={160} fill="none" stroke="rgba(90,169,255,0.015)" strokeWidth="0.2" strokeDasharray="2 8" />
          <line x1={200} y1={100} x2={200} y2={180} stroke="rgba(90,169,255,0.015)" strokeWidth="0.3" />
          <line x1={200} y1={380} x2={200} y2={460} stroke="rgba(90,169,255,0.015)" strokeWidth="0.3" />
        </svg>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Clock */}
          <div style={{ marginBottom: 4 }}>
            <AnalogClock compact />
          </div>

          {/* Portrait */}
          <PortraitFrame src={smithImg} alt={profile.name} size={72} mx={0} my={0} />

          {/* Name */}
          <h1 style={{
            fontSize: 26, fontWeight: 800, color: 'var(--os-text)',
            margin: 0, marginTop: 14, letterSpacing: '-0.3px', lineHeight: 1.1,
            textAlign: 'center',
          }}>
            {profile.name}
          </h1>

          {/* Role */}
          <div style={{
            fontSize: 8, fontWeight: 600, color: 'var(--os-accent)',
            marginTop: 6, letterSpacing: '2px',
            fontFamily: "'SF Mono', monospace",
          }}>
            SOFTWARE ENGINEER
          </div>

          {/* Status */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5, marginTop: 10,
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--os-success)', boxShadow: '0 0 6px rgba(114,230,177,0.4)' }} />
            <span style={{ fontSize: 7, color: 'var(--os-text-dim)', fontFamily: "'SF Mono', monospace", letterSpacing: '0.8px' }}>SYSTEM ONLINE</span>
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: 12, color: 'var(--os-text-secondary)',
            marginTop: 12, lineHeight: 1.5, textAlign: 'center', maxWidth: 300,
          }}>
            Building software, infrastructure, and networks that work as one system.
          </div>

          {/* Tech */}
          <div style={{
            fontSize: 8, color: 'var(--os-text-faint)', marginTop: 10,
            fontFamily: "'SF Mono', monospace", letterSpacing: '1px', textAlign: 'center',
          }}>
            REACT · NODE · PYTHON · AWS · DOCKER · LINUX
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => onOpenApp('projects')}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '9px 18px', borderRadius: 7, background: 'rgba(90,169,255,0.08)', border: '1px solid rgba(90,169,255,0.2)', color: 'var(--os-accent)', fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
              View Work <FiArrowRight size={12} />
            </button>
            <button onClick={() => onOpenApp('resume')}
              style={{ padding: '9px 18px', borderRadius: 7, background: 'transparent', border: '1px solid rgba(36,48,68,0.35)', color: 'var(--os-text-secondary)', fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
              Resume
            </button>
            <button onClick={() => onOpenApp('contact')}
              style={{ padding: '9px 18px', borderRadius: 7, background: 'rgba(114,230,177,0.05)', border: '1px solid rgba(114,230,177,0.12)', color: 'var(--os-success)', fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
              Contact
            </button>
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {[{ href: profile.social.github, icon: FiGithub }, { href: profile.social.linkedin, icon: FiLinkedin }].map(({ href, icon: Icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, border: '1px solid rgba(36,48,68,0.25)', color: 'var(--os-text-dim)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--os-accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--os-text-dim)'; }}>
                <Icon size={13} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Desktop / Tablet ───────────────────────────────────────────
  const portraitSize = isTablet ? 80 : 100;

  return (
    <div ref={containerRef} style={{
      width: '100%', height: '100%', position: 'relative', zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Architectural SVG layer */}
      {size.w > 0 && (
        <ArchLayer w={size.w} h={size.h} mouse={mouse} hoverActive={hoverActive} />
      )}

      {/* Center composition */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative', zIndex: 2,
        maxWidth: isTablet ? 600 : 860,
        width: '100%',
        padding: '0 40px',
        transform: `translate(${mouse.x * 1.5}px, ${mouse.y * 1}px)`,
        transition: 'transform 0.4s ease-out',
      }}>
        {/* Portrait with architectural frame */}
        <PortraitFrame
          src={smithImg}
          alt={profile.name}
          size={portraitSize}
          mx={mouse.x * 0.6}
          my={mouse.y * 0.6}
        />

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 60px)',
          fontWeight: 800,
          color: 'var(--os-text)',
          margin: 0,
          marginTop: isTablet ? 16 : 22,
          letterSpacing: '-0.5px',
          lineHeight: 1.05,
          textAlign: 'center',
        }}>
          {profile.name}
        </h1>

        {/* Role — clean monospace */}
        <div style={{
          fontSize: 'clamp(9px, 0.8vw, 11px)',
          fontWeight: 600,
          color: 'var(--os-accent)',
          marginTop: 8,
          letterSpacing: '3px',
          fontFamily: "'SF Mono', monospace",
          textTransform: 'uppercase',
        }}>
          SYSTEM · SOFTWARE · INFRASTRUCTURE
        </div>

        {/* Engineering statement */}
        <div style={{
          fontSize: 'clamp(13px, 1.1vw, 16px)',
          color: 'var(--os-text-secondary)',
          marginTop: isTablet ? 14 : 18,
          lineHeight: 1.6,
          textAlign: 'center',
          maxWidth: 440,
        }}>
          Building software, infrastructure, and networks that work as one system.
        </div>

        {/* Tech — elegant one-liner */}
        <div style={{
          fontSize: 'clamp(8px, 0.65vw, 10px)',
          color: 'var(--os-text-faint)',
          marginTop: isTablet ? 10 : 14,
          fontFamily: "'SF Mono', monospace",
          letterSpacing: '1.2px',
          textAlign: 'center',
          opacity: 0.6 + hoverActive * 0.3,
          transition: 'opacity 0.6s ease',
        }}>
          REACT · NODE · PYTHON · AWS · DOCKER · LINUX
        </div>

        {/* Status — tiny metadata */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          marginTop: isTablet ? 10 : 14,
        }}>
          <span style={{
            width: 4, height: 4, borderRadius: '50%',
            background: 'var(--os-success)',
            boxShadow: '0 0 6px rgba(114,230,177,0.3)',
            opacity: 0.5 + b * 0.3,
          }} />
          <span style={{
            fontSize: 7, color: 'var(--os-text-dim)',
            fontFamily: "'SF Mono', monospace",
            letterSpacing: '1px',
          }}>
            SYSTEM ONLINE
          </span>
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: isTablet ? 8 : 10,
          marginTop: isTablet ? 16 : 22,
        }}>
          <button onClick={() => onOpenApp('projects')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: isTablet ? '9px 20px' : '10px 24px', borderRadius: 7,
              background: 'rgba(90,169,255,0.07)', border: '1px solid rgba(90,169,255,0.18)',
              color: 'var(--os-accent)', fontSize: isTablet ? 11 : 12, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(90,169,255,0.12)';
              e.target.style.borderColor = 'rgba(90,169,255,0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(90,169,255,0.07)';
              e.target.style.borderColor = 'rgba(90,169,255,0.18)';
              e.target.style.transform = 'translateY(0)';
            }}>
            View Work <FiArrowRight size={13} />
          </button>
          <button onClick={() => onOpenApp('resume')}
            style={{
              padding: isTablet ? '9px 20px' : '10px 24px', borderRadius: 7,
              background: 'transparent', border: '1px solid rgba(36,48,68,0.35)',
              color: 'var(--os-text-secondary)', fontSize: isTablet ? 11 : 12, fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'rgba(90,169,255,0.18)'; e.target.style.color = 'var(--os-text)'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(36,48,68,0.35)'; e.target.style.color = 'var(--os-text-secondary)'; }}>
            Resume
          </button>
          <button onClick={() => onOpenApp('contact')}
            style={{
              padding: isTablet ? '9px 20px' : '10px 24px', borderRadius: 7,
              background: 'rgba(114,230,177,0.04)', border: '1px solid rgba(114,230,177,0.1)',
              color: 'var(--os-success)', fontSize: isTablet ? 11 : 12, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => { e.target.style.background = 'rgba(114,230,177,0.08)'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.target.style.background = 'rgba(114,230,177,0.04)'; e.target.style.transform = 'translateY(0)'; }}>
            Contact
          </button>
        </div>

        {/* Social */}
        <div style={{ display: 'flex', gap: 8, marginTop: isTablet ? 12 : 16 }}>
          {[{ href: profile.social.github, icon: FiGithub }, { href: profile.social.linkedin, icon: FiLinkedin }].map(({ href, icon: Icon }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: isTablet ? 30 : 34, height: isTablet ? 30 : 34, borderRadius: 7,
                border: '1px solid rgba(36,48,68,0.25)',
                color: 'var(--os-text-dim)', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--os-accent)'; e.currentTarget.style.borderColor = 'rgba(90,169,255,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--os-text-dim)'; e.currentTarget.style.borderColor = 'rgba(36,48,68,0.25)'; }}>
              <Icon size={isTablet ? 13 : 15} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
