import React from 'react';
import './Grid.css';

export default function Grid({ gridSize, fruit, snake }) {
  const indexes = Array
    .from({ length: gridSize })
    .map((_, index) => index);

  function getCellClass(rowIndex, cellIndex) {
    if (rowIndex === fruit.rowIndex && cellIndex === fruit.cellIndex) {
      return 'fruitCell';
    }

    if (snake.some(snakePart => snakePart.rowIndex === rowIndex && snakePart.cellIndex === cellIndex)) {
      return 'snakeCell';
    }

    return 'gridCell';
  }
  return (
    <div>
      {indexes.map((rowIndex) => (
        <div className="gridRow" key={rowIndex}>
          {indexes.map((cellIndex) => (
            <div
              className={getCellClass(rowIndex, cellIndex)}
              key={`${rowIndex}x${cellIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}