import { useEffect, useState } from "react";
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Challenges.css';
import Loading from "../loading/Loading";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/challenge'
});

const getChallenges = async () => {
    return await instance.get("get-all");
}

function Challenges() {
    const [workout, setWorkout] = useState();
    const [maxWeights, setMaxWeights] = useState({});
    const [challenges, setChallenges] = useState();
    const navigate = useNavigate();
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    
    useEffect(() => {
        getChallenges().then((res) => {
            console.log(res.data)
            const newChallenges = res.data.challenges;
            newChallenges.map((challenge) => {
                

                const filteredExercises = res.data.exercises.filter((exercise) => {
                    return exercise.id = challenge.id
                })

                challenge.exercises = filteredExercises[0].exercises;
            })
            setChallenges(res.data.challenges);
            console.log(res.data.challenges)
        })
    }, []);

    if (challenges === undefined) {
        return (
            <>
                <Loading margin={0} minHeight={"1000px"} />
            </>
        );
    }

    const toggleCompletion = (exerciseIndex, setIndex) => {
        const newWorkout = { ...workout };
        newWorkout.exercises[exerciseIndex].sets[setIndex].completed = !newWorkout.exercises[exerciseIndex].sets[setIndex].completed;
        setWorkout(newWorkout);
    };

    const selectChallenge = (challengeId) => {
        const challenge = challenges.find(c => c.id === challengeId);
        console.log(challenge.exercises)
        const initializedExercises = challenge.exercises;

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
                {challenges.length > 0 ? !selectedChallenge &&
                    challenges.map((challenge) => (
                        <div key={challenge.id} className="exercise-wrapper" style={{ width: "inherit" }} onClick={() => selectChallenge(challenge.id)}>
                            <div className="exercise-content darken" style={{ cursor: 'pointer' }}>
                                <div className="challenge-text">
                                    {challenge.name}
                                </div>
                            </div>
                        </div>
                    ))
                    : <p style={{textAlign: 'center'}}>No challenges found</p>}
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