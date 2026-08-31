import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Window({ win, onClose, onMinimize, onMaximize, onFocus, onMove }) {
  const dragRef = useRef(null);
  const isMobile = useIsMobile();
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e) => {
      if (isMobile || win.maximized) return;
      if (e.target.closest('.os-window-controls')) return;
      e.preventDefault();
      onFocus(win.id);
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - win.x,
        y: e.clientY - win.y,
      };
    },
    [win.id, win.x, win.y, win.maximized, isMobile, onFocus]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const newX = e.clientX - dragOffset.current.x;
      const newY = Math.max(32, e.clientY - dragOffset.current.y);
      onMove(win.id, newX, newY);
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, win.id, onMove]);

  const style = win.maximized
    ? {}
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
      };

  return (
    <div
      ref={dragRef}
      className={`os-window ${win.maximized ? 'maximized' : ''} ${
        win.minimized ? 'minimized' : ''
      }`}
      style={{
        ...style,
        zIndex: win.zIndex,
        animation: 'windowOpen 0.2s ease-out',
      }}
      onMouseDown={() => onFocus(win.id)}
    >
      <div className="os-window-header" onMouseDown={handleMouseDown}>
        <div className="os-window-controls">
          <button
            className="os-window-dot close"
            onClick={(e) => {
              e.stopPropagation();
              onClose(win.id);
            }}
            aria-label="Close window"
          />
          <button
            className="os-window-dot minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(win.id);
            }}
            aria-label="Minimize window"
          />
          <button
            className="os-window-dot maximize"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(win.id);
            }}
            aria-label="Maximize window"
          />
        </div>
        <span className="os-window-title">{win.title}</span>
        <div style={{ width: 54 }} />
      </div>
      <div className="os-window-body os-scrollbar">
        {React.createElement(win.component, { windowId: win.id, onOpenApp: win.options?.onOpenApp })}
      </div>
    </div>
  );
}
