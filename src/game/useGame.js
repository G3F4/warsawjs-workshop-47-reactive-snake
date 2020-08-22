import { useContext, useLayoutEffect, useState } from 'react';
import useGameDirection from './useGameDirection';
import useGameLoop from './useGameLoop';
import GameContext from './GameContext';
import useSpaceDownEvent from './useSpaceDownEvent';

function randomIndex(n) {
  return Math.floor(Math.random() * n);
}

export default function useGame() {
  const { gridSize, speed, paused, increaseSpeed, pauseGame } = useContext(GameContext);
  const [snake, setSnake] = useState([
    { x: gridSize / 2, y: gridSize / 2 },
    { x: gridSize / 2, y: gridSize / 2 + 1 },
    { x: gridSize / 2, y: gridSize / 2 + 2 },
  ]);
  const [fruit, setFruit] = useState({
    x: randomIndex(gridSize),
    y: randomIndex(gridSize),
  });
  const direction = useGameDirection('up');

  useSpaceDownEvent(pauseGame);

  function handleGameTick() {
    if (!paused) {
      const [snakeHead] = snake;
      const newSnakeHead = { ...snakeHead };
      const fruitEaten = fruit.x === newSnakeHead.x && fruit.y === newSnakeHead.y;

      if (fruitEaten) {
        setFruit({ x: randomIndex(gridSize), y: randomIndex(gridSize) });
        increaseSpeed();
      }

      if (direction === 'up') {
        newSnakeHead.x -= 1;
      } else if (direction === 'down') {
        newSnakeHead.x += 1;
      } else if (direction === 'right') {
        newSnakeHead.y += 1;
      } else if (direction === 'left') {
        newSnakeHead.y -= 1;
      }

      const newSnake = fruitEaten
        ? [newSnakeHead, ...snake.slice(0, snake.length)]
        : [newSnakeHead, ...snake.slice(0, snake.length - 1)];


      setSnake(newSnake);
    }
  }

  useGameLoop({ speed, onTick: handleGameTick });

  useLayoutEffect(() => {
    const fruitEl = document.querySelector('.fruitCell');
    fruitEl.style = 'transition: transform 0.5s;transform: rotate3d(1, 1, 1, 360deg);';
  }, [fruit]);

  return { fruit, snake };
}