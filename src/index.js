import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppProvider} from './reducers/context'
import { ShopProvider } from './components/Pages/Buy/CartContext';
const loader = document.querySelector('.loader-container');
const showLoader = () => loader.classList.remove('loader-hide');
const hideLoader = () => setTimeout(() => loader.classList.add('loader-hide') , 4000);
ReactDOM.render(
  <React.StrictMode>
   <AppProvider>
     <ShopProvider>
     <App hideLoader={hideLoader} showLoader={showLoader}/>
     </ShopProvider>
   </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
