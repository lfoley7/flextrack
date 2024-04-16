import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import './ViewWorkout.css';

function ViewWorkout() {
    const navigate = useNavigate();
    const [workout, setWorkout] = useState({
        title: "My Workout",
        exercises: [
            {
                name: "Bench Press",
                sets: [
                    { reps: 10, weight: 100, completed: false },
                    { reps: 8, weight: 120, completed: false }
                ]
            },
            {
                name: "Squat",
                sets: [
                    { reps: 8, weight: 150, completed: false },
                    { reps: 6, weight: 170, completed: false }
                ]
            }
        ]
    });

    const toggleCompletion = (exerciseIndex, setIndex) => {
        const newWorkout = { ...workout };
        newWorkout.exercises[exerciseIndex].sets[setIndex].completed = !newWorkout.exercises[exerciseIndex].sets[setIndex].completed;
        setWorkout(newWorkout);
    };

    return (
        <div className="display-container">
            <h1 className="view-workout-title">{workout.title}</h1>
            {workout.exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="exercise-wrapper">
                    <div className="exercise-content">
                        <h2 className="view-exercise-header">{exercise.name}</h2>
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
                                        <td>{set.weight} lbs</td>
                                        <td>
                                            <button
                                                className="completion-button"
                                                onClick={() => toggleCompletion(exerciseIndex, setIndex)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className={set.completed ? "checked" : "unchecked"}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            <button className="login" style={{ marginTop: "2rem" }} onClick={() => { navigate("/dashboard"); }}>Submit</button>
        </div>
    );
}

export default ViewWorkout;
