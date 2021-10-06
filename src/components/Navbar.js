import React, { useState, useEffect, useRef } from 'react';
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
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { useStateValue } from '../StateProvider';
import { auth, db } from '../firebaseConfigFile';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import '../css/navbar.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CartItem from './CartItem';
import { selectUser } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


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
        fontWeight: "regular",
        textAlign: "center",
        fontSize: "22px"
    }
}));

  
const Navbar = (props) => {
    const _isMounted = useRef(true);


    const classes = useStyles();

    // const [{ cart, user }, dispatch] = useStateValue();
    const [displayName, setDisplayName] = useState("");
    // console.log(user ? 'user logged in' : 'user not logged in');

    const user = useSelector(selectUser);
    const cart = useSelector(selectItems);

    const dispatch = useDispatch();

    const handleAuth = () => {
        if (user) {
            auth.signOut();
        }
        handleMenuClose();
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedInAnchor, setLoggedInAnchor] = useState(null);

    const open = Boolean(anchorEl);
    const loggedInOpen = Boolean(loggedInAnchor);

    const handleMenuClick = (event) => {

        setAnchorEl(event.currentTarget);
    };
    const handleLoggedInMenu = (event) => {

        setLoggedInAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLoggedInMenuClose = () => {
        setLoggedInAnchor(null);
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
        
            <List className="cart" style={{height: '500px', width: '100%',}}>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.cartText}
                    color="textPrimary"
                >
                    Items in your cart
                </Typography>
                <Divider/>
                {cart.map((food, key) => (
                    <>
                        <div style={{padding:'8px 16px', marginTop: '16px'}}>
                            <CartItem key={key} id={food.id} name={food.name} price={food.price} image={food.image} qty={food.qty}/>
                        </div>
                        {/* <Divider variant="inset" component="li" /> */}
                        
                    </>
                ))} 
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

    const navList = (anchor) => (
        <div
            className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleMenuDrawer(anchor, false)}
            onKeyDown={toggleMenuDrawer(anchor, false)}
        >
        
            <List className="cart" style={{height: '500px', width: '100%'}}>
                
                <ListItem disablepadding = "true">
                    <ListItemButton component={Link} to="/">
                        <ListItemText primary="Home"  />
                    </ListItemButton>
                </ListItem>
                <ListItem disablepadding = "true">
                    <ListItemButton component={Link} to="/menu">
                        <ListItemText primary="Menu"  />
                    </ListItemButton>
                </ListItem>
                <ListItem disablepadding = "true">
                    <ListItemButton component={Link} to="/reservations">
                        <ListItemText primary="Reservations"  />
                    </ListItemButton>
                </ListItem>
                <ListItem disablepadding = "true">
                    <ListItemButton component={Link} to="/contact">
                        <ListItemText primary="Contact"  />
                    </ListItemButton>
                </ListItem>
                <ListItem disablepadding = "true">
                    <ListItemButton component={Link} to="/about">
                        <ListItemText primary="About"  />
                    </ListItemButton>
                </ListItem>
                <ListItem disablepadding = "true">
                    {user ? 
                    <ListItemButton>
                        <ListItemText primary={user.displayName} />
                    </ListItemButton> 
                    : 
                    <ListItemButton component={Link} to="/login">
                        <ListItemText primary="Login"  />
                    </ListItemButton>
                    }
                    
                </ListItem>
            
            </List>
            <Divider />
        
        </div>
    );

    return (

        <header>
            <CssBaseline />
            <HideOnScroll {...props}>
                <Box flexGrow={1}>
                    <AppBar position="absolute">
                        <Toolbar>
                        <nav className="nav-col">
                            {['left'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Box sx={{ display: {xs: 'flex', sm: 'flex', md: 'none', lg: 'none' } }} >
                                        <a href="#" data-target="mobile-demo" onClick={toggleMenuDrawer(anchor, true)} className="sidenav-trigger"><i className="material-icons">menu</i></a>
                                        <Drawer anchor={anchor} open={menuState[anchor]} onClose={toggleMenuDrawer(anchor, false)}>
                                            {navList(anchor)}
                                        </Drawer>
                                    </Box>

                                </React.Fragment>
                            ))}
                            <a href="#!" className="brand-logo">King Triton's</a>
                            {['right'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Box sx={{ display: { xs: 'flex', sm:'flex', md: 'none', lg: 'none' } }} >
                                        <IconButton disableFocusRipple="true" onClick={toggleCartDrawer(anchor, true)} color="secondary" className="cartButton" aria-label="open shopping cart">
                                            <Badge badgeContent={cart?.length} color="secondary">
                                                <ShoppingBasketIcon />
                                            </Badge>
                                        </IconButton>
                                        <Drawer anchor={anchor} ModalProps={{ keepMounted: true,}} open={cartState[anchor]} onClose={toggleCartDrawer(anchor, false)}>
                                            {cartList(anchor)}
                                        </Drawer>
                                    </Box>
                                </React.Fragment>
                            ))}
                            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }} className="nav-wrapper">
                                
                                <ul className="right hide-on-med-and-down">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/menu">Menu</Link></li>
                                    <li><Link to="/reservations">Reservations</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li style={{marginLeft: '16px', marginRight: '8px', cursor: 'pointer', color: 'white'}} onClick={user ? handleLoggedInMenu : handleMenuClick}>Hey, {user ? user.displayName : 'Guest'} <KeyboardArrowDownIcon sx={{paddingTop: '5px'}}/></li> 
                                    <li>
                                    {['right'].map((anchor) => (
                                        <React.Fragment key={anchor}>
                                            <IconButton disableFocusRipple={true} onClick={toggleCartDrawer(anchor, true)} color="secondary" aria-label="open shopping cart">
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
                                <Menu
                                    id="loggedInMenu"
                                    anchorEl={loggedInAnchor}
                                    open={loggedInOpen}
                                    onClose={handleLoggedInMenuClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleLoggedInMenuClose} component={Link} to="/account">My Account</MenuItem>
                                    <MenuItem onClick={handleLoggedInMenuClose}>
                                        <Button size='small' variant="contained" color="secondary" onClick={handleAuth}>
                                            Logout
                                        </Button> 
                                    </MenuItem>
                                </Menu>
                                <Menu
                                    id="loggedOutMenu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleMenuClose}>
                                    <Button size='small' variant="contained" color="secondary" component={Link} to="/login">
                                            Login
                                        </Button> 
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClose}>
                                        <Button size='small' variant="outlined" color="secondary" component={Link} to="/register">
                                            Create an Account
                                        </Button> 
                                    </MenuItem>
                                </Menu>
                                
                                
                            </Box>
                        </nav>
                        </Toolbar>
                    </AppBar>
                </Box>
            </HideOnScroll>
            <Toolbar />    
        </header>
    )

}

  


export default Navbar;