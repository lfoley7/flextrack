import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { workoutInstance } from '../api/axiosInstances';
import './ViewWorkout.css';
import Loading from '../loading/Loading';

const getRoutine = async (id, session, day) => {
    return await workoutInstance.get("get", { params: { id: id, session: session, day: day } });
}

function ViewWorkout() {
    const navigate = useNavigate();

    let { planId, sessionType, day } = useParams();
    const [title, setTitle] = useState('My Workout')
    const [session] = useState(sessionType)
    const [dayInput] = useState(day)
    const [workout, setWorkout] = useState();

    const toggleCompletion = (exerciseIndex, setIndex) => {
        const newWorkout = { ...workout };
        newWorkout.exercises[exerciseIndex].sets[setIndex].completed = !newWorkout.exercises[exerciseIndex].sets[setIndex].completed;
        setWorkout(newWorkout);
    };

    useEffect(() => {
        getRoutine(planId, sessionType, day)
            .then((res) => {
                setTitle(res.data.session.plan.name)
                setWorkout(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
<<<<<<< HEAD
    }, [getRoutine, day, planId, sessionType]);
=======
    }, []);
>>>>>>> 64d80152bb4a2462a48f2859cb8703791b8d6cd5

    if(workout === undefined) {
        return (
            <>
              <Loading margin={0} minHeight={"1000px"} />
            </>
          );
    }

    return (
        <div className="display-container">
            <h1 className="view-workout-title">{title}</h1>
            <h3 className="" style={{ marginBottom: "2rem" }}>{dayInput +"-"+ session}</h3>
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
                                        <td><input className="updateable-workout-value" placeholder={set.reps}></input></td>
                                        <td><input className="updateable-workout-value" placeholder={set.weight + " lbs"}></input></td>
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
            <button className="login" style={{ marginTop: "2rem" }} onClick={() => { navigate("/createWorkoutPlan"); }}>Submit</button>
        </div>
    );
}

export default ViewWorkout;
