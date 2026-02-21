import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Electronics } from './pages/Electronics'
import { Home } from './pages/Home'
import { Drinks } from './pages/Drinks'
import { Sports } from './pages/Sports'
import { Invoice } from './pages/Invoice'
import { Error } from './pages/Error'
import { Menu } from './components/Menu'
import { ChabotPage } from './pages/ChabotPage'

function App() {


  return (
    <>
      <Menu />
      <main className='container m-3'>
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/electronics' element={<Electronics />} />
            <Route path='/drinks' element={<Drinks />} />
            <Route path='/sports' element={<Sports />} />
            <Route path='/invoice' element={<Invoice />} />
            <Route path='/ai' element={<ChabotPage/>} />
            <Route path='/*' element={<Error />} />

          </Routes>
        </BrowserRouter>

      </main>
    </>
  )
}

export default App
