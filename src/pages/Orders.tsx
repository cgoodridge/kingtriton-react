import React, { useEffect, useState } from 'react';
import '../css/orders.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { db } from '../firebaseConfigFile';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import Order from '../components/Order';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { collection, query, orderBy, onSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

interface OrderData {
    id: string;
    data: {
        createdAt: number;
        orderStatus: string;
        cart: {
            name: string;
            qty: number;
            price: number;
            image: string;
        }[];
    };
}

const Orders: React.FC = () => {
    const user = useSelector(selectUser);

    const [orders, setOrders] = useState<OrderData[]>([]);

    useEffect(() => {
        if (user && user.uid) {
            // Reference to the user's orders collection
            const ordersRef = collection(db, 'users', user?.uid, 'orders');
            const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'));

            // Listen for real-time updates
            const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
                setOrders(
                    snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
                        id: doc.id,
                        data: doc.data() as OrderData['data'],
                    }))
                );
            });

            // Cleanup the listener on unmount
            return () => unsubscribe();
        }
    }, [user])

    return (
        <>
            <Container className="container">
                <Typography
                    className="headerStyle"
                    variant="h4"
                    gutterBottom
                    component="div"
                    style={{ textAlign: 'center', marginTop: '16px' }}
                >
                    Order History
                </Typography>

                {orders.length > 0 ? (
                    <Grid container spacing={3}>
                        {orders.map((order) => (
                            <Grid key={order.id}>
                                <Order order={order} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <>
                        <Typography
                            variant="h6"
                            className="emptyReservationText"
                            gutterBottom
                            component="div"
                            style={{ textAlign: 'left', marginTop: '16px' }}
                        >
                            You haven't placed any orders yet.
                        </Typography>
                        <div>
                            <Button variant="contained" component={Link} to="/menu">
                                Menu
                            </Button>
                        </div>
                    </>
                )}
            </Container>
        </>

    );
}

export default Orders;
