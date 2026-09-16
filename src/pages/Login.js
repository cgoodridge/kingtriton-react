import React, { useState } from 'react';
import '../css/login.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfigFile';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { login } from '../slices/userSlice';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = (props) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [fieldVal, setFieldVal] = useState('password');
    const [loading, setLoading] = useState(false);
    const [showPassword, setPasswordVisibility] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordVisibility = (event) => {
        setPasswordVisibility(event.target.checked);

        if (!showPassword) {
            setFieldVal('text');
        }
        else {
            setFieldVal('password');
        }
    };

    const loginUser = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            alert('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            // Sign in the user with email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Dispatch user data to Redux store
            dispatch(
                login({
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL || '',
                })
            );

            // Navigate to the previous path or home
            if (props.location?.state?.prevPath) {
                navigate(props.location.state.prevPath);
            } else {
                navigate('/');
            }
        } catch (error) {
            setErrorMessage('Invalid user/credentials');
        } finally {
            setLoading(false);
        }
    };

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

                        {errorMessage && (
                            <Typography
                                variant="body2"
                                color="error"
                                style={{ marginTop: '8px', textAlign: 'center' }}
                            >
                                {errorMessage}
                            </Typography>
                        )}

                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button variant="contained" disabled={loading} className="loginButton" type="submit" onClick={loginUser}>Login</Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: "#2196f3",
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
