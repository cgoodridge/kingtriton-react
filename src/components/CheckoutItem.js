import React from 'react'
import '../css/checkoutItem.css';
import Card from '@material-ui/core/Card';
import IconButton from '@mui/material/IconButton';
import CurrencyFormat from 'react-currency-format';
import { removeFromCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';

function CheckoutItem({id, name, image, price, qty}) {

    const dispatch = useDispatch();

    const removeItemFromCart = () => {
        dispatch(removeFromCart({ id }));
    }

    return (
        <Card className="listCard">
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={removeItemFromCart}>
                        <DeleteIcon />
                    </IconButton>
                }
                >
                <ListItemAvatar>
                    <Avatar alt={name} src={image} />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={'x'+qty}
                />
                <CurrencyFormat
                    renderText={(value) => (
                    <>
                        <p>
                        <strong>{value}</strong>
                        </p>
                    </>
                    )}
                    decimalScale={2}
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />
                </ListItem>
            </List>
        </Card>

    )
}

export default CheckoutItem;
