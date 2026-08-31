import { useState, useEffect } from 'react';

// Detect if the device is actually a phone/tablet even when requesting desktop site.
// Uses multiple signals: viewport width, touch capability, device screen size.
function detectMobile(breakpoint) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  // Standard width-based check
  if (w <= breakpoint) return true;

  // If viewport is narrow-ish (<1100) AND device has touch + small physical screen,
  // it's likely a phone/tablet in desktop mode
  const isTouch = navigator.maxTouchPoints > 0;
  const isSmallScreen = (screen.width <= 500 || screen.height <= 500);
  const isMediumViewport = w <= 1100;

  if (isTouch && isSmallScreen && isMediumViewport) return true;

  // Extra: if viewport height is very small relative to width, likely phone landscape
  if (isTouch && h < 500 && w < 1200) return true;

  return false;
}

function detectTablet() {
  const w = window.innerWidth;
  const isTouch = navigator.maxTouchPoints > 0;
  const isSmallScreen = (screen.width <= 500 || screen.height <= 500);

  // Standard tablet range
  if (w > 768 && w <= 1024) return true;

  // Phone in desktop mode — could be tablet
  if (isTouch && !isSmallScreen && w > 768 && w <= 1200) return true;

  return false;
}

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => detectMobile(breakpoint));

  useEffect(() => {
    const handleResize = () => setIsMobile(detectMobile(breakpoint));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export function useIsTablet(breakpoint = 1024) {
  const [isTablet, setIsTablet] = useState(() => detectTablet());

  useEffect(() => {
    const handleResize = () => setIsTablet(detectTablet());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isTablet;
}
