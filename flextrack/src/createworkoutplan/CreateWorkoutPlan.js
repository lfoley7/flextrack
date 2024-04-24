import React, { useEffect, useState, useRef } from "react";
import './CreateWorkoutPlan.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading/Loading';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/workout'
});

const getRoutines = async () => {
    return await instance.get("get-all");
}

const updateRoutineName = async (id, name) => {
    return await instance.post("update-name", { id: id, name: name });
}

function CreateWorkoutPlan(props) {
    const [routines, setRoutines] = useState();
    const [title, setTitle] = useState({});
    const [isEditing, setIsEditing] = useState({});
    const titleRefs = useRef({});

    const workoutRoutines = {
        "Push Pull Legs": {
            days: [
                { day: "Monday", type: "Push" },
                { day: "Wednesday", type: "Pull" },
                { day: "Friday", type: "Legs" }
            ]
        },
        "5 Day Split": {
            days: [
                { day: "Monday", type: "Chest" },
                { day: "Tuesday", type: "Back" },
                { day: "Wednesday", type: "Shoulders" },
                { day: "Thursday", type: "Legs" },
                { day: "Friday", type: "Arms" }
            ]
        },
        "NSuns Program": {
            days: [
                { day: "Monday", type: "Bench/Deadlift" },
                { day: "Tuesday", type: "Squat/Sumo" },
                { day: "Wednesday", type: "Bench/Front Squat" },
                { day: "Thursday", type: "Deadlift/Bench" },
                { day: "Friday", type: "Squat/Bench" },
                { day: "Saturday", type: "Volume" }
            ]
        }
    };

    useEffect(() => {
        Object.keys(isEditing).forEach(routine => {
            if (isEditing[routine] && titleRefs.current[routine].current) {
                titleRefs.current[routine].current.focus();
            }
        });
    }, [isEditing]);

    useEffect(() => {
        getRoutines()
            .then((res) => {
                console.log(res.data)
                setRoutines(res.data);
                const loadTitle = {}
                res.data.forEach(routine => {
                    loadTitle[routine.id] = routine.name;
                    titleRefs.current[routine.id] = React.createRef();
                });
                setTitle(loadTitle)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (routines === undefined) {
        return (
            <>
                <Loading margin={0} minHeight={"1000px"} />
            </>
        );
    }

    const toggleEditing = (routineId) => {
        setIsEditing(prev => ({ ...prev, [routineId]: !prev[routineId] }));

    };

    const handleTitleChange = (routineName, value) => {
        setTitle(prev => ({ ...prev, [routineName]: value }));
    };

    const handleBlur = (routineId) => {
        setIsEditing(prev => ({ ...prev, [routineId]: false }));
        updateRoutineName(routineId, title[routineId])
            .then((res) => {
                console.log(res.data)
                getRoutines()
                    .then((res) => {
                        console.log(res.data)
                        setRoutines(res.data);
                        res.data.forEach(routine => {
                            titleRefs.current[routine.id] = React.createRef();
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const interpolateColor = (index, total) => {
        const startColor = [0xF5, 0x85, 0x28];
        const endColor = [0xFE, 0x5C, 0x54];
        const divisor = total > 1 ? (total - 1) : 1;
        const step = index / divisor;

        const interpolatedColor = startColor.map((start, i) => {
            const end = endColor[i];
            const interpolated = Math.round(start + (end - start) * step);
            return interpolated.toString(16).padStart(2, '0');
        }).join('');

        return `#${interpolatedColor}`;
    };

    return (
        <div className="display-container">
            {routines.map((routine) => (
                <div key={routine.id} className="exercise-wrapper" style={{ marginTop: "1rem" }}>
                    <div className="exercise-content align-items-center">
                        {isEditing[routine.id] ? (
                            <input
                                ref={titleRefs.current[routine.id]}
                                type="text"
                                value={title[routine.id] || routine.name}
                                onChange={(e) => handleTitleChange(routine.id, e.target.value)}
                                onBlur={() => handleBlur(routine.id)}
                                className="title-input"
                                style={{ marginTop: ".63rem" }}
                            />
                        ) : (
                            <h1 className="workout-title" style={{ marginTop: "1rem" }} onClick={() => toggleEditing(routine.id)}>
                                {title[routine.id] || routine.name}
                            </h1>
                        )}
                        {routine.sessions.map((session, index) => (
                            console.log(session),
                            console.log(index),
                            console.log(routine.sessions.length),
                            <div key={`${routine.id}-${session.workout_type}`} className="login darken" style={{ fontWeight: '600', fontStyle: 'italic', backgroundImage: "none", backgroundColor: interpolateColor(index, routine.sessions.length) }}>
                                <Link to={"/viewworkout/"+routine.id+"/"+session.workout_type+"/"+session.day_of_week} style={{ textDecoration: 'none', color: 'inherit' }}>{session.day_of_week} - {session.workout_type}</Link>

                            </div>
                        ))}
                        <div className="newDay darken">
                            <Link to={"/editworkout/"+routine.id} style={{ textDecoration: 'none', color: 'inherit' }}>+ Add New Day</Link>
                        </div>
                    </div>
                </div>
            ))}
            <div className="newDay darken text-align-center">
                <Link to="/createworkout" style={{ textDecoration: 'none', color: 'inherit' }}>+ Add New Workout Routine</Link>
            </div>
        </div>
    );
}

export default CreateWorkoutPlan;
