import React from 'react';
import '../css/orders.css';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const OrderCard = () => {
    return (
        <Card className="cardStyle">
            <CardContent>
                <Grid container mb={3}>
                    <Grid item xs={6}>
                        <Typography variant="h5" gutterBottom component="div">
                            18th August 2021
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" gutterBottom component="div" style={{textAlign: 'right'}}>
                            65$
                        </Typography>
                    </Grid>
                </Grid>    
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom component="div">
                            Order Status
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom component="div" style={{textAlign: 'right'}}>
                            Delivered
                        </Typography>
                    </Grid>
                </Grid>   
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom component="div">
                            Order 
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom component="div" style={{textAlign: 'right'}}>
                            x2 Lobster Mac &amp; Cheese
                        </Typography>
                    </Grid>
                </Grid>  
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom component="div">
                            Payment method
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom component="div" style={{textAlign: 'right'}}>
                            VISA ending with 9999
                        </Typography>
                    </Grid>
                </Grid>  
                <Grid container mt={2}>
                    <Grid item xs={6}>
                        <Button size='large' variant="contained">Add to Cart</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size='small' variant="outlined" className="detailsButton">Order Details</Button>
                    </Grid>
                </Grid>  
            </CardContent>
        </Card>
    );
}

const Orders = () => {
    return (
        <>
        <Container>
            <Typography variant="h3" gutterBottom component="div" style={{textAlign: 'left', marginTop: '16px'}}>
                Order History
            </Typography>
            <OrderCard/>
        </Container>
           
        </>
        
    );
}

export default Orders;
