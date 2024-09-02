import React, { Fragment } from 'react';
import {CgMouse} from "react-icons/cg";
import "./home.css"

import Product from "./Product.js"

//Temporary product
const product = {
    name:"Blue Tshirt",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price:"💲50",
    _id:"nishad"
}

const Home = () => {
    return (
        <Fragment>
            <div className='banner'>
                <p>Welcome to Ecommerce</p>
                <h1>Find Products Below</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </a>
            </div>

            <h2 className="homeheading">Featured Products</h2>
            <div className="container" id='container'>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
            </div>
        </Fragment>

    )
}

export default Home;