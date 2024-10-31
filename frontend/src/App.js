// INSTALLED
import React from 'react';
import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader"
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// USER CREATED
import Header from "./component/layout/Header/Header"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import Loader from './component/layout/Loader/Loader';
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store.js"
import { loadUser } from './actions/userAction.js';

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Open Sans"]
      }
    })
    store.dispatch(loadUser())
  }, []);

  function Layout() {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }
  const router = createBrowserRouter([
    {
      element: <Layout />,
      // All routes here
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/loadertest',
          element: <Loader />
        },
        {
          path: '/product/:id',
          element: <ProductDetails />
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/products/:keyword',
          element: <Products />
        },
        {
          path: '/search',
          element: <Search />
        },
        {
          path: '/login',
          element: <LoginSignUp />
        },
      ]
    },
  ])



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
