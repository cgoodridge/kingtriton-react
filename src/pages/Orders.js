import React, { useEffect, useState } from 'react';
import '../css/orders.css';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';
import { db } from '../firebaseConfigFile';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import Order from '../components/Order';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Orders = () => {
    const user = useSelector(selectUser);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db
                .collection('users')
                .doc(user.uid)
                .collection('orders')
                .orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ));
        }
    }, [user])

    return (
        <>
            <Container sx={{ height: '90vh', overflowY: 'scroll' }}>
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
