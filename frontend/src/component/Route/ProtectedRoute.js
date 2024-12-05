import React from 'react'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from '../layout/Loader/Loader';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace="true" />
    }

    //Else
    return children;
}

export default ProtectedRoute;