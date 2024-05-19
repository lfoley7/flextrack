import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { exerciseInstance } from '../api/axiosInstances';
import "./PageCreation.css";

const postExercise = async (name) => {
  return await exerciseInstance.post("create", {name: name, targetMuscle: "any"});
}

const getExercises = async () => {
  return await exerciseInstance.get("get-all");
}

function Exercise({ name, sets, onSetChange, id, onExerciseChange }) {
  const [isEditing] = useState(false);
  const [localExercise, setLocalExercise] = useState({id: id, name: name});
  const nextId = useRef(2);
  const [localSets, setSets] = useState(sets);
  const [showModal, setShowModal] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const exerciseRef = useRef(null);
  const [exerciseOptions, setExerciseOptions] = useState([{id: 1, name: "bench"}]);

  useEffect(() => {
    if (isEditing) {
      exerciseRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    getExercises()
    .then((res) => {
        const newExercises = (res.data).map((exercise) => {
          return {id: exercise.id, name: exercise.name};
        })
        setExerciseOptions(newExercises);
    })
    .catch((err) => {
        console.log(err);
    });
  }, []);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleNewExerciseNameChange = (event) => {
    setNewExerciseName(event.target.value);
  };

  const handleAddNewExercise = () => {
    if (newExerciseName.trim() !== '') {
      postExercise(newExerciseName)
      .then((e) => {
        getExercises()
        .then((res) => {
            const newExercises = (res.data).map((exercise) => {
              return {id: exercise.id, name: exercise.name};
            })
            setExerciseOptions(newExercises);
            setNewExerciseName('');
            handleModalClose();
        })
        .catch((err) => {
            console.log(err);
        });

      }).catch((error) => {
        console.log(error);
      });
    }
  };

  const handleExerciseChange = (exercise) => {
    onExerciseChange(exercise.id ,exercise.name)
    setLocalExercise(exercise)
  };

  const handleAddSet = () => {
    const newSet = {
      id: localSets.length + 1,
      reps: 1,
      weight: 10
    };
    onSetChange([...localSets, newSet])
    setSets([...localSets, newSet]);
    nextId.current += 1;
  };

  const handleWeightChange = (set, e, index) => {
    const newSets = [...localSets];
    newSets[index] = { ...set, weight: parseInt(e.target.value) };
    setSets(newSets);
    onSetChange(newSets);
  };

  const handleRepsChange = (set, e, index) => {
    const newSets = [...localSets];
    newSets[index] = { ...set, reps: parseInt(e.target.value) };
    setSets(newSets);
    onSetChange(newSets);
  };

  const handleDeleteSet = (id) => {
    const filteredSets = localSets.filter(set => set.id !== id);
    const updatedSets = filteredSets.map((set, index) => ({
      ...set,
      id: index + 1
    }));
    setSets(updatedSets);
    onSetChange(updatedSets);
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
          {localSets.map((set, index) => (
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
                    onChange={(e) => handleRepsChange(set, e, index)}
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
                    onChange={(e) => handleWeightChange(set, e, index)}
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
        <div className="header-controls">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="exercise-header-dropdown darken">
              {localExercise.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {exerciseOptions.map(option => (
                <Dropdown.Item key={option.id} value={option} onClick={() => handleExerciseChange({id: option.id, name: option.name})}>
                  {option.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <button className="make-posts-button darken" onClick={handleModalShow} style={{ fontStyle: "italic", fontWeight: "600", marginLeft: "2rem", marginTop: "0", backgroundImage: "linear-gradient(to right, #FC6649, #FE5C54)", fontSize: ".9rem" }}>+ Exercise</button>
        </div>
        <SetsRepsWeight />
        <button className="newSet" onClick={handleAddSet}>Add Set</button>
      </div>

      <Modal className="posts-modal" show={showModal} onHide={handleModalClose}>
        <Modal.Header className="posts-modal-header" closeButton>
          <Modal.Title className="posts-modal-text">Add a New Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new exercise name"
                value={newExerciseName}
                onChange={handleNewExerciseNameChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button className="posts-modal-button darken" onClick={handleAddNewExercise}>
            Add Exercise
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Exercise;