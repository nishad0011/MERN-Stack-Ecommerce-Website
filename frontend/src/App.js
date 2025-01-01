// INSTALLED
import React from 'react';
import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader"
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import UserOptions from "./component/layout/Header/UserOptions.js"
import Profile from "./component/User/Profile.js"
import ProtectedRoute from "./component/Route/ProtectedRoute.js"
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';


import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import Payment from './component/Cart/Payment.js';
import PaymentSuccess from './component/Cart/PaymentSuccess.js';
import SuccessMessage from './component/Cart/SuccessMessage.js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';

// Admin Paths
import AdminDashboard from './component/Admin/AdminDashboard.js';
import AdminProductsList from './component/Admin/AdminProductsList.js';
import NewProduct from './component/Admin/NewProduct.jsx';
import UpdateProduct from './component/Admin/UpdateProduct.jsx';
import AdminOrders from './component/Admin/AdminOrders.jsx';
import UpdateOrder from './component/Admin/UpdateOrder.jsx';
import AdminUsersList from './component/Admin/AdminUsersList.jsx';
import AdminUserUpdate from './component/Admin/AdminUserUpdate.jsx';
import AdminReviews from './component/Admin/AdminReviews.jsx';

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Open Sans"]
      }
    })
    store.dispatch(loadUser())
  }, []);

  const { isAuthenticated, loading, user } = useSelector(state => {
    return (state.user)
  })
  const { shippingInfo } = useSelector(state => {
    return (state.cart)
  })

  function Layout() {
    return (
      <>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
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
        { path: '/', element: <Home /> },
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
        {
          path: '/profile',
          element:
            <ProtectedRoute >
              <Profile />
            </ProtectedRoute>
        },
        {
          path: '/me/update',
          element:
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
        },
        {
          path: '/password/update',
          element:
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
        },
        {
          path: '/password/forgot',
          element: <ForgotPassword />
        },
        {
          path: '/password/reset/:token',
          element: <ResetPassword />
        },
        {
          path: '/cart',
          element:
            <Cart />
        },
        {
          path: '/shipping',
          element:
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
        },
        {
          path: '/order/confirm',
          element:
            <ProtectedRoute >
              <ConfirmOrder />
            </ProtectedRoute>
        },
        {
          path: '/process/payment',
          element:
            <ProtectedRoute >
              <Payment />
            </ProtectedRoute>
        },
        {
          path: `/process/payment/success/:id`,
          element:
            <ProtectedRoute >
              <PaymentSuccess />
            </ProtectedRoute>
        },
        {
          path: `/process/payment/successmessage`,
          element:
            <ProtectedRoute >
              <SuccessMessage />
            </ProtectedRoute>
        },
        {
          path: `/orders/me`,
          element:
            <ProtectedRoute >
              <MyOrders />
            </ProtectedRoute>
        },
        {
          path: `/order/:id`,
          element:
            <ProtectedRoute >
              <OrderDetails />
            </ProtectedRoute>
        },

        // Admin Routes
        {
          path: `/admin/dashboard`,
          element:
            <ProtectedRoute isAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
        },
        {
          path: `/admin/products`,
          element:
            <ProtectedRoute isAdmin={true}>
              <AdminProductsList />
            </ProtectedRoute>
        },
        {
          path: `/admin/product/new`,
          element:
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
        },
        {
          path: `/admin/product/update/:id`,
          element:
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
        },
        {
          path: `/admin/orders`,
          element:
            <ProtectedRoute isAdmin={true}>
              <AdminOrders />
            </ProtectedRoute>
        },
        {
          path: `/admin/order/update/:id`,
          element:
            <ProtectedRoute isAdmin={true}>
              <UpdateOrder />
            </ProtectedRoute>
        },
        {
          path: `/admin/users`,
          element:
            <ProtectedRoute isAdmin={true}>
              <AdminUsersList />
            </ProtectedRoute>
        },
        {
          path: `/admin/user/:id`,
          element:
            <ProtectedRoute isAdmin={true}>
              <AdminUserUpdate />
            </ProtectedRoute>
        },
        {
          path: `/admin/reviews`,
          element:
            <ProtectedRoute isAdmin={true}>
              <AdminReviews />
            </ProtectedRoute>
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
