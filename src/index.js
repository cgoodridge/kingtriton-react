import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Content from './Content';
import reducer, { initialState } from './components/reducers/reducer';
// import { Provider } from 'redux';
import store from './store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { configureStore } from './store';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider';

const persistor = persistStore(store);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Content />
      </PersistGate>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
