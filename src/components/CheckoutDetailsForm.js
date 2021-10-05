import React, { useState, useEffect, useRef } from 'react';
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
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import axios from '../axios';
import { selectItems, selectTotal, emptyCart } from '../slices/cartSlice';
import { selectUser } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';




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


const parishes = [
  {
    value: 'Christ Church',
    label: 'Christ Church',
  },
  {
    value: 'St Phillip',
    label: 'St Phillip',
  },
  {
    value: 'St Michael',
    label: 'St Michael',
  },
  {
    value: 'St George',
    label: 'St George',
  },
  {
    value: 'St Joseph',
    label: 'St Joseph',
  },
  {
    value: 'St John',
    label: 'St John',
  },
  {
    value: 'St Andrew',
    label: 'St Andrew',
  },
  {
    value: 'St James',
    label: 'St James',
  },
  {
    value: 'St Thomas',
    label: 'St Thomas',
  },
  {
    value: 'St Peter',
    label: 'St Peter',
  },
  {
    value: 'St Lucy',
    label: 'St Lucy',
  },
];

const CheckoutDetailsForm = () => {

const _isMounted = useRef(true);

// const [{ cart, user }, dispatch] = useStateValue();
const user = useSelector(selectUser);
const cart = useSelector(selectItems);
const dispatch = useDispatch();
const total = useSelector(selectTotal);



const [succeeded, setSucceeded] = useState(false);
const [processing, setProcessing] = useState(false);
const [clientSecret, setClientSecret] = useState("");


const handleClickOpen = () => {
  setOpenForm(true);
};

const handleClose = () => {
  setOpenForm(false);
};

const handleCardSubmit = async (e) => {

  e.preventDefault();

  if (savedAddresses <= 0)
  {
    alert('Please add an address');
    return;
  }

  setProcessing(true);

  const payload = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement)
    }
  }).then(({ paymentIntent }) => {

    db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
        cart: cart,
        amount: paymentIntent.amount,
        createdAt: paymentIntent.created,
        deliveryAddress: addressNameSelection,
        contactNumber: mobileNumber,
        altNumber: altNumber

        // test: 'Transaction was successful'
      })

    setSucceeded(true);
    setError(null);
    setProcessing(false);

    dispatch(emptyCart);
    history.push('/orders');

  })

}

const handleCardChange = (e) => {
  setDisabled(e.empty);
  setError(e.error ? e.error.message : "");
}


const stripe = useStripe();
const elements = useElements();

const history = useHistory();

const [open, setOpenForm] = useState(false);

const [cardProvider, setCardProvider] = useState('VISA');
const [addressNameSelection, setAddressNameSelection] = useState('home');
const [selectedValue, setSelectedValue] = useState('card');

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [mobileNumber, setMobileNumber] = useState('');
const [altNumber, setAltNumber] = useState('');


const [addressState, setAddressState] = useState(false);
const [addressName, setAddressName] = useState('');
const [addressLine1, setAddressLine1] = useState('');
const [addressLine2, setAddressLine2] = useState('');
const [parish, setParish] = useState('');
const [directions, setDirections] = useState('');



useEffect(() => {
  const getClientSecret = async () => {
    const response = await axios({
      method: 'post',
      url: `/checkout/create?total=${total * 100}`
    });
    setClientSecret(response.data.clientSecret)
  }

  getClientSecret();

  return () => { // ComponentWillUnmount 
    _isMounted.current = false;
  }
}, [cart]);



