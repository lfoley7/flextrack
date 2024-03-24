import React, { useState, useEffect, useRef } from 'react';
import Exercise from '../pagecreation/Exercise';
import './CreateWorkout.css';

function CreateWorkout() {
  const [title, setTitle] = useState('My Workout');
  const [isEditing, setIsEditing] = useState(false);
  const [exercises, setExercises] = useState([]);
  const titleRef = useRef(null);

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
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          className="title-input"
        />
      ) : (
        <h1 onClick={toggleEditing}>{title}</h1>
      )}
      {exercises.map((exercise) => (
        <Exercise
          key={exercise.id}
          name={exercise.name}
          onNameChange={(newName) => handleNameChange(exercise.id, newName)}
        />
      ))}
      <button onClick={handleAddExercise}>New Exercise</button>
    </div>
  );
}

export default CreateWorkout;