import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useWindowManager } from '../hooks/useWindowManager';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useIsMobile, useIsTablet } from '../hooks/useIsMobile';
import TopBar from './TopBar';
import Dock from './Dock';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import AnalogClock from './AnalogClock';
import StatusPanel from './StatusPanel';
import SystemCore from './SystemCore';
import RecruiterView from './apps/RecruiterView';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import ExperienceApp from './apps/ExperienceApp';
import SkillsApp from './apps/SkillsApp';
import JourneyApp from './apps/JourneyApp';
import ExploringApp from './apps/ExploringApp';
import TerminalApp from './apps/TerminalApp';
import ResumeApp from './apps/ResumeApp';
import ContactApp from './apps/ContactApp';
import StartHereApp from './apps/StartHereApp';
import IncidentsApp from './apps/IncidentsApp';
import SearchApp from './apps/SearchApp';
import DigitalCloud from './DigitalCloud';
import { FiFolder, FiBriefcase, FiMap, FiCpu, FiTerminal, FiFileText, FiMail, FiInfo, FiAlertTriangle, FiStar, FiSearch } from 'react-icons/fi';

const primaryIcons = [
  { id: 'projects', label: 'Projects', icon: FiFolder, component: ProjectsApp, title: 'Projects — File Explorer' },
  { id: 'experience', label: 'Experience', icon: FiBriefcase, component: ExperienceApp, title: 'Experience' },
  { id: 'journey', label: 'Journey', icon: FiMap, component: JourneyApp, title: 'My Journey' },
  { id: 'skills', label: 'Skills', icon: FiCpu, component: SkillsApp, title: 'Skills' },
  { id: 'terminal', label: 'Terminal', icon: FiTerminal, component: TerminalApp, title: 'SmithOS Terminal' },
  { id: 'resume', label: 'Resume', icon: FiFileText, component: ResumeApp, title: 'Resume' },
  { id: 'contact', label: 'Contact', icon: FiMail, component: ContactApp, title: 'Contact — New Connection' },
];

const allApps = [
  ...primaryIcons,
  { id: 'about', label: 'About Me', icon: FiInfo, component: AboutApp, title: 'About Me' },
  { id: 'starthere', label: 'START_HERE.md', icon: FiStar, component: StartHereApp, title: 'START_HERE.md — Welcome Guide' },
  { id: 'exploring', label: 'Currently Exploring', icon: FiSearch, component: ExploringApp, title: 'Currently Exploring' },
  { id: 'incidents', label: 'Incidents', icon: FiAlertTriangle, component: IncidentsApp, title: 'Incidents — Engineering Reports' },
  { id: 'search', label: 'Search', icon: FiSearch, component: SearchApp, title: 'Workspace Search' },
];

