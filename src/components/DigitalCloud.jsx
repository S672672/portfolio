import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';

// === MASSIVE VOLUMETRIC ARCHITECTURAL FORMS ===
// Asymmetric shapes extending far beyond viewport — creating feeling of huge environment
const forms = [
  // MASSIVE far-layer structures — barely visible, enormous
  { type: 'ellipse', cx: -15, cy: 20, rx: 45, ry: 30, color: '90,169,255', opacity: 0.008, layer: 0, rot: 0 },
  { type: 'ellipse', cx: 120, cy: 10, rx: 40, ry: 25, color: '139,124,255', opacity: 0.006, layer: 0, rot: 15 },
  { type: 'ellipse', cx: 50, cy: 95, rx: 50, ry: 28, color: '90,169,255', opacity: 0.005, layer: 0, rot: -10 },
  { type: 'ellipse', cx: 70, cy: -10, rx: 35, ry: 20, color: '139,124,255', opacity: 0.007, layer: 0, rot: 25 },
  
  // Mid-layer architectural forms — angular, geometric, architectural
  { type: 'diamond', cx: 10, cy: 25, size: 180, color: '90,169,255', opacity: 0.012, layer: 1, rot: 0 },
  { type: 'diamond', cx: 90, cy: 15, size: 130, color: '139,124,255', opacity: 0.01, layer: 1, rot: 0 },
  { type: 'diamond', cx: 55, cy: 80, size: 100, color: '90,169,255', opacity: 0.008, layer: 1, rot: 0 },
  { type: 'diamond', cx: -5, cy: 65, size: 80, color: '139,124,255', opacity: 0.009, layer: 1, rot: 0 },
  { type: 'diamond', cx: 105, cy: 70, size: 70, color: '90,169,255', opacity: 0.007, layer: 1, rot: 0 },
  
  // Curved cloud-like surfaces — large, soft, asymmetric
  { type: 'ellipse', cx: 25, cy: 40, rx: 25, ry: 18, color: '90,169,255', opacity: 0.014, layer: 1, rot: -20 },
  { type: 'ellipse', cx: 75, cy: 45, rx: 22, ry: 15, color: '139,124,255', opacity: 0.012, layer: 1, rot: 15 },
  { type: 'ellipse', cx: 45, cy: 30, rx: 18, ry: 12, color: '90,169,255', opacity: 0.01, layer: 1, rot: -10 },
  
  // Near-layer — small, slightly brighter accent forms
  { type: 'diamond', cx: 28, cy: 42, size: 50, color: '90,169,255', opacity: 0.018, layer: 2, rot: 0 },
  { type: 'diamond', cx: 72, cy: 52, size: 40, color: '139,124,255', opacity: 0.014, layer: 2, rot: 0 },
  { type: 'diamond', cx: 48, cy: 68, size: 35, color: '90,169,255', opacity: 0.012, layer: 2, rot: 0 },
];

// === NETWORK TOPOLOGY ===
const netNodes = [
  // Far layer — barely visible
  { x: -3, y: 15, r: 1.5, layer: 'far' }, { x: 8, y: 8, r: 1.2, layer: 'far' },
  { x: 20, y: 22, r: 2, layer: 'far' }, { x: 38, y: 10, r: 1.5, layer: 'far' },
  { x: 55, y: 18, r: 1.8, layer: 'far' }, { x: 72, y: 12, r: 1.3, layer: 'far' },
  { x: 88, y: 20, r: 1.6, layer: 'far' }, { x: 105, y: 15, r: 1.2, layer: 'far' },
  
  // Mid layer — subtle
  { x: 5, y: 38, r: 1.8, layer: 'mid' }, { x: 18, y: 50, r: 1.5, layer: 'mid' },
  { x: 32, y: 35, r: 2.2, layer: 'mid' }, { x: 48, y: 42, r: 1.8, layer: 'mid' },
  { x: 62, y: 38, r: 2, layer: 'mid' }, { x: 78, y: 48, r: 1.5, layer: 'mid' },
  { x: 92, y: 40, r: 1.3, layer: 'mid' }, { x: 100, y: 55, r: 1.6, layer: 'mid' },
  
  // Near layer — slightly brighter
  { x: 3, y: 62, r: 1.3, layer: 'far' }, { x: 15, y: 72, r: 1.8, layer: 'mid' },
  { x: 30, y: 60, r: 1.8, layer: 'mid' }, { x: 45, y: 68, r: 1.5, layer: 'far' },
  { x: 58, y: 62, r: 2, layer: 'mid' }, { x: 72, y: 72, r: 1.3, layer: 'far' },
  { x: 85, y: 65, r: 1.8, layer: 'mid' }, { x: 98, y: 75, r: 1.2, layer: 'far' },
  
  // Deep layer
  { x: 12, y: 85, r: 1.2, layer: 'far' }, { x: 35, y: 82, r: 1.5, layer: 'far' },
  { x: 52, y: 90, r: 1.3, layer: 'far' }, { x: 68, y: 85, r: 1.6, layer: 'mid' },
  { x: 82, y: 90, r: 1.2, layer: 'far' }, { x: 95, y: 88, r: 1.4, layer: 'far' },
];

