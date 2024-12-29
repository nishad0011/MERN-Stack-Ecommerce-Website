import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from '../layout/Loader/Loader';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { verify } from 'jsonwebtoken';


const ProtectedRoute = ({ isAdmin = false, children }) => {
    console.log("isAdmin = ", isAdmin);

    const navigate = useNavigate()
    const shouldNavigate = useRef(false);
    const shouldNavigateAccount = useRef(false);
    const { isAuthenticated, loading, user } = useSelector(state => state.user)

    useEffect(() => {
        // console.log("in useEffect");

        if (shouldNavigate.current) {
            navigate("/login", { replace: true })
        }
        if (shouldNavigateAccount.current) {
            navigate("/profile", { replace: true })
        }
    }, [shouldNavigate.current, shouldNavigateAccount.current, navigate])

    while (loading === undefined || loading === true) {
        return <Loader />
    }
    if (isAuthenticated === false) {
        // console.log("in navigate");
        shouldNavigate.current = true
    }
    else if (isAdmin == true) {
        if (user.role === "user") {
            shouldNavigateAccount.current = true
        }
        else {
            return children
        }
    }
    else {
        return children
    }
}

export default ProtectedRoute;