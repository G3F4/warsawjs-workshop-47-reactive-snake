import GameGrid from './GameGrid';
import React, { useContext } from 'react';
import useGame from './useGame';
import GameContext from './GameContext';

export default function Game() {
  const { gridSize  } = useContext(GameContext);
  const { fruit, snake } = useGame();

  return (
    <GameGrid gridSize={gridSize} fruit={fruit} snake={snake} />
  )
}
