import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader"

import Header from "./component/layout/Header/Header"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

      <Footer />
    </BrowserRouter >
  )
}

export default App;
