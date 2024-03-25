import React, { useState } from 'react';
import "./PageCreation.css";

function Exercise({ name, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(name);
  const [sets, setSets] = useState([1]);
  const [weight, setWeight] = useState([10]);

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
    const newSetValue = sets.length + 1;
    setSets([...sets, newSetValue]);
  };

  const handleAddWeight = () => {
    const newWeightValue = weight.length + 1;
    setWeight([...weight, newWeightValue]);
  };

  function SetsRepsWeight() {
    return (
      sets.map((setValue, index) => (
        <div key={index} className="set-and-weight">
          <div className="left-group">
            Set {setValue} -&nbsp;<input className="reps-input" />&nbsp;reps
          </div>
          <div className="right-group">
            <input className="weight-input" defaultValue={`${weight[index] || 1}`} />&nbsp;lbs
          </div>
        </div>
      ))
    );
  }

  return (
    <div className="exercise-wrapper">
      {isEditing ? (
        <input
          type="text"
          value={localName}
          onClick={(e) => e.target.select()}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          className="exercise-input"
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{localName}</h2>
      )}
      <div>
        <SetsRepsWeight />
      </div>
      <button className="newSet" onClick={handleAddSet}>Add Set</button>
    </div>
  );
}

export default Exercise;
