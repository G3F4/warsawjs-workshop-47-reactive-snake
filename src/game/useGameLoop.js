import { useEffect } from 'react';

export default function useGameLoop({ onTick, speed }) {
  useEffect(() => {
    const interval = setInterval(onTick, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed, onTick]);
}
