import { useEffect, useState } from "react";
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Challenges.css';

function Challenges() {
    const [workout, setWorkout] = useState();
    const [maxWeights, setMaxWeights] = useState({});
    const navigate = useNavigate();
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    const challenges = [
        {
            id: 1,
            name: '2 Plate Bench-Off',
            exercises: [
                {
                    name: 'Deadlift',
                    sets: ['5 reps', '3 reps', '1 rep', '3 reps'],
                    weight: ['250', '275', '300', '280']
                },
                {
                    name: 'Bench Press',
                    sets: ['8 reps', '4 reps', '2 reps', '1 rep'],
                    weight: ['150', '175', '200', '180']
                },
            ]
        },
        {
            id: 2,
            name: 'CBUM Special Challenge',
            exercises: [
                { name: 'Deadlift', sets: ['3 reps', '5 reps', '1 rep', '3 reps'], weight: ['320', '300', '350', '320'] },
                { name: 'Squats', sets: ['8 reps', '4 reps', '2 reps', '1 rep'], weight: ['200', '240', '260', '280'] },
            ]
        }
    ];

    const toggleCompletion = (exerciseIndex, setIndex) => {
        const newWorkout = { ...workout };
        newWorkout.exercises[exerciseIndex].sets[setIndex].completed = !newWorkout.exercises[exerciseIndex].sets[setIndex].completed;
        setWorkout(newWorkout);
    };

    const selectChallenge = (challengeId) => {
        const challenge = challenges.find(c => c.id === challengeId);
        const initializedExercises = challenge.exercises.map(exercise => ({
            ...exercise,
            sets: exercise.sets.map(set => ({
                reps: set,
                weight: exercise.weight[exercise.sets.indexOf(set)],
                completed: false
            }))
        }));

        setSelectedChallenge(challenge);
        setWorkout({ ...challenge, exercises: initializedExercises });
    };

    const createNewChallenge = () => {
        navigate('/createchallenge');
    };

    const enterWeight = (exerciseIndex) => {
        const weight = prompt("Enter your max weight for this exercise (lbs):");
        if (weight) {
            setMaxWeights(prev => ({ ...prev, [exerciseIndex]: weight }));
        }
    };

    return (
        <div className="display-container">
            <header className="challenges-title">
                <div>{selectedChallenge ? `${selectedChallenge.name.toUpperCase()}!` : 'My Challenges'}</div>
            </header>
            <div className="challenge-list">
                {!selectedChallenge &&
                    challenges.map((challenge) => (
                        <div key={challenge.id} className="exercise-wrapper" style={{ width: "inherit" }} onClick={() => selectChallenge(challenge.id)}>
                            <div className="exercise-content darken" style={{ cursor: 'pointer' }}>
                                <div className="challenge-text">
                                    {challenge.name}
                                </div>
                            </div>
                        </div>
                    ))
                }
                {!selectedChallenge && <button className="newDay darken" style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={() => { navigate('/createchallenge') }}>New Challenge</button>}
                {selectedChallenge && workout.exercises.map((exercise, index) => (
                    <div key={index} className="exercise-wrapper">
                        <div className="exercise-content">
                            <div className="exercise-name">{exercise.name}</div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Set</th>
                                        <th>Reps</th>
                                        <th>Weight</th>
                                        <th>Completed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exercise.sets.map((set, setIndex) => (
                                        <tr key={setIndex}>
                                            <td>Set {setIndex + 1}</td>
                                            <td>{set.reps}</td>
                                            <td>{set.weight + " lbs"}</td>
                                            <td>
                                                <button className="completion-button" onClick={() => toggleCompletion(index, setIndex)}>
                                                    <FontAwesomeIcon icon={faCheckCircle} className={set.completed ? "checked" : "unchecked"} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="view-posts-button" onClick={() => enterWeight(index)} style={{ width: 'inherit', padding: '0 1rem' }}>
                                {maxWeights[index] ? `${maxWeights[index]} lbs` : 'Record Your Max'}
                            </button>
                        </div>
                    </div>
                ))}
                <div style={{ display: "flex", width: "40rem" }}>
                    {selectedChallenge ? <button className="login" style={{ marginLeft: "auto", marginRight: 'auto' }} onClick={() => { setSelectedChallenge(null); }}>Submit</button> : null}
                </div>
            </div>
        </div>
    );
}

export default Challenges;