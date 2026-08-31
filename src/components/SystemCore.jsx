import React, { useState, useEffect, useRef, useCallback } from "react";
import { profile } from "../data/profile";
import smithImg from "../assets/pictures/smithimg.jpg";
import { FiGithub, FiLinkedin, FiArrowRight } from "react-icons/fi";
import { isMobileDevice, isTabletDevice } from "../utils/device";

// ─── Animated Ring Frame ─────────────────────────────────────────
// Photo sits INSIDE this ring. Ring radius = photoRadius + gap.
function RingFrame({ photoRadius, hoverActive }) {
  const [rotation, setRotation] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion.current) return;
    let f;
    const go = () => {
      setRotation((r) => r + 0.12);
      f = requestAnimationFrame(go);
    };
    f = requestAnimationFrame(go);
    return () => {
      if (f) cancelAnimationFrame(f);
    };
  }, []);

  const gap = 8; // gap between photo edge and inner ring
  const innerR = photoRadius + gap;
  const outerR = photoRadius + gap + 10;
  const svgSize = outerR * 2 + 4;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            stopColor="var(--os-accent)"
            stopOpacity={hoverActive ? 0.5 : 0.25}
          />
          <stop
            offset="50%"
            stopColor="var(--os-purple)"
            stopOpacity={hoverActive ? 0.35 : 0.15}
          />
          <stop
            offset="100%"
            stopColor="var(--os-accent)"
            stopOpacity={hoverActive ? 0.5 : 0.25}
          />
        </linearGradient>
      </defs>

      {/* Static inner ring — hugs the photo */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke="var(--os-accent)"
        strokeWidth="0.5"
        opacity={hoverActive ? 0.2 : 0.08}
        style={{ transition: "opacity 0.6s ease" }}
      />

      {/* Rotating gradient arc 1 */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="1.5"
        strokeDasharray="50 200"
        strokeLinecap="round"
        opacity={hoverActive ? 0.85 : 0.5}
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center",
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Rotating gradient arc 2 — slower, opposite */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="0.7"
        strokeDasharray="30 220"
        strokeLinecap="round"
        opacity={hoverActive ? 0.4 : 0.18}
        style={{
          transform: `rotate(${-rotation * 0.5 + 120}deg)`,
          transformOrigin: "center",
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Accent dots at cardinal positions */}
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle + rotation) * (Math.PI / 180);
        return (
          <circle
            key={angle}
            cx={cx + outerR * Math.cos(rad)}
            cy={cy + outerR * Math.sin(rad)}
            r={1.2}
            fill="var(--os-accent)"
            opacity={hoverActive ? 0.4 : 0.15}
            style={{ transition: "opacity 0.6s ease" }}
          />
        );
      })}
    </svg>
  );
}

// ─── Cursor Orbit Dot ────────────────────────────────────────────
function CursorOrbit({ mouse, active, photoRadius }) {
  if (!active) return null;
  const angle = Math.atan2(mouse.y, mouse.x);
  const r = photoRadius + 20;
  const x = Math.cos(angle) * r;
  const y = Math.sin(angle) * r;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "var(--os-accent)",
        opacity: 0.4,
        boxShadow:
          "0 0 10px rgba(90,169,255,0.3), 0 0 20px rgba(90,169,255,0.1)",
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}

