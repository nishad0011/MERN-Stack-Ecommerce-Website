import React from 'react'
import { Rating } from "@material-ui/lab";


const ReviewCard = ({ review }) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
        size: "large",
    };

    return (
        <div className='reviewCard'>
            {/* add image here */}
            <h3>{review.name}</h3>
            <Rating {...options} />
            <p>{review.comment}</p>
        </div>
    )
}

export default ReviewCard