import React, { useEffect, useState } from 'react';
import '../css/orders.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { db } from '../firebaseConfigFile';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import Order from '../components/Order';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Orders = () => {
    const user = useSelector(selectUser);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            // Reference to the user's orders collection
            const ordersRef = collection(db, 'users', user?.uid, 'orders');
            const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'));

            // Listen for real-time updates
            const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
                setOrders(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })));
            });

            // Cleanup the listener on unmount
            return () => unsubscribe();
        }
    }, [user])

    return (
        <>
            <Container className="container">
                <Typography className="headerStyle" variant="h3" gutterBottom component="div" style={{ textAlign: 'center', marginTop: '16px' }}>
                    Order History
                </Typography>

                {
                    !orders.length <= 0 ?
                        orders?.map(order => (
                            <Order order={order} />
                        ))
                        :
                        <>
                            <Typography variant="h6" className="emptyReservationText" gutterBottom component="div" style={{ textAlign: 'left', marginTop: '16px' }}>
                                You haven't placed any orders yet.
                            </Typography>
                            <div>
                                <Button variant="contained" component={Link} to="/menu">Menu</Button>
                            </div>
                        </>
                }
            </Container>
        </>

    );
}

export default Orders;
