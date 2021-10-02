import React, { useState, useEffect } from 'react';
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
import { login } from '../features/userSlice';

const Register = () => {


    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [fieldVal, setFieldVal] = useState('password');
    const dispatch = useDispatch();

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


    const register = (e) => {
        e.preventDefault();

        if (confirmPassword !== password)
        {
            alert('Both passwords must be the same');
            return;
        }
        
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            
            auth.user.updateProfile({
                displayName: fName + lName
            })
            .then(() => {
                dispatch(
                    login({
                        email: auth.user.email,
                        uid: auth.user.uid,
                        displayName: fName + lName,
                    }));
            }).catch(error => alert(error.message))
            saveUserData(auth.user.uid);
            history.push('/');
            
        })
        .catch(error => alert(error.message))
        
    }

    const saveUserData = (newID) => {
        console.log('New user id is ', newID);
        
        db
        .collection('users')
        .doc(newID)
        .set({
            firstName: fName,
            lastName: lName,
        })
        .catch(error => alert(error.message))
        
    }

    return (
        <div className="registerCardContainer">
            <Card className="registerCard">
                {/* Card Image */}
                {/* cardContent classname coming from login.css */}
                <CardContent className="registerCardContent">
                    <h2>Register</h2>
                    <form action="">
                        <TextField fullWidth value={fName} onChange={e => setFirstName(e.target.value)} id="fName" label="First Name" variant="standard" />
                        <TextField fullWidth value={lName} onChange={e => setLastName(e.target.value)} id="lName" label="Last Name" variant="standard" />
                        <TextField fullWidth value={email} onChange={e => setEmail(e.target.value)} id="email" label="E-Mail" type="email" variant="standard" />
                        <TextField fullWidth value={password} onChange={e => setPassword(e.target.value)} id="password" label="Password" type={fieldVal} variant="standard" />
                        <TextField fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} id="passwordConfirm" label="Confirm Password" type={fieldVal} variant="standard" />
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={showPassword} onChange={handlePasswordVisibility} inputProps={{ 'aria-label': 'controlled' }}/>} label="Show Password" />
                        </FormGroup>
                        <div>
                            <Button variant="contained" className="registerButton" type="submit" onClick={register}>Register</Button>
                        </div>
                        
                    </form>
                </CardContent>
            </Card>
        </div>

    );
}

export default Register;