const netConns = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],
  [8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],
  [16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],
  [24,25],[25,26],[26,27],[27,28],[28,29],
  // Cross connections — sparse
  [2,10],[4,12],[6,13],[10,18],[12,20],[14,22],
  [1,8],[3,11],[5,12],[11,19],[13,21],
  [9,16],[11,17],[13,20],[15,23],
];

function getConnPath(a, b) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const off = len * 0.06;
  return `M${a.x},${a.y} Q${mx - (dy/len)*off},${my + (dx/len)*off} ${b.x},${b.y}`;
}

// === SECURITY PERIMETER ===
// Subtle protective geometry around the center
function SecurityPerimeter({ phase }) {
  if (phase < 2) return null;
  const rings = [
    { r: 28, dash: '2 4', opacity: 0.04 },
    { r: 32, dash: '1 6', opacity: 0.03 },
    { r: 36, dash: '3 5', opacity: 0.02 },
  ];
  
  return (
    <g style={{ animation: 'fadeIn 2s ease-out' }}>
      {rings.map((ring, i) => (
        <circle key={i} cx="50" cy="50" r={ring.r}
          fill="none" stroke="var(--os-accent)" strokeWidth="0.08"
          strokeDasharray={ring.dash} opacity={ring.opacity}
          style={{ animation: `subtlePulse ${6 + i * 2}s ease-in-out infinite` }} />
      ))}
      {/* Hexagonal boundary — very faint */}
      <polygon
        points="50,14 66,26 66,50 50,62 34,50 34,26"
        fill="none" stroke="var(--os-accent)" strokeWidth="0.06"
        opacity="0.03" strokeDasharray="2 8" />
    </g>
  );
}

// === DIGITAL HORIZON ===
function HorizonLayer() {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', pointerEvents: 'none' }}>
      {/* Main horizon line */}
      <div style={{
        position: 'absolute', bottom: '20%', left: '-5%', right: '-5%', height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(90,169,255,0.02) 20%, rgba(139,124,255,0.015) 50%, rgba(90,169,255,0.01) 80%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 'calc(20% + 5px)', left: '8%', right: '12%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(90,169,255,0.012), transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: 'calc(20% - 4px)', left: '12%', right: '8%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(139,124,255,0.008), transparent)',
      }} />
      {/* Atmospheric haze */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
        background: 'linear-gradient(to top, rgba(6,8,13,0.4) 0%, transparent 100%)',
      }} />
      {/* Distant lights */}
      {[12, 28, 42, 58, 72, 85, 93].map((x, i) => (
        <div key={i} style={{
          position: 'absolute', bottom: '20%', left: `${x}%`,
          width: 1.5, height: 1.5, borderRadius: '50%',
          background: i % 3 === 0 ? 'rgba(139,124,255,0.12)' : 'rgba(90,169,255,0.1)',
          boxShadow: `0 0 ${3 + i}px ${i % 3 === 0 ? 'rgba(139,124,255,0.08)' : 'rgba(90,169,255,0.06)'}`,
        }} />
      ))}
    </div>
  );
}

