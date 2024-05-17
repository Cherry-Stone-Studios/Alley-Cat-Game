import './App.css'

import Player from './SpriteAnimation.jsx';

import {Route, Routes} from 'react-router-dom';
import Game from './game';

function App() {

  return (
    <>

      

      <Routes>
        <Route path="/" element={<Game/>}/>
        {/* < Player /> */}
      </Routes>

    </>
  )
}

export default App
