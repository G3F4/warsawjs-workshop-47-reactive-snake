import React from 'react';
import './App.css';
import Grid from './Grid';
import useGame from './useGame';

function App() {
  const gridSize = 10;
  const { fruit, snake } = useGame({ gridSize });

  return (
    <div className="App">
      <Grid gridSize={gridSize} fruit={fruit} snake={snake}/>
    </div>
  );
}

export default App;
