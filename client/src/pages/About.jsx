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
    We are a forward-thinking project management team specializing in delivering high-impact projects efficiently and effectively.
    Our mission is to help businesses and organizations achieve their goals through strategic planning and agile execution.
</p>
<p>
    Our team of certified project managers is committed to providing exceptional service and support throughout the project lifecycle.
    We pride ourselves on our ability to adapt to evolving project requirements and ensure successful outcomes in dynamic environments.
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
