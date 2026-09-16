import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import Box from '@mui/material/Box';
import '../css/order.css';

const Order = (props) => {
    return (
        <>
            <Accordion>
                {/* Accordion Summary */}
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="order-content"
                    id="order-header"
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" component="div">
                            {moment.unix(props.order.data.createdAt).format("MMM Do, h:mma")}
                        </Typography>
                        <Typography style={{ color: 'green' }} variant="body2" component="div">
                            {props?.order?.data?.orderStatus}
                        </Typography>
                    </Box>
                </AccordionSummary>

                {/* Accordion Details */}
                <AccordionDetails>
                    <List sx={{ width: '100%' }}>
                        {props?.order?.data?.cart?.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src={item.image} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${item.name} x${item.qty}`}
                                    secondary={`$${item.price}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Order;