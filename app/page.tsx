'use client'
import { useState } from 'react';

export default function Home() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [condition, setCondition] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/ai-feedback", {  // ✅ Remove `/app/`
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, weight, height, condition }),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error fetching AI feedback:", error);
    }
  };
  


  return (
    <>
      
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
                <button className="cta-button">Get Started</button>
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
                <div className="form-group" >
                    <label htmlFor="health-condition">Health Condition:</label>
                    <select id="health-condition" name="health-condition" value={condition} onChange={e => setCondition(e.target.value)} required>
                        <option value="" disabled>Select your condition</option>
                        <option value="diabetes">Diabetes</option>
                        <option value="hypertension">Hypertension</option>
                        <option value="obesity">Obesity</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight (kg):</label>
                    <input type="number" id="weight" name="weight" step="0.1" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height (cm):</label>
                    <input type="number" id="height" name="height" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} required />
                </div>
                <button type="submit" className="submit-button" disabled={loading}> {loading ? 'Processing...' : 'Generate Diet Plan'} </button>
            </form>
            {response && <div className="mt-4 p-4 bg-gray-100 rounded">{response}</div>}
          </section>
          
    </main>

    <footer>
        <p>&copy; 2024 NutriAI. All rights reserved.</p>
    </footer>
    </>
  );
}