// === LIVING ARCHITECTURE EVENTS ===
function LivingEvents() {
  const [event, setEvent] = useState(null);
  
  useEffect(() => {
    const trigger = () => {
      const types = ['nodePulse', 'lineFade', 'shapeShift', 'distantGlow'];
      const type = types[Math.floor(Math.random() * types.length)];
      setEvent({ type, x: 10 + Math.random() * 80, y: 10 + Math.random() * 70, id: Date.now() });
      setTimeout(() => setEvent(null), 2500);
    };
    const interval = setInterval(trigger, 6000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);
  
  if (!event) return null;
  
  if (event.type === 'nodePulse') {
    return (
      <div style={{
        position: 'absolute', left: `${event.x}%`, top: `${event.y}%`,
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--os-accent)', opacity: 0,
        animation: 'nodePulse 2.5s ease-out forwards', pointerEvents: 'none',
      }} />
    );
  }
  if (event.type === 'lineFade') {
    return (
      <div style={{
        position: 'absolute', left: `${event.x}%`, top: `${event.y}%`,
        width: 60, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--os-accent), transparent)',
        opacity: 0, animation: 'lineFade 2.5s ease-out forwards',
        pointerEvents: 'none', transform: `rotate(${Math.random() * 60 - 30}deg)`,
      }} />
    );
  }
  if (event.type === 'shapeShift') {
    return (
      <div style={{
        position: 'absolute', left: `${event.x}%`, top: `${event.y}%`,
        width: 20, height: 20, border: '1px solid var(--os-accent)', opacity: 0,
        animation: 'shapeShift 2.5s ease-out forwards', pointerEvents: 'none',
        transform: 'rotate(45deg)',
      }} />
    );
  }
  // distantGlow
  return (
    <div style={{
      position: 'absolute', left: `${event.x}%`, top: `${event.y}%`,
      width: 40, height: 40, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(90,169,255,0.03) 0%, transparent 70%)',
      opacity: 0, animation: 'nodePulse 3s ease-out forwards', pointerEvents: 'none',
    }} />
  );
}

// === ENERGY RIPPLE — Click interaction ===
function EnergyRipple({ position }) {
  if (!position) return null;
  return (
    <div style={{
      position: 'absolute', left: position.x, top: position.y,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 10, height: 10, borderRadius: '50%',
          border: '1px solid var(--os-accent)',
          opacity: 0,
          animation: `energyRipple 1.2s ease-out ${i * 0.15}s forwards`,
        }} />
      ))}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 4, height: 4, borderRadius: '50%',
        background: 'var(--os-accent)',
        boxShadow: '0 0 12px rgba(90,169,255,0.4)',
        animation: 'energyRippleDot 0.8s ease-out forwards',
      }} />
    </div>
  );
}

