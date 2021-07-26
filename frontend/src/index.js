import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import store from "./Reducers/Store/store"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

