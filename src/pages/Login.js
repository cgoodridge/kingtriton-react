import React, { useState, useEffect } from 'react';
import '../css/login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory, Link } from 'react-router-dom';
import { auth } from '../firebaseConfigFile';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

const Login = () => {

    const history = useHistory();
    /// TODO: Create dedicated register form
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [fieldVal, setFieldVal] = useState('password');
    const [showPassword, setPasswordVisibility] = useState(false);

    const handlePasswordVisibility = (event) => {
        setPasswordVisibility(event.target.checked);

        if (!showPassword)
        {
            setFieldVal('text');
        }
        else {
            setFieldVal('password');
        }
    };

    const loginUser = (e) => {
        e.preventDefault();
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

    return (
        <Card className="loginCard">
            {/* Card Image */}
            <CardContent className="cardContent">
                <h4>Login</h4>
                <form action="">
                    <Box>
                    <TextField fullWidth value={email} onChange={e => setEmail(e.target.value)} id="standard-basic" label="E-Mail" variant="standard" />
                    <TextField fullWidth value={password} onChange={e => setPassword(e.target.value)} id="standard-basic" label="Password" type={fieldVal} variant="standard" />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={showPassword} onChange={handlePasswordVisibility} inputProps={{ 'aria-label': 'controlled' }}/>} label="Show Password" />
                    </FormGroup>
                    </Box>
                    
                    <div>
                        <Button variant="contained" className="loginButton" type="submit" onClick={loginUser}>Login</Button>
                    </div>
                </form>
                <div>
                    <Link to="/register">Create an account</Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default Login;
