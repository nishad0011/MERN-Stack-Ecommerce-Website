import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import { FaBandcamp } from "react-icons/fa6";

const Header = () => {
    return (
        <ReactNavbar
            link1Text="Home"
            link2Text="Product"
            link3Text="Contact"
            link4Text="About"
            link1Url="/"
            link2Url="/product"
            link3Url="/contact"
            link4Url="/about"
            logo={<FaBandcamp />}
            link1Family="Roboto"
            link2Family="Roboto"
            link3Family="Roboto"
            link4Family="Roboto"
        />
    )
}

export default Header