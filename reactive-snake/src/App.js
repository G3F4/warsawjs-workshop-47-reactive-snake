import React, { useState } from 'react';
import './App.css';
import Grid from './Grid';
import useGame from './useGame';

function App() {
  const [speed, setSpeed] = useState(500);
  const gridSize = 10;
  const { fruit, snake } = useGame({ gridSize, speed, increaseSpeed });

  function increaseSpeed() {
    setSpeed(speed * 0.8);
  }

  return (
    <div className="App">
      <Grid gridSize={gridSize} fruit={fruit} snake={snake}/>
    </div>
  );
}

export default App;
