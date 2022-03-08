import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../css/accountDetails.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';



const Accountdetails = () => {

    const user = useSelector(selectUser);

    return (
        <>
            <Container>
                <Typography className="headerStyle" variant="h3" gutterBottom component="div" style={{textAlign: 'center', marginTop: '16px'}}>
                    Account Details
                </Typography>
                <div style={{width: '100%'}}>
                    {user ? 
                        <>
                            <div>
                                <TextField id="displayName" fullWidth label="Display Name" value={user.displayName} variant="standard" margin="dense" focused/>
                            </div>
                            <div>
                                <TextField id="contactNumber" fullWidth label="Contact Number" variant="standard" margin="dense"/>
                            </div>
                        </> 
                        : 
                        <>
                            <div>
                                <TextField id="displayName" fullWidth label="Display Name" variant="standard" margin="dense"/>
                            </div>
                            <div>
                                <TextField id="contactNumber" fullWidth label="Contact Number" variant="standard" margin="dense"/>
                            </div>
                        </>
                    }
                    <div>
                        <Button variant="contained" className="updateButton" type="submit" >Update</Button>
                    </div>
                    
                </div>
            
            </Container>
        </>
    );
}

export default Accountdetails;
