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
  const direction = 'top';

  useEffect(() => {
    const interval = setInterval(() => {
      const [snakeHead] = snake;
      const newSnakeHead = { ...snakeHead };

      if (direction === 'top') {
        newSnakeHead.rowIndex -= 1;
      } else if (direction === 'bottom') {
        newSnakeHead.rowIndex += 1;
      } else if (direction === 'right') {
        newSnakeHead.cellIndex += 1;
      } else if (direction === 'left') {
        newSnakeHead.cellIndex -= 1;
      }

      const newSnake = [newSnakeHead, ...snake.slice(0, snake.length - 1)];

      setSnake(newSnake);
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed, direction, snake]); // TODO wywalić zależność do snake z tego efektu

  return (
    <div className="App">
      <Grid gridSize={gridSize} fruit={fruit} snake={snake} />
    </div>
  );
}

export default App;
