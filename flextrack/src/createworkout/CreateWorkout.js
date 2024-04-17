import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Exercise from '../pagecreation/Exercise';
import './CreateWorkout.css';

function CreateWorkout() {
  const [title, setTitle] = useState('My Workout');
  const [isEditing, setIsEditing] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const navigate = useNavigate();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const workoutTypes = { push: 'Push', pull: 'Pull', legs: 'Legs' };

  const toggleEditing = () => setIsEditing(true);

  const handleAddExercise = () => {
    const newExercise = {
      id: exercises.length + 1,
      name: `Exercise ${exercises.length + 1}`
    };
    setExercises([...exercises, newExercise]);
  };

  const handleNameChange = (id, newName) => {
    const updatedExercises = exercises.map(exercise => {
      if (exercise.id === id) {
        return { ...exercise, name: newName };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  return (
    <div className="display-container">
      <h1 className="workout-title" onClick={toggleEditing}>{title}</h1>
      <div className="d-flex justify-content-start mb-3">
        <select className="form-select me-2" value={selectedDay} onChange={e => setSelectedDay(e.target.value)} style={{ maxWidth: 200, cursor: 'pointer' }}>
          <option value="">Select a Day</option>
          {daysOfWeek.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <select className="form-select" value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{ maxWidth: 200, cursor: 'pointer' }}>
          <option value="">Select a Type</option>
          {Object.entries(workoutTypes).map(([key, type]) => (
            <option key={key} value={key}>{type}</option>
          ))}
        </select>
      </div>
      {exercises.map((exercise) => (
        <Exercise
          key={exercise.id}
          name={exercise.name}
          onNameChange={(newName) => handleNameChange(exercise.id, newName)}
        />
      ))}
      <button className="login" onClick={handleAddExercise}>New Exercise</button>
      <button className="login" style={{ marginTop: "5rem" }} onClick={() => { navigate("/dashboard"); }}>Submit</button>
    </div>
  );
}

export default CreateWorkout;
