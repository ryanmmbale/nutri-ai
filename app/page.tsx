'use client'
import { useState } from 'react';
import DietPlanModal from './components/DietPlanModal';
import './styles/diet-modal.css';

export default function Home() {
  const [condition, setCondition] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    if (!condition) {
      alert("Please select a health condition.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/diet-plan/${condition}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: Number(age),
          weight: Number(weight),
          height: Number(height)
        })
      });

      if (!res.ok) {
        throw new Error("Failed to fetch diet plan");
      }

      const data = await res.json();
      setResponse(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "Could not fetch diet plan. Please try again." });
      setIsModalOpen(true);
    }

    setLoading(false);
  };

  const handleGetStarted = () => {
    const plannerSection = document.getElementById('diet-planner');
    plannerSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <div className="app-container">
        <header>
          <nav>
            <div className="logo">NutriAI</div>
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </header>

        <main>
          <section id="home" className="hero">
            <div className="hero-content">
              <h1>Personalized Diet Planning for Better Health</h1>
              <p>Tailored nutrition plans for managing hypertension, diabetes, and obesity</p>
              <button onClick={handleGetStarted} className="cta-button">
                Get Started
              </button>
            </div>
          </section>

          <section id="about" className="about-section">
            <h2>About NutriAI</h2>
            <p>We use advanced AI technology to create personalized diet plans that help manage chronic health conditions while ensuring you enjoy your meals.</p>
          </section>

          <section id="services" className="services-section">
            <h2>Our Services</h2>
            <div className="service-cards">
              <div className="service-card">
                <h3>Diabetes Management</h3>
                <p>Balanced meal plans to help control blood sugar levels</p>
              </div>
              <div className="service-card">
                <h3>Hypertension Care</h3>
                <p>Low-sodium diets tailored to your taste preferences</p>
              </div>
              <div className="service-card">
                <h3>Weight Management</h3>
                <p>Sustainable meal plans for healthy weight loss</p>
              </div>
            </div>
          </section>

          <section id="diet-planner" className="planner-section">
            <h2>Get Your Personalized Diet Plan</h2>
            <form id="diet-form" className="diet-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="health-condition">Health Condition:</label>
                <select
                    id="health-condition"
                    name="health-condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                >
                  <option value="" disabled>Select your condition</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="weight_management">Weight Management</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    min="18"
                    max="120"
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg):</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    step="0.1"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    min="30"
                    max="300"
                />
              </div>
              <div className="form-group">
                <label htmlFor="height">Height (cm):</label>
                <input
                    type="number"
                    id="height"
                    name="height"
                    placeholder="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    min="100"
                    max="250"
                />
              </div>
              <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
              >
                {loading ? "Processing..." : "Generate Diet Plan"}
              </button>
            </form>
          </section>

          <section id="contact" className="contact-section">
            <h2>Contact Us</h2>
            <p>Have questions? We're here to help you achieve your health goals.</p>
            <div className="contact-info">
              <div className="contact-item">
                <h3>Email</h3>
                <p>support@nutriai.com</p>
              </div>
              <div className="contact-item">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-item">
                <h3>Address</h3>
                <p>123 Health Street, Wellness City, WC 12345</p>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-content">
            <div className="footer-section">
              <h3>NutriAI</h3>
              <p>Your partner in personalized nutrition</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 NutriAI. All rights reserved.</p>
          </div>
        </footer>

        {response && (
            <DietPlanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                response={response}
            />
        )}
      </div>
  );
}