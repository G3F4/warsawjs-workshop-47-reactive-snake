import React, { useState } from 'react';
import GameContext from './game/GameContext';
import Game from './game/Game';

const GridSize = 10;
const SpeedMultiplier = 0.8;

function App() {
  const [speed, setSpeed] = useState(500);

  function increaseSpeed() {
    setSpeed(speed * SpeedMultiplier);
  }

  return (
    <GameContext.Provider value={{ speed, gridSize: GridSize, increaseSpeed }}>
      <Game />
    </GameContext.Provider>
  );
}

export default App;
