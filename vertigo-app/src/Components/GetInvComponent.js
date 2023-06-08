import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from "../images/Vertigo_Logo.jpg";
import NavigationBar from "./NavComponent";
import {FaFacebookF, FaInstagram, FaWhatsapp} from "react-icons/fa";

const Form = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [gender, setGender] = useState('');
    const [profession, setProfession] = useState('');
    const [ethnicity, setEthnicity] = useState('');
    const [province, setProvince] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [details, setDetails] = useState('');

    useEffect(() => {

        handleViewButtonClick();

    }, []);

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        const newUser = { name, surname, age, phoneNumber, email, gender, profession, ethnicity, province, additionalInfo };

        try {

            const response = await axios.post(

                'http://localhost:5012/GetInvInfo',

                newUser

            );

            setUsers([...users, response.data]);

            setName('');

            setSurname('');

            setAge('');

            setGender('');

            setProfession('');

            setEthnicity('');

            setProvince('');

            setPhoneNumber('');

            setEmail('');

            setAdditionalInfo('');

            setSuccess(true);

            setError('');

            alert("Data Submitted Successfully!");

        } catch (error) {

            setError('Error Submitting data');

            setSuccess(false);

            alert("Error Submitting Data");

        }

    };

    const handleViewButtonClick = async () => {

        try {

            const response = await axios.get('http://localhost:5012/GetInvInfo');

            setUsers(response.data);

            const usersString = response.data.map(user => `Name: ${user.name} ${user.surname} | Age: ${user.age} | Phone: ${user.phoneNumber} | Email: ${user.email} | Gender: ${user.gender} | Profession: ${user.profession} | Ethnicity: ${user.ethnicity} | Province: ${user.province}`).join('\n');

            setDetails(usersString);

        } catch (error) {

            console.log(error);
            alert('Error Retrieving Data');

        }

    };

    return (
        <div>
            <NavigationBar />
            <img src={ Logo } alt="Vertigo Logo" className="logo"></img>
            <h1>Professional Application Form</h1>

            <form onSubmit={handleFormSubmit} className="Form">

                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <label>Surname</label>
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>

                <label>Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)}/>

                <label>Phone Number</label>
                <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>

                <label>Email Address</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label>

                    Gender:

                    <select value={gender} onChange={(event) => setGender(event.target.value)}>

                        <option disabled value="">Select Gender</option>

                        <option value="male">Male</option>

                        <option value="female">Female</option>

                        <option value="other">Other</option>

                    </select>

                </label><br/>

                <label>

                    Profession:

                    <select value={profession} onChange={(event) => setProfession(event.target.value)}>

                        <option disabled value="">Select Profession</option>

                        <option value="coach">Waterpolo Coach</option>

                        <option value="life-coach">Life Coach</option>

                        <option value="psychologist">Psychologist</option>

                        <option value="sports-psychologist">Sports Psychologist</option>

                        <option value="sports-scientist">Sports Scientist</option>

                        <option value="Physiotherapist">Physiotherapist</option>

                    </select>

                </label><br/>

                <label>

                    Ethnicity/Race:

                    <select value={ethnicity} onChange={(event) => setEthnicity(event.target.value)}>

                        <option disabled value="">Select Ethnicity</option>

                        <option value="white">White</option>

                        <option value="african">African</option>

                        <option value="asian">Asian</option>

                        <option value="coloured/mixed">Coloured/Mixed</option>

                        <option value="other">Other</option>

                    </select>

                </label><br/>

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

                <label>Additional Information</label>
                <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)}/>

                <button type="submit">Add</button>
                <button type="button" onClick={handleViewButtonClick}>View</button>

            </form>

            <div>
                <h2 id="GeInvH2">Keen Academy Members:</h2>
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