import React, { useState, useEffect, useRef } from 'react';

export default function AnalogClock({ onSessionStart, onSecondTick, compact = false }) {
  const [time, setTime] = useState(new Date());
  const [hovered, setHovered] = useState(false);
  const animRef = useRef(null);
  const [sessionStart] = useState(() => onSessionStart || Date.now());

  useEffect(() => {
    let lastRenderedSec = -1;
    const tick = () => {
      const now = new Date();
      const s = now.getSeconds();
      setTime(now);
      if (s !== lastRenderedSec) { lastRenderedSec = s; if (onSecondTick) onSecondTick(now); }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [onSecondTick]);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ms = time.getMilliseconds();
  const secondAngle = (seconds + ms / 1000) * 6;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = (hours + minutes / 60) * 30;

  const formatTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (d) => d.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
  const formatTimezone = () => {
    const offset = -time.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const h = Math.floor(Math.abs(offset) / 60);
    const m = Math.abs(offset) % 60;
    return `LOCAL TIME · UTC${sign}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const size = compact ? 120 : 180;
  const c = size / 2;
  const outerR = compact ? 50 : 78;

  const makeTrail = (cx, cy, radius, headAngle, trailLen, segments) => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const a = (headAngle - trailLen * t - 90) * (Math.PI / 180);
      pts.push({ x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a), opacity: 1 - t * 0.9 });
    }
    return pts;
  };

  const orbits = [
    { id: 'hour', radius: outerR * 0.38, angle: hourAngle, trailLen: 35, color: 'rgba(216,224,236,0.8)', glowColor: 'rgba(216,224,236,0.15)', dotR: compact ? 3 : 4.5, trailWidth: compact ? 2 : 3, segments: 20 },
    { id: 'minute', radius: outerR * 0.6, angle: minuteAngle, trailLen: 50, color: 'rgba(90,169,255,0.7)', glowColor: 'rgba(90,169,255,0.12)', dotR: compact ? 2.2 : 3.5, trailWidth: compact ? 1.5 : 2.5, segments: 25 },
    { id: 'second', radius: outerR * 0.85, angle: secondAngle, trailLen: 70, color: 'var(--os-accent)', glowColor: 'rgba(90,169,255,0.08)', dotR: compact ? 1.8 : 2.5, trailWidth: compact ? 1 : 1.5, segments: 30 },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'clockDrop 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{
        width: size, height: size, position: 'relative',
        filter: `drop-shadow(0 10px 30px rgba(0,0,0,0.55)) ${hovered ? 'drop-shadow(0 0 20px rgba(90,169,255,0.12))' : ''}`,
        transition: 'filter 0.4s ease',
      }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <radialGradient id="orbBg" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#0C1320" /><stop offset="100%" stopColor="#060910" />
            </radialGradient>
            <filter id="orbGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <circle cx={c} cy={c} r={outerR + 4} fill="rgba(8,12,20,0.92)" stroke="rgba(90,169,255,0.06)" strokeWidth="0.5" />
          <circle cx={c} cy={c} r={outerR} fill="url(#orbBg)" />

          {orbits.map((o) => (
            <circle key={o.id} cx={c} cy={c} r={o.radius} fill="none"
              stroke={hovered ? 'rgba(90,169,255,0.08)' : 'rgba(90,169,255,0.03)'}
              strokeWidth="0.5" strokeDasharray="2 6" style={{ transition: 'stroke 0.4s' }} />
          ))}

          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 - 90) * (Math.PI / 180);
            const isMain = i % 3 === 0;
            const innerR = outerR - (isMain ? 8 : 4);
            return <line key={i} x1={c + innerR * Math.cos(a)} y1={c + innerR * Math.sin(a)}
              x2={c + (outerR - 1) * Math.cos(a)} y2={c + (outerR - 1) * Math.sin(a)}
              stroke={isMain ? 'rgba(216,224,236,0.4)' : 'rgba(85,100,120,0.2)'}
              strokeWidth={isMain ? 1.2 : 0.4} strokeLinecap="round" />;
          })}

          {orbits.map((o) => {
            const trail = makeTrail(c, c, o.radius, o.angle, o.trailLen, o.segments);
            const hrad = (o.angle - 90) * (Math.PI / 180);
            const hx = c + o.radius * Math.cos(hrad);
            const hy = c + o.radius * Math.sin(hrad);
            return (
              <g key={o.id}>
                {trail.map((p, i) => {
                  if (i === 0) return null;
                  const t = i / trail.length;
                  return <circle key={i} cx={p.x} cy={p.y} r={o.trailWidth * (1 - t * 0.7)} fill={o.color} opacity={p.opacity * 0.4} />;
                })}
                <circle cx={hx} cy={hy} r={o.dotR * 2.5} fill={o.glowColor} filter="url(#orbGlow)" />
                <circle cx={hx} cy={hy} r={o.dotR} fill={o.color} opacity={0.9} filter="url(#dotGlow)" />
                <circle cx={hx} cy={hy} r={o.dotR * 0.4} fill="white" opacity={0.6} />
              </g>
            );
          })}

          <circle cx={c} cy={c} r={compact ? 3 : 4} fill="rgba(20,30,48,0.95)" stroke="rgba(90,169,255,0.15)" strokeWidth="0.5" />
          <circle cx={c} cy={c} r={compact ? 1.5 : 2} fill="var(--os-accent)" opacity={0.35} />
        </svg>
      </div>

      {!compact && (
        <div style={{ textAlign: 'center', marginTop: 12, fontFamily: "'SF Mono', 'Fira Code', monospace" }}>
          <div style={{ fontSize: 18, color: 'var(--os-text)', fontWeight: 600, letterSpacing: '2px', fontVariantNumeric: 'tabular-nums' }}>{formatTime(time)}</div>
          <div style={{ fontSize: 9, color: 'var(--os-text-secondary)', marginTop: 3, letterSpacing: '0.8px', fontWeight: 500 }}>{formatDate(time)}</div>
          <div style={{ fontSize: 8, color: 'var(--os-text-faint)', marginTop: 2, letterSpacing: '0.5px' }}>{formatTimezone()}</div>
        </div>
      )}

      {compact && (
        <div style={{ textAlign: 'center', marginTop: 6, fontFamily: "'SF Mono', monospace" }}>
          <div style={{ fontSize: 12, color: 'var(--os-text)', fontWeight: 600, letterSpacing: '1.5px', fontVariantNumeric: 'tabular-nums' }}>{formatTime(time)}</div>
        </div>
      )}
    </div>
  );
}
