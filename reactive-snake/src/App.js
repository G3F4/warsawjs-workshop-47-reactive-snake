import React, {useEffect, useState} from 'react';
import './App.css';
import Grid from './Grid';

function randomNumberFromZeroN(n) {
  return Math.floor(Math.random() * n);
}

function App() {
  const gridSize = 10;
  const [snake, setSnake] = useState([
    { rowIndex: gridSize / 2, cellIndex: gridSize / 2 },
    { rowIndex: gridSize / 2, cellIndex: gridSize / 2 + 1 },
    { rowIndex: gridSize / 2, cellIndex: gridSize / 2 + 2 },
  ]);
  const [fruit, setFruit] = useState({
    rowIndex: randomNumberFromZeroN(gridSize),
    cellIndex: randomNumberFromZeroN(gridSize),
  });
  const speed = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake(snake => snake.map(part => ({
        ...part,
        cellIndex: part.cellIndex - 1,
      })))
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed])

  return (
    <div className="App">
      <Grid gridSize={gridSize} fruit={fruit} snake={snake} />
    </div>
  );
}

export default App;
