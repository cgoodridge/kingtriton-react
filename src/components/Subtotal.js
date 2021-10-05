import React from 'react';
import CurrencyFormat from 'react-currency-format';
import Card from '@material-ui/core/Card';
import "../css/subtotal.css";
import { useStateValue } from '../StateProvider';
import { getCartTotal } from './reducers/reducer';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';

const Subtotal = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector(selectItems);
    const total = useSelector(selectTotal);

    return (
        <Card className='subtotalCardStyle'>
            <div className="subtotal">
                <CurrencyFormat
                    renderText={(value) => (
                    <>
                        <p>
                        Subtotal ({cart?.length} items): <strong>{value}</strong>
                        </p>
                    </>
                    )}
                    decimalScale={2}
                    value={total} 
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />

            <Button variant="contained" className="loginButton" type="submit" >Proceed to Checkout</Button>
            </div>
        </Card>
        
    )

}

export default Subtotal;