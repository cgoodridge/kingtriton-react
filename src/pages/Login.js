import React, { useState, useEffect } from 'react';
import '../css/login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebaseConfigFile';


const Login = () => {



    const history = useHistory();
    /// TODO: Create dedicated register form
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const loginUser = (e) => {
        e.preventDefault();
        // Firebase stuff
        auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
            if (auth)
            {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
        
    }

    const register = (e) => {
        e.preventDefault();
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            // New user successfully created
           
            if (auth) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
       
    }

    return (
        <Card className="loginCard">
            {/* Card Image */}
            <CardContent>
                <h4>Login</h4>
                <form action="">
                    <TextField value={email} onChange={e => setEmail(e.target.value)} id="standard-basic" label="E-Mail" variant="standard" />
                    <TextField value={password} onChange={e => setPassword(e.target.value)} id="standard-basic" label="Password" type="password" variant="standard" />

                    <Button variant="contained" className="loginButton" type="submit" onClick={loginUser}>Login</Button>
                </form>
                <div>
                    <a href="" onClick={register}>Create an account</a>
                </div>
            </CardContent>
        </Card>
    );
}

export default Login;
