import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import thunk from 'redux-thunk';

// const reducers = {
//     user: userReducer,
//     cart: cartReducer
// };

// const rootReducer = combineReducers(reducers);

const rootReducer = combineReducers({

    user: userReducer,
    cart: cartReducer,

});

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


// export const store = () => createStore(persistedReducer);
const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: [thunk],
    });

export default store;

