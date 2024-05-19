import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Exercise from '../pagecreation/Exercise';
import { workoutInstance } from '../api/axiosInstances';
import './EditWorkout.css';
import { TextField } from '@mui/material';
import Loading from '../loading/Loading';

const getRoutine = async (id, session, day) => {
  return await workoutInstance.get("get-plan", { params: { id: id } });
}

const addSessionsWorkout = async (workout) => {
  return await workoutInstance.post("add-sessions", workout);
}

function EditWorkout() {
  const [title, setTitle] = useState();
  const [exercises, setExercises] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const navigate = useNavigate();
  let { planId } = useParams();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const defaultSet = [{ id: 1, reps: 1, weight: 10 }];

  useEffect(() => {
    getRoutine(planId)
      .then((res) => {
        setTitle(res.data.plan.name)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [planId]);

  if (title === undefined) {
    return (
      <>
        <Loading margin={0} minHeight={"1000px"} />
      </>
    );
  }

  const createWorkout = async (day_of_week, workout_type, exercises, plan_id) => {
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
      return null;
    })
    let body =
    {
      "plan_id": plan_id,
      "sessions": [
        {
          "day_of_week": day_of_week,
          "workout_type": workout_type,
          "sets": formattedSets
        }
      ]
    };

    addSessionsWorkout(body).then((e) => {
      navigate("/createworkoutplan");
    });
  }

  const handleSubmit = async () => {
    await createWorkout(selectedDay, selectedType, exercises, planId)
  };

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
      <h1 className="workout-title">{title}</h1>
      <div className="d-flex justify-content-start mb-3">
        <select className="form-select me-2" value={selectedDay} onChange={e => setSelectedDay(e.target.value)} style={{ maxWidth: 200, cursor: 'pointer' }}>
          <option value="">Select a Day</option>
          {daysOfWeek.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <TextField className="form-select me-2" placeholder="Type" onChange={e => setSelectedType(e.target.value)} style={{ maxWidth: 200, cursor: 'pointer' }}>
          {selectedType}
        </TextField>
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

export default EditWorkout;
