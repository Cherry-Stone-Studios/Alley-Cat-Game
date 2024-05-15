import './App.css'

import Player from './Player.jsx';

import {Route, Routes} from 'react-router-dom';
import Game from './game';

function App() {

  return (
    <>

      < Player />

      <Routes>
        <Route path="/" element={<Game/>}/>
      </Routes>

    </>
  )
}

export default App
