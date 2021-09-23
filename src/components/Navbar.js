import React, { useState } from 'react';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../css/navbar.css';

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

    const [cartState, setCartState] = useState({
        right: false,
      });
    
    const toggleCartDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setCartState({ ...cartState, [anchor]: open });
    };

    const [menuState, setMenuState] = useState({
        right: false,
      });
    
    const toggleMenuDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setMenuState({ ...cartState, [anchor]: open });
    };
    
    

    const cartList = (anchor) => (
        <div
            className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleCartDrawer(anchor, false)}
            onKeyDown={toggleCartDrawer(anchor, false)}
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

    const menuList = (anchor) => (
        <div
            className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleMenuDrawer(anchor, false)}
            onKeyDown={toggleMenuDrawer(anchor, false)}
        >
        
            <List className="cart" style={{height: '500px', width: '100%'}}>
                
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemText primary="Home"  />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/menu">
                        <ListItemText primary="Menu"  />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/reservations">
                        <ListItemText primary="Reservations"  />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/contact">
                        <ListItemText primary="Contact"  />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/about">
                        <ListItemText primary="About"  />
                    </ListItemButton>
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
                        {['left'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                        <a href="#" data-target="mobile-demo" onClick={toggleMenuDrawer(anchor, true)} className="sidenav-trigger"><i className="material-icons">menu</i></a>
                                    <Drawer anchor={anchor} open={menuState[anchor]} onClose={toggleMenuDrawer(anchor, false)}>
                                        {menuList(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
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
                                    <IconButton disableFocusRipple="true" onClick={toggleCartDrawer(anchor, true)} color="secondary" aria-label="open shopping cart">
                                        <Badge badgeContent={cart?.length} color="secondary">
                                            <ShoppingBasketIcon />
                                        </Badge>
                                    </IconButton>
                                    <Drawer anchor={anchor} open={cartState[anchor]} onClose={toggleCartDrawer(anchor, false)}>
                                        {cartList(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
                            </li>

                        </ul>
                        {['right'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <IconButton disableFocusRipple="true" onClick={toggleCartDrawer(anchor, true)} color="secondary" className="cartButton" aria-label="open shopping cart">
                                    <Badge badgeContent={cart?.length} color="secondary">
                                        <ShoppingBasketIcon />
                                    </Badge>
                                </IconButton>
                                <Drawer anchor={anchor} open={cartState[anchor]} onClose={toggleCartDrawer(anchor, false)}>
                                    {cartList(anchor)}
                                </Drawer>
                            </React.Fragment>
                        ))}
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