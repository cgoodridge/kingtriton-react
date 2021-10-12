import React, { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from '../StateProvider';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ comp: Component }, ...rest  ) => {
    const user = useSelector(selectUser);
  
//   const [{ user }] = useStateValue();

    return (
        <Route 
        {...rest} 
            render={(props) => !user ? <Component {...props}/>  :  <Redirect to={{ pathname: '/', state: {from: props.location} }}/> 
        }/>
    );
}

export default ProtectedRoute;
