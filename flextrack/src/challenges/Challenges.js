import { useEffect } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Challenges.css';

function Challenges(props) {
    const navigate = useNavigate();

    return (
        <div className="display-container">
            <div className="top-message">
                Welcome to the Challenges Page!
            </div>
            <a onClick={() => { navigate("/"); }}>Dashboard Page!</a>
            <a onClick={() => { navigate("/createWorkout"); }}>Create Workout Page!</a>
            <a onClick={() => { navigate("/viewWorkout"); }}>View Workout Page!</a>
            <a onClick={() => { navigate("/social"); }}>Social Page!</a>
            <a onClick={() => { navigate("/challenges"); }}>Challenges Page!</a>
            <a onClick={() => { navigate("/settings"); }}>Settings Page!</a>
        </div>
    )
};

export default Challenges;