// ─── Ambient Glow ────────────────────────────────────────────────
function AmbientGlow({ size, hoverActive }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: size * 2.8,
        height: size * 2.8,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(90,169,255,${hoverActive ? 0.06 : 0.025}) 0%, transparent 70%)`,
        pointerEvents: "none",
        transition: "background 0.8s ease",
        zIndex: 0,
      }}
    />
  );
}

// ─── Cursor-Reactive Dot Grid ────────────────────────────────────
function DotGrid({ mouse, active }) {
  const cols = 24;
  const rows = 16;
  const spacing = 40;
  const dots = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * spacing;
      const y = r * spacing;
      dots.push({ x, y, key: `${r}-${c}` });
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {dots.map((dot) => {
        // Distance from cursor (normalized -1..1 to pixel space)
        const mx = (mouse.x * 0.5 + 0.5) * cols * spacing;
        const my = (mouse.y * 0.5 + 0.5) * rows * spacing;
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;
        const proximity = active ? Math.max(0, 1 - dist / maxDist) : 0;

        return (
          <div
            key={dot.key}
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              width: 1.5 + proximity * 2.5,
              height: 1.5 + proximity * 2.5,
              borderRadius: "50%",
              background: `rgba(90,169,255,${0.03 + proximity * 0.15})`,
              transform: "translate(-50%, -50%)",
              transition:
                "width 0.3s ease, height 0.3s ease, background 0.3s ease",
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Tech Stack Ticker ───────────────────────────────────────────
function TechTicker() {
  const techs = [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "Docker",
    "AWS",
    "Linux",
    "MongoDB",
    "CI/CD",
    "Networking",
    "Git",
    "SQL",
    "Next.js",
  ];
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % techs.length);
        setFading(false);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        color: "var(--os-text-dim)",
        letterSpacing: "1px",
        textAlign: "center",
        marginTop: 6,
        height: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}
    >
      <span style={{ opacity: 0.3 }}>/</span>
      <span
        style={{
          opacity: fading ? 0 : 0.5,
          transition: "opacity 0.3s ease",
          color: "var(--os-accent)",
        }}
      >
        {techs[index]}
      </span>
      <span style={{ opacity: 0.3 }}>/</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function SystemCore({ onOpenApp }) {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hoverActive, setHoverActive] = useState(false);
  const [isMobile, setIsMobile] = useState(() => isMobileDevice());
  const [isTablet, setIsTablet] = useState(() => isTabletDevice());
  const [entered, setEntered] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handle = () => {
      setIsMobile(isMobileDevice());
      setIsTablet(isTabletDevice());
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

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
    const leave = () => {
      setHoverActive(false);
      setMouse({ x: 0, y: 0 });
    };
    window.addEventListener("mousemove", move, { passive: true });
    containerRef.current?.addEventListener("mouseenter", enter);
    containerRef.current?.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      containerRef.current?.removeEventListener("mouseenter", enter);
      containerRef.current?.removeEventListener("mouseleave", leave);
    };
  }, [isMobile]);

  const photoRadius = isMobile ? 54 : isTablet ? 58 : 66;
  const photoDiameter = photoRadius * 2;
  // Ring container is photo + gap + ring thickness
  const ringOuter = photoRadius + 20;
  const ringContainer = ringOuter * 2 + 4;
  const e = entered;

  const fadeStyle = (delay) => ({
    opacity: e ? 1 : 0,
    transform: e ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Cursor-reactive dot grid — behind everything */}
      {!isMobile && <DotGrid mouse={mouse} active={hoverActive} />}

      {/* Center composition */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          maxWidth: 520,
          width: "100%",
          padding: isMobile ? "0 24px" : "0 40px",
        }}
      >
        {/* ── PHOTO with Ring ── */}
        <div
          style={{
            position: "relative",
            width: ringContainer,
            height: ringContainer,
            marginBottom: isMobile ? 16 : 24,
            ...fadeStyle(0),
          }}
        >
          {/* Ambient glow */}
          <AmbientGlow size={photoRadius} hoverActive={hoverActive} />

          {/* Ring frame — photo sits inside this */}
          <RingFrame photoRadius={photoRadius} hoverActive={hoverActive} />

          {/* Circular photo — centered in the ring container */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: photoDiameter,
              height: photoDiameter,
              borderRadius: "50%",
              overflow: "hidden",
              zIndex: 1,
              border: "2px solid rgba(90,169,255,0.12)",
              boxShadow: hoverActive
                ? "0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(90,169,255,0.06)"
                : "0 8px 40px rgba(0,0,0,0.4)",
              transition: "box-shadow 0.6s ease",
            }}
          >
            <img
              src={smithImg}
              alt={profile.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: hoverActive
                  ? "brightness(1.06) saturate(1.05)"
                  : "brightness(0.98)",
                transition: "filter 0.6s ease",
              }}
            />
          </div>

          {/* Cursor orbit dot */}
          <CursorOrbit
            mouse={mouse}
            active={hoverActive && !reducedMotion.current}
            photoRadius={photoRadius}
          />
        </div>

        {/* ── NAME ── */}
        <h1
          style={{
            fontSize: isMobile ? 32 : isTablet ? 42 : 50,
            fontWeight: 800,
            color: "var(--os-text)",
            margin: 0,
            letterSpacing: "-1px",
            lineHeight: 1.0,
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
            textShadow: hoverActive ? "0 0 40px rgba(90,169,255,0.06)" : "none",
            transition: "text-shadow 0.6s ease",
            ...fadeStyle(0.1),
          }}
        >
          {profile.name}
        </h1>

        {/* ── SEPARATOR ── */}
        <div
          style={{
            width: 40,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--os-accent), transparent)",
            opacity: 0.3,
            marginTop: 14,
            marginBottom: 14,
            ...fadeStyle(0.18),
          }}
        />

        {/* ── ROLE ── */}
        <div
          style={{
            fontSize: isMobile ? 10 : 11,
            fontWeight: 600,
            background:
              "linear-gradient(135deg, var(--os-accent), var(--os-purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "3.5px",
            fontFamily: "'JetBrains Mono', monospace",
            textAlign: "center",
            ...fadeStyle(0.22),
          }}
        >
          SOFTWARE ENGINEER
        </div>

        {/* ── FOCUS ── */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            ...fadeStyle(0.3),
          }}
        >
          {[
            "Web Development",
            "DevOps",
            "Cloud",
            "Network security",
            "Network Architecture",
          ].map((f) => (
            <span
              key={f}
              style={{
                fontSize: 10,
                color: "var(--os-text-dim)",
                padding: "4px 14px",
                border: "1px solid var(--os-border-subtle)",
                borderRadius: 20,
                letterSpacing: "0.3px",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.borderColor = "rgba(90,169,255,0.2)";
                ev.currentTarget.style.color = "var(--os-text-secondary)";
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.borderColor = "var(--os-border-subtle)";
                ev.currentTarget.style.color = "var(--os-text-dim)";
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* ── DESCRIPTION ── */}
        <div
          style={{
            fontSize: isMobile ? 14 : 16,
            color: "var(--os-text-secondary)",
            marginTop: 20,
            lineHeight: 1.7,
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
            maxWidth: 400,
            ...fadeStyle(0.4),
          }}
        >
          Building software, infrastructure, and networks that work as one
          system.
        </div>

        {/* ── TECH TICKER ── */}
        <div style={{ ...fadeStyle(0.45) }}>
          <TechTicker />
        </div>

        {/* ── CTAs ── */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 24,
            justifyContent: "center",
            ...fadeStyle(0.5),
          }} 
        >

          <button
            onClick={() => onOpenApp("projects")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: isMobile ? "9px 18px" : "9px 18px",
              borderRadius: 10,
              background:
                "linear-gradient(135deg, rgba(90,169,255,0.12), rgba(139,124,255,0.08))",
              border: "1px solid rgba(90,169,255,0.25)",
              color: "var(--os-accent)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              // transition: "all 0.3s ease",
              transition: 'all 0.2s',
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.3px",
              boxShadow: "0 4px 20px rgba(90,169,255,0.06)",
            }}
            onMouseEnter={(ev) => {
              ev.target.style.background =
                "linear-gradient(135deg, rgba(90,169,255,0.2), rgba(139,124,255,0.14))";
              ev.target.style.borderColor = "rgba(90,169,255,0.4)";
              ev.target.style.transform = "translateY(-1px)";
              ev.target.style.boxShadow = "0 8px 30px rgba(90,169,255,0.12)";
            }}
            onMouseLeave={(ev) => {
              ev.target.style.background =
                "linear-gradient(135deg, rgba(90,169,255,0.12), rgba(139,124,255,0.08))";
              ev.target.style.borderColor = "rgba(90,169,255,0.25)";
              ev.target.style.transform = "translateY(0)";
              ev.target.style.boxShadow = "0 4px 20px rgba(90,169,255,0.06)";
            }}
          >
            view Work <FiArrowRight size={13} />
          </button>


          <button
            onClick={() => onOpenApp("contact")}
            // style={{
            //   padding: isMobile ? "11px 22px" : "12px 28px",
            //   borderRadius: 10, background: 'rgba(114,230,177,0.05)',
            //   border: '1px solid rgba(114,230,177,0.05)',
            //   color: 'var(--os-text-muted)', fontSize: 13, fontWeight: 500,
            //   cursor: 'pointer',
            //   transition: 'all 0.3s ease',
            //   // transition: 'all 0.2s',
            //   fontFamily: 'Inter, sans-serif',
            // }}
            // onMouseEnter={(ev) => {
            //   ev.target.style.borderColor = 'rgba(114,230,177,0.05)';
            //   ev.target.style.color = 'var(--os-text)';
            //   ev.target.style.transition = 'all 0.2s';
            //   ev.target.style.background = 'rgba(114,230,177,0.05)';
            // }}
            // onMouseLeave={(ev) => {
            //   ev.target.style.borderColor = 'rgba(114,230,177,0.05)';
            //   ev.target.style.color = 'var(--os-text-muted)';
            //   ev.target.style.transition = 'all 0.2s';
            //   ev.target.style.background = 'rgba(114,230,177,0.05)';
            // }}
             style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: isMobile ? "9px 18px" : "9px 18px",
              borderRadius: 10,
              background:
                "linear-gradient(135deg, rgba(114,230,177,0.05), rgba(114,230,177,0.05))",
              border: "1px solid rgba(114,230,177,0.12)",
              color: "var(--os-success)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              // transition: "all 0.3s ease",
              transition: 'all 0.2s',
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.3px",
              boxShadow: "0 4px 20px rgba(114,230,177,0.05)",
            }}
            onMouseEnter={(ev) => {
              ev.target.style.background =
                "linear-gradient(135deg, rgba(114,230,177,0.05), rgba(114,230,177,0.05))";
              ev.target.style.borderColor = "rgba(114,230,177,0.12)";
              ev.target.style.transform = "translateY(-1px)";
              ev.target.style.boxShadow = "0 8px 30px rgba(114,230,177,0.05)";
            }}
            onMouseLeave={(ev) => {
              ev.target.style.background =
                "linear-gradient(135deg, rgba(114,230,177,0.05), rgba(114,230,177,0.05)))";
              ev.target.style.borderColor = "rgba(114,230,177,0.12)";
              ev.target.style.transform = "translateY(0)";
              ev.target.style.boxShadow = "0 4px 20px rgba(114,230,177,0.05)";
            }}
          >
            Contact
          </button>
        </div>




        {/* ── SOCIAL + STATS ── */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 22,
            justifyContent: "center",
            alignItems: "center",
            ...fadeStyle(0.6),
          }}
        >
          {[
            { href: profile.social.github, icon: FiGithub, label: "GitHub" },
            {
              href: profile.social.linkedin,
              icon: FiLinkedin,
              label: "LinkedIn",
            },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 8,
                border: "1px solid rgba(36,48,68,0.25)",
                color: "var(--os-text-dim)",
                transition: "all 0.25s ease",
                fontSize: 11,
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.color = "var(--os-accent)";
                ev.currentTarget.style.borderColor = "rgba(90,169,255,0.2)";
                ev.currentTarget.style.background = "rgba(90,169,255,0.04)";
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.color = "var(--os-text-dim)";
                ev.currentTarget.style.borderColor = "rgba(36,48,68,0.25)";
                ev.currentTarget.style.background = "transparent";
              }}
            >
              <Icon size={13} strokeWidth={1.5} /> {label}
            </a>
          ))}
        </div>

        {/* ── QUICK STATS ── */}
        {/* <div style={{
          display: 'flex', gap: 16, marginTop: 16,
          justifyContent: 'center',
          fontSize: 10,
          fontFamily: "'JetBrains Mono', monospace",
          color: 'var(--os-text-dim)',
          letterSpacing: '0.5px',
          opacity: 0.5,
          ...fadeStyle(0.7),
        }}>
          <span>Projects</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span> Position</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span> Resolved Issues</span>
        </div> */}

        {/* ── KEYBOARD HINTS ── */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 20,
              justifyContent: "center",
              fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--os-text-dim)",
              opacity: 0.3,
              ...fadeStyle(0.8),
            }}
          >
            <span>
              <kbd style={kbdStyle}>
                {navigator.platform?.includes("Mac") ? "⌘" : "Ctrl+"}K
              </kbd>{" "}
              Search
            </span>
            <span>
              <kbd style={kbdStyle}>Alt+T</kbd> Terminal
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const kbdStyle = {
  display: "inline-block",
  padding: "1px 5px",
  background: "rgba(36,48,68,0.2)",
  border: "1px solid rgba(36,48,68,0.3)",
  borderRadius: 3,
  fontSize: 9,
  fontFamily: "'JetBrains Mono', monospace",
  color: "var(--os-accent)",
};
