'use client'

export default function DietPlanModal({ isOpen, onClose, response }) {
    if (!isOpen) return null;

    return (
        <div className="diet-modal-overlay" onClick={onClose}>
            <div className="diet-modal-content" onClick={e => e.stopPropagation()}>
                <button className="diet-modal-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {response.error ? (
                    <div className="diet-modal-error">
                        <h3>Error</h3>
                        <p>{response.error}</p>
                    </div>
                ) : (
                    <div className="diet-modal-success">
                        <h3>{response.name}</h3>

                        {response.personalStats && (
                            <div className="diet-modal-section">
                                <h4>Personal Statistics</h4>
                                <div className="diet-modal-stats">
                                    <p>BMI: {response.personalStats.bmi}</p>
                                    <p>Age: {response.personalStats.age}</p>
                                </div>
                            </div>
                        )}

                        <div className="diet-modal-section">
                            <h4>Daily Meal Plan</h4>
                            {response.meals && response.meals[0] && (
                                <div className="diet-modal-meals">
                                    <div className="diet-modal-meal">
                                        <h5>Breakfast</h5>
                                        <p>{response.meals[0].breakfast}</p>
                                    </div>
                                    <div className="diet-modal-meal">
                                        <h5>Lunch</h5>
                                        <p>{response.meals[0].lunch}</p>
                                    </div>
                                    <div className="diet-modal-meal">
                                        <h5>Dinner</h5>
                                        <p>{response.meals[0].dinner}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="diet-modal-section">
                            <h4>Health Tips</h4>
                            <ul className="diet-modal-tips">
                                {response.tips && response.tips.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}