import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const NavigationBar = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <nav>
            <ul>
                <div className="link-wrapper">
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                </div>

                {!loggedIn === false && (
                    <div className="link-wrapper">
                        <li>
                            <Link to="/registration">Registration</Link>
                        </li>
                    </div>
                )}

                <div className="link-wrapper">
                    <li>
                        <Link to="/about-us">About Us</Link>
                    </li>
                </div>

                <div className="link-wrapper">
                <li>
                    <Link to="/our-work">Our Work</Link>
                </li>
                </div>

                <div className="link-wrapper">
                <li>
                    <Link to="/photo-gallery">Photo Gallery</Link>
                </li>
                </div>

                <div className="link-wrapper">
                <li>
                    <Link to="/get-involved">Get Involved</Link>
                </li>
                </div>

                <div className="link-wrapper">
                <li>
                    <Link to="/contact-us">Contact Us</Link>
                </li>
                </div>

                <div className="link-wrapper">
                <li>
                    <Link to="/login">Logout</Link>
                </li>
                </div>

                <div className="link-wrapper">
                <li>
                    <Link to="/unsubscribe">Unsubscribe</Link>
                </li>
                </div>
            </ul>

        </nav>
    );
};

export default NavigationBar;