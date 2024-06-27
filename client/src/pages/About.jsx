import './About.css'; // Importing the CSS file
import { NavLink } from 'react-router-dom';
export const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About Us</h1>
                <p>Learn more about our mission and values.</p>
            </div>
            <div className="about-content">
                <div className="about-description">
                    <p>
                        We are a cutting-edge IT company specializing in providing innovative technology solutions. 
                        Our mission is to help businesses and individuals achieve their goals through technology.
                    </p>
                    <p>
                        Our team of experts is dedicated to delivering high-quality services and exceptional customer support.
                        We pride ourselves on our ability to adapt to the ever-changing landscape of technology.
                    </p>
                    <div className="about-buttons">
                    <NavLink to="/register" className="btn">Connect Now!!</NavLink>
                    <NavLink to="/register" className="btn">Learn more</NavLink>
                    </div>
                </div>
                <div className="about-image">
                    <img 
                        src="./images/about.png" 
                        alt="About Us"
                    />
                </div>
            </div>
        </div>
    );
};
