import React, {useState} from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const RegNavigationBar = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <nav>
            <ul>
                <div className="link-wrapper">
                <li>
                    <Link to="/registration">Registration</Link>
                </li>
                </div>

                <div className="link-wrapper">
                <li>
                    <Link to="/login">Login</Link>
                </li>
                </div>

                <div className="link-wrapper">
                <li>
                    <Link to="/contact-us">Contact Us</Link>
                </li>
                </div>
            </ul>
        </nav>
    );
};

export default RegNavigationBar;