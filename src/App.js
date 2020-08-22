import React, { useCallback, useState } from 'react';
import GameContext from './game/GameContext';
import Game from './game/Game';

const GridSize = 10;
const SpeedMultiplier = 0.8;

function App() {
  const [speed, setSpeed] = useState(500);
  const [paused, setPaused] = useState(true);

  const increaseSpeed = useCallback(() => {
    setSpeed(s => s * SpeedMultiplier);
  }, []);

  const pauseGame = useCallback(() => {
    setPaused(true);
  }, []);

  const unpauseGame = useCallback(() => {
    setPaused(false);
  }, []);

  return (
    <GameContext.Provider value={{ speed, gridSize: GridSize, paused, increaseSpeed, pauseGame, unpauseGame }}>
      <Game />
    </GameContext.Provider>
  );
}

export default App;
