import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import '../css/checkoutDetailsForm.css';
import { useStateValue } from '../StateProvider';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useHistory } from 'react-router-dom'; 



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

const savedAddresses = [
  {
    value: 'home',
    label: 'Home',
  },
  {
    value: 'school',
    label: 'School',
  },
  {
    value: 'work',
    label: 'Work',
  },
];

const CheckoutDetailsForm = () => {

const history = useHistory();
const [cardProvider, setCardProvider] = useState('VISA');
const [addressProvider, setAddressProvider] = useState('Home');
const [selectedValue, setSelectedValue] = useState('card');
const [{ cart, user }, dispatch] = useStateValue();

  const handleChange = (event) => {
    setCardProvider(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddressProvider(event.target.value);
  };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOrder = () => {
    history.push('/orders');
  };

    return (
      <>
        <form action="">
          <Card className="formCard">
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: 22 }} gutterBottom>
                Contact Info
              </Typography>
              <div>
                  <TextField fullWidth id="standard-basic" label="First Name" variant="standard" required/>
              </div>
              <div>
                  <TextField fullWidth id="standard-basic" label="Last Name" variant="standard" required/>
              </div>
              <div>
                  <TextField fullWidth id="standard-basic" label="Mobile Contact Number" variant="standard" required/>
              </div>
              <div>
                  <TextField fullWidth id="standard-basic" label="Alternate Contact Number" variant="standard"/>
              </div>
            </CardContent>
          </Card>
            
          <Card className="formCard">
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: 18 }} gutterBottom>
                Delivery Address
              </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6} className="buttonAlign">
                    <Button size='large' variant="outlined">Add New Address</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                          id="standard-select-address"
                          select
                          required
                          fullWidth
                          label="Select"
                          value={addressProvider}
                          onChange={handleAddressChange}
                          helperText="Please select your delivery address"
                          variant="standard"
                      >
                      {savedAddresses.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                      ))}
                    </TextField>
                  </Grid> 
                </Grid>
                
                <Grid container spacing={3} >
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                      Keith Hunte Hall, UWI, Cave Hill
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="outlined" className="editButton" startIcon={<EditIcon />}>
                      Edit
                    </Button>
                  </Grid> 
                </Grid>

                <Typography variant="h6" sx={{ fontSize: 18 }} gutterBottom>
                      Delivery Directions
                </Typography>
                <Typography variant="body1" gutterBottom mb={1}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                  neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                  quasi quidem quibusdam.
                </Typography>
            </CardContent>
          </Card>

          <div className="radioFieldContainer">
              <FormControl component="fieldset" >
                <FormLabel component="legend">Payment Option</FormLabel>
                <RadioGroup
                  className="radioFields"
                  row
                  aria-label="payment option"
                  name="controlled-radio-buttons-group"
                  value={selectedValue}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="card" control={<Radio />} label="By Card" />
                  <FormControlLabel value="cash" control={<Radio />} label="By Cash" />
                </RadioGroup>
              </FormControl>
          </div>
         
        

          {selectedValue === 'card' ? 
          
          
          <Card className="formCard">
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: 18 }} gutterBottom>
                Payment Info
              </Typography>
                <div>
                    <TextField
                        id="standard-select-card"
                        select
                        required
                        fullWidth
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
                    <TextField fullWidth id="standard-basic" label="Name on Card" variant="standard" required="true"/>
                </div>
                <div>
                    <TextField fullWidth id="standard-basic" label="Card Number" variant="standard" required/>
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={9}>
                    <TextField fullWidth id="standard-basic" label="" type="date" variant="standard" margin="normal" required/>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField fullWidth id="standard-basic" label="CVV" variant="standard" required/>
                  </Grid> 
                </Grid>
            </CardContent>
          </Card> : 
          
          <div></div>}

          <div className="submitButton">
            <Button variant="contained" type="submit" onClick={handleOrder}>Place Order</Button>
          </div>
        </form>
      </>
    );
}

export default CheckoutDetailsForm;
