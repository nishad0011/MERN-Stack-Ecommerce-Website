import React from 'react'
import "./Loader.css"

const Loader = () => {
    return (
        // <div className='loading'>
        //     <div></div>
        // </div>
        <div className="loader-container">
            <svg className="svgBox">
                <text x="50%" y="50%" text-anchor="middle" className="text-body">
                    Loading...
                </text>
            </svg>
        </div>
    )
}

export default Loader