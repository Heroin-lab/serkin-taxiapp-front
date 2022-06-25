import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from "react-router-dom"
import {createBrowserHistory} from 'history'
import { Provider } from 'react-redux'

import App from './App';
import './index.css';

import reportWebVitals from './reportWebVitals';
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

const history = createBrowserHistory()

root.render(
  <Router history={history}>
      <Provider store={store}>
          <App />
      </Provider>
  </Router>
);

reportWebVitals();
