import React from 'react'
import ReactStars from "react-rating-stars-component";


const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activecolor: "tomato",
        value: review.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    };

    return (
        <div className='reviewCard'>
            {/* add image here */}
            <h3>{review.name}</h3>
            <ReactStars {...options} />
            <p>{review.comment}</p>
        </div>
    )
}

export default ReviewCard