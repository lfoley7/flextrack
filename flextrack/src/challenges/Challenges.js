import { useEffect } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Challenges.css';

/* function Challenges(props) {
    const navigate = useNavigate();

    return (
        <div className="display-container">
            <div className="top-message">
                Welcome to the Challenges Page!
            </div>
            <a className="orange-link" onClick={() => { navigate("/"); }}>Dashboard Page!</a>
            <a className="orange-link" onClick={() => { navigate("/createWorkout"); }}>Create Workout Page!</a>
            <a className="orange-link" onClick={() => { navigate("/viewWorkout"); }}>View Workout Page!</a>
            <a className="orange-link" onClick={() => { navigate("/social"); }}>Social Page!</a>
            <a className="orange-link" onClick={() => { navigate("/challenges"); }}>Challenges Page!</a>
            <a className="orange-link" onClick={() => { navigate("/settings"); }}>Settings Page!</a>
        </div>
    )
};

export default Challenges; */
/*
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChallengeDetail.css'; // Ensure this is the correct path to your CSS file
*/

function Challenges() {
    const navigate = useNavigate();

    // You would fetch the actual challenges from your state or props
    const challenges = [
        { id: 1, name: 'MIKEYLIFTS204', description: 'Deadlift, Bench Pre...' },
        { id: 2, name: 'JAGRUTIGAINZ333', description: 'Squat, Incline Dumbe...' },
        // ... other challenges
    ];

    return (
        <div className="challenge-layout">
            <aside className="sidebar">
                <h1>Challenges Home Page</h1>
                <div className="challenge-list">
                    {challenges.map(challenge => (
                        <div key={challenge.id} className="challenge-item" onClick={() => navigate('/challenge/${challenge.id}')}>
                            <div className="challenge-title">{challenge.name}</div>
                            <div className="challenge-description">{challenge.description}</div>
                        </div>
                    ))}
                </div>
                <button className="new-challenge-btn" onClick={() => navigate('/new-challenge')}>New Challenge</button>
            </aside>

            <footer className="bottom-nav">
                <span onClick={() => navigate('/home')}>H</span>
                <span onClick={() => navigate('/challenges')}>CHL</span>
                <span onClick={() => navigate('/friends')}>FRN</span>
                <span onClick={() => navigate('/settings')}>SET</span>
            </footer>
        </div>
    );
}

export default Challenges;
