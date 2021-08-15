import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppProvider} from './reducers/context'

const loader = document.querySelector('.loader-container');
const showLoader = () => setTimeout(() => loader.classList.remove('loader-hide'), 3000);
const hideLoader = () => loader.classList.add('loader-hide');
ReactDOM.render(
  <React.StrictMode>
   <AppProvider>
      <App hideLoader={hideLoader} showLoader={showLoader}/>
   </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
