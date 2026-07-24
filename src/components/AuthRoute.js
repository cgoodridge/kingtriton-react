import React from 'react';
import { Route, Navigate } from "react-router-dom";
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const AuthRoute = (props, ...rest ) => {
    const user = useSelector(selectUser);

    return (
        <Route {...rest}>

            {user ? props.children : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
            }
        </Route>
    );
}

export default AuthRoute;
