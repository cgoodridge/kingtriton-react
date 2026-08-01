import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import About from './pages/About';
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
import { Elements } from '@stripe/react-stripe-js'
import ProtectedRoute from './components/ProtectedRoute';
import { logout, login } from './slices/userSlice';
import { SnackbarProvider } from 'notistack';
import Slide from '@mui/material/Slide';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from './firebaseConfigFile';
import { useDispatch } from 'react-redux';
import AuthRoute from './components/AuthRoute';

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
        text: {
            secondary: '#9e9e9e',
        },
    },
});


const Content = (props) => {
    const _isMounted = useRef(true);
    const mainRef = useRef(null);

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

    });

    const [menu, setMenuItems] = useState([]);

    useEffect(() => {
        const menuCollectionRef = collection(db, 'menu');

        const unsubscribe = onSnapshot(menuCollectionRef, (snapshot) => {
            setMenuItems(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        return () => {
            unsubscribe(); // Prevents memory leaks by stopping the listener
            _isMounted.current = false;
        };
    }, [dispatch]);


    return (
        <Router>
            <div className="App">
                <ThemeProvider theme={theme} >
                    <SnackbarProvider
                        maxSnack={3}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        TransitionComponent={Slide}
                    >
                        <Routes>
                            <Route exact path="/" element={
                                <main ref={mainRef} className="mainTag">
                                    {/* <HomeNavbar /> */}
                                    <Navbar target={mainRef} cart={cartList} />
                                    <Home food={menu} loading={menu.length <= 0 ? true : false} />
                                    <Footer />
                                </main>
                            }>
                            </Route>
                            <Route exact path="/menu" element={
                                <main ref={mainRef} className="mainTag">
                                    <Navbar target={mainRef} cart={cartList} />
                                    <Menu food={menu} loading={menu.length <= 0 ? true : false} />
                                    <Footer />
                                </main>
                            }>

                            </Route>
                            <Route exact path="/reservations" element={
                                <main ref={mainRef} className="mainTag">
                                    <Navbar target={mainRef} cart={cartList} />
                                    <Reservations />
                                    <Footer />
                                </main>
                            }>
                            </Route>
                            <Route exact path="/about" element={
                                <main ref={mainRef} className="mainTag">
                                    <Navbar target={mainRef} cart={cartList} />
                                    <About />
                                    <Footer />
                                </main>
                            }>
                            </Route>
                            <Route
                                path="/account"
                                element={
                                    <AuthRoute>
                                        <main ref={mainRef} className="mainTag">
                                            <Navbar target={mainRef.current} />
                                            <Account />
                                        </main>
                                    </AuthRoute>
                                }
                            />
                            <Route exact path="/checkout" element={
                                <main ref={mainRef} className="mainTag">
                                    <Navbar target={mainRef} cart={cartList} />
                                    <Elements stripe={promise}>
                                        <Checkout />
                                    </Elements>
                                    <Footer />
                                </main>
                            }>

                            </Route>
                            <Route
                                path="/login"
                                element={
                                    <ProtectedRoute>
                                        <Login />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/register"
                                element={
                                    <ProtectedRoute>
                                        <Register />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="*" component={PageNotFound} element={
                                <main>
                                    <PageNotFound />
                                </main>
                            }>
                            </Route>
                        </Routes>

                    </SnackbarProvider>
                </ThemeProvider>
            </div>
        </Router>
    );
}

export default Content;
