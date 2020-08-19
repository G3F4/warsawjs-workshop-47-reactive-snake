import React, { useState } from 'react';
import './App.css';
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
      <div className="App">
        <Game />
      </div>
    </GameContext.Provider>
  );
}

export default App;
