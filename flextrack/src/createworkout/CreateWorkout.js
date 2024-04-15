import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Exercise from '../pagecreation/Exercise';
import './CreateWorkout.css';

function CreateWorkout() {
  const [title, setTitle] = useState('My Workout');
  const [isEditing, setIsEditing] = useState(false);
  const [exercises, setExercises] = useState([]);
  const titleRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      titleRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const toggleEditing = () => setIsEditing(true);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      e.preventDefault();
    }
  };

  const handleBlur = () => setIsEditing(false);

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
      {isEditing ? (
        <input
          ref={titleRef}
          type="text"
          value={title}
          onClick={(e) => e.target.select()}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          className="title-input"
        />
      ) : (
        <h1 className="workout-title" onClick={toggleEditing}>{title}</h1>
      )}
      {exercises.map((exercise) => (
        <Exercise
          key={exercise.id}
          name={exercise.name}
          onNameChange={(newName) => handleNameChange(exercise.id, newName)}
        />
      ))}
      <button className="login" onClick={handleAddExercise}>New Exercise</button>
      <button className="login" style={{ marginTop: "5rem" }} onClick={() => { navigate("/"); }}>Submit</button>
    </div>
  );
}

export default CreateWorkout;
