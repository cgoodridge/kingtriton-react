import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Cart from './components/Cart';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Badge from '@material-ui/core/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Basket from '@material-ui/icons/ShoppingBasket';

function HideOnScroll(props) {
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



const cart = [
    {
        name: "test",
        price: 16,

    }
];

const useStyles = makeStyles((theme) => ({
    list: {
      width: 250,
      
    },
    fullList: {
      width: 'auto',
      
    },
}));
  
const Navbar = ({props}) => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        right: false,
        cart: {}
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
      
        this.setState({ ...this.state, [anchor]: open });
    };

    const list = (anchor) => (
        <div className={clsx(classes.list, {[classes.fullList]: anchor === 'top' || anchor === 'bottom',})}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
        
            <List style={{height: '500px'}}>
                {cart.map((text, index) => (
                <ListItem button key={index}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text.name} />
                </ListItem>
                ))}
                <ListItem>
                <Button variant="contained" color="primary" style={{width: '100%'}}>
                    Checkout
                </Button>
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