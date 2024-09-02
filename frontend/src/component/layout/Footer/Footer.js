import React from "react";
import { BiLogoPlayStore } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import "./Footer.css"

const Footer = () => {
    return (
        <footer id="footer">
            <div class="leftFooter">
                <h4>SOCIALS :</h4>
                <span class="logos"><BiLogoPlayStore size={40} /></span>
                <span class="logos"><SiGmail size={40} /></span>
            </div>

            <div class="midFooter">
                <h1>SuperCom</h1>
                <p>Quaity over Quantity</p>
                <p>Copyrights 2024 &copy; SuperCom</p>
            </div>

            <div class="bottomFooter">
                <h1>Follow Us</h1>
                <a href="http://youtube.com">Youtube</a>
                <a href="http://instagram.com">Instagram</a>
                <a href="http://facebook.com">Facebook</a>
            </div>
        </footer >
    );
};

export default Footer;