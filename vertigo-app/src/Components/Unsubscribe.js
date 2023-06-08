import React, { useState } from "react";
import axios from "axios";
import NavComponent from "./NavComponent";
import Logo from "../images/Vertigo_Logo.jpg";
import { useNavigate } from "react-router-dom";
import {FaFacebookF, FaInstagram, FaWhatsapp} from "react-icons/fa"; // FIX SO THAT UNSUBSCRIBE BUTTON REDIRECTS TO LOGIN WHEN SUCCESSFUL

const Unsubscribe = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
    });

    const { email } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`https://localhost:7160/Unsubscribe/${email}`);
            console.log("User Removed");
            alert("User Successfully Removed!");
            navigate("/login");

        } catch (err) {
            // Show only one appropriate alert message
            if (err.response && err.response.data) {
                alert(err.response.data);
            } else {
                alert("User With The Specified Email Not Found.");
            }
        }
    }

    return (
        <div className="unsubscribe-container">
            <img src={ Logo } alt="Vertigo Logo" className="logo"></img>
            <NavComponent />

            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <label><strong>Enter Email To Unsubscribe:</strong></label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="Unsub-Btn">
                <button type="submit">Unsubscribe</button>
                </div>
            </form>

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

export default Unsubscribe;