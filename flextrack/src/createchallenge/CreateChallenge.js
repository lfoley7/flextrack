import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { challengeInstance, userInstance } from '../api/axiosInstances';
import { Dropdown } from 'react-bootstrap';
import Exercise from '../pagecreation/Exercise';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './CreateChallenge.css';

const postChallenge = async (users, exercises, name) => {
    let formattedSets = []
    exercises.map((exercise) => {
      exercise.sets.forEach(set => {
        let formattedSet = {
          "set_number": set.id,
          "exercise_id": exercise.id,
          "target_weight": set.weight,
          "target_reps": set.reps
        }

        formattedSets.push(formattedSet);
      });
    })
    const user_ids = users.map((user) => {
        return user.value
    })
    const body = {
        users: user_ids,
        sets: formattedSets,
        name: name
    }
    await challengeInstance.post("/create",body);
};

function CreateChallenge() {
    const [title, setTitle] = useState('My Challenge');
    const [isEditing, setIsEditing] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userInstance.get("/get-all-friends");
            const options = response.data.map((user) => {
                return { value: user.id, label: user.profile.username }
            })
            setUsers(options);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async () => {
        await postChallenge(selectedUsers, exercises, title);
        navigate("/challenges");
    };

    const toggleEditing = () => setIsEditing(true);

    const handleSetChange = (id, newSet) => {
        const updatedExercises = exercises.map(exercise => {
            if (exercise.id === id) {
                return { ...exercise, sets: newSet };
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };

    const handleExerciseChange = (oldId, id, newName) => {
        const updatedExercises = exercises.map(exercise => {
            if (exercise.id === oldId) {
                return { ...exercise, id: id, name: newName };
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };

    const handleUserSelection = (selectedOptions) => {
        setSelectedUsers(selectedOptions || []);
    };

    return (
        <div className="display-container">
            <h1 className="challenge-title" onClick={() => setIsEditing(true)}>
                {isEditing ? (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                        className="title-input"
                        style={{ marginTop: ".63rem" }}
                    />
                ) : (
                    <h1 className="workout-title" style={{ marginTop: "1rem" }} onClick={() => toggleEditing()}>
                        {title}
                    </h1>
                )}
            </h1>

            <div className="d-flex justify-content-start mb-3">
                <Select
                    isMulti
                    options={users}
                    onChange={handleUserSelection}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select Users"
                />
            </div>

            {exercises.map((exercise, index) => (
                <Exercise
                    key={index}
                    id={exercise.id}
                    name={exercise.name}
                    sets={exercise.sets}
                    onSetChange={(set) => handleSetChange(exercise.id, set)}
                    onExerciseChange={(newId, newName) => handleExerciseChange(exercise.id, newId, newName)}
                />
            ))}
            <button className="login" onClick={() => setExercises([...exercises, { id: exercises.length + 1, name: `Exercise ${exercises.length + 1}`, sets: [{ id: 1, reps: 10, weight: 50 }] }])}>New Exercise</button>
            <button className="login" style={{ marginTop: "2rem" }} onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default CreateChallenge;