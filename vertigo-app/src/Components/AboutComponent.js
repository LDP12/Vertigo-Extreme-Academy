import React from 'react';
import Logo from "../images/Vertigo_Logo.jpg";
import NavigationBar from "./NavComponent";
import RegNavigationBar from "./RegNavComponent";
import {FaFacebookF, FaInstagram, FaWhatsapp} from "react-icons/fa";

const AboutPage = () => {
    return (
        <>
            <NavigationBar />
            <img src={ Logo } alt="Vertigo Logo" className="logo"></img>
            <div className="about-container">
            <h1>About Vertigo Extreme Academy</h1>
            <p>Vertigo Extreme Academy is a premier Waterpolo academy that offers specialized training to high school and university students. Our approach focuses on mental self-growth and improvement, psychological assistance with relation to sports and self-growth, as well as physical conditioning and training specifically catered to waterpolo players.</p>
            <p>We have four of the best Waterpolo coaches available in South Africa, all having incredible achievements and results both locally and internationally with relation to the physical conditioning, fitness and skills training. We are proud to offer top-notch coaching that is guaranteed to take your skills to the next level.</p>
            <p>Our mental health team includes two sports psychologists who are dedicated to ensuring that our athletes are mentally prepared to perform at their best. Additionally, we have two physiotherapists and a life coach who are readily available to provide support and guidance.</p>
            <h2>Our Philosophy</h2>
            <p>At Vertigo Extreme Academy, we believe that Waterpolo is not just a sport, but a way of life. Our holistic approach to training ensures that our athletes are not only physically strong but mentally fortified as well. We believe that mental toughness is just as essential to success as physical strength. Our coaches and support staff are dedicated to helping our athletes develop the skills and mindset necessary to succeed both on and off the water.</p>
            <h2>Why Choose Vertigo Extreme Academy</h2>
            <p>Our track record speaks for itself. We have helped hundreds of students achieve their Waterpolo goals. Our training programs are designed to help players of all levels improve their skills and performance. We offer a supportive and nurturing environment that fosters growth and development. But don't just take our word for it. Here's what one of our former students had to say:</p>
            <blockquote>"Vertigo Extreme Academy transformed my Waterpolo game. Their focused and structured training programs helped me improve my skills and fitness. But what really stood out to me was their emphasis on mental toughness. I learned how to stay focused and disciplined even in the most challenging situations. I would highly recommend Vertigo Extreme Academy to anyone who is serious about waterpolo."</blockquote>
            <p><strong className="about-strong">At Vertigo Extreme Academy, we are passionate about Waterpolo and dedicated to helping our students achieve their full potential. Contact us today to learn more about our programs.</strong></p>
            </div>

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

        </>

    );
};

export default AboutPage;