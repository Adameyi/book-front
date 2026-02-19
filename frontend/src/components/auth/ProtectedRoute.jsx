import React from 'react'
import { Navigate, Outlet } from '../context/AuthContext'
import { Route } from 'react-router'
import Home from '../../pages/Home'

function ProtectedRoute() {
    const { isAuthenticated } = useAuth()

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute