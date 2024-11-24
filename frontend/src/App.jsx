import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'
import Login from './components/Login'
import AdminHome from './components/AdminHome'
import UserHome from './components/UserHome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/admin_home' element={<AdminHome/>}></Route>
        <Route path='/user_home' element={<UserHome/>}></Route>
      </Routes>
    </>
  )
}

export default App
