import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// Green rising character streams — structured, not Matrix rain
const streams = [
  // Left region streams
  { x: 3, speed: 2.8, chars: 'SMITH.OS SYS_INIT NET_NODE CLOUD SECURE'.split(' '), delay: 0 },
  { x: 7, speed: 3.2, chars: '01 10 01 11 00 10 01'.split(' '), delay: 200 },
  { x: 11, speed: 2.5, chars: 'ENGINEERING SYSTEM NETWORK ARCHITECTURE'.split(' '), delay: 100 },
  { x: 15, speed: 3.5, chars: '10 01 11 00 10 01 10'.split(' '), delay: 300 },
  // Center-left
  { x: 22, speed: 2.2, chars: 'INITIALIZING CORE MAP_DIGITAL_ENV'.split(' '), delay: 150 },
  { x: 27, speed: 3.0, chars: '01 10 01 11 00'.split(' '), delay: 50 },
  { x: 32, speed: 2.7, chars: 'SECURITY CLOUD LAYER ONLINE'.split(' '), delay: 250 },
  // Center
  { x: 42, speed: 2.0, chars: 'SMITH.OS INITIALIZING'.split(' '), delay: 0 },
  { x: 48, speed: 2.4, chars: 'NET_TOPOLOGY ESTABLISHING'.split(' '), delay: 100 },
  { x: 54, speed: 3.3, chars: '10 01 11 00 10 01'.split(' '), delay: 200 },
  // Center-right
  { x: 63, speed: 2.6, chars: 'ENVIRONMENT READY SYSTEM'.split(' '), delay: 150 },
  { x: 68, speed: 3.1, chars: '01 10 01 11 00 10'.split(' '), delay: 50 },
  { x: 73, speed: 2.3, chars: 'CLOUD ARCHITECTURE NETWORK'.split(' '), delay: 300 },
  // Right region streams
  { x: 82, speed: 2.9, chars: 'NET_NODE SECURE ENGINEERING'.split(' '), delay: 100 },
  { x: 87, speed: 3.4, chars: '10 01 11 00 10'.split(' '), delay: 200 },
  { x: 92, speed: 2.1, chars: 'SMITH.OS SYS ONLINE'.split(' '), delay: 0 },
  { x: 96, speed: 2.8, chars: '01 10 01 11 00 10'.split(' '), delay: 250 },
];

// Boot sequence system messages
const systemMessages = [
  { text: 'INITIALIZING SMITH.OS', delay: 400 },
  { text: 'ESTABLISHING SYSTEM CORE', delay: 600 },
  { text: 'MAPPING DIGITAL ENVIRONMENT', delay: 800 },
  { text: 'INITIALIZING NETWORK', delay: 1000 },
  { text: 'CLOUD LAYER ONLINE', delay: 1200 },
  { text: 'SECURITY LAYER ACTIVE', delay: 1400 },
];

// Color interpolation helper
const mix = (from, to, t) => Math.round(from + (to - from) * t);

// Rising character component
function RisingStream({ stream, phase }) {
  if (phase < 0) return null;
  
  const chars = stream.chars;
  const elapsed = Math.max(0, phase * 1000 - stream.delay);
  const cycleDuration = 3000; // 3s for a full cycle
  
  return (
    <div style={{
      position: 'absolute',
      left: `${stream.x}%`,
      bottom: 0,
      width: 40,
      overflow: 'hidden',
    }}>
      {chars.map((char, i) => {
        const offset = ((elapsed * stream.speed + i * 180) % (chars.length * 180));
        const yPos = (offset / (chars.length * 180)) * 110; // 0% to 110%
        const opacity = Math.sin((yPos / 110) * Math.PI) * 0.7;
        const isKeyword = char.length > 2;
        const brightness = isKeyword ? 0.6 : 0.3;
        
        return (
          <div key={i} style={{
            position: 'absolute',
            bottom: `${yPos}%`,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: isKeyword ? 8 : 9,
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontWeight: isKeyword ? 600 : 400,
            color: `rgba(53, 255, 136, ${opacity * brightness})`,
            textShadow: isKeyword ? `0 0 ${8 * opacity}px rgba(53, 255, 136, 0.3)` : 'none',
            whiteSpace: 'nowrap',
            transition: 'color 1.5s ease',
            letterSpacing: isKeyword ? '1px' : '0',
          }}>
            {char}
          </div>
        );
      })}
    </div>
  );
}

