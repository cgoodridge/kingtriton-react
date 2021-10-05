import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';

const Accountdetails = () => {
    return (
        <>
            <Container>
                <Typography className="headerStyle" variant="h3" gutterBottom component="div" style={{textAlign: 'left', marginTop: '16px'}}>
                    Account Details
                </Typography>

            
            </Container>
        </>
    );
}

export default Accountdetails;
