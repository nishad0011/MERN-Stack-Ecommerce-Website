import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from "@material-ui/lab";


const ProductCard = ({ product }) => {
    // console.log("product.images=", product.images);

    // Stars Options
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        size: "large",
    };

    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <div className='imageCont'>
                {product.images.length !== 0 ?
                    (<img src={product.images[0].url} alt={product.name} />)
                    : null
                }
            </div>
            <p>{product.name}</p>
            <div>
                <Rating {...options} /><span className='productCardSpan'>{product.numOfReviews} Reviews</span>
            </div>
            <span>₹{product.price}</span>

        </Link>
    )
}

export default ProductCard