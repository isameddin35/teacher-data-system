import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login'
import { Routes, Route } from 'react-router-dom'
import QiymetCedveli from './pages/QiymetCedveli'
import ElektronJ from './pages/ElektronJ'
import Department from './pages/Department'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/qiymet-cedveli' element={<QiymetCedveli />} />
      <Route path='/elektron-jurnal' element={<ElektronJ />} />
      <Route path='/qiymet-cedveli/class' element={<Department />}/>
    </Routes>
  )
}

export default App
