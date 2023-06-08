import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Logo from "../images/Vertigo_Logo.jpg";
import RegNavigationBar from "./RegNavComponent";
import {FaFacebookF, FaInstagram, FaWhatsapp} from "react-icons/fa";

// ADDITIONAL INFO SECTION WON'T ALLOW TEXT TO BE ENTERED

const Form = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [gender, setGender] = useState('');
    const [province, setProvince] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [details, setDetails] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailExistsError, setEmailExistsError] = useState('');

    useEffect(() => {
        handleViewButtonClick();
    }, []);

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const checkEmailExists = async (email) => {
        const response = await axios.get('http://localhost:5012/PersonalInfo');
        return response.data.some(user => user.email === email);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError("Password and Confirm Password Fields Must Match");
            return;
        } else if (!validatePassword(password)) {
            setPasswordError("Password requires at least one Capital Letter, Number, and Symbol");
            return;
        } else {
            setPasswordError('');
        }

        if (await checkEmailExists(email)) {
            setEmailExistsError("Email already exists");
            return;
        } else {
            setEmailExistsError('');
        }

        const newUser = {name, surname, age, gender, province, email, password, additionalInfo};

        try {
            const response = await axios.post(
                'http://localhost:5012/PersonalInfo',
                newUser
            );

            setUsers([...users, response.data]);

            setName('');
            setSurname('');
            setAge('');
            setGender('');
            setProvince('');
            setEmail('');
            setPassword('');
            setAdditionalInfo('');

            setSuccess(true);
            setError('');

            alert("User Created Successfully. Check Your Emails for Your Voucher Code!");

        } catch (error) {
            setError('Error Submitting data');
            setSuccess(false);
            alert("Error Submitting Data");
        }
    };

    const handleViewButtonClick = async () => {
        try {
            const response = await axios.get('http://localhost:5012/PersonalInfo');
            setUsers(response.data);

            const usersString = response.data.map(user => `Name: ${user.name} ${user.surname} | Age: ${user.age} | Gender: ${user.gender} | Province: ${user.province}`).join('\n');
            setDetails(usersString);

        } catch (error) {
            console.log(error);
            alert('Error Retrieving Data');
        }
    }

        return (
            <div>
                <RegNavigationBar/>
                <img src={Logo} alt="Vertigo Logo" className="logo"></img>
                <h1>Registration Form</h1>

                <form onSubmit={handleFormSubmit} className="Form">

                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                    <br/>

                    <label>Surname</label>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>

                    <br/>

                    <label>Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)}/>

                    <br/>

                    <label>

                        Gender:

                        <select value={gender} onChange={(event) => setGender(event.target.value)}>

                            <option disabled value="">Select Gender</option>

                            <option value="male">Male</option>

                            <option value="female">Female</option>

                            <option value="other">Other</option>

                        </select>

                    </label>

                    <br/>

                    <label>

                        Province:

                        <select value={province} onChange={(event) => setProvince(event.target.value)}>

                            <option disabled value="">Select Province</option>

                            <option value="Eastern Cape">Eastern Cape</option>

                            <option value="Free State">Free State</option>

                            <option value="Gauteng">Gauteng</option>

                            <option value="KwaZulu-Natal">KwaZulu-Natal</option>

                            <option value="Limpopo">Limpopo</option>

                            <option value="Mpumalanga">Mpumalanga</option>

                            <option value="Northern Cape">Northern Cape</option>

                            <option value="North West">North West</option>

                            <option value="Western Cape">Western Cape</option>

                        </select>

                    </label>

                    <br/>

                    <label>Email Address</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

                    {emailExistsError && <div style={{color: "red"}}>{emailExistsError}</div>}

                    <br/>

                    <label>Password</label>
                    <input id="password-box" type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>

                    <br/>

                    <label>Confirm Password</label>
                    <input id="confirm-password-box" type="password" value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}/>

                    <br/><br/>
                    {passwordError && <div style={{color: "red"}}>{passwordError}</div>}

                    <br/>

                    <label>Additional Information</label>
                    <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)}/>

                    <button type="submit">Add</button>
                    <button type="button" onClick={handleViewButtonClick}>View</button>

                    <Link to="/login">
                        <button className="RegLoginBtn" type="button">
                            Login
                        </button>
                    </Link>

                </form>

                <div>
                    <h2 id="UsersH2">Stored Users:</h2>
                    <textarea defaultValue={details} readOnly rows={15} cols={30} id="storedTextA"></textarea>
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

            </div>

        );
    };

export default Form;