// Network formation SVG — transitions from green to blue
function NetworkFormation({ phase, colorShift }) {
  if (phase < 2) return null;
  
  const green = { r: 53, g: 255, b: 136 };
  const blue = { r: 90, g: 169, b: 255 };
  
  const r = mix(green.r, blue.r, colorShift);
  const g = mix(green.g, blue.g, colorShift);
  const b = mix(green.b, blue.b, colorShift);
  const color = `${r}, ${g}, ${b}`;
  
  // Forming connections — sparse, asymmetric
  const nodes = [
    { x: 20, y: 25 }, { x: 35, y: 18 }, { x: 50, y: 30 },
    { x: 65, y: 22 }, { x: 80, y: 28 }, { x: 30, y: 45 },
    { x: 50, y: 50 }, { x: 70, y: 42 }, { x: 40, y: 60 },
    { x: 60, y: 58 }, { x: 25, y: 65 }, { x: 75, y: 62 },
    { x: 50, y: 75 }, { x: 35, y: 78 }, { x: 65, y: 80 },
  ];
  
  const connections = [
    [0,1],[1,2],[2,3],[3,4],
    [5,6],[6,7],[7,4],
    [8,9],[9,3],
    [0,5],[5,8],[8,10],
    [4,7],[7,11],[11,9],
    [8,12],[12,13],[12,14],[10,13],
  ];
  
  const opacity = Math.min(1, (phase - 2) * 0.8);
  
  return (
    <svg style={{ position: 'absolute', inset: 0, opacity }} viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="bootNetGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {connections.map(([ai, bi], i) => {
        const a = nodes[ai], b = nodes[bi];
        if (!a || !b) return null;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.sqrt(dx*dx + dy*dy);
        const off = len * 0.08;
        const cx = mx - (dy/len) * off, cy = my + (dx/len) * off;
        
        return (
          <path key={i} d={`M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`}
            fill="none" stroke={`rgb(${color})`} strokeWidth="0.12" opacity={0.25 + (i % 3) * 0.05} />
        );
      })}
      
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i === 6 ? 1.2 : 0.7}
          fill={`rgb(${color})`} opacity={0.3 + (i === 6 ? 0.2 : 0)}
          filter={i === 6 ? 'url(#bootNetGlow)' : undefined} />
      ))}
      
      {/* Central node — Smith */}
      <circle cx={50} cy={50} r={3} fill="none" stroke={`rgb(${color})`} strokeWidth="0.3" opacity={0.15} />
      <circle cx={50} cy={50} r={1.5} fill={`rgb(${color})`} opacity={0.5} filter="url(#bootNetGlow)" />
    </svg>
  );
}

// Central node expansion — final boot phase
function CentralNode({ phase }) {
  if (phase < 4) return null;
  
  return (
    <div style={{
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 8, height: 8,
      borderRadius: '50%',
      background: 'var(--os-accent)',
      boxShadow: '0 0 30px rgba(90,169,255,0.3), 0 0 60px rgba(90,169,255,0.1)',
      animation: 'bootNodeExpand 0.8s ease-out forwards',
    }} />
  );
}

