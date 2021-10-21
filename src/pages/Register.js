import React, { useState } from 'react';
import '../css/register.css';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebaseConfigFile';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { login } from '../slices/userSlice';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Register = (props) => {


    const history = useHistory();
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


    const register = (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
            alert('Both passwords must be the same');
            return;
        }
        setLoading(true);


        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {

                auth.user.updateProfile({
                    displayName: fName + " " + lName
                })
                    .then(() => {
                        dispatch(
                            login({
                                email: auth.user.email,
                                uid: auth.user.uid,
                                displayName: fName + " " + lName,
                                photoURL: auth.user.photoURL ? auth.user.photoURL : "",
                            }));
                    })
                    .catch(error => alert(error.message))

                // history.push('/');

            })
            .then(() => {
                db
                    .collection('users')
                    .doc(auth?.user.uid)
                    .set({
                        firstName: fName,
                        lastName: lName,
                    })
                    .catch(error => alert(error.message))
            })
            .catch(error => alert(error.message))
        if (props.location.state) {
            history.push('/');
        }
        else {

            history.push(props.location.state?.prevPath);
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
