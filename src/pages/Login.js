import React, { useState, useEffect } from 'react';
import '../css/login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory, Link, withRouter, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfigFile';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { login } from '../slices/userSlice';

const Login = (props) => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const location = useLocation();
    // console.log(props.location.state.prevPath);

    const dispatch = useDispatch();
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
        .then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
            }))
        })
        .catch(error => alert(error.message));
        history.push(props?.location.state.prevPath);
        
    }

    return (
        <div className="loginCardContainer">
            <Card className="loginCard">
                {/* Card Image */}
                <CardContent className="loginCardContent">
                    <h2>Login</h2>
                    <form action="">
                        <Box>
                        <TextField fullWidth value={email} onChange={e => setEmail(e.target.value)} id="email" label="E-Mail" variant="standard" margin="dense"/>
                        <TextField fullWidth value={password} onChange={e => setPassword(e.target.value)} id="password" label="Password" type={fieldVal} variant="standard" margin="dense"/>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={showPassword} onChange={handlePasswordVisibility} inputProps={{ 'aria-label': 'controlled' }}/>} label="Show Password" />
                        </FormGroup>
                        </Box>
                        
                        <div>
                            <Button variant="contained" className="loginButton" type="submit" onClick={loginUser}>Login</Button>
                        </div>
                    </form>
                    <div className="createAccount">
                        <Link to="/register" >Create an account</Link>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}

export default Login;
