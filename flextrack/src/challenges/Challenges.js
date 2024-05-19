import { useEffect, useState } from "react";
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { challengeInstance } from '../api/axiosInstances';
import './Challenges.css';
import Loading from "../loading/Loading";

const getChallenges = async () => {
    return await challengeInstance.get("get-all");
}

function Challenges() {
    const [challenges, setChallenges] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [workout, setWorkout] = useState();
    const [maxWeights, setMaxWeights] = useState({});
    const [showWeightModal, setShowWeightModal] = useState(false);
    const [currentWeight, setCurrentWeight] = useState('');
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getChallenges().then((res) => {
            const newChallenges = res.data.challenges;
            newChallenges.map((challenge) => {
                const filteredExercises = res.data.exercises.filter((exercise) =>
                    exercise.id == challenge.id
                )
                challenge.exercises = filteredExercises[0].exercises;
            })
            setChallenges(res.data.challenges);
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

    const handleEnterWeight = (index) => {
        setCurrentExerciseIndex(index);
        setCurrentWeight(maxWeights[index] || '');
        setShowWeightModal(true);
    };

    const handleWeightChange = (e) => {
        setCurrentWeight(e.target.value);
    };

    const saveWeight = () => {
        if (currentWeight) {
            setMaxWeights(prev => ({ ...prev, [currentExerciseIndex]: currentWeight }));
            setShowWeightModal(false);
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
                    : <p style={{ textAlign: 'center' }}>No challenges found</p>}
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
                            <button className="view-posts-button" onClick={() => handleEnterWeight(index)} style={{ width: 'inherit', padding: '0 1rem' }}>
                                {maxWeights[index] ? `${maxWeights[index]} lbs` : 'Record Your Max'}
                            </button>
                        </div>
                    </div>
                ))}
                <div style={{ display: "flex", width: "40rem" }}>
                    {selectedChallenge ? <button className="login" style={{ marginLeft: "auto", marginRight: 'auto' }} onClick={() => { setSelectedChallenge(null); }}>Submit</button> : null}
                </div>
                <Modal className="posts-modal" show={showWeightModal} onHide={() => setShowWeightModal(false)}>
                    <Modal.Header className="posts-modal-header" closeButton>
                        <Modal.Title className="posts-modal-text">Enter Max Weight</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Weight (lbs)</Form.Label>
                                <Form.Control type="text" value={currentWeight} onChange={handleWeightChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowWeightModal(false)}>Close</Button>
                        <Button className="posts-modal-button darken" onClick={saveWeight}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Challenges;