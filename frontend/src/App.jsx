import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import Navbar from './components/navbar/Navbar'

import './App.css'

function App() {

  return (
    <>
      <Navbar
        content={
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='/addbook' element={<AddBook />} />
            <Route path='/editbook/:id' element={<EditBook />} />
            <Route path='/deletebook/:id' element={<DeleteBook />} />
          </Routes>
        }
      />
    </>
  )
}

export default App
