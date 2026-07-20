import React from 'react'
import '../css/checkoutItem.css';
import Card from '@material-ui/core/Card';
import IconButton from '@mui/material/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CurrencyFormat from 'react-currency-format';
import { removeFromCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',

      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    controlCounters: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',


    },
    playIcon: {
      height: 38,
      width: 38,
    },

    formSize:{
      width: 20,
      paddingTop: 0,
      paddingBottom: 0,
      textAlign: 'center'

    },
    cardRadius:{
      borderRadius: 10,
    },

    gridContent:{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },

    contentPadding:{
      paddingTop: '16px',
      paddingBottom: '16px',
    },
    cardPadding: {
      paddingRight: '8px',
      paddingLeft: '8px'
    }
  }));

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
