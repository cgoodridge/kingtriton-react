import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CurrencyFormat from 'react-currency-format';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../css/cartItem.css';
import { removeFromCart, updateCartIncrease, updateCartDecrease } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import QuantityControl from "./QuantityControl";

const CartItem = ({ food }) => {

    const dispatch = useDispatch();
    const cart = useSelector(selectItems);

    const [qtyValue, setQtyValue] = useState(food?.qty);

    const handleQtyAdd = (e) => {
        e.stopPropagation();

        const product = {
            id: food?.id,
            qty: food?.qtyValue
        }
        setQtyValue((qtyValue) => qtyValue + 1);
        dispatch(updateCartIncrease(product));
    };

    const handleQtySub = (e) => {
        e.stopPropagation();
        const product = {
            id: food.id,
            qty: food.qtyValue
        }
        setQtyValue((qtyValue) => (qtyValue > 1 ? qtyValue - 1 : 1));
        dispatch(updateCartDecrease(product));
    };

    const removeItemFromCart = (e) => {
        e.stopPropagation();

        dispatch(removeFromCart({ id: food.id }));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>
                <img src={food?.image} alt={food?.name} className="cartItemImage" />
            </div>
            <Grid container direction="column" style={{ marginLeft: '16px', width: '100%' }}>
                <Grid item>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        {food?.name + ' x' + food?.qty}
                    </Typography>

                    <CurrencyFormat
                        renderText={(value) => (
                            <>
                                <Typography variant="subtitle2" gutterBottom component="h6">
                                    {value}
                                </Typography>
                            </>
                        )}
                        decimalScale={2}
                        value={food?.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                    />
                    {food?.customization_options?.map((option, index) => (
                        <Typography key={index} variant="caption" gutterBottom component="p">
                            {option.name + ' +$' + option.price}
                        </Typography>
                    ))}
                    <QuantityControl
                        qtyValue={qtyValue}
                        handleQtyAdd={handleQtyAdd}
                        handleQtySub={handleQtySub}
                        setQtyValue={(e) => setQtyValue(parseInt(e.target.value))}
                    />
                </Grid>
            </Grid>
            <div className="closeButton">
                <IconButton aria-label="close" style={{ marinRight: '8px' }} onClick={removeItemFromCart}>
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default CartItem;
