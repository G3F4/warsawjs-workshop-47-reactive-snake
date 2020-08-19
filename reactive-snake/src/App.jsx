import React, { useState } from 'react';
import GameContext from './GameContext';
import Game from './Game';

function App() {
  const [speed, setSpeed] = useState(500);
  const [paused, setPaused] = useState(true);
  const gridSize = 10;
  const gameContextValue = { speed, gridSize, paused, increaseSpeed, pauseGame, unpauseGame };

  function increaseSpeed() {
    setSpeed(speed * 0.8);
  }

  function pauseGame() {
    setPaused(true);
  }

  function unpauseGame() {
    setPaused(false);
  }

  return (
    <GameContext.Provider value={gameContextValue}>
      <Game />
    </GameContext.Provider>
  );
}

export default App;