export default function DigitalCloud({ mousePos = { x: 0, y: 0 }, activeApp, timePulse, energyRipple }) {
  const layerOpacity = (layer) => {
    if (layer === 'near') return 0.06;
    if (layer === 'mid') return 0.04;
    return 0.02;
  };
  
  const envState = useMemo(() => {
    if (activeApp === 'terminal') return { ambientColor: '90,169,255', ambientOpacity: 0.02 };
    if (activeApp === 'contact') return { ambientColor: '139,124,255', ambientOpacity: 0.018 };
    if (activeApp === 'projects') return { ambientColor: '90,169,255', ambientOpacity: 0.015 };
    return { ambientColor: '90,169,255', ambientOpacity: 0.012 };
  }, [activeApp]);
  
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      
      {/* === LAYER 0: DEEP ATMOSPHERE === */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 15% 75%, rgba(90,169,255,0.018) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 15%, rgba(139,124,255,0.015) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 40%, rgba(90,169,255,0.008) 0%, transparent 60%),
          radial-gradient(ellipse at 30% 20%, rgba(139,124,255,0.006) 0%, transparent 40%),
          linear-gradient(170deg, #06080D 0%, #0A0F18 25%, #0E1420 50%, #0C1019 75%, #06080D 100%)
        `,
      }} />
      
      {/* === LAYER 1: MASSIVE VOLUMETRIC ARCHITECTURAL FORMS === */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {forms.map((form, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${form.cx}%`, top: `${form.cy}%`,
            width: form.type === 'ellipse' ? `${form.rx}%` : form.size,
            height: form.type === 'ellipse' ? `${form.ry}%` : form.size,
            borderRadius: form.type === 'ellipse' ? '50%' : '8px',
            transform: form.type === 'diamond' ? 'rotate(45deg)' : 'none',
            background: `radial-gradient(ellipse, rgba(${form.color},${form.opacity * 2.5}) 0%, rgba(${form.color},${form.opacity}) 40%, transparent 70%)`,
            border: form.type === 'diamond' ? `1px solid rgba(${form.color},${form.opacity * 4})` : 'none',
            opacity: form.layer === 0 ? 0.5 : form.layer === 1 ? 0.7 : 1,
          }} />
        ))}
      </div>
      
      {/* === LAYER 2: ARCHITECTURAL GRID (perspective-enhanced) === */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(90,169,255,0.005) 1px, transparent 1px),
          linear-gradient(90deg, rgba(90,169,255,0.005) 1px, transparent 1px)
        `,
        backgroundSize: '160px 160px',
        transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
        transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.4) 75%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.4) 75%, transparent 100%)',
      }} />
      
      {/* === LAYER 3: NETWORK TOPOLOGY + SECURITY PERIMETER === */}
      <svg
        style={{
          position: 'absolute', inset: 0,
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
        }}
        viewBox="0 0 110 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="netGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        
        {/* Security perimeter around center */}
        <SecurityPerimeter />
        
        {/* Connection lines */}
        {netConns.map(([ai, bi], i) => {
          const a = netNodes[ai], b = netNodes[bi];
          if (!a || !b) return null;
          return (
            <path key={i} d={getConnPath(a, b)}
              fill="none" stroke="var(--os-accent)"
              strokeWidth={a.layer === 'near' || b.layer === 'near' ? 0.12 : 0.06}
              opacity={layerOpacity(a.layer === 'near' || b.layer === 'near' ? 'near' : a.layer)} />
          );
        })}
        
        {/* Nodes */}
        {netNodes.map((node, i) => (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r={node.r * 2.5}
              fill="var(--os-accent)" opacity={layerOpacity(node.layer) * 0.3} />
            <circle cx={node.x} cy={node.y} r={node.r * 0.5}
              fill="var(--os-accent)" opacity={layerOpacity(node.layer) * 1.2}
              filter={node.layer === 'near' ? 'url(#netGlow)' : undefined} />
          </g>
        ))}
      </svg>
      
      {/* === LAYER 4: DIGITAL HORIZON === */}
      <HorizonLayer />
      
      {/* === LAYER 5: ATMOSPHERIC LIGHTING === */}
      {/* Central ambient — shifts with active app */}
      <div style={{
        position: 'absolute', top: '35%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '65vw', height: '45vh',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${envState.ambientColor},${envState.ambientOpacity}) 0%, transparent 70%)`,
        transition: 'background 2s ease',
      }} />
      
      {/* Top-left atmospheric wash */}
      <div style={{
        position: 'absolute', top: '-12%', left: '-12%',
        width: '55vw', height: '45vh',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,169,255,0.01) 0%, transparent 70%)',
        opacity: 0.6,
      }} />
      
      {/* Bottom-right atmospheric wash */}
      <div style={{
        position: 'absolute', bottom: '-8%', right: '-8%',
        width: '45vw', height: '35vh',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,124,255,0.008) 0%, transparent 70%)',
        opacity: 0.5,
      }} />
      
      {/* === LAYER 6: TIME PULSE === */}
      {timePulse !== null && (
        <div style={{
          position: 'absolute', top: '8%', right: '12%',
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--os-accent)', opacity: 0,
          animation: 'timePulseRipple 0.8s ease-out forwards',
          pointerEvents: 'none',
        }} />
      )}
      
      {/* === LAYER 7: LIVING EVENTS === */}
      <LivingEvents />
      
      {/* === LAYER 8: ENERGY RIPPLE (on click) === */}
      <EnergyRipple position={energyRipple} />
    </div>
  );
}
