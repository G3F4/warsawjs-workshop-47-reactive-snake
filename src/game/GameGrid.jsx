import React from 'react';
import './GameGrid.css';

export default function GameGrid({ gridSize }) {
  const indexes = Array
    .from({ length: gridSize })
    .map((_, index) => index);

  return (
    <div className="grid">
      {indexes.map((x) => (
        <div className="gridRow" key={x}>
          {indexes.map((y) => (
            <div className="gridCell" key={`${x}x${y}`}>
              {`${x}x${y}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
