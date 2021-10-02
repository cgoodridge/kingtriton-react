import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import CheckoutItem from './CheckoutItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const Order = (props) => {
    console.log('Props are ', props);
    return (
        <>
            <Navbar />
            <main>
                <Typography variant="h5" gutterBottom component="div">
                    {moment.unix(props.order.data.createdAt).format("MMM Do YYYY, h:mma")}
                </Typography>
                {props.order.data.cart?.map((item, key) => (
                    <CheckoutItem key={key} food={item}/>
                ))}

                <Card className="cardStyle">
                    <CardContent>
                        
                        <Grid container mb={3}>
                            <Grid item xs={6}>
                            
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
            </main>
        </>
    );
}

export default Order;
