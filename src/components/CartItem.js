import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../css/cartItem.css';

const CartItem = (props) => {


    const [{cart}, dispatch] = useStateValue();

    const removeFromCart = (e) => {
        e.preventDefault();
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: props.item.id
        })
    }

    return (
        <div style={{display: 'flex', justifyContent:'space-evenly'}}>
            <div>
                <img src={props.item.image} alt={props.item.name} className="cartItemImage"/>
            </div>
            <Grid container direction="column" style={{marginLeft: '16px', width: '100%'}}>
                <Grid item>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        {props.item.name}
                    </Typography>
                    <CurrencyFormat
                        renderText={(value) => (
                        <>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                {value}
                            </Typography>
                        </>
                        )}
                        decimalScale={2}
                        value={props.item.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                    />
                </Grid>
                
            </Grid>
            <div className="closeButton">
                <IconButton aria-label="close" style={{marinRight: '8px'}} onClick={e => removeFromCart(e)}> 
                    <CloseIcon/>
                </IconButton>
            </div>
        </div>
    );
}

export default CartItem;
