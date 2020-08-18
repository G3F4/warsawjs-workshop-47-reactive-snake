import React from 'react';
import './App.css';
import Grid from './Grid';

function App() {
  const gridSize = 10;

  return (
    <div className="App">
      <Grid gridSize={gridSize} />
    </div>
  );
}

export default App;
