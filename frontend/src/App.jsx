import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import AddAuthor from './pages/AuthorList'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import Navbar from './components/navbar/Navbar'
import AuthorList from './pages/AuthorList'
import Login from './pages/Login'
import { useAuth, AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'

import './App.css'

function App() {

  return (
    <>
      <Navbar
        content={
          <AuthProvider>
            <Routes>
              <Route path='' element={<Home />} />
              <Route path='/login' element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/addauthor' element={<AddAuthor />} />
                <Route path='/authorlist' element={<AuthorList />} />
                <Route path='/addbook' element={<AddBook />} />
                <Route path='/editbook/:id' element={<EditBook />} />
                <Route path='/deletebook/:id' element={<DeleteBook />} />
              </Route>
            </Routes>
          </AuthProvider>
        }
      />
    </>
  )
}

export default App
