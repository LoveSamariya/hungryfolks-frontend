import { useState, useEffect } from 'react';

function useTimeOutHook({ timer, onComplete = () => {} }) {
  const [tick, setTick] = useState(timer);

  useEffect(() => {
    if (tick > 0) {
      setTimeout(() => setTick(tick - 1), 1000);
    } else {
      onComplete();
    }
  }, [tick]);

  return { tick, setTick };
}

export { useTimeOutHook };
