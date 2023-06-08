import React from 'react';
import NavComponent from "./NavComponent";
import Logo from "../images/Vertigo_Logo.jpg";
import {FaFacebookF, FaInstagram, FaWhatsapp} from "react-icons/fa";
const HomePage = () => {
    return (
        <div className="home-container">
            <img src={ Logo } alt="Vertigo Logo" className="logo"></img>
            <NavComponent />

            <br/>

            <section className="welcome">
                <h1>Welcome to Vertigo Extreme Academy</h1>
                <p>We're dedicated to helping our students achieve their mental and physical potential through our unique self-growth and endurance training programs.</p>
                <p>"Great things never came from comfort zones."</p>
            </section>

            <br/><br/><br/>

            <section className="why-us">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Our focus on mental and emotional growth sets us apart from traditional sports academies.</li>
                    <li>We provide individualized training plans tailored to each student's unique needs and goals.</li>
                    <li>Our experienced coaches have a proven track record of success in developing top-performing athletes.</li>
                </ul>
            </section>

            <footer>

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
};

export default HomePage;