import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Content from './Content';
import reducer, { initialState } from './components/reducers/reducer';
// import { Provider } from 'redux';
import { store } from './store';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Content />
    </Provider>
  </React.StrictMode>,
 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
