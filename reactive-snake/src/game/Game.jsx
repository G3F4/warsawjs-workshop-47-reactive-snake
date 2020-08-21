import GameGrid from './GameGrid';
import React, { useContext } from 'react';
import useGame from './useGame';
import GameContext from './GameContext';
import './Game.css';

function GameMenu() {
  const { unpauseGame } = useContext(GameContext);

  return (
    <div className="gameMenu">
      <div className="gameMenuOverlay" />
      <div className="gameMenuContent">
        <button onClick={unpauseGame}>PLAY</button>
      </div>
    </div>
  );
}

export default function Game() {
  const { gridSize, paused } = useContext(GameContext);
  const { fruit, snake } = useGame();

  return (
    <div className="game">
      {paused && <GameMenu />}
      <GameGrid gridSize={gridSize} fruit={fruit} snake={snake} />
    </div>
  )
}