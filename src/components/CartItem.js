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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';



const CartItem = ({ id, name, image, price, qty }) => {

    const dispatch = useDispatch();
    const cart = useSelector(selectItems);

    const [qtyValue, setQtyValue] = useState(qty);

    const handleQtyAdd = (e) => {
        // console.log('ID of product qty being decreased ', e.currentTarget.id);
        // setCartUpdateId(arr => [...arr, e.currentTarget.id]);
        // setCartUpdateId(e.currentTarget.id);
        e.stopPropagation();

        const product = {
            id: id,
            qty: qtyValue
        }
        
        setQtyValue(qtyValue + 1);

        dispatch(updateCartIncrease(product));
    };

    const handleQtySub = (e) => {
        console.log('ID of product qty being increased ', e.currentTarget.id);
        // setCartUpdateId(e.currentTarget.id);

        e.stopPropagation();
        const product = {
            id: id,
            qty: qtyValue
        }

        dispatch(updateCartDecrease(product));

        if (qtyValue > 1) {

            setQtyValue(qtyValue - 1);
        }
    };

    const removeItemFromCart = (e) => {
        // const prodId = { id:props.id }
        e.stopPropagation();

        dispatch(removeFromCart({ id: id }));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>
                <img src={image} alt={name} className="cartItemImage" />
            </div>
            <Grid container direction="column" style={{ marginLeft: '16px', width: '100%' }}>
                <Grid item>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        {name + ' x' + qty}
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
                    <div className="cartItemCounter">
                        <IconButton color="secondary" size="small" style={{ backgroundColor: "#2196f3" }} onClick={qtyValue > 1 ? handleQtySub : removeItemFromCart}>
                            <RemoveIcon fontSize="inherit" />
                        </IconButton>

                        <input type="number" min="0" value={qtyValue} onChange={e => setQtyValue(parseInt(e.target.value))} className="qtyField"></input>

                        <IconButton color="secondary" size="small" style={{ backgroundColor: "#2196f3" }} onClick={handleQtyAdd}>
                            <AddIcon fontSize="inherit" />
                        </IconButton>
                    </div>
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
