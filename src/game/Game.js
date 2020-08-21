import GameGrid from './GameGrid';
import React, { useContext } from 'react';
import useGame from './useGame';
import GameContext from './GameContext';
import GameMenu from './GameMenu';

export default function Game() {
  const { gridSize, paused } = useContext(GameContext);
  const { fruit, snake } = useGame();

  return (
    <>
      {paused && <GameMenu />}
      <GameGrid gridSize={gridSize} fruit={fruit} snake={snake} />
    </>
  )
}
