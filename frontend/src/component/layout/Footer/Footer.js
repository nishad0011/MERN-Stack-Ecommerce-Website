import React from "react";
import { BiLogoPlayStore } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import "./Footer.css"

const Footer = () => {
    return (
        <div className="footerContainer">
            <footer id="footer">
                <div className="leftFooter">
                    <h4>SOCIALS :</h4>
                    <span className="logos"><BiLogoPlayStore size={40} /></span>
                    <span className="logos"><SiGmail size={40} /></span>
                </div>

                <div className="midFooter">
                    <h1>Supercom</h1>
                    <p>Copyrights 2025 &copy; Ecom Ltd</p>
                </div>

                <div className="bottomFooter">
                    <h1>Follow Us</h1>
                    <a href="http://youtube.com">Youtube</a>
                    <a href="http://instagram.com">Instagram</a>
                    <a href="http://facebook.com">Facebook</a>
                </div>
            </footer ></div>
    );
};

export default Footer;