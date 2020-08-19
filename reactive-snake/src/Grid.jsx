import React from 'react';
import './Grid.css';

export default function Grid({ gridSize, fruit, snake }) {
  const indexes = Array
    .from({ length: gridSize })
    .map((_, index) => index);

  function getCellClass(x, y) {
    if (x === fruit.x && y === fruit.y) {
      return 'fruitCell';
    }

    if (snake.some(snakePart => snakePart.x === x && snakePart.y === y)) {
      return 'snakeCell';
    }

    return 'gridCell';
  }

  return (
    <div className="grid">
      {indexes.map((x) => (
        <div className="gridRow" key={x}>
          {indexes.map((y) => (
            <div
              className={getCellClass(x, y)}
              key={`${x}_${y}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
