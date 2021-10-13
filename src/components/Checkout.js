import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Subtotal from "./Subtotal";
import Grid from '@material-ui/core/Grid';
import { createTheme } from '@material-ui/core/styles';
import { useStateValue } from '../StateProvider';
import CheckoutItem from './CheckoutItem';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckoutDetailsForm from './CheckoutDetailsForm';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../css/checkout.css';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import { selectUser } from '../slices/userSlice';
import CurrencyFormat from 'react-currency-format';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  gridContent:{
    display: 'flex',
    justifyContent: 'center'
  },

  contentPadding:{
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  cardPadding: {
    paddingRight: '8px',
    paddingLeft: '8px'
  }
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const EmptyCart = () => {
  return (
    <>
      <h4>Cart is empty</h4>
      <div className="addButtonContainer">
        <Button variant="contained" size="small" className="addButton" component={Link} to="/menu">Add Something</Button>
      </div>
    </>
  )
}

const Checkout = () => {

  const [value, setTabValue] = useState(0);
  const total = useSelector(selectTotal);
  const cart = useSelector(selectItems);
  const user = useSelector(selectUser);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProceedButton = () => {
    setTabValue(1);
  };

  const [cartContainsItems, setCartState] = useState(false);
  // const [{ cart }, dispatch] = useStateValue();

  
  const classes = useStyles();
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#2196f3',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

   

    
    return (
        // <div className="App" theme={theme}>
          <Container maxWidth="lg">
            <Box sx={{ width: '100%', marginTop: '16px' }}>
              <Box>
                <Tabs value={value} onChange={handleChange} aria-label="checkout page tabs" centered>
                  <Tab label="Review Items" {...a11yProps(0)} />
                  {user ? 
                  
                  <Tab label="Enter Details" {...a11yProps(1)}/>
                  :
                  <Tab label="Enter Details" {...a11yProps(1)} disabled/>
                  }
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Grid container direction="row"  className={classes.contentPadding}>
                  <Grid container direction="column" item xs={12} md={6} sm={6} className={classes.gridContent}>
                    <h4 alignItems="flex-start">Items in Cart</h4>
                    
                    {
                      !cart.length <= 0 ? 
                      cart.map(item => (
                        
                        <CheckoutItem id={item.id} name={item.name} image={item.image} price={item.price} qty={item.qty}/>
                      ))
                      : <EmptyCart/>
                    }
                  </Grid>
                  <Grid item xs={12} md={6} sm={6} alignItems="flex-start" className={classes.gridContent}>
                    <Card className='subtotalCardStyle'>
                      <div className="subtotal">
                          <CurrencyFormat
                              renderText={(value) => (
                              <>
                                  <p>
                                  Subtotal ({cart?.length} {cart?.length === 1 ? 'item' : 'items'}): <strong>{value}</strong>
                                  </p>
                              </>
                              )}
                              decimalScale={2}
                              value={parseFloat(total)} 
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                          />
              {  console.log('The total is ', total)}

                      {user ? 
                      
                        <Button variant="contained" className="loginButton" onClick={handleProceedButton}>Proceed to Checkout</Button>
                        :
                        <Button variant="contained" className="loginButton" component={Link} to="/login">Sign In To Continue</Button>
                      }
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <CheckoutDetailsForm/>
              </TabPanel>
            </Box>
          </Container>
        // </div>
    );
}

export default Checkout;
