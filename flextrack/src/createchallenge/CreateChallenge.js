import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import { Dropdown } from 'react-bootstrap';
import Exercise from '../pagecreation/Exercise';
import './CreateChallenge.css';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/workout'
});

const userInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/user'
});

function CreateChallenge() {
    const [title, setTitle] = useState('My Challenge');
    const [isEditing, setIsEditing] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userInstance.get("/list");
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async () => {
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
        console.log(updatedExercises)
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
                <select className="form-select me-2" value={selectedDay} onChange={e => setSelectedDay(e.target.value)} style={{ maxWidth: 200, cursor: 'pointer' }}>
                    <option value="">Select a Day</option>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <input type="text" className="form-control me-2" value={selectedType} onChange={e => setSelectedType(e.target.value)} placeholder="Type" style={{ maxWidth: 200 }} />
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