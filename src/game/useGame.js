import { useEffect, useRef, useState } from 'react';

function randomIndex(n) {
  return Math.floor(Math.random() * n);
}

export default function useGame({ gridSize, speed, increaseSpeed }) {
  const [snake, setSnake] = useState([
    { x: gridSize / 2, y: gridSize / 2 },
    { x: gridSize / 2, y: gridSize / 2 + 1 },
    { x: gridSize / 2, y: gridSize / 2 + 2 },
  ]);
  const [fruit, setFruit] = useState({
    x: randomIndex(gridSize),
    y: randomIndex(gridSize),
  });
  const direction = useRef('up');

  useEffect(() => {
    const interval = setInterval(() => {
      const [snakeHead] = snake;
      const newSnakeHead = { ...snakeHead };
      const fruitEaten = fruit.x === newSnakeHead.x && fruit.y === newSnakeHead.y;

      if (fruitEaten) {
        setFruit({ x: randomIndex(gridSize), y: randomIndex(gridSize) });
        increaseSpeed();
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

  return { fruit, snake };
}