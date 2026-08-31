import { useState, useEffect } from 'react';

export function useKeyboardShortcuts(handlers = {}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === 'k') {
        e.preventDefault();
        handlers.quickNav?.();
      }
      if (modifier && e.key === 't') {
        e.preventDefault();
        handlers.openTerminal?.();
      }
      if (modifier && e.shiftKey && e.key === 'H') {
        e.preventDefault();
        handlers.openStartHere?.();
      }
      if (e.key === 'Escape') {
        handlers.escape?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
