import React from 'react';
import CurrencyFormat from 'react-currency-format';
import "../css/subtotal.css";
import { useStateValue } from '../StateProvider';
import { getCartTotal } from './reducers/reducer';

const Subtotal = () => {

    const [{ cart }, dispatch] = useStateValue();

    return (
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

        <button>Proceed to Checkout</button>
        </div>
    )

}

export default Subtotal;