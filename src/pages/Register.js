import React, { useState, useEffect } from 'react';
import '../css/register.css';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebaseConfigFile';
import { useStateValue } from '../StateProvider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Register = () => {

    const [{ user }, dispatch] = useStateValue();

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [userId, setUID] = useState('');
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
            if (auth) {
                console.log("User Created successfully");
                console.log(auth);
                console.log(auth.user.uid);
                saveUserData(auth.user.uid);
                history.push('/');
            }
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
        <Card className="registerCard">
            {/* Card Image */}
            {/* cardContent classname coming from login.css */}
            <CardContent className="cardContent">
                <h4>Register</h4>
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
    );
}

export default Register;
