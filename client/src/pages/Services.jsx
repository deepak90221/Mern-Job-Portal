import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Service.css'; 

export const Services = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [registeredServices, setRegisteredServices] = useState({}); // Track registered services

    useEffect(() => {
        fetchServices(); 
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/services');
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = services.filter(service =>
            service.provider.toLowerCase().includes(query.toLowerCase()) ||
            service.serviceName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredServices(filtered);
    };

    const handleRegister = (serviceId) => {
        // Check if the user has already registered for this service
        if (!registeredServices[serviceId]) {
            setRegisteredServices(prevState => ({
                ...prevState,
                [serviceId]: true
            }));
            // Optionally: Save this state to a backend or local storage for persistence
        }
    };

    const servicesToDisplay = searchQuery ? filteredServices : services;

    return (
        <>
        <section className="service-section">
            <div className="service-container">
                <h1 className="service-heading">Projects</h1>
                <input
                    type="text"
                    placeholder="Search Projects..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            <div className="service-grid">
                {servicesToDisplay.map(service => (
                    <div className="service-card" key={service._id}>
                        <div className="service-image">
                            <img 
                                src={service.imageUrl || "/images/background.png"} 
                                alt={service.serviceName} 
                                width="500"
                            />
                        </div>
                        <div className="service-details">
                            <div className="service-info">
                                <p>{service.provider}</p>
                                <p>{service.price}</p>
                            </div>
                            <h2 className="service-title">{service.serviceName}</h2>
                            <p className="service-description">{service.description}</p>

                            <div className="button-container">
                                <NavLink to="/jobform" className="btn">Apply Now!!</NavLink>
                            </div>

                            <div className="button-container">
                                <button 
                                    className="btn"
                                    onClick={() => handleRegister(service._id)}
                                    disabled={registeredServices[service._id]} // Freeze registration after clicking
                                >
                                    {registeredServices[service._id] ? "Registration Closed" : "Register"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        </>
    );
};
