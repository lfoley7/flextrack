import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Exercise from '../pagecreation/Exercise';
import axios from "axios";
import './CreateWorkout.css';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api/workout'
});

const exerciseInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api/exercise'
});

const postWorkout = async (workout) => {
  return await instance.post("create",workout);
}

const addSessionsWorkout = async (workout) => {
  return await instance.post("add-sessions",workout);
}

function CreateWorkout() {
  const [title, setTitle] = useState('My Workout');
  const [isEditing, setIsEditing] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const navigate = useNavigate();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const workoutTypes = { push: 'Push', pull: 'Pull', legs: 'Legs' };
  const defaultSet = [{ id: 1, reps: 1, weight: 10 }];

  const createWorkout = async (name, day_of_week, workout_type, exercises) => {
    console.log(exercises)
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
    console.log(formattedSets)
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

    postWorkout({name: body.name})
    .then((e) => {
      body.plan_id = e.data.plan.id
      console.log(e)
      addSessionsWorkout(body).then((e) => {
        console.log(e.data)
        navigate("/dashboard");
      });
    }).catch((error) => {
      window.alert(error.response.data.error);
      console.log(error);
    });
  }

  const handleSubmit = async () => {
    await createWorkout(title, selectedDay, selectedType, exercises)
  };

  const toggleEditing = () => setIsEditing(true);

  const handleAddExercise = () => {
    const newExercise = {
      id: exercises.length + 1,
      name: `Exercise ${exercises.length + 1}`,
      sets: defaultSet
    };

    setExercises([...exercises, newExercise]);
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
          id={exercise.id}
          name={exercise.name}
          sets={exercise.sets}
          onSetChange={(set) => handleSetChange(exercise.id, set)}
          onExerciseChange={(newId, newName) => handleExerciseChange(exercise.id, newId, newName)}
        />
      ))}
      <button className="login" onClick={handleAddExercise}>New Exercise</button>
      <button className="login" style={{ marginTop: "5rem" }} onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateWorkout;
