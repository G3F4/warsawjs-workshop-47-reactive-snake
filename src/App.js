import React from 'react';
import GameGrid from './game/GameGrid';

const GridSize = 10;

function App() {
  return (
    <GameGrid gridSize={GridSize} />
  );
}

export default App;
