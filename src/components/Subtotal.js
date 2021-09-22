import React from 'react';
import CurrencyFormat from 'react-currency-format';
import Card from '@material-ui/core/Card';
import "../css/subtotal.css";
import { useStateValue } from '../StateProvider';
import { getCartTotal } from './reducers/reducer';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

const Subtotal = () => {
    const history = useHistory();
    const [{ cart }, dispatch] = useStateValue();

    return (
        <Card className='cardStyle'>
            <div className="subtotal">
                <CurrencyFormat
                    renderText={(value) => (
                    <>
                        <p>
                        {/* Part of the homework */}
                        Subtotal ({cart?.length} items): <strong>{value}</strong>
                        </p>
                    </>
                    )}
                    decimalScale={2}
                    value={getCartTotal(cart)} // Part of the homework
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