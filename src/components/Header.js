//  import logo from './logo.svg';
import '../App.css';
import '../css/style.css'
import '../css/materialize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { Button, Card, Row, Col } from 'react-materialize';




function Header() {

  return (
    <div className="App">
      <header>

        <nav className="nav-col">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">Logo</a>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li><a href="index.html">Home</a></li>
                <li><a href="menu.html">Menu</a></li>
                <li><a href="reservations.html">Reservations</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="mobile.html"><i class="material-icons">shopping_basket</i></a></li>
              </ul>
            </div>
          </nav>

          <ul className="sidenav" id="mobile-demo">
            <li><a href="index.html">Home</a></li>
          <li><a href="menu.html">Menu</a></li>
          <li><a href="reservations.html">Reservations</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="mobile.html"><i class="material-icons">shopping_basket</i></a></li>
          </ul>
      </header>

    

    </div>
  );
}

export default Header;
