import React from 'react';
import './Grid.css';

export default function Grid({ gridSize }) {
  const indexes = Array
    .from({ length: gridSize })
    .map((_, index) => index);

  return (
    <div>
      {indexes.map((rowIndex) => (
        <div className="gridRow" key={rowIndex}>
          {indexes.map((cellIndex) => (
            <div className="gridCell" key={`${rowIndex}x${cellIndex}`}>
              {`${rowIndex}x${cellIndex}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}