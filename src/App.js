import React, { useCallback, useReducer } from 'react';
import GameContext from './game/GameContext';
import Game from './game/Game';
import gameContextStateReducer, { initGameContextState, InitialGameContextState } from './game/gameContextStateReducer';

const GridSize = 10;
const SpeedMultiplier = 0.8;

function App() {
  const [gameContextState, dispatchGameContextAction] = useReducer(
    gameContextStateReducer,
    InitialGameContextState,
    initGameContextState,
  );
  const { paused, speed } = gameContextState;

  const increaseSpeed = useCallback(() => {
    dispatchGameContextAction({ type: 'increaseSpeed', payload: SpeedMultiplier });
  }, []);

  const pauseGame = useCallback(() => {
    dispatchGameContextAction({ type: 'pauseGame' });
  }, []);

  const unpauseGame = useCallback(() => {
    dispatchGameContextAction({ type: 'unpauseGame' });
  }, []);

  return (
    <GameContext.Provider value={{ speed, gridSize: GridSize, paused, increaseSpeed, pauseGame, unpauseGame }}>
      <Game/>
    </GameContext.Provider>
  );
}

export default App;
