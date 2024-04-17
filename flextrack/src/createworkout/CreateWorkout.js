import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Exercise from '../pagecreation/Exercise';
import axios from "axios";
import './CreateWorkout.css';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api/workout'
});

function CreateWorkout() {
  const [title, setTitle] = useState('My Workout');
  const [isEditing, setIsEditing] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const titleRef = useRef(null);

  const navigate = useNavigate();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const workoutTypes = { push: 'Push', pull: 'Pull', legs: 'Legs' };
  const defaultSet = [{ id: 1, reps: 1, weight: 10 }];

  const createWorkout = async (name, day_of_week, workout_type, exercises) => {
    
    let formattedSets = []
    exercises.map((exercise) => {
      exercise.sets.forEach(set => {
        let formattedSet = {
          "set_number": set.id,
          "exercise": exercise.id,
          "target_weight": set.weight,
          "target_reps": set.reps
        }

        formattedSets.push(formattedSet);
      });
    })

    let body = 
    { 
      "name": name, 
      "sessions": [
        {
          "day_of_week": day_of_week,
          "workout_type": workout_type,
          "sets": formattedSets
        }
      ] 
    };

    console.log(body)

    instance.post("create", body)
    .then((e) => {
      navigate("/dashboard");
    }).catch((error) => {
      window.alert(error.response.data.error);
      console.log(error);
    });
  }

  const handleSubmit = async () => {
    await createWorkout(title, selectedDay, selectedType, exercises)
  };

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
      name: `Exercise ${exercises.length + 1}`,
      sets: defaultSet
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

  const handleSetChange = (id, newSet) => {
    const updatedExercises = exercises.map(exercise => {
      if (exercise.id === id) {
        return { ...exercise, sets: newSet };
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
          sets={exercise.sets}
          onNameChange={(newName) => handleNameChange(exercise.id, newName)}
          onSetChange={(set) => handleSetChange(exercise.id, set)}
        />
      ))}
      <button className="login" onClick={handleAddExercise}>New Exercise</button>
      <button className="login" style={{ marginTop: "5rem" }} onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateWorkout;
