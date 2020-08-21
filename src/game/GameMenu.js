import React, { useContext } from 'react';
import GameContext from './GameContext';
import './GameMenu.css';

export default function GameMenu() {
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