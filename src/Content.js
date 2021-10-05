import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';
import About from './pages/About';
import Orders from './pages/Orders';
import Account from './pages/Account';
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
import ProtectedRoute from './components/ProtectedRoute';
import { logout, login } from './slices/userSlice';


import {
  BrowserRouter as Router,

  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { auth, db } from './firebaseConfigFile';
import { useStateValue } from './StateProvider';
import { useDispatch } from 'react-redux';


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
  const _isMounted = useRef(true);

  // const [{ user }, dispatch] = useStateValue();
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        // The user just logged in/was logged in
        dispatch(
          login({
            email: authUser.email,
            uid: authUser.uid,
            displayName: authUser.displayName,
          }))
      } else {
        // The user is logged out
        dispatch(logout());
      }
    });

    // return () => { // ComponentWillUnmount 
    //   _isMounted.current = false;
    // }
  }, []);
  /*
    useEffect(() => {
  
      if (user) {
        console.log('User is logged in');
        setIsAuth(true);
      }
      else {
        console.log('User is logged out');
  
        setIsAuth(false);
      }
  
    }, [user])
  */
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

    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }

  }, []);


  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme} >
          <Switch>
            <Route exact path="/">
              <HomeNavbar />
              <main>
                <Home food={menu} loading={menu.length <= 0 ? true : false} />
              </main>
              <Footer />
            </Route>
            <Route exact path="/menu">
              <Navbar cart={cartList} />
              <main>
                <Menu food={menu} loading={menu.length <= 0 ? true : false} />
              </main>
              <Footer />
            </Route>
            <Route exact path="/reservations" >
              <Navbar cart={cartList} />
              <main>
                <Reservations />
              </main>
              <Footer />
            </Route>
            <Route exact path="/contact">
              <Navbar cart={cartList} />
              <main>
                <Contact />
              </main>
              <Footer />
            </Route>
            <Route exact path="/about" >
              <Navbar cart={cartList} />
              <main>
                <About />
              </main>
              <Footer />
            </Route>
            <Route exact path="/account" >
              <Navbar />
              <main>
                <Account />
              </main>
              <Footer />
            </Route>
            <Route exact path="/checkout">
              <Navbar cart={cartList} />
              <main>
                <Elements stripe={promise}>
                  <Checkout />
                </Elements>
              </main>
              <Footer />
            </Route>
            <ProtectedRoute exact path="/login" comp={Login} />
            <ProtectedRoute exact path="/register" comp={Register} />
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

export default Content;
