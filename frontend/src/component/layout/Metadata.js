import React from 'react'
import Helmet from "react-helmet"

const Metadata = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <link rel="icon" href="public/ecom_logo_cleaned.png" />

        </Helmet>
    )
}

export default Metadata