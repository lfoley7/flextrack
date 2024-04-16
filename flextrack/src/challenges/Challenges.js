import { useEffect,useState } from "react";
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
            <a className="orange-link" onClick={() => { navigate("/dashboard"); }}>Dashboard Page!</a>
            <a className="orange-link" onClick={() => { navigate("/createWorkout"); }}>Create Workout Page!</a>
            <a className="orange-link" onClick={() => { navigate("/viewworkout"); }}>View Workout Page!</a>
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

/*function Challenges() {
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
*/

/*

function Challenges() {
    const navigate = useNavigate();

    const challenges = [
        { id: 1, name: 'MIKEYLIFTS204', description: 'Deadlift, Bench Pre...' },
        { id: 2, name: 'JAGRUTIGAINZ333', description: 'Squat, Incline Dumbe...' },
        // ... other challenges
    ];

    const navigateToChallenge = (id) => {
        navigate('/challenge/${id}');
    };

    const navigateToNewChallenge = () => {
        navigate('/new-challenge');
    };

    return (
        <div className="challenge-layout">
            <header className="challenge-header">
                <h1>Challenges Home Page</h1>
            </header>
            
            <div className="challenge-list">
                {challenges.map(challenge => (
                    <div key={challenge.id} className="challenge-item" onClick={() => navigateToChallenge(challenge.id)}>
                        <div className="challenge-name">{challenge.name}</div>
                        <div className="challenge-description">{challenge.description}</div>
                    </div>
                ))}
                <button className="new-challenge-btn" onClick={navigateToNewChallenge}>New Challenge</button>
            </div>

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
*/


function Challenges() {
    const navigate = useNavigate();

    const [selectedChallenge, setSelectedChallenge] = useState(null);

    const challenges = [
        {
            id: 1,
            name: 'MIKEYLIFTS204',
            exercises: [
                { name: 'Deadlift', sets: ['5 reps', '3 reps', '1 rep', '3 reps'] },
                { name: 'Bench Press', sets: ['8 reps', '4 reps', '2 reps', '1 rep'] },
            ]
        },
        // Assume similar structure for other challenges...
    ];

    const selectChallenge = (challengeId) => {
        const challenge = challenges.find(c => c.id === challengeId);
        setSelectedChallenge(challenge);
    };

    const createNewChallenge = () => {
        setSelectedChallenge({
            id: challenges.length + 1,
            name: '',
            exercises: []
        });
        // Optionally navigate to a different route if necessary
        // navigate('/new-challenge');
    };

    return (
        <div className="challenge-layout">
            <header className="challenge-header">
                <h1>{selectedChallenge ? '${selectedChallenge.name} CHALLENGES YOU!' :'Challenges Home Page'}</h1>
            </header>

            <div className="challenge-list">
                {!selectedChallenge &&
                    challenges.map((challenge) => (
                        <div key={challenge.id} className="challenge-item" onClick={() => selectChallenge(challenge.id)}>
                            <div className="challenge-name">{challenge.name}</div>
                        </div>
                    ))
                }
                {!selectedChallenge && <button className="new-challenge-btn" onClick={createNewChallenge}>New Challenge</button>}

                {selectedChallenge && selectedChallenge.exercises.map((exercise, index) => (
                    <div key={index} className="exercise-detail">
                        <h2 className="exercise-name">{exercise.name}</h2>
                        {exercise.sets.map((set, index) => (
                            <div key={index} className="set-detail">{set}</div>
                        ))}
                        <button className="max-button">Your Max</button>
                    </div>
                ))}
            </div>

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