//  import logo from './logo.svg';

import React, { useState } from 'react';
import clsx from 'clsx';
import Home from './components/Home';
import Menu from './components/Menu';
import Reservations from './components/Reservations';
import Contact from './components/Contact';
import About from './components/About';
import { makeStyles, useTheme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Cart from './components/Cart';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Basket from '@material-ui/icons/ShoppingBasket';
import './css/style.css';
import './css/materialize.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import { Button, Card, Row, Col } from 'react-materialize';
library.add(fab);

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

  function Content() {
    const classes = useStyles();
    const theme = createMuiTheme({
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
    
    const [state, setState] = React.useState({
      drawerOpen: false,
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
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    
    return(

      <div className="App" >
        <Router>
          <header>

            <nav className="nav-col">
              <div className="nav-wrapper">
                <a href="#!" className="brand-logo">Logo</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/menu">Menu</Link></li>
                  <li><Link to="/reservations">Reservations</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/about">About</Link></li>
                  {['right'].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <ThemeProvider theme={theme}><li><IconButton onClick={toggleDrawer(anchor, true)} color="primary"><Basket /></IconButton></li></ThemeProvider>
                      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                      </Drawer>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/menu">Menu</Link></li>
                  <li><Link to="/reservations">Reservations</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/cart"><i class="material-icons">shopping_basket</i></Link></li>
            </ul>
          </header>


          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/reservations">
              <Reservations />
            </Route>
            <Route path="/contact">
              <Contact/>
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>

        </Router>

        <footer className="page-footer footer-col">
          <div className="row">
              <div className="col s12 m6 l3 center-align">
                <img id="footer-logo" src="./img/Logo.png" alt="Site Logo"></img>
                <h5 className="white-text">King Triton's Seafood Palace</h5>
                <p>(246)439-9000</p>
                <p>info@triton.com</p>
              </div>

              <div className="col s12 m6 l3 center-align">
                <h5 className="white-text">Opening Hours</h5>
                <p>Mon - Sat: 11AM - 4PM</p>
                <p>Sunday: Closed</p>
              </div>

              <div className="col s12 m6 l3 center-align">
                <h5 className="white-text">Location</h5>
                <p>Hastings Main Road Ch Ch</p>
              </div>

              <div className="col s12 m6 l3 center-align">
                <h5 className="white-text center-align">Follow Us</h5>
                <div className="row center-align" style={{padding: "8px"}}>
                  <a href="#" style={{padding: "8px", color:'white'}}><FontAwesomeIcon icon={['fab','twitter']} size="2x" /></a>
                  <a href="#" style={{padding: "8px", color:'white'}}><FontAwesomeIcon icon={['fab','instagram']} size="2x" /></a>
                  <a href="#" style={{padding: "8px", color:'white'}}><FontAwesomeIcon icon={['fab','facebook']} size="2x" /></a>
                </div>
              </div>

          </div>

          <div class="footer-copyright">
            <div class="container center-align">
            © 2021 King Triton's Seafood Palace
            </div>
          </div>
        </footer>
        

      </div>
    );
  };


export default Content;
