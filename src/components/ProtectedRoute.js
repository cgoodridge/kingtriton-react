import React, { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from '../StateProvider';

const ProtectedRoute = ({ comp: Component }, ...rest  ) => {
  
//   const [{ user }] = useStateValue();

    return (
        <Route 
        {...rest} 
            render={(props) => !true ? <Component {...props}/>  :  <Redirect to={{ pathname: '/' }}/> 
        }/>
    );
}

export default ProtectedRoute;
