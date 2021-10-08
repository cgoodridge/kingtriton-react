import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../css/accountDetails.css';
import TextField from '@mui/material/TextField';


const Accountdetails = () => {
    return (
        <>
            <Container>
                <Typography className="headerStyle" variant="h3" gutterBottom component="div" style={{textAlign: 'center', marginTop: '16px'}}>
                    Account Details
                </Typography>
                <div style={{width: '100%'}}>
                    <div>
                        <TextField id="displayName" fullWidth label="Display Name" variant="standard" />
                    </div>
                    <div>
                        <TextField id="contactNumber" fullWidth label="Contact Number" variant="standard" />
                    </div>
                    <div>
                        <TextField id="altNumber" fullWidth label="Alternate Contact Number" variant="standard" />
                    </div>
                    
                </div>
            
            </Container>
        </>
    );
}

export default Accountdetails;