export default function Desktop() {
  const { windows, openWindow, closeWindow, minimizeWindow, toggleMaximize, focusWindow, moveWindow } = useWindowManager();
  const [showRecruiter, setShowRecruiter] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const showCompact = isMobile || isTablet;
  const [sessionStart] = useState(() => Date.now());
  const [foldersOpen, setFoldersOpen] = useState(false);
  const [entryPhase, setEntryPhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [timePulse, setTimePulse] = useState(null);
  const [energyRipple, setEnergyRipple] = useState(null);

  // Time pulse — clock sends subtle light through environment every second
  const handleSecondTick = useCallback((now) => {
    setTimePulse(now.getSeconds());
    setTimeout(() => setTimePulse(null), 800);
  }, []);

  // Staggered desktop entry
  useEffect(() => {
    if (isMobile) { setEntryPhase(5); return; }
    const timers = [
      setTimeout(() => setEntryPhase(1), 100),
      setTimeout(() => setEntryPhase(2), 250),
      setTimeout(() => setEntryPhase(3), 400),
      setTimeout(() => setEntryPhase(4), 600),
      setTimeout(() => setEntryPhase(5), 800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isMobile]);

  // Subtle mouse parallax
  useEffect(() => {
    if (isMobile) return;
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 4;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  // Energy ripple on background click
  const handleDesktopClick = useCallback((e) => {
    // Only trigger on the background, not on UI elements
    if (e.target === e.currentTarget || e.target.style.pointerEvents === 'none') {
      const rect = e.currentTarget.getBoundingClientRect();
      setEnergyRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setTimeout(() => setEnergyRipple(null), 1200);
    }
  }, []);

  const openApp = useCallback(
    (appId, existingWindowId) => {
      if (existingWindowId) { focusWindow(existingWindowId); return; }
      const app = allApps.find((a) => a.id === appId);
      if (app) openWindow(app.id, app.title, app.component, { onOpenApp: openApp });
    },
    [openWindow, focusWindow]
  );

  const handlers = useMemo(
    () => ({
      quickNav: () => openApp('search'),
      openTerminal: () => openApp('terminal'),
      openStartHere: () => openApp('starthere'),
      escape: () => {
        if (showRecruiter) setShowRecruiter(false);
        else { const topWindow = windows.find((w) => w.focused); if (topWindow) closeWindow(topWindow.id); }
      },
    }),
    [windows, openApp, closeWindow, showRecruiter]
  );

  useKeyboardShortcuts(handlers);

  const focusedAppId = windows.find((w) => w.focused && !w.minimized)?.appId;

  return (
    <div
      onClick={handleDesktopClick}
      style={{
        width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
        background: 'var(--os-bg)', cursor: 'default',
      }}
    >
      {/* === DIGITAL ENGINEERING CLOUD BACKGROUND === */}
      <DigitalCloud mousePos={mousePos} activeApp={focusedAppId} timePulse={timePulse} energyRipple={energyRipple} />

      {/* === TOP BAR === */}
      <TopBar
        onOpenRecruiter={() => setShowRecruiter(true)}
        entryReady={entryPhase >= 2}
        onToggleFolders={() => setFoldersOpen((v) => !v)}
        foldersOpen={foldersOpen}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* === MAIN WORKSPACE LAYOUT === */}
      <div style={{
        position: 'absolute', top: 'var(--topbar-height)', left: 0, right: 0,
        bottom: 'var(--taskbar-height)',
        display: 'flex',
        opacity: entryPhase >= 3 ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}>
        {/* LEFT: Desktop icons — desktop & tablet only */}
        {!isMobile && (
          <div style={{
            width: 110, padding: '16px 8px',
            display: 'flex', flexDirection: 'column', gap: 4, alignContent: 'start',
            opacity: entryPhase >= 4 ? 1 : 0,
            transition: 'opacity 0.4s ease-out 0.2s',
          }}>
            {primaryIcons.map((app, i) => (
              <div key={app.id} style={{
                opacity: entryPhase >= 4 ? 1 : 0,
                transform: entryPhase >= 4 ? 'translateX(0)' : 'translateX(-12px)',
                transition: `all 0.3s ease-out ${i * 50}ms`,
              }}>
                <DesktopIcon label={app.label} icon={app.icon} onClick={() => openApp(app.id)} />
              </div>
            ))}
          </div>
        )}

        {/* CENTER: System Core — scrollable profile hub */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <SystemCore onOpenApp={openApp} />
        </div>

        {/* RIGHT: Clock + System Area — desktop only (mobile shows clock in topbar) */}
        {!isMobile && (
          <div style={{
            width: isTablet ? 180 : 220, padding: '12px 16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            opacity: entryPhase >= 3 ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.3s',
          }}>
            <AnalogClock onSessionStart={sessionStart} onSecondTick={handleSecondTick} />
            <StatusPanel />
          </div>
        )}
      </div>

      {/* === WINDOWS === */}
      {windows.map((win) => (
        <Window key={win.id} win={win}
          onClose={closeWindow} onMinimize={minimizeWindow}
          onMaximize={toggleMaximize} onFocus={focusWindow} onMove={moveWindow} />
      ))}      {/* === DOCK === */}
      <Dock windows={windows} onOpenApp={openApp} entryReady={entryPhase >= 5} />

      {/* === MOBILE/TABLET FOLDER DRAWER === */}
      {showCompact && (
        <>
          {/* Overlay backdrop */}
          {foldersOpen && (
            <div
              onClick={() => setFoldersOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(8,11,18,0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 9800,
                animation: 'fadeIn 0.2s ease-out',
              }}
            />
          )}
          {/* Drawer panel */}
          <div className="os-nav-drawer" style={{
            position: 'fixed',
            top: 'var(--topbar-height)', left: 0, bottom: 0,
            width: isTablet ? 260 : 240,
            background: 'rgba(10,14,22,0.96)',
            backdropFilter: 'blur(24px)',
            borderRight: '1px solid var(--os-border-subtle)',
            zIndex: 9850,
            transform: foldersOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
            display: 'flex', flexDirection: 'column',
            padding: '16px 12px',
            overflowY: 'auto',
          }}>
            {/* Drawer header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 8px 12px', borderBottom: '1px solid var(--os-border-subtle)',
              marginBottom: 8,
            }}>
              <span style={{
                fontSize: 9, color: 'var(--os-text-faint)', letterSpacing: '1.5px',
                fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
              }}>
                NAVIGATION
              </span>
              <button
                onClick={() => setFoldersOpen(false)}
                aria-label="Close navigation"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 24, height: 24, borderRadius: 5, cursor: 'pointer',
                  background: 'rgba(230,114,114,0.06)', border: '1px solid rgba(230,114,114,0.12)',
                  color: 'var(--os-error)', fontSize: 12, fontWeight: 700,
                  transition: 'all 0.15s', padding: 0, lineHeight: 1,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(230,114,114,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(230,114,114,0.06)'; }}
              >
                ✕
              </button>
            </div>

            {/* Folder items */}
            {primaryIcons.map((app, i) => (
              <button
                key={app.id}
                onClick={() => { openApp(app.id); setFoldersOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 12px', borderRadius: 8, cursor: 'pointer',
                  background: 'transparent', border: 'none',
                  color: 'var(--os-text-secondary)',
                  fontSize: 13, fontWeight: 500,
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                  width: '100%', textAlign: 'left',
                  opacity: 0,
                  transform: 'translateX(-8px)',
                  animation: foldersOpen ? `fadeIn 0.2s ease-out ${i * 40}ms forwards` : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(90,169,255,0.06)';
                  e.currentTarget.style.color = 'var(--os-text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--os-text-secondary)';
                }}
              >
                <app.icon size={16} strokeWidth={1.5} style={{ color: 'var(--os-accent)', flexShrink: 0 }} />
                {app.label}
              </button>
            ))}


          </div>
        </>
      )}

      {/* === RECRUITER VIEW === */}
      {showRecruiter && <RecruiterView onClose={() => setShowRecruiter(false)} />}
    </div>
  );
}
