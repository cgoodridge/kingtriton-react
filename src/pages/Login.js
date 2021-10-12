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
import { Avatar, CircularProgress, Typography } from '@material-ui/core';

const Login = (props) => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const location = useLocation();
    // console.log(props.location.state.prevPath);

    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [fieldVal, setFieldVal] = useState('password');
    const [loading, setLoading] = useState(false);
    const [showPassword, setPasswordVisibility] = useState(false);

    const handlePasswordVisibility = (event) => {
        setPasswordVisibility(event.target.checked);

        if (!showPassword) {
            setFieldVal('text');
        }
        else {
            setFieldVal('password');
        }
    };

    if (props.history.state) {
        console.log('Previous path is ', props.history.state?.prevPath);
    }
    const loginUser = (e) => {
        if (email === '' || password === '') {
            return;
        }
        setLoading(true);
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then((userAuth) => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoURL: userAuth.user.photoURL ? userAuth.user.photoURL : "",
                }))
            })
            .then(() => {
                setLoading(false);
            })
            .catch(error => alert(error.message));

        if (props.location.state) {
            history.push('/');
        }
        else {

            history.push(props.location.state?.prevPath);
        }

    }

    return (
        <div className="loginCardContainer">
            <Card className="loginCard">
                {/* Card Image */}
                <CardContent className="loginCardContent">
                    <Box component={Link} to="/">
                        <img src="./img/temp-logo.png" alt="King Triton Logo" />
                    </Box>
                    <Typography variant="h5">
                        Login
                    </Typography>
                    {/* <h2>Login</h2> */}
                    <form action="">
                        <Box>
                            <TextField fullWidth value={email} onChange={e => setEmail(e.target.value)} id="email" label="E-Mail" variant="standard" margin="dense" required />
                            <TextField fullWidth value={password} onChange={e => setPassword(e.target.value)} id="password" label="Password" type={fieldVal} variant="standard" margin="dense" required />
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={showPassword} onChange={handlePasswordVisibility} inputProps={{ 'aria-label': 'controlled' }} />} label="Show Password" />
                            </FormGroup>
                        </Box>

                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button variant="contained" disabled={loading} className="loginButton" type="submit" onClick={loginUser}>Login</Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: "#fff",
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />

                            )}
                        </Box>
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
