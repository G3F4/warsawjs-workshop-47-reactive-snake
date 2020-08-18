import React from 'react';
import './App.css';
import Grid from './Grid';

function randomNumberFromZeroN(n) {
  return Math.floor(Math.random() * n);
}

function App() {
  const gridSize = 10;
  const snake = [
    { rowIndex: gridSize / 2, cellIndex: gridSize / 2 },
    { rowIndex: gridSize / 2, cellIndex: gridSize / 2 + 1 },
    { rowIndex: gridSize / 2, cellIndex: gridSize / 2 + 2 },
  ];
  const fruit = {
    rowIndex: randomNumberFromZeroN(gridSize),
    cellIndex: randomNumberFromZeroN(gridSize),
  };

  return (
    <div className="App">
      <Grid gridSize={gridSize} fruit={fruit} snake={snake} />
    </div>
  );
}

export default App;
