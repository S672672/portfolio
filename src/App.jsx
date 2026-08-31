import React, { useState, useCallback } from 'react';
import BootCinematic from './components/BootCinematic';
import Desktop from './components/Desktop';
import RecruiterView from './components/apps/RecruiterView';

function App() {
  const [booted, setBooted] = useState(() => {
    return sessionStorage.getItem('smithos-booted') === 'true';
  });
  const [showRecruiter, setShowRecruiter] = useState(false);

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem('smithos-booted', 'true');
    setBooted(true);
  }, []);

  if (!booted) {
    return <BootCinematic onComplete={handleBootComplete} />;
  }

  return (
    <>
      <Desktop onOpenRecruiter={() => setShowRecruiter(true)} />
      {showRecruiter && <RecruiterView onClose={() => setShowRecruiter(false)} />}
    </>
  );
}

export default App;
