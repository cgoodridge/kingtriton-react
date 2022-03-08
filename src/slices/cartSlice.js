import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    initialQty: 1,
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
                action.payload.price *= action.payload.qty;
                state.items = [...state.items, action.payload];

            }
        },
        updateCartIncrease: (state, action) => {

            const index = state.items.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );


            const baseItemPrice = state.items[index].price;

            if (index >= 0) {
                let newCart = [...state.items];
                newCart[index].qty++;
                // The stored price is updated on each click so this is done to make sure the price is calculated correctly
                // Multiply the current price by the quantity and then divide it by the quantity minus one
                // Without this the values continue to double rather than adding the base price to the total
                newCart[index].price = (parseFloat(baseItemPrice) * parseFloat(newCart[index].qty)) / (parseFloat(newCart[index].qty) - 1);
                state.items = newCart;
                console.log('Cart quantities updated ', state.items);
            }

        },
        updateCartDecrease: (state, action) => {

            const index = state.items.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );


            if (index >= 0) {
                let newCart = [...state.items];
                if (newCart[index].qty >= 1) {
                    newCart[index].qty--;
                } else {
                    newCart[index].qty = 1;
                }
                // The stored price is updated on each click so this is done to make sure the price is calculated correctly
                // Divide the current price by the quantity plus one and then multiply it by the quantity
                // Without this the values continue to decrease rather than subtracting the base price from the total
                newCart[index].price = (parseFloat(newCart[index].price) / (parseFloat(newCart[index].qty) + 1)) * (parseFloat(newCart[index].qty));
                state.items = newCart;
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
            state.items = [];
            console.log("empty cart called");
        }
    },
});

export const { addToCart, removeFromCart, emptyCart, updateCartIncrease, updateCartDecrease } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export const selectTotal = (state) => state.cart.items.reduce((total, item) => parseFloat(total) + parseFloat(item.price), 0)

export default cartSlice.reducer;