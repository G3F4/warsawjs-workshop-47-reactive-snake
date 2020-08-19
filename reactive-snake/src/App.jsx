import React, { useState } from 'react';
import GameContext from './GameContext';
import Game from './Game';

function App() {
  const [speed, setSpeed] = useState(500);
  const gridSize = 10;

  function increaseSpeed() {
    setSpeed(speed * 0.8);
  }

  return (
    <GameContext.Provider value={{ speed, gridSize, increaseSpeed }}>
      <Game />
    </GameContext.Provider>
  );
}

export default App;
