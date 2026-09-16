import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import Content from './Content';
import store from './store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import reportWebVitals from './reportWebVitals';
import 'process/browser';

const persistor = persistStore(store);

const container = document.getElementById('root');
const root = createRoot(container); // Create a root node
root.render(
    <React.StrictMode>
        <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <Content />
        </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
