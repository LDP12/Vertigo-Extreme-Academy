import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavComponent";
import RegNavigationBar from "./RegNavComponent";
import Logo from "../images/Vertigo_Logo.jpg";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleInputChange = (event) => {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5012/PersonalInfo?email=${email}`);
            if (response.data.length === 0) {
                setError("User Not Found! Please Enter a Valid Email and Password!");
                return;
            }

            let userFound = false;
            for (const user of response.data) {
                if (user.email === email && user.password === password) {
                    console.log("Login Successful");
                    setLoggedIn(true);
                    navigate("/home");
                    userFound = true;
                    setTimeout(() => {
                        alert("Welcome " + user.name + "!");
                        navigate("/home");
                    }, 500);
                    break;
                }
            }

            if (!userFound) {
                setError("Invalid Email and/or Password!");
            }

        } catch (error) {
            console.error(error);
            setError("An Error Occurred While Processing Your Request.");
            alert("An Error Occurred. Try Again!")
        } finally {
            setEmail("");
            setPassword("");
        }
    };

    return (
        <>
            <img src={ Logo } alt="Vertigo Logo" className="logo"></img>
            <div className="login-container">
                { loggedIn ? <NavigationBar /> : <RegNavigationBar /> }
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Email:
                        <input
                            className="login-input"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
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
}

export default LoginPage;