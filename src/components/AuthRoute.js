import React from 'react';
import { Route, Navigate, useLocation } from "react-router-dom";
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const AuthRoute = ({ children }) => {
    const user = useSelector(selectUser);
    const location = useLocation();

    return user ? (
        children
    ) : (
        <Navigate
            to="/login"
            state={{ from: location }}
            replace
        />
    );
}

export default AuthRoute;
