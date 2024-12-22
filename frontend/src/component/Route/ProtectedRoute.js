import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from '../layout/Loader/Loader';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { verify } from 'jsonwebtoken';


const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const shouldNavigate = useRef(false);
    const { isAuthenticated, loading } = useSelector(state => state.user)

    useEffect(() => {
        // console.log("in useEffect");

        if (shouldNavigate.current) {
            navigate("/login", { replace: true })
        }
    }, [shouldNavigate.current, navigate])

    while (loading === undefined || loading === true) {
        return <Loader />
    }
    if (isAuthenticated === false) {
        // console.log("in navigate");
        shouldNavigate.current = true
    }
    else {
        return children
    }
}

export default ProtectedRoute;