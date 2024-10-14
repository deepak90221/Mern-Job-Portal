import { useAuth } from '../store/auth'; // Importing the useAuth hook
import './Home.css'; // Importing the CSS file

export const Home = () => {
    const { username } = useAuth(); // Retrieve username from the context

    return (
        <div className="home-container">
            {username && (
                <div className="home-header">
                    <h2>Welcome...</h2>
                </div>
            )}
            <div className="home-left">
                <h1>This is the Project Registration Portal!</h1>
                <p className="home-intro">We are the Best!!</p>
                <h2>Welcome to Job Portal</h2>
                <p className="home-description">
                    Are you ready to take to next level with cutting-edge project solutions? Look no further! 
                    At Project Portal, we specialize in providing innovative project services solutions tailored 
                    to connect now and learn more unique needs.
                </p>
                <div className="button-container">
                    <button className="btn">Connect Now</button>
                    <button className="btn">Learn More</button>
                </div>
                <div className="info-section">
                    <p>50+ <br />
                        Registered Companies</p>
                    <p>10,000+ <br />
                        Clients</p>
                    <p>24/7 <br />Services</p>
                    <p>500<br />
                        Well-known Developers</p>
                </div>
            </div>
            <div className="home-right">
                <img
                    src="https://th.bing.com/th/id/OIP.bewksOduGa7GxMafbLfqhgAAAA?rs=1&pid=ImgDetMain"
                    alt="Thapa Technical"
                    className="home-image"
                />
            </div>
        </div>
    );
};