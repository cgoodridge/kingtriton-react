import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const user = useSelector(selectUser);
    const location = useLocation();

    return !user ? (
        children
    ) : (
        <Navigate
            to="/"
            state={{ from: location }}
            replace
        />
    );
};

export default ProtectedRoute;
