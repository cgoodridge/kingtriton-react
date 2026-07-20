import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ comp: Component }, ...rest  ) => {
    const user = useSelector(selectUser);

    return (
        <Route
        {...rest}
            render={(props) => !user ? <Component {...props}/>  :  <Redirect to={{ pathname: '/', state: {from: props.location} }}/>
        }/>
    );
}

export default ProtectedRoute;
