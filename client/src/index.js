import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./store"
import { positions, transitions, Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic"

const options = {
  timeout: 5000, 
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <AlertProvider template = {AlertTemplate} {...options} >
      <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
The <Provider> component makes the Redux store available to any nested components that need to access the Redux store. 
Since any React component in a React Redux app can be connected to the store, most applications will render a <Provider> at the top level,
 with the entire app's component tree inside of it.

*/
