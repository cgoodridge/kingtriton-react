import React, { useState } from 'react';
import '../css/login.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const loginUser = (e) => {
        e.preventDefault();
        // Firebase stuff
    }

    const register = (e) => {
        e.preventDefault();
        // Firebase stuff
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
