import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from "./NavComponent";
import Logo from "../images/Vertigo_Logo.jpg";
import {FaFacebookF, FaInstagram, FaWhatsapp} from "react-icons/fa";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:5012/Image');
            console.log(response.data);
            setImages(response.data);
        } catch (error) {
            console.error("Error Fetching Images:", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("image", file);

        if (file && file.size > 5 * 1024 * 1024) {
            alert("Image Size Exceeds The Limit Of 5MB");
            return;
        }

        try {
            await axios.post('http://localhost:5012/Image', formData);
            fetchImages();
            alert("Image Successfully Added");

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to Add");
        }
    };

    return (

        <div className="image-uploader">

            <img src={ Logo } alt="Vertigo Logo" className="logo"></img>

            <NavigationBar />

            <input type="file" accept="image/*" onChange={handleFileChange} />

            <button onClick={handleUpload}>Upload</button>

            <div className="image-gallery">

                {images.map((image) => (
                    <div key={image.id} className="image-container">
                        <img src={`data:image/jpeg;base64,${image.imageData}`} alt={image.imageName} />
                    </div>
                ))}
            </div>

        </div>

    );
};

export default Gallery;