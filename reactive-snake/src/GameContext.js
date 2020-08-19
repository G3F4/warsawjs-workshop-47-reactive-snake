import { createContext } from 'react';

const GameContext = createContext({ gridSize: 0, speed: 0, increaseSpeed: () => {} });

export default GameContext;
