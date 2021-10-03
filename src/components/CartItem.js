import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../css/cartItem.css';
import { removeFromCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';



const CartItem = ({id, name, image, price}) => {

    console.log(id);
    const dispatch = useDispatch();
    const cart = useSelector(selectItems);

    // const [{cart}, dispatch] = useStateValue();

    const removeItemFromCart = () => {
        // const prodId = { id:props.id }
        dispatch(removeFromCart({ id }));
    }

    return (
        <div style={{display: 'flex', justifyContent:'space-evenly'}}>
            <div>
                <img src={image} alt={name} className="cartItemImage"/>
            </div>
            <Grid container direction="column" style={{marginLeft: '16px', width: '100%'}}>
                <Grid item>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        {name}
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
                        value={price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                    />
                </Grid>
                
            </Grid>
            <div className="closeButton">
                <IconButton aria-label="close" style={{marinRight: '8px'}} onClick={removeItemFromCart}> 
                    <CloseIcon/>
                </IconButton>
            </div>
        </div>
    );
}

export default CartItem;
