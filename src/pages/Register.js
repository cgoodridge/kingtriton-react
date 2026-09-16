import React, { useState } from 'react';
import '../css/register.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfigFile';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { login } from '../slices/userSlice';
import { Box, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

const Register = (props) => {


    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [fieldVal, setFieldVal] = useState('password');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

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


    const register = async (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
            alert('Both passwords must be the same');
            return;
        }
        
        setLoading(true);

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with display name
            await updateProfile(user, {
                displayName: `${fName} ${lName}`,
            });

            // Dispatch user data to Redux store
            dispatch(
                login({
                    email: user.email,
                    uid: user.uid,
                    displayName: `${fName} ${lName}`,
                    photoURL: user.photoURL || '',
                })
            );

            // Add user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                firstName: fName,
                lastName: lName,
            });

            // Navigate to the previous path or home
            if (props.location?.state?.prevPath) {
                navigate(props.location.state.prevPath);
            } else {
                navigate('/');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="registerCardContainer">
            <Card className="registerCard">
                {/* Card Image */}
                {/* cardContent classname coming from login.css */}
                <CardContent className="registerCardContent">
                    <Box component={Link} to="/">
                        <img src="./img/temp-logo.png" alt="King Triton Logo" />
                    </Box>

                    <Typography variant="h5">
                        Register
                    </Typography>
                    <form action="">
                        <TextField fullWidth value={fName} onChange={e => setFirstName(e.target.value)} id="fName" label="First Name" variant="standard" required />
                        <TextField fullWidth value={lName} onChange={e => setLastName(e.target.value)} id="lName" label="Last Name" variant="standard" required />
                        <TextField fullWidth value={email} onChange={e => setEmail(e.target.value)} id="email" label="E-Mail" type="email" variant="standard" required />
                        <TextField fullWidth value={password} onChange={e => setPassword(e.target.value)} id="password" label="Password" type={fieldVal} variant="standard" required />
                        <TextField fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} id="passwordConfirm" label="Confirm Password" type={fieldVal} variant="standard" required />
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={showPassword} onChange={handlePasswordVisibility} inputProps={{ 'aria-label': 'controlled' }} />} label="Show Password" />
                        </FormGroup>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button variant="contained" disabled={loading} className="registerButton" type="submit" onClick={register}>Register</Button>
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
                </CardContent>
            </Card>
        </div>
    );
}

export default Register;
