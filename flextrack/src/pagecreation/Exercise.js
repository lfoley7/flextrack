import React, { useState, useRef, useEffect } from 'react';
import "./PageCreation.css";

function Exercise({ name, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(name);
  const nextId = useRef(2);
  const [sets, setSets] = useState([{ id: 1, reps: '', weight: 10 }]);
  const exerciseRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      exerciseRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onNameChange(localName);
  };

  const handleChange = (e) => {
    setLocalName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleAddSet = () => {
    const newSet = {
      id: sets.length + 1,
      reps: '',
      weight: 10
    };
    setSets([...sets, newSet]);
    nextId.current += 1;
    console.log(sets);
  };

  const handleDeleteSet = (id) => {
    const filteredSets = sets.filter(set => set.id !== id);
    const updatedSets = filteredSets.map((set, index) => ({
      ...set,
      id: index + 1
    }));
    setSets(updatedSets);
  };

  function SetsRepsWeight() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Set #</th>
            <th scope="col">Reps</th>
            <th scope="col">Weight</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set, index) => (
            <tr key={set.id}>
              <td>Set {index + 1}</td>
              <td>
                <input
                  type="number"
                  className="form-control reps-input"
                  defaultValue={set.reps}
                  onChange={(e) => {
                    const newSets = [...sets];
                    newSets[index] = { ...set, reps: e.target.value };
                    setSets(newSets);
                  }}
                  aria-label="Reps"
                /> reps
              </td>
              <td>
                <input
                  type="number"
                  className="form-control weight-input"
                  defaultValue={set.weight}
                  onChange={(e) => {
                    const newSets = [...sets];
                    newSets[index] = { ...set, weight: e.target.value };
                    setSets(newSets);
                  }}
                  aria-label="Weight"
                /> lbs
              </td>
              <td>
                <button onClick={() => handleDeleteSet(set.id)} className="delete-entry">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="exercise-wrapper">
      <div className="exercise-content">
        {isEditing ? (
          <input
            ref={exerciseRef}
            type="text"
            value={localName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            className="exercise-input"
            autoFocus
          />
        ) : (
          <i><h2 className="exercise-header" onClick={() => setIsEditing(true)}>{localName}</h2></i>
        )}
        <SetsRepsWeight />
        <button className="newSet" onClick={handleAddSet}>Add Set</button>
      </div>
    </div>
  );
}

export default Exercise;