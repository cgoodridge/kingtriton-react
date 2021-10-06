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
                console.log('item in cart already, updating quantity');
                let newCart = [...state.items];

                const dupItem = newCart[index];
                console.log('cart value is', dupItem);

                newCart[index].qty = dupItem.qty + action.payload.qty;
                newCart[index].price = (parseFloat(action.payload.price) * parseFloat(action.payload.qty)) + parseFloat(newCart[index].price);
                
                state.items = newCart;

            } else {
                console.log('Add item as normal');
                state.items = [...state.items, action.payload];
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

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + item.price, 0)

export default cartSlice.reducer;