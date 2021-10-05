import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import CheckoutItem from './CheckoutItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import '../css/order.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const Order = (props) => {
    return (
        <>
            <Container>
                <Typography className="headerStyle" variant="h4" component="div">
                    {moment.unix(props.order.data.createdAt).format("MMM Do YYYY, h:mma")}
                </Typography>
                {props.order.data.cart?.map((item, key) => (
                    // <CheckoutItem key={key} id={item.id} name={item.name} price={item.price} image={item.image}/>
                    <div className="listContainer">
                        <Card className="orderHistoryCard"> 
                            <List sx={{ width: '100%' }}>
                                <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                >
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src={item.image} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name + ' x' + item.qty}
                                    secondary={'$'+item.price}
                                />
                                </ListItem>
                                {/* <Divider variant="inset" component="li" /> */}
                            </List>
                            <CardContent>
                                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                                    <Typography variant="p" component="div">
                                        Order Status
                                    </Typography>
                                    <Typography style={{color: 'green'}} variant="p" component="div">
                                        Delivered
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </div>

                ))}
            </Container>

        </>
    );
}

export default Order;
