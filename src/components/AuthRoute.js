import React, { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from '../StateProvider';


const AuthRoute = ({ comp: Component}, ...rest  ) => {
  
  const [{ user }] = useStateValue();   
    return (
        <Route 
        {...rest} 
            render={(props) => !user ? <Redirect to={{ pathname: '/login' }}/>  : <Component {...props}/> 
        }/>
    );
}

export default AuthRoute;
