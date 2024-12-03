import React from 'react'
import { Navigate } from "react-router-dom";
import Loader from '../layout/Loader/Loader';


const ProtectedRoute = ({ isAuthenticated, loading, children }) => {
    if (loading) {
        return <Loader />
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace="true" />
    }

    //Else
    return children;
}

export default ProtectedRoute;