import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './Components/Home'
import Player from './Components/Player'
import Header from './Components/Header'
import Signup from './Components/Signup'
import Login from './Components/Login'
import UploadForm from './Components/UploadForm'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<Player />} />
          <Route path='/upload' element={<UploadForm />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
