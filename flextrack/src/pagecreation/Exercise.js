import React, { useState } from 'react';

function Exercise({ name, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(name);

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

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={localName}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{localName}</h2>
      )}
    </div>
  );
}

export default Exercise;
