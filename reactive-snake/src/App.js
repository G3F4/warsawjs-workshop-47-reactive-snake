import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Grid from './Grid';

function randomIndex(n) {
  return Math.floor(Math.random() * n);
}

function App() {
  const gridSize = 10;
  const [snake, setSnake] = useState([
    { x: gridSize / 2, y: gridSize / 2 },
    { x: gridSize / 2, y: gridSize / 2 + 1 },
    { x: gridSize / 2, y: gridSize / 2 + 2 },
  ]);
  const [fruit, setFruit] = useState({
    x: randomIndex(gridSize),
    y: randomIndex(gridSize),
  });
  const [speed, setSpeed] = useState(1000);
  const direction = useRef('up');

  useEffect(() => {
    const interval = setInterval(() => {
      const [snakeHead] = snake;
      const newSnakeHead = { ...snakeHead };

      if (direction.current === 'up') {
        newSnakeHead.x -= 1;
      } else if (direction.current === 'down') {
        newSnakeHead.x += 1;
      } else if (direction.current === 'right') {
        newSnakeHead.y += 1;
      } else if (direction.current === 'left') {
        newSnakeHead.y -= 1;
      }

      const fruitEaten = fruit.y === newSnakeHead.y && fruit.x === newSnakeHead.x;

      if (fruitEaten) {
        setFruit({
          x: randomIndex(gridSize),
          y: randomIndex(gridSize),
        });
        setSpeed(s => s * 0.9);
      }

      const newSnake = fruitEaten
        ? [newSnakeHead, ...snake.slice(0, snake.length)]
        : [newSnakeHead, ...snake.slice(0, snake.length - 1)];

      setSnake(newSnake);
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed, direction, snake, fruit]);

  function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
      direction.current = 'up';
    } else if (event.key === 'ArrowDown') {
      direction.current = 'down';
    } else if (event.key === 'ArrowLeft') {
      direction.current = 'left';
    } else if (event.key === 'ArrowRight') {
      direction.current = 'right';
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
