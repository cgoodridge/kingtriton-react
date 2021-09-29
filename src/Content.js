import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';
import About from './pages/About';
import Orders from './pages/Orders';
import Login from './pages/Login';
import PageNotFound from './pages/404Page';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Checkout from './components/Checkout';
import HomeNavbar from './components/HomeNavbar';
import Footer from './components/Footer';
import cartList from './pages/cartList';
import './css/style.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements } from '@stripe/react-stripe-js'


import {
  BrowserRouter as Router,

  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { auth, db } from './firebaseConfigFile';
import { useStateValue } from './StateProvider';

const promise = loadStripe('pk_test_51JelBJESzl8Ss9eHeAVZ8WozJuU1eiPQ1pOXak0vXrnqM8N6uoX659QmFv8DZ15JxEmMYeAyEmw6l6RCxBVg42uj006vt0mzoA');



const theme = createTheme({
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


const Content = (props) => {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        // The user just logged in/was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // The user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  const [menu, setMenuItems] = useState([]);


      useEffect(() => {
          
          db
          .collection('menu')
          .onSnapshot(snapshot => (
            setMenuItems(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            })))
          ))
        
        
      }, [])
 

  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme} >
            <Switch>
              <Route exact path="/" component={Home}>
                <HomeNavbar cart={cartList}/>
                <main>
                  <Home food={menu} loading={menu.length <= 0 ? true : false}/>
                </main>
                <Footer/>
              </Route>
              <Route exact path="/menu" component={Menu}>
                <Navbar cart={cartList}/>
                <main>
                  <Menu food={menu} loading={menu.length <= 0 ? true : false}/>
                </main>
                <Footer/>
              </Route>
              <Route exact path="/reservations" component={Reservations}>
                <Navbar cart={cartList}/>
                <main>
                  <Reservations />
                </main>
                <Footer/>
              </Route>
              <Route exact path="/contact" component={Contact}>
                <Navbar cart={cartList}/>
                <main>
                  <Contact />
                </main>
                <Footer/>
              </Route>
              <Route exact path="/about" component={About}>
                <Navbar cart={cartList}/>
                <main>
                  <About />
                </main>
                <Footer/>
              </Route>
              <Route exact path="/checkout" component={Checkout}>
                <Navbar cart={cartList}/>
                <main>
                  <Elements stripe={promise}> 
                    <Checkout />
                  </Elements>
                </main>
                <Footer/>
              </Route>
              <Route exact path="/orders" component={Orders}>
                <Navbar cart={cartList}/>
                <main>
                  <Orders />
                </main>
                <Footer/>
              </Route>
              <Route exact path="/login" component={Login}>
                <main>
                  <Login />
                </main>
              </Route>
              <Route exact path="/register"  component={Register}>
                <main>
                  <Register />
                </main>
              </Route>
              <Route component={PageNotFound}>
                <main>
                  <PageNotFound />
                </main>
              </Route>
            </Switch>
          

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
