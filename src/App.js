import './App.css';
import MainGame from './MainGame'
import React, { useState } from 'react';

function App() {
  const [score, setScore] = useState(null);

  return (
    <div id="main">
      <h1>Urban Adventure</h1>
      <label>Score: {score}</label>
      <MainGame width={780} height={500} scoreFunction = {setScore}/>
    </div>
  );
}

export default App;
