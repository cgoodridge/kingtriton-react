import React, { useEffect, useState } from 'react';
import '../css/orders.css';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';
import { db } from '../firebaseConfigFile';
import { useStateValue } from '../StateProvider';
import Order from '../components/Order';

const Orders = () => {

    const [{user}, dispatch] = useStateValue();
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
            <Container>
                <Typography variant="h3" gutterBottom component="div" style={{textAlign: 'left', marginTop: '16px'}}>
                    Order History
                </Typography>

                {orders?.map(order => (

                    <Order order={order}/>
                ))}
                
            </Container>
        </>
        
    );
}

export default Orders;
