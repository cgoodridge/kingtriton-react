import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { db } from '../firebaseConfigFile';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import '../css/reservationHistory.css';
import Reservationcard from '../components/ReservationCard';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Grid } from '@mui/material';


const Reservationhistory = () => {

    const user = useSelector(selectUser);

    const [reservations, setReservations] = useState([]);

    useEffect(() => {

        if (user) {
            // Reference to the user's reservations collection
            const reservationsRef = collection(db, 'reservations');

            const reservationsQuery = query(
                reservationsRef,
                where('userUid', '==', user.uid), // Filter by uid
                orderBy('dateTime', 'desc') // Order by createdAt field in descending order
            );
            // Listen for real-time updates
            const unsubscribe = onSnapshot(
                reservationsQuery,
                (snapshot) => {
                    const docs = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }));
                    setReservations(docs);
                },
                (error) => {
                    console.error('Error in onSnapshot:', error); // Debugging
                }
            );

            // Cleanup the listener on unmount
            return () => unsubscribe();
        } else {
            setReservations([]);
        }
    }, [user]);

    return (
        <>
            <Container maxWidth="lg" className="container">
                <Typography className="headerStyle" variant="h3" gutterBottom component="div" style={{ textAlign: 'left', marginTop: '16px' }}>
                    Past Reservations
                </Typography>

                {
                    !reservations.length <= 0 ?
                        reservations.map(reservation => (
                            // <Grid container spacing={2}>
                                <Reservationcard reservation={reservation} />
                            // {/* </Grid> */}
                        ))
                        :
                        <>
                            <Typography variant="h6" className="emptyReservationText" gutterBottom component="div" style={{ textAlign: 'left', marginTop: '16px' }}>
                                You haven't made any reservations yet.
                            </Typography>
                            <div>
                                <Button variant="contained" component={Link} to="/reservations">Make A Reservation</Button>
                            </div>
                        </>
                }
            </Container>
        </>
    );
}

export default Reservationhistory;
