const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51JelBJESzl8Ss9eHAAciF2DV2NfEsumhx5hfYrvUy5QCklXWm66S4qLw1ZWC0QAxoWGEavtQPy0K9RCZt6UB2pus008xTyU80i');
// import functions from 'firebase-functions';
// import express from 'express';
// import cors from 'cors';
// import stripe from 'stripe';


// API


// - App Config
const app = express();


// - Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get('/', (request, response) => response.status(200).send('Hello World'));

app.post('/checkout/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request received for the amount of ', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    // Ok - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// - Listen command
exports.api = functions.https.onRequest(app);