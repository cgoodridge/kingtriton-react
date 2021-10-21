import React, { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from '../StateProvider';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const AuthRoute = (props, ...rest ) => {
    const user = useSelector(selectUser);


    return (
        <Route {...rest}>
            
            {user ? props.children : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        </Route>
    );
}

export default AuthRoute;
