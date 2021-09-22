import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebaseConfigFile';

const HideOnScroll = (props) => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }


const useStyles = makeStyles((theme) => ({
    list: {
      width: 300,
      
    },
    fullList: {
      width: 'auto',
      
    },
    inline: {
        display: 'inline',
    },
    cartText: {
        padding: "16px",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "22px"
    }
}));

  
const Navbar = (props) => {

    const classes = useStyles();

    const [{ cart, user }, dispatch] = useStateValue();

    const handleAuth = () => {
        if (user) {
            auth.signOut();
        }
    }

    const [state, setState] = React.useState({
        right: false,
      });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    
    

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
        
            <List className="cart" style={{height: '500px', width: '100%'}}>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.cartText}
                    color="textPrimary"
                >
                    Items in your cart
                </Typography>
                {/* {props.items.map((food, index) => (
                <>
                    <ListItem key={index} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={"Picture of " + food.name} src={food.image}/>
                        </ListItemAvatar>
                        <ListItemText primary={food.name + "   $" + food.price} secondary={
                            <>
                                <div class="counter">
                                    <IconButton color="secondary" size="small" style={{backgroundColor: "#2196f3"}} onClick={()=>{this.handleAddQuantity(food.id)}}>
                                        <RemoveIcon fontSize="inherit" />
                                    </IconButton> 
                                    <input type="text" min="0" defaultValue={food.quantity}></input>
                                    <IconButton color="secondary" size="small" style={{backgroundColor: "#2196f3"}} onClick={()=>{this.handleSubtractQuantity(food.id)}}>
                                        <AddIcon fontSize="inherit"/> 
                                    </IconButton> 
                                </div>
                            </>
                        }/>
                        <br></br>
                        
                    </ListItem>
                    {/* <Divider variant="inset" component="li" /> 
                    
                </>

                ))} 
                */}
                <ListItem>
                    <Link to="/checkout">
                        <Button variant="contained" color="primary" style={{width: '100%'}}>
                            Checkout
                        </Button>
                    </Link>
                    
                </ListItem>
            </List>
            <Divider />
        
        </div>
    );


    return (

        <>
            <CssBaseline />
            <HideOnScroll {...props}>
            <AppBar>
                <Toolbar>
                    
                <nav className="nav-col">
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo">King Triton's</a>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/menu">Menu</Link></li>
                            <li><Link to="/reservations">Reservations</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/about">About</Link></li>
                            {/* TODO: Make the user name a dropdown with the login button under it */}
                            <li style={{marginLeft: '16px', marginRight: '8px', cursor:'pointer'}}>Hey, {user ? user.email : 'Guest'}</li>
                            <li>{user ? <span style={{marginLeft: '16px', marginRight: '8px', cursor:'pointer'}} onClick={handleAuth}>Logout</span> : <Link to="/login">Login</Link>} </li>
                            <li>
                            {['right'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <IconButton disableFocusRipple="true" onClick={toggleDrawer(anchor, true)} color="secondary" aria-label="open shopping cart">
                                        <Badge badgeContent={cart?.length} color="secondary">
                                            <ShoppingBasketIcon />
                                        </Badge>
                                    </IconButton>
                                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                        {list(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
                            </li>
                        </ul>
                    </div>
                </nav>
                </Toolbar>
            </AppBar>
            </HideOnScroll>
            <Toolbar />    
        </>
    )

}

  


export default Navbar;