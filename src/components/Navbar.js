import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { auth } from '../firebaseConfigFile';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import '../css/navbar.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CartItem from './CartItem';
import { selectUser, logout } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse';

const useStyles = makeStyles(() => ({
    list: {
        // width: 580,

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

function ChangeColorOnScroll({ children, target }) {
    const location = useLocation();

    const scrollTarget = target?.current || window;

    const trigger = useScrollTrigger({
        disableHysteresis: true, // Appends styles instantly upon passing the threshold
        threshold: 50,
        target: scrollTarget, // Use the provided target or default to window
    });
    const isTargetRoute = location.pathname === '/';

    const isScrolledOrOtherRoute = isTargetRoute ? trigger : true;
    return React.cloneElement(children, {
        sx: {
            backgroundColor: isScrolledOrOtherRoute ? 'primary.main' : 'transparent',
            color: isScrolledOrOtherRoute  ? 'text.primary' : 'common.white',
            boxShadow: isScrolledOrOtherRoute  ? 4 : 0,
            transition: 'all 0.3s ease-in-out',
        },
    });
}

const Navbar = ({ target = window}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();
    const total = useSelector(selectTotal);
    const [expand, setExpansion] = useState(true);

    const handleExpansionClick = (e) => {
        e.stopPropagation();
        setExpansion(!expand);
    };

    const user = useSelector(selectUser);
    const cart = useSelector(selectItems);

    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout);
        auth.signOut();
        handleLoggedInMenuClose();
        navigate('/');
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
            <List className="cart" style={{ height: '500px', width: '100%', }}>
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
                {cart.map((food, key) => (
                    <>
                        <div style={{ padding: '8px 16px', marginTop: '16px' }}>
                            <CartItem key={key} food={food} />
                        </div>
                    </>
                ))}
                <ListItem className="cartOptions">
                    {
                        (cart.length <= 0) ?
                            <Button variant="contained" color="secondary" fullWidth onClick={toggleCartDrawer(anchor, false)} >
                                Close
                            </Button>
                            :
                            <Button sx={{ color: 'white'}} variant="contained" color="secondary" fullWidth component={Link} to="/checkout" >
                                {(total > 0 && total < 70) ? `Checkout (($${parseFloat(total + 10)})` : ''}
                                {(total >= 70) ? `Checkout ($${parseFloat(total)})` : ''}
                            </Button>
                    }
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
                    <ListItemButton component={Link} to="/about">
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>
                <Divider />

                {user ?
                    <>
                        <ListItemButton sx={{ pl: 4 }} onClick={handleExpansionClick}>
                            <ListItemText primary={'Hi ' + user?.displayName?.split(" ")[0]} />
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
        <>
            <ChangeColorOnScroll target={target}>
                <AppBar>
                    <Toolbar>
                        <Box
                        sx={{
                            display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
                            alignItems: 'center',
                        }}>
                            <img className="headerLogo" src="./img/temp-logo.png" alt="Site Logo"></img>
                        </Box>
                        <nav className="nav-col">
                            {['left'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' } }} >
                                        <Button href="#" data-target="mobile-demo" onClick={toggleMenuDrawer(anchor, true)} className="sidenav-trigger"><i className="material-icons">menu</i></Button>
                                        <Drawer ModalProps={{ keepMounted: true, }} anchor={anchor} open={menuState[anchor]} onClose={toggleMenuDrawer(anchor, false)}>
                                            {navList(anchor)}
                                        </Drawer>
                                    </Box>

                                </React.Fragment>
                            ))}
                            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }}>
                                <a href="/" className="brand-logo">King Triton's</a>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' } }}>
                                <img className="headerLogo" src="./img/temp-logo.png" alt="Site Logo"></img>
                            </Box>
                            {['right'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Box className="cartIcon" sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' } }} >
                                        <IconButton disableFocusRipple="true" onClick={toggleCartDrawer(anchor, true)} color="secondary" className="cartButton" aria-label="open shopping cart">
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
                            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }} className="nav-wrapper">
                                <ul className="right hide-on-med-and-down">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/menu">Menu</Link></li>
                                    <li><Link to="/reservations">Reservations</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li style={{ marginLeft: '16px', marginRight: '8px', cursor: 'pointer', color: 'white' }} onClick={user ? handleLoggedInMenu : handleMenuClick}>Hi, {user ? user?.displayName?.split(" ")[0] : 'Guest'} <KeyboardArrowDownIcon sx={{ paddingTop: '5px' }} /></li>
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
                                        <Button size='small' variant="contained" color="secondary" component={Link} to={{ pathname: '/login', state: { prevPath: location.pathname } }}>
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
            </ChangeColorOnScroll>
        </>
    )

}

export default Navbar;