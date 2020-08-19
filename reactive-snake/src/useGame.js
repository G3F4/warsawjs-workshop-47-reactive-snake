import { useCallback, useContext, useState } from 'react';
import useGameDirection from './useGameDirection';
import useGameLoop from './useGameLoop';
import GameContext from './GameContext';
import useSpaceDownEvent from './useSpaceDownEvent';

function randomIndex(n) {
  return Math.floor(Math.random() * n);
}

export default function useGame() {
  const { gridSize, paused, increaseSpeed, pauseGame } = useContext(GameContext);
  const [snake, setSnake] = useState([
    { x: gridSize / 2, y: gridSize / 2 },
    { x: gridSize / 2, y: gridSize / 2 + 1 },
    { x: gridSize / 2, y: gridSize / 2 + 2 },
  ]);
  const [fruit, setFruit] = useState({
    x: randomIndex(gridSize),
    y: randomIndex(gridSize),
  });
  useSpaceDownEvent(pauseGame);
  const direction = useGameDirection('up');
  const handleGameTick = useCallback(() => {
    if (!paused) {
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
        increaseSpeed();
      }

      const newSnake = fruitEaten
        ? [newSnakeHead, ...snake.slice(0, snake.length)]
        : [newSnakeHead, ...snake.slice(0, snake.length - 1)];

      setSnake(newSnake);
    }
  }, [direction, fruit, gridSize, paused, snake, increaseSpeed]);

  useGameLoop(handleGameTick);

  return { fruit, snake }
}