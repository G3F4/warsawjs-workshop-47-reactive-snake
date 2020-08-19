import React, {useEffect, useRef, useState} from 'react';
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
  const [speed, setSpeed] = useState(1000);
  const direction = useRef('up');

  useEffect(() => {
    const interval = setInterval(() => {
      const [snakeHead] = snake;
      const newSnakeHead = { ...snakeHead };
      const fruitEaten = fruit.cellIndex === newSnakeHead.cellIndex && fruit.rowIndex === newSnakeHead.rowIndex;

      if (fruitEaten) {
        setFruit({
          rowIndex: randomNumberFromZeroN(gridSize),
          cellIndex: randomNumberFromZeroN(gridSize),
        });
        setSpeed(s => s * 0.9);
      }

      if (direction.current === 'up') {
        newSnakeHead.rowIndex -= 1;
      } else if (direction.current === 'down') {
        newSnakeHead.rowIndex += 1;
      } else if (direction.current === 'right') {
        newSnakeHead.cellIndex += 1;
      } else if (direction.current === 'left') {
        newSnakeHead.cellIndex -= 1;
      }

      const newSnake = fruitEaten
        ? [newSnakeHead, ...snake.slice(0, snake.length)]
        : [newSnakeHead, ...snake.slice(0, snake.length - 1)];

      setSnake(newSnake);
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed, direction, snake]); // TODO wywalić zależność do snake z tego efektu

  function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
      direction.current = 'up'
    } else if (event.key === 'ArrowDown') {
      direction.current = 'down'
    } else if (event.key === 'ArrowLeft') {
      direction.current = 'left'
    } else if (event.key === 'ArrowRight') {
      direction.current = 'right'
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

  return (
    <div className="App">
      <Grid gridSize={gridSize} fruit={fruit} snake={snake} />
    </div>
  );
}

export default App;
