//  import logo from './logo.svg';

import React, { useState } from 'react';
import $ from "jquery";
import { makeStyles, useTheme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';
import About from './pages/About';
import Navbar from './Navbar';
import './css/style.css';
import './css/materialize.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Component } from 'react';
import { render } from '@testing-library/react';
// import { Button, Card, Row, Col } from 'react-materialize';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#141414',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#2196f3',
      dark: '#006596',
      contrastText: '#000',
    },
  },
});

const Content = () => {

  
  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme} >

          <header>
            <Navbar />
          </header>

          <main>
            <Switch>
              <Route exact path="/" component={Home}>
                <Home />
              </Route>
              <Route path="/menu" component={Menu}>
                <Menu />
              </Route>
              <Route path="/reservations" component={Reservations}>
                <Reservations />
              </Route>
              <Route path="/contact" component={Contact}>
                <Contact/>
              </Route>
              <Route path="/about" component={About}>
                <About />
              </Route>
            </Switch>
          </main>

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
                    <a href="#" style={{padding: "8px", color:'white'}}><i class="devicon-twitter-original"></i></a>
                    <a href="#" style={{padding: "8px", color:'white'}}><i class="devicon-facebook-original"></i></a>
                  </div>
                </div>
    
            </div>
    
            <div className="footer-copyright">
              <div className="container center-align">
              © 2021 King Triton's Seafood Palace
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </div>


        
    </Router>
  );
}


 
  
  /*
  addToBasket(data) {
    // create a clone of your array of players; don't modify objects on the state directly
    const cart = this.state.cart.slice(0);

    cart.push({
      image: data.image, name: data.name, price:data.price,
    });

    this.setState({
      cart: cart,
    });
  }
  */


  /*
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
        </Router>

      </div>
      */
  



export default Content;