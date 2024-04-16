import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import "./PageCreation.css";

function Exercise({ name, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(name);
  const nextId = useRef(2);
  const [sets, setSets] = useState([{ id: 1, reps: '', weight: 10 }]);
  const exerciseRef = useRef(null);
  const exerciseOptions = ['Overhead Press', 'Bench Press', 'Squat', 'Deadlift'];

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
        <tbody className="align-items-center justify-content-center">
          {sets.map((set, index) => (
            <tr key={set.id}>
              <td>
                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '.5rem' }}>
                  Set {index + 1}
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-center align-items-center">
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
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-center align-items-center">
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
                </div>
              </td>
              <td>
                <button onClick={() => handleDeleteSet(set.id)} className="delete-entry">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table >
    );
  }

  return (
    <div className="exercise-wrapper">
      <div className="exercise-content">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="exercise-header-dropdown">
            {localName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {exerciseOptions.map(option => (
              <Dropdown.Item key={option} onClick={() => setLocalName(option)}>
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <SetsRepsWeight />
        <button className="newSet" onClick={handleAddSet}>Add Set</button>
      </div>
    </div>
  );
}

export default Exercise;