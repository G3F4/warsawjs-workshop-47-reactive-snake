import React, { useEffect, useRef, useState } from 'react';
import GameGrid from './game/GameGrid';

function randomIndex(n) {
  return Math.floor(Math.random() * n);
}

const GridSize = 10;
const SpeedMultiplier = 0.8;

function App() {
  const [snake, setSnake] = useState([
    { x: GridSize / 2, y: GridSize / 2 },
    { x: GridSize / 2, y: GridSize / 2 + 1 },
    { x: GridSize / 2, y: GridSize / 2 + 2 },
  ]);
  const [fruit, setFruit] = useState({
    x: randomIndex(GridSize),
    y: randomIndex(GridSize),
  });

  const direction = useRef('up');
  const [speed, setSpeed] = useState(500);

  useEffect(() => {
    const interval = setInterval(() => {
      const [snakeHead] = snake;
      const newSnakeHead = { ...snakeHead };
      const fruitEaten = fruit.x === newSnakeHead.x && fruit.y === newSnakeHead.y;

      if (fruitEaten) {
        setFruit({ x: randomIndex(GridSize), y: randomIndex(GridSize) });
        setSpeed(s => s * SpeedMultiplier);
      }

      if (direction.current === 'up') {
        newSnakeHead.x -= 1;
      } else if (direction.current === 'down') {
        newSnakeHead.x += 1;
      } else if (direction.current === 'right') {
        newSnakeHead.y += 1;
      } else if (direction.current === 'left') {
        newSnakeHead.y -= 1;
      }

      const newSnake = fruitEaten
        ? [newSnakeHead, ...snake.slice(0, snake.length)]
        : [newSnakeHead, ...snake.slice(0, snake.length - 1)];


      setSnake(newSnake);
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [snake, speed]);

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
  }, []);

  return (
    <GameGrid gridSize={GridSize} fruit={fruit} snake={snake} />
  );
}

export default App;
