import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from './components/NotFound';
import AllProducts from '../.history/src/components/AllProducts_20221230001544';

const router = createBrowserRouter([
  {
    path:'/',
    element :<App/>,
    errorElement:<NotFound/>,
    children :[{
      index:true,
      path:'/' //이렇게 해줘야 오류 ㄴㄴ
    },
    {path: '/products', element:<AllProducts/>}]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
