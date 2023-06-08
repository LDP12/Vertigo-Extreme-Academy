import React from 'react';
import Logo from "../images/Vertigo_Logo.jpg";
import NavigationBar from "./NavComponent";
import SarahImage from "../images/polo_player_2.jpg";
import LiamImage from "../images/polo_player_1.jpg";
import JadeImage from "../images/polo_player_3.jpg";
import SimoneImage from "../images/polo_player_5.jpg";
import JasonImage from "../images/polo_player_4.jpg";
import {FaFacebookF, FaInstagram, FaWhatsapp} from "react-icons/fa";
const ProjectsPage = () => {
    const successStories = [
        {
            name: 'Sarah Johnson',
            image: SarahImage,
            title: 'Olympic Gold Medalist',
            achievements: 'Sarah Johnson, a former student-athlete at Vertigo Extreme Academy, was part of the South African women\'s national water polo team that won gold at the 2016 Olympic Games in Rio de Janeiro. She was also named the tournament\'s Most Valuable Player for her outstanding performance. Sarah has since gone on to play professionally in Europe and continues to be a role model for aspiring water polo players around the world.'
        },
        {
            name: 'Liam Grey',
            image: LiamImage,
            title: 'FINA Referee',
            achievements: 'Liam Grey, a former student-athlete at Vertigo Extreme Academy, is widely regarded as one of the greatest water polo players in South African history. He led the national team to numerous international victories and was named Most Valuable Player at the 2008 FINA World Cup. Liam has also used his success in water polo to inspire young people in his community, and has been recognized for his philanthropic work.'
        },
        {
            name: 'Jade Thornton',
            image: JadeImage,
            title: 'International SA Coach',
            achievements: 'Jade Thornton, a former student-athlete at Vertigo Extreme Academy, went on to become an accomplished water polo coach, working with teams across the world. She has led Olympic teams in Africa, South America, and Asia, and has been recognized for her innovative play with regard to unusual skill and technique. Jade has also continued to be a mentor and inspiration to young players, and has been an advocate for increased diversity in water polo.'
        },
        {
            name: 'Simone King',
            image: SimoneImage,
            title: 'National SA Record Holder',
            achievements: 'Simone King, a former student-athlete at Vertigo Extreme Academy, set a national record for the most goals scored in a single water polo season during her time at university. She went on to represent South Africa at multiple international competitions and has been recognized for her sportsmanship and leadership. Simone is also passionate about environmental conservation and has used her platform as an athlete to promote sustainable practices.'
        },
        {
            name: 'Jason Lee',
            image: JasonImage,
            title: 'SA Water Polo Legend',
            achievements: 'Jason Lee, a former student-athlete at Vertigo Extreme Academy, went on to start his own successful water polo equipment company, providing high-quality gear to players across the world. He has also used his business acumen to give back to the community, supporting youth water polo programs and funding scholarships for student-athletes. Jason credits his success in business to the skills he learned at Vertigo Extreme Academy, including leadership, discipline, and perseverance.'
        },
    ];
    return (
        <>
            <NavigationBar />
            <img src={Logo} alt="Vertigo Logo" className="logo"></img>
            <div className="projects-container">
                <h1 className="success-item-h1">Vertigo Extreme Academy Success Stories</h1>
                <div className="success-container">
                    {successStories.map(story => (
                        <div key={story.name} className="success-item">
                            <img src={story.image} alt={story.name} />
                            <h2>{story.name}</h2>
                            <h3>{story.title}</h3>
                            <p>{story.achievements}</p>
                        </div>
                    ))}
                </div>
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
export default ProjectsPage;