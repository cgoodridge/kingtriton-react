import React, { useState, useEffect } from 'react';
import '../css/register.css';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebaseConfigFile';
import { useStateValue } from '../StateProvider';


const Register = () => {

    const [{ user }, dispatch] = useStateValue();

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [userId, setUID] = useState('');

    const register = (e) => {
        e.preventDefault();
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
            <CardContent>
                <h4>Register</h4>
                <form action="">
                    <TextField value={fName} onChange={e => setFirstName(e.target.value)} id="fName" label="First Name" variant="standard" />
                    <TextField value={lName} onChange={e => setLastName(e.target.value)} id="lName" label="Last Name" variant="standard" />
                    <TextField value={email} onChange={e => setEmail(e.target.value)} id="email" label="E-Mail" type="email" variant="standard" />
                    <TextField value={password} onChange={e => setPassword(e.target.value)} id="password" label="Password" type="password" variant="standard" />

                    <Button variant="contained" className="registerButton" type="submit" onClick={register}>Register</Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default Register;
