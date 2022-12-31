import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';


import ProductDetail from './pages/ProductDetail';
import MyCart from './pages/MyCart';
import AllProducts from './pages/AllProducts';
import NewProduct from './pages/NewProduct';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path:'/',
    element :<App/>,
    errorElement:<NotFound/>,
    children :[{
      index:true,
      path:'/', //이렇게 해줘야 오류 ㄴㄴ
      element: <Home/>

    },
    {path: '/products', element:<AllProducts/>},

    {path: '/products/new',
     element: (
     <ProtectedRoute requireAdmin>
      <NewProduct/>
     </ProtectedRoute>
     ),
    },

    {path:'/products/:id', element: <ProductDetail/>},

    {
    path:'/carts',
    element: 
    <ProtectedRoute>
      <MyCart/>
    </ProtectedRoute>}]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
