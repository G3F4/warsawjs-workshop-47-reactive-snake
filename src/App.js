import React, { useState } from 'react';
import GameGrid from './game/GameGrid';
import useGame from './game/useGame';

const GridSize = 10;
const SpeedMultiplier = 0.8;

function App() {
  const [speed, setSpeed] = useState(500);
  const { fruit, snake } = useGame({ speed, gridSize: GridSize, increaseSpeed })

  function increaseSpeed() {
    setSpeed(speed * SpeedMultiplier);
  }

  return (
    <GameGrid gridSize={GridSize} fruit={fruit} snake={snake} />
  );
}

export default App;
