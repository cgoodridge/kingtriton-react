import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../css/reservationHistory.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const Reservationcard = (props) => {

    return (
        // <Grid size={{ xs: 2, sm: 4, md: 4 }}>
        <Card className="resCard">
            <CardContent className="reservationContent">
                <Box >
                    <Typography className="resText" variant="h6" gutterBottom component="h6" style={{ textAlign: 'left' }}>
                    <strong className="reservationDate">Date:</strong> {moment(props?.reservation?.data?.dateTime.toDate()).format("MMM Do YYYY, h:mma")}
                    </Typography>
                    <Typography className="resText" variant="h6" gutterBottom component="h6" style={{ textAlign: 'left' }}>
                    <strong className="reservationDate">Occasion:</strong> {(props?.reservation?.data?.occasion) ? props?.reservation?.data?.occasion : "N/A"}
                    </Typography>
                    <Typography className="resText" variant="h6" gutterBottom component="h6" style={{ textAlign: 'left' }}>
                    <strong className="reservationDate">Party Size:</strong> {props.reservation.data.partySize}
                    </Typography>
                </Box>
            </CardContent>
            <div className="cardHighlight"></div>
        </Card>
        // </Grid>
    );
}

export default Reservationcard;
