import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../css/reservationHistory.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const Reservationcard = (props) => {

    const user = useSelector(selectUser);

    return (
        // <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <Card className="resCard">
                <CardContent className="reservationContent">
                    <Box >
                        <Typography className="resText" variant="h6" gutterBottom component="h6" style={{textAlign: 'left'}}>
                            Date: <strong className="reservationDate">{moment(props.reservation.data.dateTime.toDate()).format("MMM Do YYYY, h:mma")}</strong>
                        </Typography>
                        <Typography className="resText" variant="h6" gutterBottom component="h6" style={{textAlign: 'left'}}>
                            Occasion: <strong className="reservationDate">{props.reservation.data.occasion}</strong>
                        </Typography>
                    </Box>
                    <Box >
                        <Typography className="resText" variant="h6" gutterBottom component="h6" style={{textAlign: 'left'}}>
                            Name: <strong className="reservationDate">{user.displayName}</strong>
                        </Typography><Typography className="resText" variant="h6" gutterBottom component="h6" style={{textAlign: 'left'}}>
                            Size: <strong className="reservationDate">{props.reservation.data.partySize}</strong>
                        </Typography>
                        <Typography className="resText" variant="h6" gutterBottom component="h6" style={{textAlign: 'left'}}>
                            Table: <strong className="reservationDate">{props.reservation.data.table}</strong>
                        </Typography>
                    </Box>
                </CardContent>
                <div className="cardHighlight"></div>
            </Card>
        // </Grid>
    );
}

export default Reservationcard;
