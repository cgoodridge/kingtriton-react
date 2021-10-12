import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
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
import { auth, db } from '../firebaseConfigFile';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import '../css/navbar.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../css/homeHeader.css';
import CartItem from './CartItem';
import { selectUser, logout } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse';
import '../css/cartItem.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import CurrencyFormat from 'react-currency-format';
import { removeFromCart, updateCart, addToCart } from '../slices/cartSlice';


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

}));


const HomeNavbar = (props) => {
    const classes = useStyles();
    const user = useSelector(selectUser);
    const cart = useSelector(selectItems);
    const history = useHistory();
    const dispatch = useDispatch();
    const [qtyValue, setQtyValue] = useState(1);
    const [cartQtyChanged, setCartQtyChangeVal] = useState(false);
    const [cartState, setCartState] = useState({
        right: false,
    });
    const [expand, setExpansion] = useState(true);
    const [cartUpdateId, setCartUpdateId] = useState([]);
    const [menuState, setMenuState] = useState({
        right: false,
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedInAnchor, setLoggedInAnchor] = useState(null);
    const open = Boolean(anchorEl);
    const loggedInOpen = Boolean(loggedInAnchor);
    const handleExpansionClick = (e) => {
        e.stopPropagation();
        setExpansion(!expand);
    };

    const logoutOfApp = () => {
        dispatch(logout);
        auth.signOut();
        handleLoggedInMenuClose();
        history.push('/');
    };


    const toggleCartDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setCartState({ ...cartState, [anchor]: open });
    };

    const toggleMenuDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setMenuState({ ...cartState, [anchor]: open });
    };

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
            <List className="cart" style={{ height: '500px', width: '100%' }}>
                <Typography
                    component="h5"
                    variant="h5"
                    align="center"
                    className="cartText"
                    color="textPrimary"
                >
                    Your Cart
                </Typography>
                <Divider />
                {cart.map((food, index) => (
                    <>
                        <div key={food.id} id={food.id} style={{ padding: '8px 16px', marginTop: '16px' }}>
                            <CartItem id={food.id} name={food.name} price={food.price} image={food.image} qty={food.qty}/>
                        </div>
                    </>
                ))}
                <ListItem className="cartOptions">
                    <Button variant="contained" color="secondary" fullWidth component={Link} to="/checkout" >
                        Checkout
                    </Button>
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
            <div className="logoContainer">
                <img className="headerLogo" src="./img/temp-logo.png" alt="Site Logo"></img>
                <h2>King Triton's Seafood Palace</h2>
            </div>

            <Divider />
            <List className="cart" style={{ height: '500px', width: '100%' }}>

                <ListItem disablepadding="true">
                    <ListItemButton component={Link} to="/">
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <Divider />

                <ListItem disablepadding="true">
                    <ListItemButton component={Link} to="/menu">
                        <ListItemText primary="Menu" />
                    </ListItemButton>
                </ListItem>
                <Divider />

                <ListItem disablepadding="true">
                    <ListItemButton component={Link} to="/reservations">
                        <ListItemText primary="Reservations" />
                    </ListItemButton>
                </ListItem>
                <Divider />

                <ListItem disablepadding="true">
                    <ListItemButton component={Link} to="/contact">
                        <ListItemText primary="Contact" />
                    </ListItemButton>
                </ListItem>
                <Divider />

                <ListItem disablepadding="true">
                    <ListItemButton component={Link} to="/about">
                        <ListItemText primary="About" />
                    </ListItemButton>
                    <Divider />
                </ListItem>

                {user ?
                    <>
                        <ListItemButton sx={{ pl: 4 }} onClick={handleExpansionClick}>
                            <ListItemText primary={'Hi ' + user?.displayName.split(" ")[0]} />
                            {expand ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={expand} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding="true">
                                <ListItemButton component={Link} to="/account" sx={{ pl: 8 }}>
                                    <ListItemText primary="My Account" />
                                </ListItemButton>
                                <ListItemButton onClick={logoutOfApp} sx={{ pl: 8 }}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </>

                    :

                    <>
                        <ListItemButton sx={{ pl: 4 }} onClick={handleExpansionClick}>
                            <ListItemText primary="Hey Guest" />
                        </ListItemButton>
                        <Collapse in={expand} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding="true">
                                <ListItemButton component={Link} to="/login" sx={{ pl: 8 }}>
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                                <ListItemButton component={Link} to="/register" sx={{ pl: 8 }}>
                                    <ListItemText primary="Register" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </>
                }



            </List>
            <Divider />

        </div>
    );

    return (


        <header className="homeHeader">
            <CssBaseline />
            <HideOnScroll {...props}>

                <Box flexGrow={1}>
                    <AppBar position="absolute" color="transparent" elevation={0}>
                        <Toolbar>

                            {/* <img sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }} className="headerLogo" src="./img/temp-logo.png" alt="Site Logo"></img> */}

                            <nav className="nav-col">
                                {['left'].map((anchor) => (
                                    <React.Fragment key={anchor}>
                                        <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' } }} >
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
                                        <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' } }}>
                                            <IconButton disableFocusRipple={true} onClick={toggleCartDrawer(anchor, true)} color="secondary" className="cartButton" aria-label="open shopping cart">
                                                <Badge badgeContent={cart?.length} color="secondary">
                                                    <ShoppingBasketIcon />
                                                </Badge>
                                            </IconButton>
                                            <Drawer anchor={anchor} ModalProps={{ keepMounted: true, }} open={cartState[anchor]} onClose={toggleCartDrawer(anchor, false)}>
                                                {cartList(anchor)}
                                            </Drawer>
                                        </Box>
                                    </React.Fragment>
                                ))}
                                {/* <p>Test</p> */}
                                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }} className="nav-wrapper">
                                    <ul className="right">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/menu">Menu</Link></li>
                                        <li><Link to="/reservations">Reservations</Link></li>
                                        <li><Link to="/contact">Contact</Link></li>
                                        <li><Link to="/about">About</Link></li>
                                        <li style={{ marginLeft: '16px', marginRight: '8px', cursor: 'pointer', color: 'white' }} onClick={user ? handleLoggedInMenu : handleMenuClick}>Hi, {user ? user.displayName.split(" ")[0] : 'Guest'} <KeyboardArrowDownIcon sx={{ paddingTop: '5px' }} /></li>
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
                                        <MenuItem onClick={logoutOfApp}>
                                            Logout
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




export default HomeNavbar;