const [error, setError] = useState(null);
const [disabled, setDisabled] = useState(null);


  /// TODO: Create object models to handle data

  const handleChange = (event) => {
    setCardProvider(event.target.value);
  };
  const handleAddressNameSelection = (event) => {
    setAddressNameSelection(event.target.value);
  };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setAddressState(event.target.checked);
  };


  const handleAddress = (e) => {
    e.preventDefault();
    db
      .collection('users')
      .doc(user?.uid)
      .collection('storedAddresses')
      .doc()
      .set({
        defaultAddress: addressState,
        name: addressName,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        parish: parish,
        directions: directions
      })
      .catch(error => alert(error.message))

    handleClose();
  };

  const [savedAddresses, setSavedAddresses] = useState([]);


      useEffect(() => {
          
          db
          .collection('users')
          .doc(user?.uid)
          .collection('storedAddresses')
          .onSnapshot(snapshot => (
            setSavedAddresses(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            })))
          ))
        
          return () => { // ComponentWillUnmount 
            _isMounted.current = false;
          }
        
      }, []);

      // console.log('Total addresses stored is ', savedAddresses);

    return (
      <>
        <Dialog open={open} onClose={handleClose} className="modalCard" style={{ alignItems: "center", justifyContent: "center" }}>
          <form action="">
            <DialogTitle>New Delivery Address</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Save an address for faster checkout next time.
              </DialogContentText>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={addressState} onChange={handleCheckboxChange}/>} label="Default Delivery Address" />
              </FormGroup>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={addressName} 
                onChange={e => setAddressName(e.target.value)}
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
                value={addressLine1} 
                onChange={e => setAddressLine1(e.target.value)}
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
                value={addressLine2} 
                onChange={e => setAddressLine2(e.target.value)}
                label="Address Line 2"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                  id="standard-select-parish"
                  select
                  required
                  fullWidth
                  value={parish} 
                  onChange={e => setParish(e.target.value)}
                  label="Select"
                  helperText="Select your parish"
                  variant="standard"
              >
              {parishes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-textarea"
              value={directions} 
              onChange={e => setDirections(e.target.value)}
              label="Directions"
              placeholder="Take a right by the white rabbit."
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

        <form onSubmit={handleCardSubmit}>

        <div>
          {/* <form action=""> */}
            <Card className="checkoutCard">
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: 22 }} gutterBottom>
                  Contact Info
                </Typography>
                <div>
                  {user ? 
                    <TextField fullWidth id="firstName" value={user.displayName.split(" ")[0]} onChange={e => setFirstName(e.target.value)} label="First Name" variant="standard" required focused />
                    :
                    <TextField fullWidth id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} label="First Name" variant="standard" required />
                  }
                </div>
                <div>
                  {user ? 
                    <TextField fullWidth id="lastName" value={user.displayName.split(" ")[1]} onChange={e => setLastName(e.target.value)} label="Last Name" variant="standard" required focused />
                    :
                    <TextField fullWidth id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} label="Last Name" variant="standard" required />
                  }
                </div>
                <div>
                    <TextField fullWidth id="mobileNumber" label="Mobile Contact Number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} variant="standard" required/>
                </div>
                <div>
                    <TextField fullWidth id="altNumber" label="Alternate Contact Number" value={altNumber} onChange={e => setAltNumber(e.target.value)} variant="standard"/>
                </div>
              </CardContent>
            </Card>
              
            <Card className="checkoutCard">
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: 18 }} gutterBottom>
                  Delivery Address
                </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={6} className="buttonAlign">
                      <Button size='small' variant="outlined" onClick={handleClickOpen}>Add New Address</Button>
                    </Grid>
                    {savedAddresses  <= 0 ? 
                      <div></div> 


                      :
                      <Grid item xs={6}>
                        <TextField
                              id="standard-select-address"
                              select
                              required
                              fullWidth
                              label="Select"
                              placeholder="Choose Address"
                              value={addressNameSelection}
                              onChange={handleAddressNameSelection}
                              helperText="Choose delivery address"
                              variant="standard"
                          >
                          {savedAddresses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.data.name}
                              </MenuItem>
                          ))}
                        </TextField>
                      </Grid> 

                    }
                    
                  </Grid>
                  
                  {savedAddresses  <= 0 ? 
                      <div></div> 


                      :
                  <>
                    <Grid container spacing={3} >
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                          Keith Hunte Hall, UWI, Cave Hill
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Button variant="outlined" size="small" className="editButton" startIcon={<EditIcon />}>
                          Edit
                        </Button>
                      </Grid> 
                    </Grid>
                  
                  
                    <Typography variant="h6" gutterBottom>
                          Delivery Directions
                    </Typography>
                    <Typography variant="body1" gutterBottom mb={3} style={{overflow: 'truncate'}}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                      blanditiis tenetur unde suscipit.
                    </Typography>
                  </>
                  }
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
                    <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                  </RadioGroup>
                </FormControl>
            </div>
          
          

            {selectedValue === 'card' ? 
            
            
            <Card className="checkoutCard">
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: 18 }} gutterBottom>
                  Payment Info
                </Typography>

                  <CardElement onChange={handleCardChange}/>

              </CardContent>
            </Card> : 
            
            <div></div>}

            <div className="submitButton">
                  {selectedValue === 'cash' ? 
                      <Button {...processing ? disabled : null} variant="contained" type="submit">Confirm</Button>
                      :
                      <CurrencyFormat
                    renderText={(value) => (
                    <>
                      {cart.length <= 0 ? 
                        <Button disabled variant="contained" type="submit">Cart Empty</Button>
                        :
                        <Button variant="contained" type="submit" onClick={handleCardSubmit}>{processing ?  "Processing" : "Pay " + value}</Button>

                      }
                    </>
                    )}
                    decimalScale={2}
                    value={total} 
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  }
                  
            </div>

            {/* Error Section */}
            {error && <div>{error}</div>}
          {/* </form> */}
        </div>
        </form>
        
      </>
    );
}

export default CheckoutDetailsForm;
