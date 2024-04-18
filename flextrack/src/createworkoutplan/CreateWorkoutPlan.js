import React, { useEffect, useState, useRef } from "react";
import './CreateWorkoutPlan.css';

function CreateWorkoutPlan(props) {
    const [title, setTitle] = useState('My Workout');
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
        Object.keys(workoutRoutines).forEach(routine => {
            titleRefs.current[routine] = React.createRef();
        });
    }, []);

    useEffect(() => {
        Object.keys(isEditing).forEach(routine => {
            if (isEditing[routine] && titleRefs.current[routine].current) {
                titleRefs.current[routine].current.focus();
            }
        });
    }, [isEditing]);

    const toggleEditing = (routineName) => {
        setIsEditing(prev => ({ ...prev, [routineName]: !prev[routineName] }));
    };

    const handleTitleChange = (routineName, value) => {
        setTitle(prev => ({ ...prev, [routineName]: value }));
    };

    const handleBlur = (routineName) => {
        setIsEditing(prev => ({ ...prev, [routineName]: false }));
    };

    const interpolateColor = (index, total) => {
        const startColor = [0xF5, 0x85, 0x28];
        const endColor = [0xFE, 0x5C, 0x54];
        const step = index / (total - 1);

        const interpolatedColor = startColor.map((start, i) => {
            const end = endColor[i];
            const interpolated = Math.round(start + (end - start) * step);
            return interpolated.toString(16).padStart(2, '0');
        }).join('');

        return `#${interpolatedColor}`;
    };

    return (
        <div className="display-container">
            {Object.entries(workoutRoutines).map(([routineName, details]) => (
                <div key={routineName} className="exercise-wrapper" style={{ marginTop: "1rem" }}>
                    <div className="exercise-content align-items-center">
                        {isEditing[routineName] ? (
                            <input
                                ref={titleRefs.current[routineName]}
                                type="text"
                                value={title[routineName] || routineName}
                                onChange={(e) => handleTitleChange(routineName, e.target.value)}
                                onBlur={() => handleBlur(routineName)}
                                className="title-input"
                                style={{ marginTop: ".63rem" }}
                            />
                        ) : (
                            <h1 className="workout-title" style={{ marginTop: "1rem" }} onClick={() => toggleEditing(routineName)}>
                                {title[routineName] || routineName}
                            </h1>
                        )}
                        {details.days.map((dayInfo, index) => (
                            <div key={`${routineName}-${dayInfo}`} className="login darken" style={{ fontWeight: '600', fontStyle: 'italic', backgroundImage: "none", backgroundColor: interpolateColor(index, details.days.length) }}>
                                {dayInfo.day} - {dayInfo.type}
                            </div>
                        ))}
                        <div className="newDay darken">Add New Day</div>
                    </div>
                </div>
            ))}
            <div className="newDay darken text-align-center">Add New Workout Routine</div>
        </div>
    );
}

export default CreateWorkoutPlan;
