import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../css/checkoutDetailsForm.css';
import { useStateValue } from '../StateProvider';


const cardProviders = [
    {
      value: 'VISA',
      label: 'VISA',
    },
    {
      value: 'MasterCard',
      label: 'MasterCard',
    },
    {
      value: 'AmericanExpress',
      label: 'American Express',
    },
  ];

const CheckoutDetailsForm = () => {

const [cardProvider, setCardProvider] = useState('VISA');
const [{ cart, user }, dispatch] = useStateValue();

  const handleChange = (event) => {
    setCardProvider(event.target.value);
  };
    return (
        <Card className="formCard">
            <CardContent>
                <div>
                    <TextField
                        id="standard-select-card"
                        select
                        label="Select"
                        value={cardProvider}
                        onChange={handleChange}
                        helperText="Please select your card provider"
                        variant="standard"
                    >
                    {cardProviders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
                <div>
                    <TextField id="standard-basic" label="Name on Card" variant="standard" />
                </div>
                <div>
                    <TextField id="standard-basic" label="Card Number" variant="standard" />
                </div>
            </CardContent>
        </Card>
    );
}

export default CheckoutDetailsForm;
