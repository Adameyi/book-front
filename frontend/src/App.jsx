import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import AddAuthor from './pages/AuthorList'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import Navbar from './components/navbar/Navbar'
import AuthorList from './pages/AuthorList'
import Register from './pages/Register'
import Login from './pages/Login'

import './App.css'

function App() {

  return (
    <>
      <Navbar
        content={
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/addbook' element={<AddBook />} />
            <Route path='/addauthor' element={<AddAuthor />} />
            <Route path='/authorlist' element={<AuthorList />} />
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