export default function BootCinematic({ onComplete }) {
  const [phase, setPhase] = useState(-1);
  const [colorShift, setColorShift] = useState(0);
  const [fading, setFading] = useState(false);
  
  useEffect(() => {
    // Phase timeline
    const timers = [];
    // Phase 0: atmosphere (0ms)
    timers.push(setTimeout(() => setPhase(0), 0));
    // Phase 1: rising characters (200ms)
    timers.push(setTimeout(() => setPhase(1), 200));
    // Phase 2: network forms (800ms)
    timers.push(setTimeout(() => setPhase(2), 800));
    // Phase 3: clock + identity (1500ms)
    timers.push(setTimeout(() => setPhase(3), 1500));
    // Phase 4: central node (1800ms)
    timers.push(setTimeout(() => setPhase(4), 1800));
    // Phase 5: system pulse (2100ms)
    timers.push(setTimeout(() => setPhase(5), 2100));
    
    // Color transition: green → blue over 1.5s starting at 1s
    let colorFrame;
    const startTime = Date.now() + 1000;
    const colorDuration = 1500;
    const animateColor = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.max(0, Math.min(1, elapsed / colorDuration));
      // Ease-in-out
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setColorShift(eased);
      if (t < 1) colorFrame = requestAnimationFrame(animateColor);
    };
    timers.push(setTimeout(() => { colorFrame = requestAnimationFrame(animateColor); }, 0));
    
    // Complete at 2.8s
    timers.push(setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 500);
    }, 2800));
    
    return () => { timers.forEach(clearTimeout); if (colorFrame) cancelAnimationFrame(colorFrame); };
  }, [onComplete]);
  
  const handleSkip = useCallback(() => {
    setFading(true);
    setTimeout(onComplete, 200);
  }, [onComplete]);
  
  // Compute green-to-blue background
  const bgGreen = `rgba(53, 255, 136, ${0.015 * (1 - colorShift)})`;
  const bgBlue = `rgba(90, 169, 255, ${0.015 * colorShift})`;
  
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#06080D',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.5s ease-out',
      overflow: 'hidden',
    }}>
      {/* Deep atmosphere — shifts from green to blue tint */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 50% 50%, ${bgGreen} 0%, transparent 70%),
          radial-gradient(ellipse at 50% 50%, ${bgBlue} 0%, transparent 70%),
          radial-gradient(ellipse at 20% 80%, rgba(53,255,136,${0.008 * (1-colorShift)}) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(90,169,255,${0.008 * colorShift}) 0%, transparent 50%)
        `,
      }} />
      
      {/* Green rising character streams */}
      {phase >= 1 && streams.map((s, i) => (
        <RisingStream key={i} stream={s} phase={phase - 1} />
      ))}
      
      {/* Network formation — transitions from green to blue */}
      <NetworkFormation phase={phase} colorShift={colorShift} />
      
      {/* System messages — bottom-left */}
      {phase >= 1 && (
        <div style={{
          position: 'absolute', bottom: '12%', left: window.innerWidth <= 768 ? '5%' : '8%',
          fontFamily: "'SF Mono', monospace", fontSize: window.innerWidth <= 768 ? 8 : 10,
          transition: 'color 1.5s ease',
        }}>
          {systemMessages.map((msg, i) => {
            const msgPhase = phase - 1;
            const msgTime = i * 0.2;
            const visible = msgPhase > msgTime;
            if (!visible) return null;
            const fadeT = Math.min(1, (msgPhase - msgTime) / 0.3);
            return (
              <div key={i} style={{
                opacity: fadeT * 0.6,
                color: `rgba(${mix(53, 90, colorShift)}, ${mix(255, 169, colorShift)}, ${mix(136, 255, colorShift)}, ${fadeT * 0.5})`,
                marginBottom: 3,
                letterSpacing: '0.5px',
                fontWeight: 500,
              }}>
                {'>'} {msg.text}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Central node expansion */}
      <CentralNode phase={phase} />
      
      {/* Clock descent hint — simplified */}
      {phase >= 3 && (
        <div style={{
          position: 'absolute', top: '15%', left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bootClockDescend 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}>
          <div style={{ width: 1.5, height: 12, background: `rgba(${mix(53,90,colorShift)},${mix(255,169,colorShift)},${mix(136,255,colorShift)},0.3)`, margin: '0 auto', borderRadius: 1 }} />
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: 'block', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.4))' }}>
            <circle cx="24" cy="24" r="22" fill="rgba(12,16,25,0.9)" stroke={`rgba(${mix(53,90,colorShift)},${mix(255,169,colorShift)},${mix(136,255,colorShift)},0.2)`} strokeWidth="0.4" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 - 90) * Math.PI / 180;
              const m = i % 3 === 0;
              return (
                <line key={i}
                  x1={24 + (m ? 14 : 16) * Math.cos(a)} y1={24 + (m ? 14 : 16) * Math.sin(a)}
                  x2={24 + 19 * Math.cos(a)} y2={24 + 19 * Math.sin(a)}
                  stroke={m ? 'rgba(216,224,236,0.5)' : 'rgba(85,100,120,0.25)'}
                  strokeWidth={m ? 0.8 : 0.4} strokeLinecap="round" />
              );
            })}
            <line x1="24" y1="24" x2="24" y2="11" stroke="rgba(216,224,236,0.5)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="24" y1="24" x2="34" y2="24" stroke="rgba(216,224,236,0.3)" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="24" cy="24" r="1.5" fill={`rgba(${mix(53,90,colorShift)},${mix(255,169,colorShift)},${mix(136,255,colorShift)},0.5)`} />
          </svg>
        </div>
      )}
      
      {/* SMITH.OS identity — final phase */}
      {phase >= 3 && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          animation: 'bootIdentityFade 0.6s ease-out',
        }}>
          <div style={{
            fontSize: window.innerWidth <= 768 ? 22 : 26, fontWeight: 700,
            color: 'var(--os-text)',
            letterSpacing: '-0.3px', lineHeight: 1.2,
          }}>
            SMITH.OS
          </div>
          <div style={{
            fontSize: window.innerWidth <= 768 ? 8 : 10, fontWeight: 600,
            letterSpacing: window.innerWidth <= 768 ? '2px' : '3px', textTransform: 'uppercase',
            marginTop: 8,
            color: `rgb(${mix(53, 90, colorShift)}, ${mix(255, 169, colorShift)}, ${mix(136, 255, colorShift)})`,
            transition: 'color 1.5s ease',
          }}>
            PERSONAL DIGITAL WORKSPACE
          </div>
        </div>
      )}
      
      {/* System pulse — final effect */}
      {phase >= 5 && (
        <div style={{
          position: 'absolute', inset: 0,
          animation: 'bootPulse 0.5s ease-out forwards',
        }}>
          <div style={{
            position: 'absolute', left: '10%', top: '35%',
            width: 3, height: 3, borderRadius: '50%',
            background: 'var(--os-accent)',
            boxShadow: '0 0 15px rgba(90,169,255,0.5)',
            animation: 'bootPulseTravel 0.5s ease-in-out forwards',
          }} />
        </div>
      )}
      
      {/* Skip button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'fixed', bottom: window.innerWidth <= 768 ? 16 : 32, right: window.innerWidth <= 768 ? 16 : 32,
          background: 'transparent',
          border: '1px solid rgba(53,255,136,0.15)',
          color: 'rgba(53,255,136,0.4)',
          padding: '6px 16px', borderRadius: 6,
          cursor: 'pointer', fontSize: 11,
          transition: 'all 0.2s', fontFamily: 'inherit',
          opacity: phase >= 1 ? 1 : 0,
          pointerEvents: phase >= 1 ? 'auto' : 'none',
          letterSpacing: '0.5px',
        }}
        onMouseEnter={(e) => { e.target.style.borderColor = 'rgba(90,169,255,0.4)'; e.target.style.color = 'var(--os-accent)'; }}
        onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(53,255,136,0.15)'; e.target.style.color = 'rgba(53,255,136,0.4)'; }}
      >
        Skip →
      </button>
    </div>
  );
}
