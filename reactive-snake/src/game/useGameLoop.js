import { useContext, useEffect } from 'react';
import GameContext from './GameContext';

export default function useGameLoop(onTick) {
  const { speed } = useContext(GameContext);

  useEffect(() => {
    const interval = setInterval(onTick, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed, onTick]);
}