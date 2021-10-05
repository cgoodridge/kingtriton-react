import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items = [...state.items, action.payload];
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

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + item.price, 0)

export default cartSlice.reducer;