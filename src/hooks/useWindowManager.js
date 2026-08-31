import { useState, useCallback } from 'react';

let nextZIndex = 100;

export function useWindowManager() {
  const [windows, setWindows] = useState([]);

  const openWindow = useCallback((appId, title, component, options = {}) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId);
      if (existing) {
        if (existing.minimized) {
          return prev.map((w) =>
            w.appId === appId
              ? { ...w, minimized: false, zIndex: ++nextZIndex, focused: true }
              : { ...w, focused: false }
          );
        }
        return prev.map((w) =>
          w.appId === appId
            ? { ...w, zIndex: ++nextZIndex, focused: true }
            : { ...w, focused: false }
        );
      }
      const isMobile = window.innerWidth <= 768;
      const w = isMobile ? window.innerWidth : Math.min(750, window.innerWidth - 100);
      const h = isMobile
        ? window.innerHeight - 84
        : Math.min(550, window.innerHeight - 150);
      const x = isMobile ? 0 : Math.max(20, (window.innerWidth - w) / 2 + (prev.length % 5) * 30);
      const y = isMobile ? 0 : Math.max(40, (window.innerHeight - h) / 2 + (prev.length % 5) * 20);

      return [
        ...prev.map((w) => ({ ...w, focused: false })),
        {
          id: `${appId}-${Date.now()}`,
          appId,
          title,
          component,
          x,
          y,
          width: w,
          height: h,
          minimized: false,
          maximized: false,
          zIndex: ++nextZIndex,
          focused: true,
          options,
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true, focused: false } : w))
    );
  }, []);

  const toggleMaximize = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized, zIndex: ++nextZIndex, focused: true } : { ...w, focused: false }
      )
    );
  }, []);

  const focusWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: ++nextZIndex, focused: true, minimized: false } : { ...w, focused: false }
      )
    );
  }, []);

  const moveWindow = useCallback((id, x, y) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    moveWindow,
  };
}
