import React, { useState } from "react";
import RegNavigationBar from "./RegNavComponent";
import Logo from "../images/Vertigo_Logo.jpg";
import QRCode from "qrcode.react";
import logo from "../images/Vertigo_Logo.jpg"
import {FaFacebookF, FaInstagram, FaWhatsapp} from "react-icons/fa";

function ContactPage() {
    const [contact, setContact] = useState({
        name: "Vertigo Extreme Academy",
        phoneNumber: "068 135 5993",
        email: "VertigoExtAcademy@gmail.com",
        company: "www.VertigoExtAcademy.co.za",
        linkedInProfile: "https://www.linkedin.com/in/vertigo-academy",
    });

    const generateVCard = () => {
        const vCardData = `BEGIN:VCARD
VERSION:3.0
N:${contact.name}
TEL:${contact.phoneNumber}
EMAIL:${contact.email}
ORG:${contact.company}
URL:${contact.linkedInProfile}
END:VCARD`;

        return vCardData;
    }

            return (
                <div>

                    <RegNavigationBar/>

                    <img src={Logo} alt="Vertigo Logo" className="logo"></img>

                    <div className="contact-container">

                        <h1 className="contact-us-heading">Contact Us</h1>

                        <div className="qr-code-container">

                            <h2>Scan to Add Contact: </h2>

                            <QRCode
                                className="qrcode"
                                value={generateVCard()}
                                fgColor="#000000"
                                qrStyle={{width: "100%", height: "100%"}}
                                imageSettings={{
                                    src: logo,
                                    height: 30,
                                    width: 30,
                                    excavate: true,
                                }}
                            />

                        </div>

                        <h3>-----------------------------------------------------------------------------------------</h3>

                        <h2>Contact Information</h2>

                        <ul>
                            <li>Phone: +27861355993</li>
                            <li>Email: <a href="vertigoextacademy@gmail.com">VertigoExtAcademy@gmail.com</a></li>
                            <li>Address: 3 Phyllis Road, Claremont, Cape Town, South Africa</li>
                        </ul>

                        <br/>

                        <h3>-----------------------------------------------------------------------------------------</h3>

                        <br/>

                        <h2>Hours of Operation</h2>

                        <p>We are open:</p>

                        <ul>
                            <li>Monday - Friday: 9am - 5pm</li>
                            <li>Saturday - Sunday: 10am - 3pm</li>
                        </ul>

                        <h3>-----------------------------------------------------------------------------------------</h3>

                        <p><strong>If you have any questions or would like to learn more about Vertigo Extreme Academy, please don't hesitate to get in touch.</strong></p>

                    </div>

                    <footer className="Contact-Footer">

                        <p>Created by Luke Penney &nbsp;</p>

                        <p className="Fotter-Head">Vertigo Extreme Academy <span>&#169; {new Date().getFullYear()}</span></p>

                        <div className="social-media-icons">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="Facebook-Icon">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="Insta-Icon">
                                <FaInstagram />
                            </a>
                            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="Whatsapp-Icon">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </footer>

                </div>
            );
        }

export default ContactPage;