import herLogo from '/icon.png';
import Quiz from './app/app';
import './App.css'

function App() {
  return (
    <>
      <div>
        <img src={herLogo} className="logo react" alt="Her logo" />
      </div>
      <h1></h1>
      <div className="card">
        <Quiz />
      </div>
    </>
  )
}

export default App
