import React, { useState, useEffect } from 'react';
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
import { auth, db } from '../firebaseConfigFile';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import '../css/navbar.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../css/homeHeader.css';

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

  
const HomeNavbar = (props) => {

    const classes = useStyles();

    const [{ cart, user }, dispatch] = useStateValue();
    const [displayName, setDisplayName] = useState({ firstName: ''});


    useEffect(() => {
        if (user) {
            db
            .collection('users')
            .doc(user?.uid)
            .get()
            .then((snapshot) => {
                setDisplayName(snapshot.data().firstName)
                console.log(snapshot.data())
            })
            .catch((e) => console.log(e))
            
        } else {
            setDisplayName()
        }
    }, [user])

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

        <header className="homeHeader">
            <CssBaseline />
            <HideOnScroll {...props}>
            
                    
                <nav className="nav-col">
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo">King Triton's</a>
                        {['left'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                        <a href="#" data-target="mobile-demo" onClick={toggleMenuDrawer(anchor, true)} className="sidenav-trigger"><i className="material-icons">menu</i></a>
                                    <Drawer anchor={anchor} open={menuState[anchor]} onClose={toggleMenuDrawer(anchor, false)}>
                                        {navList(anchor)}
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
                            <li style={{marginLeft: '16px', marginRight: '8px', cursor:'pointer'}} onClick={user ? handleLoggedInMenu : handleMenuClick}>Hey, {user ? displayName : 'Guest'}</li>            
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
                        <Menu
                            id="loggedInMenu"
                            anchorEl={loggedInAnchor}
                            open={loggedInOpen}
                            onClose={handleLoggedInMenuClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleLoggedInMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={handleLoggedInMenuClose}>My account</MenuItem>
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
              
            </HideOnScroll>
            <Toolbar />    
        </header>
    )

}

  


export default HomeNavbar;