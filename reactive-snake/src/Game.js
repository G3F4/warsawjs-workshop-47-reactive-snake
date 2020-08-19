import GameGrid from './GameGrid';
import React, { useContext } from 'react';
import useGame from './useGame';
import GameContext from './GameContext';
import './Game.css';

export default function Game() {
  const { gridSize } = useContext(GameContext);
  const { fruit, snake } = useGame();

  return (
    <div className="game">
      <GameGrid gridSize={gridSize} fruit={fruit} snake={snake} />
    </div>
  )
}