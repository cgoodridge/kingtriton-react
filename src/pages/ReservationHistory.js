import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';

const Reservationhistory = () => {
    return (
        <>
            <Container>
                <Typography className="headerStyle" variant="h3" gutterBottom component="div" style={{textAlign: 'left', marginTop: '16px'}}>
                    Past Reservations
                </Typography>

            
            </Container>
        </>
    );
}

export default Reservationhistory;
