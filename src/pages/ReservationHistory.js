import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';
import Box from '@material-ui/core/Box';
import { db } from '../firebaseConfigFile';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../css/reservationHistory.css';
import Reservationcard from '../components/ReservationCard';


const Reservationhistory = () => {

    const user = useSelector(selectUser);

    const [reservations, setReservations] = useState([]);
    console.log(reservations);

    useEffect(() => {

        if (user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('reservations')
            .onSnapshot(snapshot => (
               setReservations(snapshot.docs.map(doc => ({
                   id: doc.id,
                   data: doc.data()
               }))) 
            ));
        } else {
            setReservations([])
        }
    }, [user]);

    return (
        <>
            <Container maxWidth="lg" className="cardContainer">
                <Typography className="headerStyle" variant="h3" gutterBottom component="div" style={{textAlign: 'left', marginTop: '16px'}}>
                    Past Reservations
                </Typography>
                
                        {
                        
                        reservations ? 
                            reservations.map(reservation => (
                                <Reservationcard reservation={reservation} />
                            ))
                        :

                        <Typography className="headerStyle" variant="h3" gutterBottom component="div" style={{textAlign: 'left', marginTop: '16px'}}>
                            You haven't made any reservations yet. 
                        </Typography>
                        }
                    
                

            
            </Container>
        </>
    );
}

export default Reservationhistory;
