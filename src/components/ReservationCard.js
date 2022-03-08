import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../css/reservationHistory.css';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';



const Reservationcard = (props) => {

    const user = useSelector(selectUser);

    return (
        // {props.reservation.data.map((item, key) => (
        <Card className="resCard">
            <CardContent className="reservationContent">
                <Box >
                    <Typography className="resText" variant="h5" gutterBottom component="div" style={{textAlign: 'left'}}>
                        Date: <strong className="reservationDate">{moment(props.reservation.data.dateTime.toDate()).format("MMM Do YYYY, h:mma")}</strong>
                    </Typography>
                    <Typography className="resText" variant="h5" gutterBottom component="div" style={{textAlign: 'left'}}>
                        Occasion: <strong className="reservationDate">{props.reservation.data.occasion}</strong>
                    </Typography>
                </Box>
                <Box >
                    <Typography className="resText" variant="h5" gutterBottom component="div" style={{textAlign: 'left'}}>
                        Name: <strong className="reservationDate">{user.displayName}</strong>
                    </Typography><Typography className="resText" variant="h5" gutterBottom component="div" style={{textAlign: 'left'}}>
                        Size: <strong className="reservationDate">{props.reservation.data.partySize}</strong>
                    </Typography>
                    <Typography className="resText" variant="h5" gutterBottom component="div" style={{textAlign: 'left'}}>
                        Table: <strong className="reservationDate">{props.reservation.data.table}</strong>
                    </Typography>
                </Box>
            </CardContent>
            <div className="cardHighlight">

            </div>
        </Card>
        // ))}
    );
}

export default Reservationcard;
