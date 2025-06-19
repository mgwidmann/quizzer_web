import herLogo from '/icon.png';
import Quiz from './app/app';
import './App.css'
import { useEffect } from 'react';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

function App() {

  useEffect(() => {
    applyMode(Mode.Dark);
  })

  return (
    <>
      <div>
        <h1>
          <img src={herLogo} className="logo react" alt="Her logo" />
          <br />
          Kateryna's Quizzer
        </h1>
        <h3>😍 The most beautiful girl in the world 😍</h3>
      </div>
      <h1></h1>
      <div className="card">
        <Quiz />
      </div>
    </>
  )
}

export default App
