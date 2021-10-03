import React, { useEffect, useState } from 'react';
import '../css/orders.css';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';
import { db } from '../firebaseConfigFile';
import { useStateValue } from '../StateProvider';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import Order from '../components/Order';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Orders = () => {
    const user = useSelector(selectUser);

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        if (user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => (
               setOrders(snapshot.docs.map(doc => ({
                   id: doc.id,
                   data: doc.data()
               }))) 
            ));
        } else {
            setOrders([])
        }
        

    }, [user])

    return (
        <>
            <Navbar />
                <Container>
                    <Typography variant="h3" gutterBottom component="div" style={{textAlign: 'left', marginTop: '16px'}}>
                        Order History
                    </Typography>

                    {orders?.map(order => (

                        <Order order={order}/>
                    ))}
                    
                </Container>
            <Footer />
        </>
        
    );
}

export default Orders;
