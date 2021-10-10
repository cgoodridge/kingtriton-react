import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.items.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );

            if (index >= 0) {
                let newCart = [...state.items];

                const dupItem = newCart[index];

                newCart[index].qty = dupItem.qty + action.payload.qty;
                newCart[index].price = (parseFloat(action.payload.price) * parseFloat(action.payload.qty)) + parseFloat(newCart[index].price);
                state.items = newCart;

            } else {
                state.items = [...state.items, action.payload];
            }
        },
        updateCart: (state, action) => {
            const index = state.items.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            console.log('Cart function called ');


            if (index >= 0) {
                let newCart = [...state.items];
                const foundItem = newCart[index];

                newCart[index].qty = foundItem.qty + action.payload.qty;
                newCart[index].price = (parseFloat(action.payload.price) * parseFloat(action.payload.qty)) + parseFloat(newCart[index].price);
                state.items = newCart;
                console.log('Cart quantities updated ');

            }
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );

            let newCart = [...state.items];

            if (index >= 0) {
                newCart.splice(index, 1);
            } else {
                console.warn(`Product with id: ${action.payload.id} is not in the cart`);
            }

            state.items = newCart;
        },
        emptyCart: (state, action) => {
            state.items = [action.payload];
        }
    },
});

export const { addToCart, removeFromCart, emptyCart, updateCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + item.price, 0)

export default cartSlice.reducer;