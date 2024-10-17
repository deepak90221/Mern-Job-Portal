import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./JobForm.css"; // Assuming the CSS file name is changed

export const JobApplicationForm = () => {
  const [applicant, setApplicant] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    programmingLanguage: "",
    experience: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setApplicant(prevApplicant => ({
      ...prevApplicant,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/auth/job', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(applicant),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit application');
      }

      // Send email after successful job application submission
      const emailResponse = await fetch('http://localhost:8000/api/auth/sendEmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: applicant.email, message: 'Thank you for your job application!' }),
      });

      const emailResponseData = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(emailResponseData.message || 'Failed to send email');
      }

      toast('Job application submitted and email sent successfully');
      navigate("/");

    } catch (error) {
      toast('Error during job application: ' + error.message);
    }
  };

  return (
    <section className="job-application">
      <div className="container grid grid-two-columns">
        <div className="application-image">
          <img src="/images/jobs.png" alt="Job Application" />
        </div>
        <div className="application-form">
          <h1 className="heading">Project Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter your first name"
                required
                value={applicant.firstname}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter your last name"
                required
                value={applicant.lastname}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                value={applicant.email}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                required
                value={applicant.phone}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="programmingLanguage">Select Your Project</label>
              <select
                name="programmingLanguage"
                id="programmingLanguage"
                value={applicant.programmingLanguage}
                onChange={handleInput}
                required
              >
               <option value="climate-change-birds">The Impact of Climate Change on Birds with Machine Learning</option>
<option value="speech-emotion-librosa">Speech Emotion Recognition with librosa</option>
<option value="hm-fashion-recommendation">H&M Personalized Fashion Recommendations</option>
<option value="mlops-end-to-end">MLOps End-To-End Machine Learning</option>
<option value="deepfake-detection">Deepfake Detection with Machine Learning</option>
<option value="language-classification">Language Classification with Machine Learning</option>
<option value="amazon-reviews-sentiment">Amazon Products Reviews Sentiment Analysis with Machine Learning</option>
<option value="email-spam-detection">Email Spam Detection with Machine Learning</option>
<option value="movie-netflix-recommendation">Movie/Netflix Recommendation System</option>
<option value="student-performance-analysis">Student Performance Analysis with Machine Learning</option>
<option value="recommendation-system-project">Recommendation System Project with Machine Learning</option>
<option value="sentiment-analysis">Sentiment Analysis Project with Machine Learning</option>
<option value="social-media-analysis">Machine Learning Project on Social Media Analysis</option>
<option value="3d-video-python-ml">Create a 3D Video with Python and Machine Learning</option>
<option value="credit-card-fraud-detection">Credit Card Fraud Detection with Machine Learning</option>
<option value="weather-forecasting">Weather Forecasting with Machine Learning</option>
<option value="sms-spam-detection">SMS Spam Detection with Machine Learning</option>
<option value="employee-turnover-prediction">Employee Turnover Prediction with Machine Learning</option>
<option value="bitcoin-price-prediction">Bitcoin Price Prediction with Machine Learning</option>
<option value="whatsapp-sentiment-analysis">WhatsApp Chats Sentiment Analysis</option>
<option value="video-game-sales-prediction">Video Game Sales Prediction Model</option>
<option value="image-segmentation-face-landmarks">Image Segmentation and Face Landmarks Detection</option>
<option value="taxi-fare-prediction">Predict Taxi Fares with Random Forests</option>
<option value="song-genre-classification">Classify Song Genres from Audio Data</option>
<option value="earthquake-prediction">Earthquake Prediction Model</option>
<option value="market-basket-analysis">Market Basket Analysis using Apriori Algorithm</option>
<option value="sign-language-recognition">Sign Language Recognition with Machine Learning</option>
<option value="speech-emotion-recognition">Speech Emotion Recognition Machine Learning Project</option>
<option value="illegal-fishing-detection">Catching Illegal Fishing with Machine Learning</option>

              </select>
            </div>
            {/* <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <select
                name="experience"
                id="experience"
                value={applicant.experience}
                onChange={handleInput}
                required
              >
                <option value="">Select years of experience</option>
                <option value="0">0 years</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="4">4 years</option>
              </select>
            </div> */}
            <button type="submit" className="btn submit-btn">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
