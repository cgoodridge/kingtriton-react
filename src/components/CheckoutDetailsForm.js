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
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { db } from '../firebaseConfigFile';
import { getCartTotal } from './reducers/reducer';
import moment from 'moment';




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

const [open, setOpenForm] = useState(false);

const handleClickOpen = () => {
  setOpenForm(true);
};

const handleClose = () => {
  setOpenForm(false);
};


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

  /// TODO: Create object models to handle data
  const handleOrder = () => {
    db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc()
      .set({
        cart: cart,
        amount: getCartTotal(cart),
        createdAt: moment()
      })
    history.push('/orders');
  };

  const handleAddress = async () => {
    console.log('Address func called');
    db
      .collection('users')
      .doc(user?.uid)
      .collection('storedAddresses')
      .doc()
      .set({
        name: 'home'
      })
      .catch(error => alert(error.message))
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
                    <Button size='large' variant="outlined" onClick={handleClickOpen}>Add New Address</Button>
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
                
                <Dialog open={open} onClose={handleClose} className="formCard">
                  <form action="">
                    <DialogTitle>New Delivery Address</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                      </DialogContentText>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Default Delivery Address" />
                      </FormGroup>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address Name"
                        type="text"
                        fullWidth
                        required
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="addressLine1"
                        label="Address Line 1"
                        type="text"
                        fullWidth
                        required
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="addressLine2"
                        label="Address Line 2"
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                          id="standard-select-address"
                          select
                          required
                          fullWidth
                          label="Select"
                          value={addressProvider}
                          onChange={handleAddressChange}
                          helperText="Select your parish"
                          variant="standard"
                      >
                      {savedAddresses.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="standard-textarea"
                      label="Directions"
                      placeholder="Take a right by the white lion"
                      multiline
                      fullWidth
                      variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleAddress} type="submit">Save</Button>
                    </DialogActions>
                  </form>
                </Dialog>
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
