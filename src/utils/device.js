// Shared device detection — handles desktop mode on mobile phones
export function isMobileDevice() {
  const w = window.innerWidth;
  const isTouch = navigator.maxTouchPoints > 0;
  const isSmallScreen = screen.width <= 500 || screen.height <= 500;

  if (w <= 768) return true;
  if (isTouch && isSmallScreen && w <= 1100) return true;
  if (isTouch && window.innerHeight < 500 && w < 1200) return true;

  return false;
}

export function isTabletDevice() {
  const w = window.innerWidth;
  const isTouch = navigator.maxTouchPoints > 0;
  const isSmallScreen = screen.width <= 500 || screen.height <= 500;

  if (w > 768 && w <= 1024) return true;
  if (isTouch && !isSmallScreen && w > 768 && w <= 1200) return true;

  return false;
}
